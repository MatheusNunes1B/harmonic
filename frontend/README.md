# Harmonic Front-end

Aplicativo Next.js em JavaScript com Tailwind CSS, PWA, tema escuro, landing page, autenticação, telas internas, player fixo e export estático para Cloudflare Pages.

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Deploy Cloudflare Pages

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `out`

## Variáveis

Copie `.env.example` para `.env.local` em desenvolvimento e configure:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
NEXT_PUBLIC_API_URL=https://seu-backend.vercel.app
```

## PWA

Arquivos em `public/`:

- `manifest.json`
- `sw.js`
- `logo/logo.svg`
- `logo/logo-192x192.png`
- `logo/logo-512x512.png`
