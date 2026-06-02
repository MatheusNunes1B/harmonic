import { supabaseAnon } from '../../lib/supabase.js';
import { cors, send } from '../../lib/http.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'Método não permitido.' });
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (token) await supabaseAnon.auth.signOut();
  return send(res, 200, { message: 'Logout realizado.' });
}
