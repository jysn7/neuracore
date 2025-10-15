-- ============================================================================
-- QUICK FIX: Critical Security Issues Only
-- ============================================================================
-- Execute this if you want to fix ONLY the critical security vulnerabilities
-- This addresses the most urgent issues found in the database analysis
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. FIX: Remove insecure INSERT policy on ideas table
--    ISSUE: Allows users to impersonate others by setting any author UUID
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can create ideas" ON public.ideas;

-- ============================================================================
-- 2. FIX: Remove insecure INSERT policy on comments table
--    ISSUE: Doesn't verify auth.uid() = author
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can create comments" ON public.comments;

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
-- 3. FIX: Add basic RLS policies to idea_likes table
--    ISSUE: Table has RLS enabled but no policies (anyone can manipulate)
-- ============================================================================

CREATE POLICY "idea_likes_public_select"
  ON public.idea_likes FOR SELECT USING (true);

CREATE POLICY "idea_likes_authenticated_insert"
  ON public.idea_likes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "idea_likes_owner_delete"
  ON public.idea_likes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- 4. FIX: Add basic RLS policies to comment_likes table
--    ISSUE: Table has RLS enabled but no policies (anyone can manipulate)
-- ============================================================================

CREATE POLICY "comment_likes_public_select"
  ON public.comment_likes FOR SELECT USING (true);

CREATE POLICY "comment_likes_authenticated_insert"
  ON public.comment_likes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "comment_likes_owner_delete"
  ON public.comment_likes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- 5. FIX: Add profile creation trigger
--    ISSUE: New users won't be able to submit ideas (foreign key constraint)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After running, verify with:
-- 
-- SELECT COUNT(*) FROM pg_policies WHERE tablename = 'idea_likes';
-- -- Should return 3
--
-- SELECT COUNT(*) FROM pg_policies WHERE tablename = 'comment_likes';
-- -- Should return 3
--
-- SELECT trigger_name FROM information_schema.triggers 
-- WHERE trigger_name = 'on_auth_user_created';
-- -- Should return the trigger name
-- ============================================================================
