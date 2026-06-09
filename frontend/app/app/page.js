// frontend/app/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import AppShell from '../../components/AppShell';
import MusicCard from '../../components/MusicCard';
import PlaylistCard from '../../components/PlaylistCard';
import { featuredPlaylists } from '../../lib/mockData';
import { api } from '../../lib/api';

export default function AppHomePage() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    api.tracks()
      .then((data) => setTracks(data.tracks ?? []))
      .catch(() => setTracks([]));
  }, []);

  return (
    <AppShell title="Boa música para agora" subtitle="Descubra faixas fictícias, monte playlists e teste o PWA.">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
        <section className="rounded-[2rem] bg-gradient-to-br from-harmonic-neon/35 to-harmonic-lime/20 p-6 shadow-glow">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-harmonic-lime">Destaque</p>
          <h2 className="mt-3 text-4xl font-black">Céu Elétrico</h2>
          <p className="mt-2 max-w-xl text-harmonic-muted">Uma seleção moderna com synths, grooves e atmosferas urbanas para demonstrar o Harmonic.</p>
          <button className="mt-6 rounded-full bg-white px-6 py-3 font-black text-black hover:bg-harmonic-lime">Tocar destaque</button>
        </section>
        <section className="rounded-[2rem] bg-harmonic-panel p-6">
          <h2 className="text-xl font-black">Resumo</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-2xl font-black">{tracks.length || '...'}</p>
              <p className="text-xs text-harmonic-muted">músicas</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-2xl font-black">4</p>
              <p className="text-xs text-harmonic-muted">playlists</p>
            </div>
          </div>
        </section>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-black">Tocadas recentemente</h2>
      {tracks.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0,1,2].map((i) => <div key={i} className="rounded-3xl bg-harmonic-card p-4 animate-pulse h-40" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tracks.map((track) => <MusicCard key={track.id} track={track} />)}
        </div>
      )}

      <h2 className="mb-4 mt-8 text-2xl font-black">Playlists para você</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {featuredPlaylists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)}
      </div>
    </AppShell>
  );
}