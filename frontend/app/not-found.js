import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-aura px-6 text-center">
      <div>
        <p className="text-8xl font-black text-harmonic-lime">404</p>
        <h1 className="mt-4 text-3xl font-black">Essa frequência não foi encontrada</h1>
        <p className="mt-3 text-harmonic-muted">A página que você procura saiu da playlist.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-harmonic-lime px-6 py-3 font-bold text-black">Voltar ao início</Link>
      </div>
    </main>
  );
}
