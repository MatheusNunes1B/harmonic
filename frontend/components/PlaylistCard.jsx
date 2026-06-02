import Link from 'next/link';

export default function PlaylistCard({ playlist }) {
  const href = `/playlists/${playlist.id || 'focus'}/`;
  return (
    <Link href={href} className="group block rounded-3xl bg-harmonic-card p-4 transition hover:-translate-y-1 hover:bg-white/10">
      <div className={`mb-4 grid aspect-video place-items-center rounded-2xl bg-gradient-to-br ${playlist.cover || 'from-harmonic-neon to-harmonic-lime'} text-4xl font-black text-black`}>
        ♫
      </div>
      <h3 className="text-lg font-bold">{playlist.name}</h3>
      <p className="mt-1 text-sm text-harmonic-muted">{playlist.description}</p>
      <p className="mt-3 text-xs font-bold text-harmonic-lime">{playlist.tracks || playlist.track_count || 0} músicas</p>
    </Link>
  );
}
