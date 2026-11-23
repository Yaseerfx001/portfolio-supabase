-- Run this ONCE in Supabase: open your project -> SQL Editor -> New query -> paste -> Run.

-- 1) One table with a single row that holds all the site content as JSON
create table if not exists public.site_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint only_one_row check (id = 1)
);

-- Lock the table: nobody can read or write it from the browser.
-- Only your server (using the service role key) can, which is what we want.
alter table public.site_content enable row level security;

-- 2) A public bucket for uploaded photos and your CV.
-- "Public" means anyone can VIEW a file if they have its link (needed so the
-- website can show it). Only your admin page can upload or delete files.
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;
