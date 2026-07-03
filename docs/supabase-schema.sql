-- ============================================================================
--  My Universe — schema comptes joueurs (Supabase)
--  A coller dans : Dashboard Supabase > SQL Editor > New query > Run
--  Projet : pbuxpxwxaoqypqgsizei
-- ============================================================================

-- 1. Table des profils (1 ligne par utilisateur, liee a auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text not null,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Row Level Security : chaque joueur ne voit/modifie que son profil
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 3. Creation auto du profil a l'inscription (lit le pseudo dans user_metadata)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Maj auto de updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();
