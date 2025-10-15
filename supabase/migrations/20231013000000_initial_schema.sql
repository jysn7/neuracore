-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  full_name text,
  avatar_url text,
  role text check (role in ('user', 'admin', 'moderator')),
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create RLS policies for profiles
create policy "Enable read access for all"
  on public.profiles
  for select
  using (true);

create policy "Enable update for users themselves"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Enable insert for authenticated users"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Create ideas table
create table public.ideas (
  id uuid default gen_random_uuid() primary key,
  author uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  summary text,
  content text not null,
  category text not null,
  tags text[] default '{}',
  cover_img text,
  likes integer default 0,
  comments_count integer default 0,
  share_count integer default 0,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.ideas enable row level security;

-- Create RLS policies for ideas table
create policy "Enable read access for all"
  on public.ideas
  for select
  using (true);

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

create policy "Enable update for owners"
  on public.ideas
  for update
  using (auth.uid() = author)
  with check (
    auth.uid() = author
    and title is not null
    and content is not null
    and category is not null
  );

create policy "Enable delete for owners"
  on public.ideas
  for delete
  using (auth.uid() = author);

-- Create comments table
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  idea_id uuid references public.ideas(id) on delete cascade not null,
  author uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.comments enable row level security;

-- Create RLS policies for comments table
create policy "Enable read access for all"
  on public.comments
  for select
  using (true);

create policy "Enable insert for authenticated users"
  on public.comments
  for insert
  with check (
    auth.role() = 'authenticated' 
    and auth.uid() = author
    and content is not null
  );

create policy "Enable update for owners"
  on public.comments
  for update
  using (auth.uid() = author)
  with check (
    auth.uid() = author
    and content is not null
  );

create policy "Enable delete for owners"
  on public.comments
  for delete
  using (auth.uid() = author);

-- Create likes table for ideas
create table public.idea_likes (
  id uuid default gen_random_uuid() primary key,
  idea_id uuid references public.ideas(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(idea_id, user_id)
);

-- Enable RLS
alter table public.idea_likes enable row level security;

-- Create likes table for comments
create table public.comment_likes (
  id uuid default gen_random_uuid() primary key,
  comment_id uuid references public.comments(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(comment_id, user_id)
);

-- Enable RLS
alter table public.comment_likes enable row level security;

-- Create notifications table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.notifications enable row level security;

-- Create achievements table
create table public.achievements (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  description text not null,
  icon_url text,
  points integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_achievements table
create table public.user_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  achievement_id uuid references public.achievements(id) on delete cascade not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, achievement_id)
);

-- Enable RLS
alter table public.user_achievements enable row level security;

-- Create storage bucket for idea covers
insert into storage.buckets (id, name) values ('idea-covers', 'idea-covers');

-- Create RLS policies

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Ideas policies
create policy "Ideas are viewable by everyone"
  on public.ideas for select
  using ( true );

create policy "Authenticated users can create ideas"
  on public.ideas for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own ideas"
  on public.ideas for update
  using ( auth.uid() = author );

create policy "Users can delete own ideas"
  on public.ideas for delete
  using ( auth.uid() = author );

-- Comments policies
create policy "Comments are viewable by everyone"
  on public.comments for select
  using ( true );

create policy "Authenticated users can create comments"
  on public.comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own comments"
  on public.comments for update
  using ( auth.uid() = author );

create policy "Users can delete own comments"
  on public.comments for delete
  using ( auth.uid() = author );

-- Functions

-- Function to toggle idea like
create or replace function public.toggle_like(idea_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  if exists(
    select 1
    from public.idea_likes
    where idea_likes.idea_id = toggle_like.idea_id
    and user_id = auth.uid()
  ) then
    delete from public.idea_likes
    where idea_likes.idea_id = toggle_like.idea_id
    and user_id = auth.uid();
    
    update public.ideas
    set likes = likes - 1
    where id = toggle_like.idea_id;
  else
    insert into public.idea_likes (idea_id, user_id)
    values (toggle_like.idea_id, auth.uid());
    
    update public.ideas
    set likes = likes + 1
    where id = toggle_like.idea_id;
  end if;
end;
$$;

-- Function to toggle comment like
create or replace function public.toggle_comment_like(comment_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  if exists(
    select 1
    from public.comment_likes
    where comment_likes.comment_id = toggle_comment_like.comment_id
    and user_id = auth.uid()
  ) then
    delete from public.comment_likes
    where comment_likes.comment_id = toggle_comment_like.comment_id
    and user_id = auth.uid();
    
    update public.comments
    set likes = likes - 1
    where id = toggle_comment_like.comment_id;
  else
    insert into public.comment_likes (comment_id, user_id)
    values (toggle_comment_like.comment_id, auth.uid());
    
    update public.comments
    set likes = likes + 1
    where id = toggle_comment_like.comment_id;
  end if;
end;
$$;

-- Function to increment view count
create or replace function public.increment_view_count(idea_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.ideas
  set view_count = view_count + 1
  where id = increment_view_count.idea_id;
end;
$$;