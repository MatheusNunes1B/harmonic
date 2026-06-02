import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, send } from '../../lib/http.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  if (req.method !== 'GET') return send(res, 405, { error: 'Método não permitido.' });
  const { data, error } = await supabaseAdmin.from('tracks').select('*, artists(name), albums(title)').order('created_at', { ascending: false });
  if (error) return send(res, 400, { error: error.message });
  return send(res, 200, { tracks: data });
}
