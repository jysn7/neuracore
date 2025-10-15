# RLS Policy Analysis for Idea Submission

**Date:** October 15, 2025  
**Status:** 🔴 Critical Issues Found

---

## Executive Summary

The RLS (Row Level Security) policies have **CRITICAL ISSUES** that will prevent idea submission from working. The primary issue is a **foreign key constraint combined with missing profile records**.

---

## Critical Issues

### 🔴 Issue #1: Missing Profile Records (BLOCKING)

**Problem:**
- The `ideas` table has a foreign key: `author uuid references public.profiles(id)`
- When users sign up via `auth.users`, **no corresponding profile is automatically created**
- When trying to insert an idea, the foreign key constraint fails because the profile doesn't exist

**Evidence:**
```sql
-- ideas table definition
create table public.ideas (
  id uuid default gen_random_uuid() primary key,
  author uuid references public.profiles(id) on delete cascade not null,
  -- ... other fields
);
```

**No automatic profile creation trigger exists in the schema.**

**Impact:** ❌ **IDEA SUBMISSION WILL FAIL WITH FOREIGN KEY VIOLATION**

**Error you'll see:**
```
insert or update on table "ideas" violates foreign key constraint "ideas_author_fkey"
Key (author)=(user-uuid) is not present in table "profiles"
```

---

### 🔴 Issue #2: RLS Policy Mismatch (POTENTIAL BLOCKER)

**Problem:**
The RLS insert policy for ideas has conflicting conditions across different files:

**In migration file (lines 60-70):**
```sql
create policy "Enable insert for authenticated users"
  on public.ideas
  for insert
  with check (
    auth.role() = 'authenticated' 
    and auth.uid() = author
    and title is not null
    and content is not null
    and category is not null
  );
```

**Later in same file (lines 213-215):**
```sql
create policy "Authenticated users can create ideas"
  on public.ideas for insert
  with check ( auth.role() = 'authenticated' );
```

**Impact:** 
- 🟡 Multiple policies with same name/operation may cause conflicts
- 🟡 The second policy is less restrictive (doesn't check author = auth.uid())
- 🟡 PostgreSQL will use OR logic between policies, but inconsistency is problematic

---

## RLS Policy Audit

### ✅ Profiles Table Policies (WORKING)

```sql
-- READ: Public access ✅
create policy "Enable read access for all"
  on public.profiles for select
  using (true);

-- INSERT: User can only create their own profile ✅
create policy "Enable insert for authenticated users"
  on public.profiles for insert
  with check (auth.uid() = id);

-- UPDATE: User can only update their own profile ✅
create policy "Enable update for users themselves"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
```

**Status:** ✅ Policies are correct
**Issue:** ❌ No automatic profile creation when user signs up

---

### 🟡 Ideas Table Policies (NEEDS FIXING)

**Current Policies:**

#### SELECT (Public Read)
```sql
create policy "Enable read access for all"
  on public.ideas for select
  using (true);
```
**Status:** ✅ Working - Anyone can read ideas

---

#### INSERT (Create New Ideas)

**Policy Version 1 (Lines 60-70):**
```sql
create policy "Enable insert for authenticated users"
  on public.ideas for insert
  with check (
    auth.role() = 'authenticated' 
    and auth.uid() = author
    and title is not null
    and content is not null
    and category is not null
  );
```

**Analysis:**
- ✅ Checks user is authenticated
- ✅ Enforces author must match logged-in user (prevents impersonation)
- ✅ Validates required fields at database level
- ❌ Requires `author` field to reference existing profile (foreign key)

**Policy Version 2 (Lines 213-215):**
```sql
create policy "Authenticated users can create ideas"
  on public.ideas for insert
  with check ( auth.role() = 'authenticated' );
```

**Analysis:**
- ✅ Checks user is authenticated
- ❌ **SECURITY RISK:** Doesn't verify `auth.uid() = author`
- ❌ User could set any UUID as author
- ❌ No field validation
- 🟡 May be intended as simplified version but creates security hole

---

#### UPDATE (Modify Existing Ideas)

```sql
create policy "Enable update for owners"
  on public.ideas for update
  using (auth.uid() = author)
  with check (
    auth.uid() = author
    and title is not null
    and content is not null
    and category is not null
  );
```

**Status:** ✅ Working correctly
- Only owner can update
- Enforces required fields

---

#### DELETE (Remove Ideas)

```sql
create policy "Enable delete for owners"
  on public.ideas for delete
  using (auth.uid() = author);
```

**Status:** ✅ Working correctly
- Only owner can delete their ideas

---

## API Route Validation

**File:** `src/app/api/ideas/create/route.ts`

### Current Checks ✅

```typescript
// 1. Session validation
const { isValid, user, error: sessionError } = await validateSession(req);
if (!isValid || !user) {
  return NextResponse.json({ error: "Authentication required" }, { status: 401 });
}

// 2. Field validation
if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
if (!content?.trim()) return NextResponse.json({ error: "Content is required" }, { status: 400 });
if (!category?.trim()) return NextResponse.json({ error: "Category is required" }, { status: 400 });

// 3. Author validation
if (!author || author !== user.id) {
  return NextResponse.json({ error: "Invalid author" }, { status: 403 });
}

// 4. Insert with authenticated client
const { data, error } = await supabase
  .from("ideas")
  .insert([{
    author: user.id,
    title: title.trim(),
    summary: summary?.trim() || null,
    content: content.trim(),
    tags: tags.filter((tag: string) => tag.trim()),
    category: category.trim(),
    cover_img: coverImgUrl
  }])
  .select('*');
```

**Analysis:** 
- ✅ API route properly validates all fields
- ✅ Ensures author = authenticated user
- ✅ Trims input and handles nulls
- ❌ **WILL STILL FAIL** due to missing profile foreign key

---

## Root Cause Analysis

### Why Submission Fails:

1. **User signs up** → Record created in `auth.users` ✅
2. **User logs in** → Session token issued ✅
3. **Session persists** → Cookies working correctly ✅
4. **User submits idea** → API validates session ✅
5. **API attempts insert** → PostgreSQL checks foreign key ❌
   ```
   ERROR: insert or update on table "ideas" violates foreign key constraint
   DETAIL: Key (author)=(uuid) is not present in table "profiles"
   ```
6. **Insert fails** → Returns 500 error to user ❌

---

## Solutions

### 🔥 Solution 1: Create Profile Trigger (RECOMMENDED)

**Create automatic profile creation when user signs up:**

```sql
-- Function to create profile for new users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, role)
  values (
    new.id,
    new.email,  -- Use email as default username
    new.raw_user_meta_data->>'full_name',
    'user'
  );
  return new;
end;
$$;

-- Trigger to run after user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill existing users
insert into public.profiles (id, username, role)
select 
  au.id,
  au.email,
  'user'
from auth.users au
left join public.profiles p on p.id = au.id
where p.id is null;
```

**Benefits:**
- ✅ Automatic profile creation for all new users
- ✅ Backfills existing users
- ✅ No application code changes needed
- ✅ Maintains referential integrity

---

### 🔧 Solution 2: Fix Duplicate RLS Policies

**Drop duplicate/conflicting policies:**

```sql
-- Drop the less secure policy
drop policy if exists "Authenticated users can create ideas" on public.ideas;

-- Keep only the secure, validated policy
-- (The one that checks auth.uid() = author and validates fields)
```

**OR consolidate into single clear policy:**

```sql
-- Drop all existing insert policies
drop policy if exists "Enable insert for authenticated users" on public.ideas;
drop policy if exists "Authenticated users can create ideas" on public.ideas;

-- Create single comprehensive policy
create policy "ideas_insert_policy"
  on public.ideas
  for insert
  to authenticated
  with check (
    auth.uid() = author
    and title is not null
    and content is not null
    and category is not null
  );
```

---

### 🛡️ Solution 3: Add Profile Existence Check (OPTIONAL)

**Add validation in API route:**

```typescript
// Before inserting idea, verify profile exists
const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select('id')
  .eq('id', user.id)
  .single();

if (profileError || !profile) {
  // Attempt to create profile
  const { error: createError } = await supabase
    .from('profiles')
    .insert([{
      id: user.id,
      username: user.email,
      role: 'user'
    }]);
  
  if (createError) {
    return NextResponse.json({
      error: "Profile creation failed. Please contact support.",
      code: "PROFILE_MISSING"
    }, { status: 500 });
  }
}

// Now insert idea...
```

**Benefits:**
- ✅ Handles edge cases
- ✅ Self-healing for missing profiles
- ❌ Adds latency to every request
- ❌ Doesn't fix root cause

---

## Recommended Implementation Plan

### Phase 1: Critical Fix (DO FIRST) 🔥

**Create SQL migration file:** `supabase/migrations/fix_profile_foreign_key.sql`

```sql
-- 1. Create automatic profile creation function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    'user'
  );
  return new;
end;
$$;

-- 2. Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Backfill existing users
insert into public.profiles (id, username, role)
select 
  au.id,
  au.email,
  'user'
from auth.users au
left join public.profiles p on p.id = au.id
where p.id is null;
```

**Execute via Supabase dashboard or CLI:**
```bash
supabase db push
```

---

### Phase 2: Clean Up RLS Policies (DO SECOND) ⚙️

**Create SQL migration file:** `supabase/migrations/fix_rls_policies.sql`

```sql
-- Drop duplicate/conflicting policies
drop policy if exists "Authenticated users can create ideas" on public.ideas;

-- Keep the more restrictive policy or recreate clean version
drop policy if exists "Enable insert for authenticated users" on public.ideas;

create policy "ideas_secure_insert"
  on public.ideas
  for insert
  to authenticated
  with check (
    auth.uid() = author
    and title is not null
    and content is not null
    and category is not null
  );
```

---

### Phase 3: Test (VERIFY) ✅

1. **Create new test user:**
   - Sign up with new email
   - Check that profile is auto-created
   
2. **Test idea submission:**
   - Login
   - Navigate to `/submit-idea`
   - Fill form and submit
   - Verify success

3. **Check existing user:**
   - Login with existing account
   - Verify profile exists (backfill worked)
   - Submit idea
   - Verify success

---

## Testing Queries

### Check if profiles exist for auth users:

```sql
select 
  au.id,
  au.email,
  p.id as profile_id,
  p.username,
  case 
    when p.id is null then '❌ MISSING PROFILE'
    else '✅ Profile exists'
  end as status
from auth.users au
left join public.profiles p on p.id = au.id
order by au.created_at desc;
```

### Check RLS policies:

```sql
select 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'ideas'
order by policyname;
```

### Test insert as authenticated user:

```sql
-- This should work after fixes
set request.jwt.claim.sub = 'your-user-uuid';

insert into ideas (author, title, content, category)
values (
  'your-user-uuid',
  'Test Idea',
  'Test content',
  'General'
);
```

---

## Summary

| Issue | Severity | Impact | Solution | Status |
|-------|----------|--------|----------|--------|
| Missing profile records | 🔴 Critical | **Blocks all idea submissions** | Add profile creation trigger | ❌ Not Fixed |
| Foreign key constraint | 🔴 Critical | **Blocks submissions** | Backfill existing users | ❌ Not Fixed |
| Duplicate RLS policies | 🟡 Medium | Potential security issue | Consolidate policies | ❌ Not Fixed |
| Missing field validation | 🟢 Low | API handles this | Already handled | ✅ Fixed |

---

## Next Steps

1. ✅ **Execute Phase 1 SQL migration** (profile creation trigger)
2. ✅ **Execute Phase 2 SQL migration** (clean RLS policies)  
3. ✅ **Test with existing user** (verify backfill)
4. ✅ **Test with new user** (verify trigger works)
5. ✅ **Submit test idea** (verify end-to-end flow)

---

**Conclusion:** The session is persisting correctly. The issue is **100% the missing profile records due to no automatic profile creation**. Once the trigger is added and existing users backfilled, idea submission will work.
