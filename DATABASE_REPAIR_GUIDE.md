# Database Repair Execution Guide

## 🔴 CRITICAL: Execute These Repairs Immediately

Based on the live database analysis, your database has **critical security vulnerabilities** that need immediate attention.

---

## What's Wrong?

### 🔴 Critical Issues

1. **Users can impersonate others** when creating ideas/comments
2. **Like tables have no access control** - anyone can manipulate like counts
3. **No automatic profile creation** - will break when new users sign up

### Current Status
- ✅ All 6 existing users have profiles (no immediate issue)
- ❌ Insecure RLS policies allow impersonation attacks
- ❌ 8 tables have RLS enabled but no policies
- ⚠️ Will break for new users (no profile creation trigger)

---

## Two Repair Options

### Option 1: Quick Fix (5 minutes) ⚡
**File:** `supabase/quick_fix.sql`

**What it fixes:**
- ✅ Removes insecure INSERT policies
- ✅ Adds secure comment INSERT policy
- ✅ Adds RLS policies to like tables
- ✅ Adds automatic profile creation trigger

**What it doesn't fix:**
- ⏭️ Duplicate policies (non-critical)
- ⏭️ Function security vulnerabilities
- ⏭️ Other tables without policies
- ⏭️ Legacy table cleanup

**Use this if:** You need immediate security fixes only

---

### Option 2: Complete Repair (10 minutes) 🛠️
**File:** `supabase/critical_repair.sql`

**What it fixes:**
- ✅ All critical security issues
- ✅ Removes duplicate RLS policies
- ✅ Fixes function security vulnerabilities
- ✅ Adds policies to all missing tables
- ✅ Automatic profile creation
- ✅ Comprehensive coverage

**Use this if:** You want to fix everything properly

---

## How to Execute

### Method 1: Supabase Dashboard (RECOMMENDED)

1. **Open Supabase Dashboard:**
   - Go to https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor:**
   - Click "SQL Editor" in sidebar
   - Click "New Query"

3. **Choose your repair script:**
   
   **For Quick Fix:**
   - Copy all content from `supabase/quick_fix.sql`
   - Paste into SQL Editor
   - Click "Run"
   
   **For Complete Repair:**
   - Copy all content from `supabase/critical_repair.sql`
   - Paste into SQL Editor
   - Click "Run"

4. **Verify Success:**
   - Should see "Success. No rows returned"
   - Check verification queries below

---

### Method 2: Supabase CLI

```powershell
# Navigate to project
cd D:\apps2\neuracore

# Quick Fix
supabase db execute --file supabase/quick_fix.sql

# OR Complete Repair
supabase db execute --file supabase/critical_repair.sql
```

---

### Method 3: Using MCP Tools (if available)

You can also execute using the Supabase MCP server tools that were used for analysis.

---

## Post-Execution Verification

### 1. Verify Policies Were Created

```sql
-- Should show policies for idea_likes (3) and comment_likes (3)
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('idea_likes', 'comment_likes')
GROUP BY tablename;
```

**Expected Result:**
```
tablename       | policy_count
----------------|-------------
idea_likes      | 3
comment_likes   | 3
```

---

### 2. Verify Trigger Was Created

```sql
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

**Expected Result:**
```
trigger_name         | event_object_table
---------------------|-------------------
on_auth_user_created | users
```

---

### 3. Check Insecure Policies Were Removed

```sql
-- Should return 0 rows
SELECT policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'ideas'
  AND policyname = 'Authenticated users can create ideas';
```

**Expected Result:** `(0 rows)`

---

### 4. Verify All Users Still Have Profiles

```sql
SELECT 
  COUNT(*) FILTER (WHERE p.id IS NOT NULL) as with_profile,
  COUNT(*) FILTER (WHERE p.id IS NULL) as without_profile
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id;
```

**Expected Result:**
```
with_profile | without_profile
-------------|----------------
6            | 0
```

---

## Testing After Repair

### Test 1: Verify Impersonation is Blocked

Try to create an idea with a different author UUID (should fail):

```sql
-- This should now fail with RLS policy violation
INSERT INTO ideas (author, title, content, category)
VALUES (
  '00000000-0000-0000-0000-000000000000',  -- Wrong UUID
  'Test Impersonation',
  'This should fail',
  'General'
);
```

**Expected:** `Error: new row violates row-level security policy`

---

### Test 2: Test Idea Submission as Logged-In User

1. Login to your app: `mwambaandy06@gmail.com` / `Dodecagon0`
2. Navigate to `/submit-idea`
3. Fill out the form:
   - Title: "Test After Security Fix"
   - Content: "Testing that idea submission still works"
   - Category: "Tech"
4. Click Submit

**Expected:** ✅ "Idea created successfully!"

---

### Test 3: Test Profile Auto-Creation (New User)

1. Sign up with a new test email
2. Check if profile was created:

```sql
SELECT id, username, role
FROM profiles
WHERE username = 'your-new-test-email@example.com';
```

**Expected:** Profile exists with role = 'user'

---

### Test 4: Test Like Functionality

1. Try to like an idea
2. Check database:

```sql
-- Should only show likes where user_id = your auth.uid()
SELECT * FROM idea_likes WHERE user_id = auth.uid();
```

**Expected:** Only your own likes are visible

---

## What Changed

### Quick Fix Changes:

| Item | Before | After |
|------|--------|-------|
| Ideas INSERT policies | 4 (1 insecure) | 3 (all secure) |
| Comments INSERT policies | 1 (insecure) | 1 (secure) |
| idea_likes policies | 0 ❌ | 3 ✅ |
| comment_likes policies | 0 ❌ | 3 ✅ |
| Profile creation trigger | None ❌ | Automatic ✅ |

---

### Complete Repair Changes:

All of the above PLUS:

| Item | Before | After |
|------|--------|-------|
| Ideas policies total | 9 (duplicates) | 5 (clean) |
| notifications policies | 0 ❌ | 4 ✅ |
| user_achievements policies | 0 ❌ | 4 ✅ |
| achievements policies | 0 ❌ | 4 ✅ |
| Function search_path | Vulnerable | Secured |
| Duplicate policies | 6 | 0 |

---

## Rollback (If Needed)

If something goes wrong:

### Option 1: Use Supabase Backups
Supabase automatically backs up your database. You can restore from:
- Dashboard > Database > Backups

### Option 2: Revert Specific Changes

```sql
-- Restore the insecure policy (NOT RECOMMENDED!)
CREATE POLICY "Authenticated users can create ideas"
  ON public.ideas FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Remove new policies
DROP POLICY IF EXISTS "comments_secure_insert" ON public.comments;
DROP POLICY IF EXISTS "idea_likes_public_select" ON public.idea_likes;
-- etc...
```

---

## Additional Recommended Actions

### After Executing Repairs:

1. **Enable Leaked Password Protection:**
   - Go to Supabase Dashboard
   - Authentication > Settings
   - Enable "Password Security"
   - Enable "Leaked Password Protection"

2. **Monitor Application Logs:**
   - Check for any RLS policy violations
   - Monitor Supabase logs for errors

3. **Update Documentation:**
   - Document the RLS policies
   - Update team on security changes

4. **Test All Features:**
   - Idea submission ✅
   - Commenting ✅
   - Liking/Unliking ✅
   - Profile updates ✅
   - Notifications ✅

---

## Troubleshooting

### Error: "permission denied for schema auth"
**Solution:** Run via Supabase Dashboard or use service_role key

### Error: "trigger already exists"
**Solution:** Script handles this with DROP IF EXISTS, safe to re-run

### Error: "policy already exists"
**Solution:** Script handles this with DROP IF EXISTS, safe to re-run

### Idea submission still fails
**Check:**
1. User has profile: `SELECT * FROM profiles WHERE id = auth.uid();`
2. Session is valid: Check browser console for auth errors
3. RLS policies applied: Run verification queries above

---

## Support

If issues persist after running repairs:

1. Check `LIVE_DATABASE_ANALYSIS.md` for detailed analysis
2. Review Supabase logs in Dashboard > Logs
3. Run verification queries to confirm changes applied
4. Check application console for specific error messages

---

**Status:** Ready to Execute  
**Recommendation:** Use **Complete Repair** for comprehensive fix  
**Estimated Time:** 10 minutes  
**Risk Level:** Low (all changes are additive/corrective)  
**Testing Required:** Yes (follow testing checklist above)
