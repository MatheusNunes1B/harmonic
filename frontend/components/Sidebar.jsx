import Link from 'next/link';

const items = [
  ['Início', '/app/'],
  ['Busca', '/busca/'],
  ['Biblioteca', '/biblioteca/'],
  ['Playlists', '/playlists/'],
  ['Perfil', '/perfil/']
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-harmonic-bg p-6 pb-32 md:block">
      <Link href="/" className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-harmonic-lime to-harmonic-neon font-black text-black shadow-glow">H</div>
        <div>
          <p className="text-xl font-black">Harmonic</p>
          <p className="text-xs text-harmonic-muted">music pwa</p>
        </div>
      </Link>
      <nav className="mt-10 space-y-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-harmonic-muted transition hover:bg-white/10 hover:text-white">
            {label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-32 left-6 right-6 rounded-3xl bg-gradient-to-br from-harmonic-neon/30 to-harmonic-lime/20 p-5">
        <p className="font-bold">Modo descoberta</p>
        <p className="mt-2 text-sm text-harmonic-muted">Explore faixas fictícias criadas para este protótipo.</p>
      </div>
    </aside>
  );
}
