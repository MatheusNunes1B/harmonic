create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  bio text default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text default '',
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete set null,
  title text not null,
  cover_url text,
  release_year int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete set null,
  album_id uuid references public.albums(id) on delete set null,
  title text not null,
  duration_seconds int not null default 180,
  genre text default 'Harmonic',
  cover_url text,
  audio_url text default 'https://example.com/audio-placeholder.mp3',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text default '',
  cover_url text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlist_tracks (
  id uuid primary key default gen_random_uuid(),
  playlist_id uuid not null references public.playlists(id) on delete cascade,
  track_id uuid not null references public.tracks(id) on delete cascade,
  position int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (playlist_id, track_id)
);

create table if not exists public.liked_tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id uuid not null references public.tracks(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, track_id)
);

create table if not exists public.terms_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  version text not null,
  accepted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger artists_updated_at before update on public.artists for each row execute function public.set_updated_at();
create trigger albums_updated_at before update on public.albums for each row execute function public.set_updated_at();
create trigger tracks_updated_at before update on public.tracks for each row execute function public.set_updated_at();
create trigger playlists_updated_at before update on public.playlists for each row execute function public.set_updated_at();
create trigger playlist_tracks_updated_at before update on public.playlist_tracks for each row execute function public.set_updated_at();
create trigger liked_tracks_updated_at before update on public.liked_tracks for each row execute function public.set_updated_at();
create trigger terms_acceptances_updated_at before update on public.terms_acceptances for each row execute function public.set_updated_at();

create index if not exists idx_tracks_artist_id on public.tracks(artist_id);
create index if not exists idx_tracks_album_id on public.tracks(album_id);
create index if not exists idx_tracks_title on public.tracks using gin (to_tsvector('portuguese', title));
create index if not exists idx_playlists_user_id on public.playlists(user_id);
create index if not exists idx_playlist_tracks_playlist_id on public.playlist_tracks(playlist_id);
create index if not exists idx_playlist_tracks_track_id on public.playlist_tracks(track_id);
create index if not exists idx_liked_tracks_user_id on public.liked_tracks(user_id);
create index if not exists idx_terms_acceptances_user_id on public.terms_acceptances(user_id);

alter table public.profiles enable row level security;
alter table public.artists enable row level security;
alter table public.albums enable row level security;
alter table public.tracks enable row level security;
alter table public.playlists enable row level security;
alter table public.playlist_tracks enable row level security;
alter table public.liked_tracks enable row level security;
alter table public.terms_acceptances enable row level security;

create policy "Profiles can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Profiles can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Profiles can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Anyone can read artists" on public.artists for select using (true);
create policy "Anyone can read albums" on public.albums for select using (true);
create policy "Anyone can read tracks" on public.tracks for select using (true);

create policy "Users can read public or own playlists" on public.playlists for select using (is_public = true or auth.uid() = user_id);
create policy "Users can create own playlists" on public.playlists for insert with check (auth.uid() = user_id);
create policy "Users can update own playlists" on public.playlists for update using (auth.uid() = user_id);
create policy "Users can delete own playlists" on public.playlists for delete using (auth.uid() = user_id);

create policy "Users can read playlist tracks from visible playlists" on public.playlist_tracks for select using (
  exists (select 1 from public.playlists p where p.id = playlist_id and (p.is_public = true or p.user_id = auth.uid()))
);
create policy "Users can add tracks to own playlists" on public.playlist_tracks for insert with check (
  exists (select 1 from public.playlists p where p.id = playlist_id and p.user_id = auth.uid())
);
create policy "Users can remove tracks from own playlists" on public.playlist_tracks for delete using (
  exists (select 1 from public.playlists p where p.id = playlist_id and p.user_id = auth.uid())
);

create policy "Users can read own liked tracks" on public.liked_tracks for select using (auth.uid() = user_id);
create policy "Users can like tracks" on public.liked_tracks for insert with check (auth.uid() = user_id);
create policy "Users can unlike tracks" on public.liked_tracks for delete using (auth.uid() = user_id);

create policy "Users can read own terms acceptance" on public.terms_acceptances for select using (auth.uid() = user_id);
create policy "Users can accept terms" on public.terms_acceptances for insert with check (auth.uid() = user_id);

insert into public.artists (id, name, bio, image_url) values
('00000000-0000-0000-0000-000000000101', 'Lia Nova', 'Voz sintética e melodias luminosas.', null),
('00000000-0000-0000-0000-000000000102', 'Orion Vale', 'Produtor de atmosferas espaciais.', null),
('00000000-0000-0000-0000-000000000103', 'Maya Sol', 'Indie pop fictício com brilho tropical.', null),
('00000000-0000-0000-0000-000000000104', 'Duo Prisma', 'Batidas eletrônicas com textura cinematográfica.', null)
on conflict (id) do nothing;

insert into public.albums (id, artist_id, title, release_year) values
('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'Céu Elétrico', 2026),
('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000102', 'Gravidade Zero', 2026),
('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000103', 'Noites Líquidas', 2025),
('00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000104', 'Horizonte Roxo', 2025)
on conflict (id) do nothing;

insert into public.tracks (id, artist_id, album_id, title, duration_seconds, genre, audio_url) values
('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Aurora de Vidro', 204, 'Synth Pop', 'https://example.com/audio/aurora-de-vidro.mp3'),
('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000202', 'Pulso Lunar', 242, 'Eletrônica', 'https://example.com/audio/pulso-lunar.mp3'),
('00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000203', 'Maré Neon', 178, 'Indie', 'https://example.com/audio/mare-neon.mp3'),
('00000000-0000-0000-0000-000000000304', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000204', 'Cidade Suspensa', 227, 'Dream Beat', 'https://example.com/audio/cidade-suspensa.mp3'),
('00000000-0000-0000-0000-000000000305', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Frequência Verde', 191, 'Pop', 'https://example.com/audio/frequencia-verde.mp3'),
('00000000-0000-0000-0000-000000000306', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000202', 'Eco Particular', 219, 'Ambient', 'https://example.com/audio/eco-particular.mp3'),
('00000000-0000-0000-0000-000000000307', '00000000-0000-0000-0000-000000000103', '00000000-0000-0000-0000-000000000203', 'Sol em Pixel', 201, 'Indie Pop', 'https://example.com/audio/sol-em-pixel.mp3'),
('00000000-0000-0000-0000-000000000308', '00000000-0000-0000-0000-000000000104', '00000000-0000-0000-0000-000000000204', 'Ritual Violeta', 233, 'Electronic', 'https://example.com/audio/ritual-violeta.mp3'),
('00000000-0000-0000-0000-000000000309', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201', 'Constelação Local', 188, 'Synth Pop', 'https://example.com/audio/constelacao-local.mp3'),
('00000000-0000-0000-0000-000000000310', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000202', 'Nuvem Orbital', 216, 'Ambient', 'https://example.com/audio/nuvem-orbital.mp3')
on conflict (id) do nothing;

insert into public.playlists (id, user_id, name, description, is_public) values
('00000000-0000-0000-0000-000000000401', null, 'Foco Astral', 'Batidas suaves para entrar no fluxo.', true),
('00000000-0000-0000-0000-000000000402', null, 'Neon Drive', 'Som noturno para viagens urbanas.', true),
('00000000-0000-0000-0000-000000000403', null, 'Calma Cósmica', 'Texturas leves e atmosferas tranquilas.', true),
('00000000-0000-0000-0000-000000000404', null, 'Descobertas Harmonic', 'Artistas fictícios em destaque.', true)
on conflict (id) do nothing;

insert into public.playlist_tracks (playlist_id, track_id, position) values
('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000301', 1),
('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000306', 2),
('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000302', 1),
('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000304', 2),
('00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000303', 1),
('00000000-0000-0000-0000-000000000403', '00000000-0000-0000-0000-000000000310', 2),
('00000000-0000-0000-0000-000000000404', '00000000-0000-0000-0000-000000000305', 1),
('00000000-0000-0000-0000-000000000404', '00000000-0000-0000-0000-000000000307', 2),
('00000000-0000-0000-0000-000000000404', '00000000-0000-0000-0000-000000000308', 3)
on conflict (playlist_id, track_id) do nothing;
