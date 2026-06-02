'use client';

import Link from 'next/link';
import { logout } from '../lib/auth';

export default function Header({ title = 'Harmonic', subtitle = 'Sua trilha sonora em alta resolução emocional.' }) {
  return (
    <header className="sticky top-0 z-30 glass px-4 py-4 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-harmonic-lime">Harmonic</p>
          <h1 className="text-2xl font-black md:text-4xl">{title}</h1>
          <p className="mt-1 text-sm text-harmonic-muted">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/perfil/" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-harmonic-lime md:block">Perfil</Link>
          <button onClick={logout} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-harmonic-lime">Sair</button>
        </div>
      </div>
    </header>
  );
}
