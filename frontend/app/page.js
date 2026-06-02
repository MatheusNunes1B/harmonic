import Link from 'next/link';
import { featuredPlaylists, featuredTracks } from '../lib/mockData';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-aura pb-20">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-harmonic-lime to-harmonic-neon font-black text-black">H</div>
          <span className="text-xl font-black">Harmonic</span>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/termos/" className="hidden text-harmonic-muted hover:text-white sm:block">Termos</Link>
          <Link href="/login/" className="rounded-full border border-white/10 px-4 py-2 hover:border-harmonic-lime">Entrar</Link>
          <Link href="/cadastro/" className="rounded-full bg-harmonic-lime px-4 py-2 font-bold text-black">Criar conta</Link>
        </nav>
      </header>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-harmonic-lime">PWA musical</p>
          <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">Ouça, descubra e organize seu universo sonoro.</h1>
          <p className="mt-6 max-w-2xl text-lg text-harmonic-muted">Harmonic é um protótipo completo de aplicativo musical com player, biblioteca, playlists, busca e experiência instalável no celular.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cadastro/" className="rounded-full bg-harmonic-lime px-6 py-3 font-black text-black transition hover:scale-105">Começar agora</Link>
            <Link href="/app/" className="rounded-full border border-white/10 px-6 py-3 font-bold hover:border-harmonic-neon">Ver app</Link>
          </div>
        </div>
        <div className="glass rounded-[2rem] p-4 shadow-glow">
          <div className="rounded-[1.5rem] bg-harmonic-card p-5">
            <div className="grid grid-cols-2 gap-4">
              {featuredTracks.slice(0, 4).map((track) => <MusicCard key={track.id} track={track} />)}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6">
        <h2 className="mb-5 text-2xl font-black">Playlists em destaque</h2>
        <div className="grid gap-4 md:grid-cols-4">{featuredPlaylists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist} />)}</div>
      </section>
      <footer className="mx-auto mt-16 max-w-7xl px-6 text-sm text-harmonic-muted">© 2026 Harmonic. Protótipo com músicas fictícias. <Link className="text-harmonic-lime" href="/termos/">Termos de uso</Link>.</footer>
    </main>
  );
}
