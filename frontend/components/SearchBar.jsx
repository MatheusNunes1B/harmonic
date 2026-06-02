'use client';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full rounded-3xl border border-white/10 bg-white/10 px-5 py-4 pl-12 text-white outline-none transition focus:border-harmonic-lime focus:bg-white/15" placeholder="Busque músicas, artistas e playlists" />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-harmonic-muted">⌕</span>
    </div>
  );
}
