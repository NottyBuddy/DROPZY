-- DROPZY instant artist publishing and public catalogue
-- Run this in the SQL editor of your DROPZY Supabase project.
-- Never expose a service-role key in client-side code.

create extension if not exists pgcrypto;

create table if not exists public.song_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  artist text not null check (char_length(artist) between 1 and 120),
  language text not null,
  genre text,
  version_label text not null default 'original',
  storage_path text not null unique,
  rights_proof_path text,
  original_filename text not null,
  rights_note text not null,
  rights_confirmed boolean not null default false,
  status text not null default 'approved' check (status in ('pending','approved','rejected','taken_down')),
  reviewer_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.song_submissions add column if not exists version_label text not null default 'original';
alter table public.song_submissions add column if not exists rights_proof_path text;

alter table public.song_submissions enable row level security;

drop policy if exists "artists submit own songs" on public.song_submissions;
create policy "artists submit own songs"
on public.song_submissions for insert to authenticated
with check (auth.uid() = user_id and rights_confirmed = true and status = 'approved');

drop policy if exists "artists view own submissions" on public.song_submissions;
create policy "artists view own submissions"
on public.song_submissions for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "DROPZY admins review submissions" on public.song_submissions;

-- All audio and proof documents remain in this private bucket.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('artist-submissions','artist-submissions',false,104857600,
  array['audio/mpeg','audio/wav','audio/x-wav','audio/mp4','audio/flac','application/octet-stream',
        'application/pdf','image/png','image/jpeg','text/plain'])
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

-- New rights-confirmed artist uploads are published immediately. Keep the private storage bucket and signed streaming URLs. The project owner may change a disputed track status to taken_down after investigating a valid rights complaint.
