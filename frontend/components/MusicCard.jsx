'use client';

export default function MusicCard({ track, onPlay }) {
  return (
    <article className="group rounded-3xl bg-harmonic-card p-4 transition hover:-translate-y-1 hover:bg-white/10">
      <div className="mb-4 grid aspect-square place-items-center rounded-2xl bg-gradient-to-br from-harmonic-neon via-fuchsia-500 to-harmonic-lime text-5xl font-black text-black shadow-glow">
        {track.title?.[0] || 'H'}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold">{track.title}</h3>
          <p className="text-sm text-harmonic-muted">{track.artist || track.artists?.name}</p>
          <p className="mt-1 text-xs text-harmonic-muted">{track.duration || '3:30'} · {track.genre || 'Harmonic'}</p>
        </div>
        <button onClick={() => onPlay?.(track)} className="grid h-10 w-10 place-items-center rounded-full bg-harmonic-lime text-black opacity-90 transition group-hover:scale-110">▶</button>
      </div>
    </article>
  );
}
