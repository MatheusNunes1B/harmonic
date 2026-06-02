# Harmonic

Harmonic é um protótipo completo de aplicativo PWA de música, inspirado em experiências modernas de streaming, com identidade própria, tema escuro, playlists, biblioteca, busca, player fixo, autenticação e integração com Supabase.

## Tecnologias usadas

- Front-end: Next.js, JavaScript, React, Tailwind CSS e PWA
- Back-end: Node.js em funções serverless da Vercel
- Banco/autenticação: Supabase Auth e PostgreSQL
- Deploy front-end: Cloudflare Pages
- Deploy back-end: Vercel
- Repositório único: GitHub, com `/frontend` e `/backend` separados

## Estrutura de pastas

```txt
frontend/   Aplicativo Next.js exportável para Cloudflare Pages
backend/    API Node.js serverless para Vercel
database/   SQL completo do Supabase
```

## Configurar Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor.
3. Copie e execute `database/supabase.sql`.
4. Em Authentication, habilite login por e-mail/senha.
5. Copie `Project URL`, `anon key` e `service_role key`.

## Variáveis de ambiente

Front-end (`frontend/.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
```

Back-end (`backend/.env` ou painel da Vercel):

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
FRONTEND_URL=https://harmonic.pages.dev
```

Nunca coloque chaves reais em commits.

## Rodar localmente

Front-end:

```bash
cd frontend
npm install
npm run dev
```

Back-end:

```bash
cd backend
npm install
npx vercel dev
```

## Deploy do back-end na Vercel

1. Importe o repositório na Vercel.
2. Configure Root Directory como `backend`.
3. Configure as variáveis `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` e `FRONTEND_URL`.
4. Publique.
5. Use a URL final em `NEXT_PUBLIC_API_URL` do front-end.

## Deploy do front-end na Cloudflare Pages

1. Importe o repositório na Cloudflare Pages.
2. Configure Root Directory como `frontend`.
3. Build command: `npm run build`.
4. Output directory: `out`.
5. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` e `NEXT_PUBLIC_API_URL`.
6. Publique.

O `next.config.js` usa `output: 'export'`, compatível com export estático para Cloudflare Pages.

## Conectar front com back

- Publique o backend na Vercel.
- Coloque a URL da Vercel em `NEXT_PUBLIC_API_URL`.
- Coloque a URL da Cloudflare em `FRONTEND_URL` no backend.

## Testar funcionalidades

1. Execute o SQL do Supabase.
2. Configure variáveis de ambiente.
3. Abra `/cadastro` e crie uma conta aceitando os termos.
4. Faça login em `/login`.
5. Acesse `/app`, `/biblioteca`, `/playlists`, `/busca`, `/perfil` e `/tocando`.
6. Teste chamadas autenticadas com token salvo no navegador.
7. Verifique playlists, curtidas e perfil pelo painel do Supabase.

## Possíveis erros e soluções

- `Configure NEXT_PUBLIC_API_URL`: defina a variável do front-end.
- `Token não informado`: faça login antes de acessar rotas privadas.
- CORS bloqueado: ajuste `FRONTEND_URL` no backend para a URL da Cloudflare Pages.
- Cadastro sem sessão: confirme o e-mail se a confirmação estiver habilitada no Supabase.
- Erro no SQL de políticas existentes: remova políticas duplicadas ou execute em projeto limpo.

## Observações

- As músicas, artistas e playlists são fictícios.
- Não há URLs finais dependentes de ambiente local nos arquivos de produção.
- A separação `/frontend` e `/backend` foi mantida.
