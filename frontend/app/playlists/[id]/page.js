import AppShell from '../../../components/AppShell';
import MusicCard from '../../../components/MusicCard';
import { featuredPlaylists, featuredTracks } from '../../../lib/mockData';

export function generateStaticParams() {
  return featuredPlaylists.map((playlist) => ({ id: playlist.id }));
}

export default function PlaylistDetailPage({ params }) {
  const playlist = featuredPlaylists.find((item) => item.id === params.id) || featuredPlaylists[0];
  return (
    <AppShell title={playlist.name} subtitle={playlist.description}>
      <section className={`rounded-[2rem] bg-gradient-to-br ${playlist.cover} p-8 text-black`}>
        <p className="text-sm font-black uppercase tracking-[0.3em]">Playlist Harmonic</p>
        <h2 className="mt-3 text-5xl font-black">{playlist.name}</h2>
        <p className="mt-3 max-w-xl font-semibold opacity-80">{playlist.description}</p>
        <button className="mt-6 rounded-full bg-black px-6 py-3 font-black text-white">Tocar playlist</button>
      </section>
      <h2 className="mb-4 mt-8 text-2xl font-black">Faixas</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{featuredTracks.map((track) => <MusicCard key={track.id} track={track} />)}</div>
    </AppShell>
  );
}
