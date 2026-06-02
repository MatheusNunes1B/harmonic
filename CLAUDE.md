# CLAUDE.md

## O que foi criado

Foi criado o projeto Harmonic, um protótipo completo de PWA musical com front-end Next.js, back-end Node.js para Vercel, banco Supabase e documentação de deploy.

## Decisões técnicas

- JavaScript foi usado em todo o projeto, sem TypeScript.
- O front-end e o back-end ficam no mesmo repositório, mas separados em `/frontend` e `/backend`.
- O front-end usa export estático (`output: 'export'`) para publicar na Cloudflare Pages.
- O back-end usa funções serverless da Vercel e Supabase como autenticação/banco.
- Não foram usadas marcas, logos, textos ou músicas protegidas de terceiros.

## Organização do front-end

- `app/`: páginas do Next.js, incluindo landing, login, cadastro, termos, app, biblioteca, playlists, busca, perfil, tocando e 404.
- `components/`: componentes reutilizáveis como Header, Sidebar, MobileNav, MusicCard, PlaylistCard, Player, AuthForm, ProtectedRoute, SearchBar e Loading.
- `lib/`: cliente de API, Supabase client, helpers de autenticação e dados mockados.
- `public/`: manifesto PWA, service worker e logo.
- `styles/`: Tailwind CSS global.

## Organização do back-end

- `api/`: rotas serverless para auth, usuários, tracks, playlists, liked tracks e termos.
- `lib/`: clientes Supabase e helpers HTTP/CORS.
- `middleware/`: autenticação via bearer token Supabase.
- `vercel.json`: configuração de deploy e headers CORS.

## Supabase

O arquivo `database/supabase.sql` cria:

- `profiles`
- `artists`
- `albums`
- `tracks`
- `playlists`
- `playlist_tracks`
- `liked_tracks`
- `terms_acceptances`

Também inclui UUIDs, foreign keys, `created_at`, `updated_at`, triggers, índices, RLS, políticas e dados fictícios iniciais.

## Deploy

Back-end na Vercel:

- Root directory: `backend`
- Configure variáveis do Supabase e `FRONTEND_URL`.

Front-end na Cloudflare Pages:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `out`
- Configure variáveis públicas do Supabase e API.

## Melhorias futuras

- Trocar placeholders de áudio por arquivos licenciados ou próprios.
- Adicionar testes automatizados.
- Adicionar upload de avatar/capas com Supabase Storage.
- Melhorar player com elemento `<audio>` real e fila de reprodução.
- Adicionar refresh token e fluxo completo de recuperação de senha.
