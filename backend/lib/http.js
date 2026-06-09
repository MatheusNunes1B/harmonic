const ALLOWED_ORIGINS = [
  'https://harmonic-coo.pages.dev',
  'https://harmonic-pearl.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
];

// Aceita qualquer preview do Cloudflare Pages automaticamente
const ALLOWED_PATTERNS = [
  /^https:\/\/[a-z0-9]+\.harmonic-coo\.pages\.dev$/,
];

export function send(res, status, body) {
  res.status(status).json(body);
}

export function cors(req, res) {
  const origin = req.headers.origin || '';

  const allowed =
    ALLOWED_ORIGINS.includes(origin) ||
    ALLOWED_PATTERNS.some((pattern) => pattern.test(origin));

  const allowedOrigin = allowed
    ? origin
    : (process.env.FRONTEND_URL || '');

  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

export async function readBody(req) {
  if (req.body) return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data ? JSON.parse(data) : {}));
    req.on('error', reject);
  });
}