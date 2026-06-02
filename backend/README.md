# Harmonic Back-end

API Node.js serverless para Vercel com Supabase Auth, perfis, playlists, músicas curtidas e aceite de termos.

## Comandos

```bash
npm install
npx vercel dev
```

## Deploy Vercel

- Root directory: `backend`
- Configure as variáveis de ambiente no painel da Vercel.

## Variáveis

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
FRONTEND_URL=https://harmonic.pages.dev
```

## Rotas

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/tracks`
- `GET /api/playlists`
- `POST /api/playlists`
- `GET /api/playlists/:id`
- `PUT /api/playlists/:id`
- `DELETE /api/playlists/:id`
- `POST /api/playlists/:id/tracks`
- `DELETE /api/playlists/:id/tracks?track_id=...`
- `GET /api/liked-tracks`
- `POST /api/liked-tracks`
- `DELETE /api/liked-tracks?track_id=...`
- `POST /api/terms/accept`
