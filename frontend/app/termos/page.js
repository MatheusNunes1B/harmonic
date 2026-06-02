import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-aura px-6 py-12">
      <article className="mx-auto max-w-4xl rounded-[2rem] bg-harmonic-panel p-6 md:p-10">
        <Link href="/" className="text-sm text-harmonic-lime">← Voltar</Link>
        <h1 className="mt-6 text-4xl font-black">Termos de uso do Harmonic</h1>
        <div className="mt-8 space-y-6 text-harmonic-muted">
          <section><h2 className="text-xl font-bold text-white">Uso da plataforma</h2><p>O Harmonic é um protótipo educacional de PWA musical criado para demonstrar cadastro, login, playlists, busca e player. Use a plataforma de forma ética e conforme a legislação aplicável.</p></section>
          <section><h2 className="text-xl font-bold text-white">Conta do usuário</h2><p>Você é responsável por manter seus dados corretos e proteger suas credenciais. Contas podem ser usadas para salvar perfil, playlists e músicas curtidas.</p></section>
          <section><h2 className="text-xl font-bold text-white">Privacidade</h2><p>O projeto usa Supabase para autenticação e banco de dados. Nenhuma chave secreta deve ser exposta no front-end. Dados de exemplo são fictícios.</p></section>
          <section><h2 className="text-xl font-bold text-white">Conteúdos musicais</h2><p>As músicas, artistas, álbuns e playlists deste protótipo são fictícios. Não são usados assets, marcas ou faixas protegidas de terceiros.</p></section>
          <section><h2 className="text-xl font-bold text-white">Responsabilidades do usuário</h2><p>Não envie conteúdo ilegal, ofensivo, protegido por direitos autorais sem autorização ou que comprometa a segurança da aplicação.</p></section>
          <section><h2 className="text-xl font-bold text-white">Limitações do protótipo</h2><p>O player e URLs de áudio podem usar placeholders. Para produção, configure armazenamento, CDN, monitoramento e políticas adicionais.</p></section>
          <section><h2 className="text-xl font-bold text-white">Contato fictício</h2><p>Para dúvidas, envie uma mensagem para contato@harmonic.example.</p></section>
        </div>
      </article>
    </main>
  );
}
