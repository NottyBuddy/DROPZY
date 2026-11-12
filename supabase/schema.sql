-- DROPZY artist upload foundation
-- Run this in the SQL editor of your own Supabase project.
-- Keep the project service-role key secret; never place it in website code.

create extension if not exists pgcrypto;

create table if not exists public.song_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  artist text not null check (char_length(artist) between 1 and 120),
  language text not null,
  genre text,
  storage_path text not null unique,
  original_filename text not null,
  rights_note text not null,
  rights_confirmed boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected','taken_down')),
  reviewer_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.song_submissions enable row level security;

-- Artists can submit only for their own authenticated account.
drop policy if exists "artists submit own songs" on public.song_submissions;
create policy "artists submit own songs"
on public.song_submissions for insert to authenticated
with check (auth.uid() = user_id and rights_confirmed = true and status = 'pending');

-- Artists can view only their own submission status.
drop policy if exists "artists view own submissions" on public.song_submissions;
create policy "artists view own submissions"
on public.song_submissions for select to authenticated
using (auth.uid() = user_id);

-- Private audio bucket: uploads are never publicly readable.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('artist-submissions','artist-submissions',false,104857600,
  array['audio/mpeg','audio/wav','audio/x-wav','audio/mp4','audio/flac','application/octet-stream'])
on conflict (id) do update set public=false, file_size_limit=104857600,
  allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "artists upload own audio" on storage.objects;
create policy "artists upload own audio"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'artist-submissions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "artists view own audio" on storage.objects;
create policy "artists view own audio"
on storage.objects for select to authenticated
using (
  bucket_id = 'artist-submissions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "artists delete own pending audio" on storage.objects;
create policy "artists delete own pending audio"
on storage.objects for delete to authenticated
using (
  bucket_id = 'artist-submissions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Admin review: use the Supabase dashboard with an administrator account.
-- Approve only after checking master recording, composition, contributor permissions,
-- territories, term, attribution, and any remix/derivative rights separately.
-- Never make the bucket public just to enable playback. Approved playback needs
-- a server-side signed-URL/API layer that uses a secret stored server-side.
