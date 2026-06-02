import { supabaseAnon, supabaseAdmin } from '../../lib/supabase.js';
import { cors, readBody, send } from '../../lib/http.js';
import { ensureProfile } from '../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'Método não permitido.' });
  try {
    const { name, email, password, terms } = await readBody(req);
    if (!name || !email || !password) return send(res, 400, { error: 'Nome, e-mail e senha são obrigatórios.' });
    if (!terms) return send(res, 400, { error: 'Aceite dos termos é obrigatório.' });
    const { data, error } = await supabaseAnon.auth.signUp({ email, password, options: { data: { name } } });
    if (error) throw error;
    if (data.user) {
      await ensureProfile(data.user, name);
      await supabaseAdmin.from('terms_acceptances').insert({ user_id: data.user.id, version: '2026-06-02', accepted_at: new Date().toISOString() });
    }
    return send(res, 201, { user: data.user, session: data.session });
  } catch (error) {
    return send(res, 400, { error: error.message });
  }
}
