export default function Loading({ label = 'Carregando' }) {
  return (
    <div className="grid min-h-screen place-items-center bg-harmonic-bg text-center">
      <div>
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-harmonic-lime" />
        <p className="mt-4 text-sm text-harmonic-muted">{label}...</p>
      </div>
    </div>
  );
}
