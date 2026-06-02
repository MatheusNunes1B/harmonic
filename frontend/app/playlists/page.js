import AppShell from '../../components/AppShell';
import PlaylistCard from '../../components/PlaylistCard';
import { featuredPlaylists } from '../../lib/mockData';

export default function PlaylistsPage() {
  return (
    <AppShell title="Playlists" subtitle="Crie coleções para cada momento.">
      <div className="mb-6 flex flex-col justify-between gap-3 rounded-[2rem] bg-harmonic-panel p-5 md:flex-row md:items-center">
        <div><h2 className="text-xl font-black">Minhas playlists</h2><p className="text-sm text-harmonic-muted">Gerencie listas conectadas ao backend Supabase.</p></div>
        <button className="rounded-full bg-harmonic-lime px-5 py-3 font-black text-black">Nova playlist</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{featuredPlaylists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)}</div>
    </AppShell>
  );
}
