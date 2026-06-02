import { supabaseAnon } from '../../lib/supabase.js';
import { cors, readBody, send } from '../../lib/http.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'Método não permitido.' });
  try {
    const { email, password } = await readBody(req);
    if (!email || !password) return send(res, 400, { error: 'E-mail e senha são obrigatórios.' });
    const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return send(res, 200, { user: data.user, session: data.session });
  } catch (error) {
    return send(res, 401, { error: error.message });
  }
}
