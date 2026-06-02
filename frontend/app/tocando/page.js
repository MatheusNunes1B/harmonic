import AppShell from '../../components/AppShell';

export default function NowPlayingPage() {
  return (
    <AppShell title="Tocando agora" subtitle="Controle a faixa em destaque com uma experiência imersiva.">
      <section className="mx-auto max-w-3xl rounded-[2.5rem] bg-harmonic-panel p-6 text-center shadow-glow md:p-10">
        <div className="mx-auto grid aspect-square max-w-sm place-items-center rounded-[2rem] bg-gradient-to-br from-harmonic-neon via-fuchsia-500 to-harmonic-lime text-8xl font-black text-black">H</div>
        <h2 className="mt-8 text-4xl font-black">Aurora de Vidro</h2>
        <p className="mt-2 text-harmonic-muted">Lia Nova · Céu Elétrico</p>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/5 bg-gradient-to-r from-harmonic-lime to-harmonic-neon" /></div>
        <div className="mt-3 flex justify-between text-xs text-harmonic-muted"><span>1:24</span><span>3:24</span></div>
        <div className="mt-8 flex items-center justify-center gap-5">
          <button className="text-2xl text-harmonic-muted">⟲</button>
          <button className="grid h-16 w-16 place-items-center rounded-full bg-white text-2xl font-black text-black hover:bg-harmonic-lime">▶</button>
          <button className="text-2xl text-harmonic-muted">♡</button>
        </div>
      </section>
    </AppShell>
  );
}
