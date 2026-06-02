'use client';

import { useMemo, useState } from 'react';
import AppShell from '../../components/AppShell';
import SearchBar from '../../components/SearchBar';
import MusicCard from '../../components/MusicCard';
import PlaylistCard from '../../components/PlaylistCard';
import { featuredPlaylists, featuredTracks } from '../../lib/mockData';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const tracks = useMemo(() => featuredTracks.filter((track) => `${track.title} ${track.artist} ${track.genre}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <AppShell title="Busca" subtitle="Encontre faixas, artistas e playlists.">
      <SearchBar value={query} onChange={setQuery} />
      <h2 className="mb-4 mt-8 text-2xl font-black">Resultados de músicas</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{tracks.map((track) => <MusicCard key={track.id} track={track} />)}</div>
      <h2 className="mb-4 mt-8 text-2xl font-black">Playlists populares</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{featuredPlaylists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)}</div>
    </AppShell>
  );
}
