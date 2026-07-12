-- Waitlist table + RLS for the bundl landing page.
-- Run this in Supabase → SQL Editor. Safe to re-run (idempotent).

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  role       text not null check (role in ('buyer', 'stylist')),
  created_at timestamptz not null default now()
);

-- One row per email (case-insensitive). A repeat signup is rejected, not duplicated.
create unique index if not exists waitlist_email_key
  on public.waitlist (lower(email));

-- Lock the table down: nothing is allowed unless a policy explicitly permits it.
alter table public.waitlist enable row level security;

-- Allow anonymous visitors to INSERT signups, and nothing else.
-- No SELECT/UPDATE/DELETE policy exists, so the public anon key cannot read,
-- change, or remove rows — you view the list from the Supabase dashboard
-- (or the service_role key), never from the browser.
drop policy if exists "anon can join waitlist" on public.waitlist;
create policy "anon can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
