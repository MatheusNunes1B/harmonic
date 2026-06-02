import AppShell from '../../components/AppShell';
import MusicCard from '../../components/MusicCard';
import PlaylistCard from '../../components/PlaylistCard';
import { featuredPlaylists, featuredTracks } from '../../lib/mockData';

export default function LibraryPage() {
  return (
    <AppShell title="Sua biblioteca" subtitle="Músicas curtidas, playlists salvas e histórico em um só lugar.">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[2rem] bg-harmonic-panel p-6"><p className="text-3xl font-black">128</p><p className="text-harmonic-muted">minutos ouvidos</p></div>
        <div className="rounded-[2rem] bg-harmonic-panel p-6"><p className="text-3xl font-black">18</p><p className="text-harmonic-muted">curtidas</p></div>
        <div className="rounded-[2rem] bg-harmonic-panel p-6"><p className="text-3xl font-black">6</p><p className="text-harmonic-muted">playlists</p></div>
      </div>
      <h2 className="mb-4 mt-8 text-2xl font-black">Músicas curtidas</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{featuredTracks.slice(0, 3).map((track) => <MusicCard key={track.id} track={track} />)}</div>
      <h2 className="mb-4 mt-8 text-2xl font-black">Playlists salvas</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{featuredPlaylists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)}</div>
    </AppShell>
  );
}
