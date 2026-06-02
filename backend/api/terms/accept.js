import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, send } from '../../lib/http.js';
import { getUserFromRequest } from '../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'POST') return send(res, 405, { error: 'Método não permitido.' });
  try {
    const user = await getUserFromRequest(req);
    const { data, error } = await supabaseAdmin.from('terms_acceptances').insert({ user_id: user.id, version: '2026-06-02', accepted_at: new Date().toISOString() }).select('*').single();
    if (error) throw error;
    return send(res, 201, { acceptance: data });
  } catch (error) {
    return send(res, 400, { error: error.message });
  }
}
