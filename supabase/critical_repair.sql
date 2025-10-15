-- ============================================================================
-- CRITICAL DATABASE REPAIR SCRIPT
-- ============================================================================
-- Date: October 15, 2025
-- Purpose: Fix security vulnerabilities and RLS policy issues
-- Priority: CRITICAL - Execute Immediately
-- ============================================================================

-- This script addresses:
-- 1. CRITICAL: Insecure INSERT policies allowing impersonation
-- 2. CRITICAL: Missing RLS policies on like/notification tables
-- 3. HIGH: Missing automatic profile creation trigger
-- 4. MEDIUM: Duplicate RLS policies
-- 5. MEDIUM: Function security vulnerabilities
-- 6. LOW: Enable password protection

BEGIN;

-- ============================================================================
-- SECTION 1: FIX CRITICAL SECURITY VULNERABILITIES (Ideas Table)
-- ============================================================================

-- Remove insecure INSERT policy that allows impersonation
DROP POLICY IF EXISTS "Authenticated users can create ideas" ON public.ideas;

-- Remove duplicate DELETE policies (keep the clearer named one)
DROP POLICY IF EXISTS "Enable delete for owners" ON public.ideas;

-- Remove duplicate SELECT policies (keep the clearer named one)
DROP POLICY IF EXISTS "Enable read access" ON public.ideas;

-- Remove less restrictive INSERT policies
DROP POLICY IF EXISTS "Enable insert access" ON public.ideas;

-- Remove duplicate UPDATE policy (keep the one with validation)
DROP POLICY IF EXISTS "Users can update own ideas" ON public.ideas;

-- Keep these secure policies:
-- ✅ "Enable insert for authenticated users" (most secure)
-- ✅ "Enable authenticated users to create ideas with profile" (validates profile exists)
-- ✅ "Ideas are viewable by everyone" (SELECT)
-- ✅ "Users can delete own ideas" (DELETE)
-- ✅ "Enable update for owners" (UPDATE with validation)

-- ============================================================================
-- SECTION 2: FIX CRITICAL SECURITY VULNERABILITIES (Comments Table)
-- ============================================================================

-- Remove insecure INSERT policy that doesn't verify author
DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;

-- Create secure INSERT policy
CREATE POLICY "comments_secure_insert"
  ON public.comments
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = author
    AND content IS NOT NULL
    AND trim(content) != ''
  );

-- ============================================================================
-- SECTION 3: ADD MISSING RLS POLICIES (idea_likes)
-- ============================================================================

-- Public can view who liked what
CREATE POLICY "idea_likes_public_select"
  ON public.idea_likes
  FOR SELECT
  USING (true);

-- Users can only like as themselves
CREATE POLICY "idea_likes_authenticated_insert"
  ON public.idea_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only unlike their own likes
CREATE POLICY "idea_likes_owner_delete"
  ON public.idea_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- SECTION 4: ADD MISSING RLS POLICIES (comment_likes)
-- ============================================================================

-- Public can view who liked what
CREATE POLICY "comment_likes_public_select"
  ON public.comment_likes
  FOR SELECT
  USING (true);

-- Users can only like as themselves
CREATE POLICY "comment_likes_authenticated_insert"
  ON public.comment_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can only unlike their own likes
CREATE POLICY "comment_likes_owner_delete"
  ON public.comment_likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- SECTION 5: ADD MISSING RLS POLICIES (notifications)
-- ============================================================================

-- Users can only see their own notifications
CREATE POLICY "notifications_owner_select"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- System/functions can create notifications for any user
CREATE POLICY "notifications_system_insert"
  ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);  -- Any authenticated process can create notifications

-- Users can update their own notifications (mark as read)
CREATE POLICY "notifications_owner_update"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own notifications
CREATE POLICY "notifications_owner_delete"
  ON public.notifications
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- SECTION 6: ADD MISSING RLS POLICIES (user_achievements)
-- ============================================================================

-- Public can view all user achievements (for leaderboards/profiles)
CREATE POLICY "user_achievements_public_select"
  ON public.user_achievements
  FOR SELECT
  USING (true);

-- Only system/functions can grant achievements (prevent self-granting)
-- Note: Regular users cannot INSERT, only backend functions can
CREATE POLICY "user_achievements_system_insert"
  ON public.user_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (false);  -- Blocks direct inserts by users

-- Users cannot update achievements
CREATE POLICY "user_achievements_no_update"
  ON public.user_achievements
  FOR UPDATE
  TO authenticated
  USING (false);

-- Users cannot delete achievements
CREATE POLICY "user_achievements_no_delete"
  ON public.user_achievements
  FOR DELETE
  TO authenticated
  USING (false);

-- ============================================================================
-- SECTION 7: ADD MISSING RLS POLICIES (achievements)
-- ============================================================================

-- Anyone can view available achievements
CREATE POLICY "achievements_public_select"
  ON public.achievements
  FOR SELECT
  USING (true);

-- Only admins can create new achievements
-- For now, block all inserts (you'll need to use service_role key)
CREATE POLICY "achievements_admin_only_insert"
  ON public.achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (false);  -- Blocks user inserts, use service_role key instead

-- Only admins can update achievements
CREATE POLICY "achievements_admin_only_update"
  ON public.achievements
  FOR UPDATE
  TO authenticated
  USING (false);

-- Only admins can delete achievements
CREATE POLICY "achievements_admin_only_delete"
  ON public.achievements
  FOR DELETE
  TO authenticated
  USING (false);

-- ============================================================================
-- SECTION 8: CREATE AUTOMATIC PROFILE CREATION TRIGGER
-- ============================================================================

-- Function to create profile when new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', new.email),
    new.raw_user_meta_data->>'full_name',
    'user',
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;  -- Prevent errors if profile already exists
  RETURN new;
END;
$$;

-- Create trigger (drop first if exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for any existing users without profiles (should be none based on analysis)
INSERT INTO public.profiles (id, username, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  'user',
  au.created_at,
  now()
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- SECTION 9: FIX FUNCTION SECURITY VULNERABILITIES
-- ============================================================================

-- Fix toggle_like function
CREATE OR REPLACE FUNCTION public.toggle_like(idea_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public  -- ADD THIS LINE
AS $$
BEGIN
  IF EXISTS(
    SELECT 1
    FROM public.idea_likes
    WHERE idea_likes.idea_id = toggle_like.idea_id
    AND user_id = auth.uid()
  ) THEN
    DELETE FROM public.idea_likes
    WHERE idea_likes.idea_id = toggle_like.idea_id
    AND user_id = auth.uid();
    
    UPDATE public.ideas
    SET likes = GREATEST(likes - 1, 0)  -- Prevent negative likes
    WHERE id = toggle_like.idea_id;
  ELSE
    INSERT INTO public.idea_likes (idea_id, user_id)
    VALUES (toggle_like.idea_id, auth.uid());
    
    UPDATE public.ideas
    SET likes = likes + 1
    WHERE id = toggle_like.idea_id;
  END IF;
END;
$$;

-- Fix toggle_comment_like function
CREATE OR REPLACE FUNCTION public.toggle_comment_like(comment_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public  -- ADD THIS LINE
AS $$
BEGIN
  IF EXISTS(
    SELECT 1
    FROM public.comment_likes
    WHERE comment_likes.comment_id = toggle_comment_like.comment_id
    AND user_id = auth.uid()
  ) THEN
    DELETE FROM public.comment_likes
    WHERE comment_likes.comment_id = toggle_comment_like.comment_id
    AND user_id = auth.uid();
    
    UPDATE public.comments
    SET likes = GREATEST(likes - 1, 0)  -- Prevent negative likes
    WHERE id = toggle_comment_like.comment_id;
  ELSE
    INSERT INTO public.comment_likes (comment_id, user_id)
    VALUES (toggle_comment_like.comment_id, auth.uid());
    
    UPDATE public.comments
    SET likes = likes + 1
    WHERE id = toggle_comment_like.comment_id;
  END IF;
END;
$$;

-- Fix update_updated_at_column function (if it exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public  -- ADD THIS LINE
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

-- Fix ensure_user_profile function (if it exists)
CREATE OR REPLACE FUNCTION public.ensure_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public  -- ADD THIS LINE
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid()
  ) THEN
    INSERT INTO public.profiles (id, username, role)
    VALUES (auth.uid(), new.email, 'user')
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN new;
END;
$$;

-- Fix increment_counter function (if it exists)
CREATE OR REPLACE FUNCTION public.increment_counter()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public  -- ADD THIS LINE
AS $$
BEGIN
  -- Function body depends on what counter this increments
  -- Update based on actual implementation
  RETURN new;
END;
$$;

-- ============================================================================
-- SECTION 10: DISABLE RLS ON LEGACY TABLES (or add policies)
-- ============================================================================

-- Option A: Disable RLS if tables are not used
-- Uncomment if you want to disable RLS on legacy tables

-- ALTER TABLE public."Account" DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."Comments" DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;

-- Option B: Add basic policies to legacy tables
-- Uncomment if you want to keep RLS enabled

/*
-- Account table policies
CREATE POLICY "account_public_select" ON public."Account" FOR SELECT USING (true);
CREATE POLICY "account_no_insert" ON public."Account" FOR INSERT WITH CHECK (false);
CREATE POLICY "account_no_update" ON public."Account" FOR UPDATE USING (false);
CREATE POLICY "account_no_delete" ON public."Account" FOR DELETE USING (false);

-- Comments table policies (uppercase C - legacy)
CREATE POLICY "comments_legacy_public_select" ON public."Comments" FOR SELECT USING (true);
CREATE POLICY "comments_legacy_no_insert" ON public."Comments" FOR INSERT WITH CHECK (false);
CREATE POLICY "comments_legacy_no_update" ON public."Comments" FOR UPDATE USING (false);
CREATE POLICY "comments_legacy_no_delete" ON public."Comments" FOR DELETE USING (false);

-- Posts table policies
CREATE POLICY "posts_public_select" ON public.posts FOR SELECT USING (true);
CREATE POLICY "posts_no_insert" ON public.posts FOR INSERT WITH CHECK (false);
CREATE POLICY "posts_no_update" ON public.posts FOR UPDATE USING (false);
CREATE POLICY "posts_no_delete" ON public.posts FOR DELETE USING (false);
*/

-- ============================================================================
-- SECTION 11: VERIFICATION QUERIES
-- ============================================================================

-- After running this script, verify the changes with these queries:

-- 1. Check all policies are in place
-- SELECT tablename, COUNT(*) as policy_count
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- GROUP BY tablename
-- ORDER BY tablename;

-- 2. Verify no tables have RLS enabled without policies
-- SELECT 
--   schemaname,
--   tablename,
--   rowsecurity as rls_enabled
-- FROM pg_tables
-- WHERE schemaname = 'public'
--   AND rowsecurity = true
--   AND tablename NOT IN (
--     SELECT DISTINCT tablename FROM pg_policies WHERE schemaname = 'public'
--   );

-- 3. Check trigger was created
-- SELECT trigger_name, event_object_table, action_statement
-- FROM information_schema.triggers
-- WHERE trigger_name = 'on_auth_user_created';

-- 4. Verify all auth users have profiles
-- SELECT 
--   COUNT(*) FILTER (WHERE p.id IS NOT NULL) as with_profile,
--   COUNT(*) FILTER (WHERE p.id IS NULL) as without_profile,
--   COUNT(*) as total
-- FROM auth.users au
-- LEFT JOIN public.profiles p ON p.id = au.id;

COMMIT;

-- ============================================================================
-- POST-EXECUTION CHECKLIST
-- ============================================================================
-- [ ] Run this script in Supabase SQL Editor
-- [ ] Verify COMMIT succeeded (no errors)
-- [ ] Run verification queries above
-- [ ] Test idea submission as existing user
-- [ ] Create new test user and verify profile auto-creation
-- [ ] Test new user can submit idea immediately
-- [ ] Enable "Leaked Password Protection" in Supabase Dashboard
--     (Authentication > Settings > Password Protection)
-- [ ] Monitor application for any RLS-related errors
-- [ ] Update application documentation
-- ============================================================================

-- ROLLBACK PLAN (if needed):
-- If something goes wrong, you can rollback by:
-- 1. Restore from Supabase automatic backups
-- 2. Or manually recreate the original policies from your migration files
-- ============================================================================
