# Database Migration Execution Guide

## 🔴 Critical: Execute These Migrations Immediately

The RLS policy analysis has identified **critical blocking issues** that prevent idea submission. These migrations must be applied to fix the problems.

---

## Issue Summary

1. **Missing Profile Records:** Users in `auth.users` don't have corresponding records in `public.profiles`
2. **Foreign Key Violation:** `ideas.author` references `profiles.id`, but profiles don't exist
3. **Duplicate RLS Policies:** Conflicting policies may cause unexpected behavior

---

## Migration Files

### 1. Profile Foreign Key Fix (CRITICAL - DO FIRST)
**File:** `supabase/migrations/20241015_fix_profile_foreign_key.sql`

**What it does:**
- Creates automatic profile creation trigger
- Backfills profiles for existing auth users
- Ensures all future signups auto-create profiles

**Impact:** ✅ Fixes idea submission blocking issue

---

### 2. RLS Policy Cleanup (IMPORTANT - DO SECOND)
**File:** `supabase/migrations/20241015_cleanup_rls_policies.sql`

**What it does:**
- Removes duplicate/conflicting RLS policies
- Creates consistent, secure policies
- Adds field validation at database level

**Impact:** ✅ Improves security and consistency

---

## Execution Methods

### Method 1: Supabase Dashboard (RECOMMENDED)

1. **Login to Supabase Dashboard:**
   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor:**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Execute Profile Fix:**
   - Copy contents of `20241015_fix_profile_foreign_key.sql`
   - Paste into editor
   - Click "Run"
   - ✅ Verify "Success" message

4. **Execute RLS Cleanup:**
   - Copy contents of `20241015_cleanup_rls_policies.sql`
   - Paste into editor
   - Click "Run"
   - ✅ Verify "Success" message

---

### Method 2: Supabase CLI

```powershell
# Navigate to project directory
cd D:\apps2\neuracore

# Login to Supabase (if not already)
supabase login

# Link to your project (if not already linked)
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations to database
supabase db push

# Or apply specific migration
supabase db execute --file supabase/migrations/20241015_fix_profile_foreign_key.sql
supabase db execute --file supabase/migrations/20241015_cleanup_rls_policies.sql
```

---

### Method 3: Direct PostgreSQL Connection

```powershell
# Get connection string from Supabase dashboard
# Database Settings > Connection String > URI

# Use psql or any PostgreSQL client
psql "postgresql://postgres:[password]@[host]:5432/postgres" -f supabase/migrations/20241015_fix_profile_foreign_key.sql
psql "postgresql://postgres:[password]@[host]:5432/postgres" -f supabase/migrations/20241015_cleanup_rls_policies.sql
```

---

## Verification Steps

### 1. Check Profile Creation

Run this query in SQL Editor:

```sql
-- Should show all users have profiles
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

**Expected Result:** All users should show `✅ Profile exists`

---

### 2. Verify RLS Policies

```sql
-- Check ideas table policies
select 
  policyname,
  cmd as operation,
  roles,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'ideas'
order by cmd, policyname;
```

**Expected Result:** Should see only these policies:
- `ideas_secure_insert` (INSERT)
- `ideas_public_select` (SELECT)
- `ideas_owner_update` (UPDATE)
- `ideas_owner_delete` (DELETE)

---

### 3. Test Idea Submission

1. **Login to your app:**
   ```
   Email: mwambaandy06@gmail.com
   Password: Dodecagon0
   ```

2. **Navigate to `/submit-idea`**

3. **Fill in the form:**
   - Title: "Test Idea After Migration"
   - Content: "Testing profile foreign key fix"
   - Category: "Tech"
   - Tags: "test, migration"

4. **Click Submit**

5. **Expected Result:** ✅ "Idea created successfully!"

---

## Troubleshooting

### Error: "relation 'auth.users' does not exist"

**Cause:** Not connected to the right database or wrong schema

**Fix:** Ensure you're connected to your Supabase project database, not a local one

---

### Error: "permission denied for schema auth"

**Cause:** Need elevated privileges to access auth schema

**Fix:** Run queries as postgres user or through Supabase dashboard

---

### Error: "trigger 'on_auth_user_created' already exists"

**Cause:** Migration already applied

**Fix:** This is OK - migration is idempotent. You can skip or the migration handles this with `drop trigger if exists`

---

### Still Getting Foreign Key Error After Migration

**Debug Steps:**

1. **Check if profile exists for your user:**
   ```sql
   select * from public.profiles where id = auth.uid();
   ```

2. **If not, manually create:**
   ```sql
   insert into public.profiles (id, username, role)
   values (auth.uid(), 'your-email@example.com', 'user');
   ```

3. **Check auth user ID:**
   ```sql
   select auth.uid();
   ```

4. **Verify trigger exists:**
   ```sql
   select 
     trigger_name, 
     event_manipulation, 
     event_object_table,
     action_statement
   from information_schema.triggers
   where trigger_schema = 'public'
     and trigger_name = 'on_auth_user_created';
   ```

---

## Post-Migration Checklist

- [ ] Profile creation trigger exists
- [ ] All existing auth users have profiles
- [ ] RLS policies are consolidated
- [ ] No duplicate policies exist
- [ ] Test user can submit idea successfully
- [ ] New user signup creates profile automatically

---

## Rollback Plan (If Needed)

If something goes wrong, you can rollback:

```sql
-- Remove trigger
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Restore original RLS policies
-- (Copy from supabase/migrations/20231013000000_initial_schema.sql)
```

**Note:** Only rollback if there's a critical issue. The migrations are designed to be safe.

---

## Next Steps After Migration

1. ✅ Verify all existing users have profiles
2. ✅ Test idea submission with existing user
3. ✅ Create new test user and verify auto-profile creation
4. ✅ Test new user can submit idea immediately
5. ✅ Monitor application logs for any RLS-related errors
6. ✅ Update application documentation

---

## Support

If you encounter issues:

1. Check Supabase dashboard logs
2. Check application server logs
3. Run verification queries above
4. Review `RLS_POLICY_ANALYSIS.md` for detailed explanation

---

**Status:** Ready to execute  
**Priority:** 🔴 Critical  
**Estimated Time:** 2-3 minutes  
**Risk Level:** Low (migrations are idempotent and safe)
