import Link from 'next/link';

const items = [
  ['Home', '/app/'],
  ['Busca', '/busca/'],
  ['Lib', '/biblioteca/'],
  ['Listas', '/playlists/'],
  ['Perfil', '/perfil/']
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-white/10 bg-black/90 pb-2 pt-2 backdrop-blur md:hidden">
      {items.map(([label, href]) => (
        <Link key={href} href={href} className="text-center text-xs font-semibold text-harmonic-muted hover:text-harmonic-lime">
          <span className="mx-auto mb-1 block h-1.5 w-1.5 rounded-full bg-current" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
