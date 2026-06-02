'use client';

import { useState } from 'react';
import AppShell from '../../components/AppShell';
import { getUser } from '../../lib/auth';

export default function ProfilePage() {
  const user = getUser();
  const [name, setName] = useState(user?.user_metadata?.name || 'Usuário Harmonic');
  return (
    <AppShell title="Perfil" subtitle="Gerencie sua conta e preferências musicais.">
      <section className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-[2rem] bg-harmonic-panel p-6 text-center">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-harmonic-lime to-harmonic-neon text-5xl font-black text-black">{name[0]}</div>
          <h2 className="mt-4 text-2xl font-black">{name}</h2>
          <p className="text-sm text-harmonic-muted">{user?.email || 'email@exemplo.com'}</p>
        </div>
        <form className="rounded-[2rem] bg-harmonic-panel p-6">
          <h2 className="text-xl font-black">Dados públicos</h2>
          <label className="mt-5 block text-sm text-harmonic-muted">Nome</label>
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-harmonic-lime" />
          <label className="mt-5 block text-sm text-harmonic-muted">Bio</label>
          <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-harmonic-lime" placeholder="Conte sobre seu gosto musical" />
          <button type="button" className="mt-5 rounded-full bg-harmonic-lime px-5 py-3 font-black text-black">Salvar perfil</button>
        </form>
      </section>
    </AppShell>
  );
}
