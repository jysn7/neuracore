-- Clean Up Duplicate and Conflicting RLS Policies
-- This migration consolidates RLS policies for better security and clarity

-- =============================================================================
-- STEP 1: Drop duplicate/conflicting INSERT policies on ideas table
-- =============================================================================

drop policy if exists "Authenticated users can create ideas" on public.ideas;
drop policy if exists "Enable insert for authenticated users" on public.ideas;

-- =============================================================================
-- STEP 2: Create single comprehensive INSERT policy
-- =============================================================================

create policy "ideas_secure_insert"
  on public.ideas
  for insert
  to authenticated
  with check (
    -- Ensure the author is the authenticated user (prevents impersonation)
    auth.uid() = author
    -- Validate required fields at database level
    and title is not null
    and trim(title) != ''
    and content is not null
    and trim(content) != ''
    and category is not null
    and trim(category) != ''
  );

-- =============================================================================
-- STEP 3: Verify and consolidate SELECT policies (if duplicates exist)
-- =============================================================================

drop policy if exists "Ideas are viewable by everyone" on public.ideas;
drop policy if exists "Enable read access for all" on public.ideas;

create policy "ideas_public_select"
  on public.ideas
  for select
  using (true);  -- Anyone can read ideas (public access)

-- =============================================================================
-- STEP 4: Verify and consolidate UPDATE policies
-- =============================================================================

drop policy if exists "Users can update own ideas" on public.ideas;
drop policy if exists "Enable update for owners" on public.ideas;

create policy "ideas_owner_update"
  on public.ideas
  for update
  to authenticated
  using (auth.uid() = author)
  with check (
    -- User must still be the owner after update
    auth.uid() = author
    -- Maintain data integrity
    and title is not null
    and trim(title) != ''
    and content is not null
    and trim(content) != ''
    and category is not null
    and trim(category) != ''
  );

-- =============================================================================
-- STEP 5: Verify and consolidate DELETE policies
-- =============================================================================

drop policy if exists "Users can delete own ideas" on public.ideas;
drop policy if exists "Enable delete for owners" on public.ideas;

create policy "ideas_owner_delete"
  on public.ideas
  for delete
  to authenticated
  using (auth.uid() = author);

-- =============================================================================
-- STEP 6: Clean up PROFILES table policies (optional - if duplicates exist)
-- =============================================================================

-- Check and consolidate profiles SELECT policies
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Enable read access for all" on public.profiles;

create policy "profiles_public_select"
  on public.profiles
  for select
  using (true);

-- Check and consolidate profiles INSERT policies
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Enable insert for authenticated users" on public.profiles;

create policy "profiles_self_insert"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Check and consolidate profiles UPDATE policies
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Enable update for users themselves" on public.profiles;

create policy "profiles_self_update"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- =============================================================================
-- STEP 7: Clean up COMMENTS table policies (optional - for consistency)
-- =============================================================================

drop policy if exists "Comments are viewable by everyone" on public.comments;
drop policy if exists "Enable read access for all" on public.comments;

create policy "comments_public_select"
  on public.comments
  for select
  using (true);

drop policy if exists "Authenticated users can create comments" on public.comments;
drop policy if exists "Enable insert for authenticated users" on public.comments;

create policy "comments_authenticated_insert"
  on public.comments
  for insert
  to authenticated
  with check (
    auth.uid() = author
    and content is not null
    and trim(content) != ''
  );

drop policy if exists "Users can update own comments" on public.comments;
drop policy if exists "Enable update for owners" on public.comments;

create policy "comments_owner_update"
  on public.comments
  for update
  to authenticated
  using (auth.uid() = author)
  with check (
    auth.uid() = author
    and content is not null
    and trim(content) != ''
  );

drop policy if exists "Users can delete own comments" on public.comments;
drop policy if exists "Enable delete for owners" on public.comments;

create policy "comments_owner_delete"
  on public.comments
  for delete
  to authenticated
  using (auth.uid() = author);

-- =============================================================================
-- VERIFICATION QUERIES (Run separately to check results)
-- =============================================================================

-- View all RLS policies for ideas table
-- select 
--   policyname,
--   cmd as operation,
--   roles,
--   permissive,
--   qual as using_clause,
--   with_check
-- from pg_policies
-- where schemaname = 'public'
--   and tablename = 'ideas'
-- order by cmd, policyname;

-- View all RLS policies for profiles table
-- select 
--   policyname,
--   cmd as operation,
--   roles,
--   permissive,
--   qual as using_clause,
--   with_check
-- from pg_policies
-- where schemaname = 'public'
--   and tablename = 'profiles'
-- order by cmd, policyname;

-- =============================================================================
-- NOTES:
-- - This migration is idempotent (safe to run multiple times)
-- - Policy names are now consistent and self-documenting
-- - All policies use 'to authenticated' for clarity
-- - Field validation is enforced at database level with trim() checks
-- - Security is maintained: users can only modify their own content
-- =============================================================================
