-- Fix Profile Foreign Key Constraint Issue
-- This migration creates automatic profile creation and backfills existing users

-- =============================================================================
-- STEP 1: Create function to automatically create profiles for new users
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', new.email),
    new.raw_user_meta_data->>'full_name',
    'user'
  )
  on conflict (id) do nothing;  -- Prevent duplicate errors
  return new;
end;
$$;

-- =============================================================================
-- STEP 2: Create trigger to run after user creation
-- =============================================================================

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================================================
-- STEP 3: Backfill profiles for existing users without profiles
-- =============================================================================

insert into public.profiles (id, username, role, created_at, updated_at)
select 
  au.id,
  au.email as username,
  'user' as role,
  au.created_at,
  now() as updated_at
from auth.users au
left join public.profiles p on p.id = au.id
where p.id is null
on conflict (id) do nothing;

-- =============================================================================
-- STEP 4: Verify backfill results
-- =============================================================================

-- This query shows the status (run separately to check results)
-- select 
--   count(*) filter (where p.id is not null) as profiles_exist,
--   count(*) filter (where p.id is null) as profiles_missing,
--   count(*) as total_users
-- from auth.users au
-- left join public.profiles p on p.id = au.id;

-- =============================================================================
-- STEP 5: Add check constraint to ensure data integrity
-- =============================================================================

-- Ensure all ideas have valid author references
-- This will prevent orphaned ideas if profile deletion occurs
-- (Already handled by ON DELETE CASCADE, but good to verify)

-- No additional constraints needed - foreign key handles this

-- =============================================================================
-- NOTES:
-- - This migration is idempotent (safe to run multiple times)
-- - The trigger will handle all future user signups automatically
-- - Existing users are backfilled with their email as username
-- - Default role is 'user' for all new profiles
-- =============================================================================
