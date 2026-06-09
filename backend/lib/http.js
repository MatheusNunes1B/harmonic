const ALLOWED_ORIGINS = [
  'https://8833ae07.harmonic-coo.pages.dev',
  'https://harmonic-coo.pages.dev',
  'https://harmonic-pearl.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://harmonic-coo.pages.dev',
];

export function send(res, status, body) {
  res.status(status).json(body);
}

export function cors(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : (process.env.FRONTEND_URL || '');

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', allowed);
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