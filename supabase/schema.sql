create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'owner', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  address text not null,
  price numeric not null check (price > 0),
  listing_type text not null check (listing_type in ('rent', 'sell')),
  bedrooms integer not null check (bedrooms >= 0),
  rooms integer not null check (rooms >= 1),
  bathrooms integer not null check (bathrooms >= 1),
  description text not null,
  images text[] not null default '{}',
  contact_name text,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_properties (
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, property_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_properties_updated_at on public.properties;
create trigger set_properties_updated_at
before update on public.properties
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.saved_properties enable row level security;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Public can select properties" on public.properties;
create policy "Public can select properties"
on public.properties
for select
using (true);

drop policy if exists "Authenticated users can insert own properties" on public.properties;
create policy "Authenticated users can insert own properties"
on public.properties
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "Owners can update own properties" on public.properties;
create policy "Owners can update own properties"
on public.properties
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists "Owners can delete own properties" on public.properties;
create policy "Owners can delete own properties"
on public.properties
for delete
to authenticated
using (owner_id = auth.uid());

drop policy if exists "Users can select own saved properties" on public.saved_properties;
create policy "Users can select own saved properties"
on public.saved_properties
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can save properties for themselves" on public.saved_properties;
create policy "Users can save properties for themselves"
on public.saved_properties
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can remove own saved properties" on public.saved_properties;
create policy "Users can remove own saved properties"
on public.saved_properties
for delete
to authenticated
using (user_id = auth.uid());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-images',
  'property-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read property images" on storage.objects;
create policy "Public can read property images"
on storage.objects
for select
using (bucket_id = 'property-images');

drop policy if exists "Users can upload own property images" on storage.objects;
create policy "Users can upload own property images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'property-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can update own property images" on storage.objects;
create policy "Users can update own property images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'property-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'property-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Users can delete own property images" on storage.objects;
create policy "Users can delete own property images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'property-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);
