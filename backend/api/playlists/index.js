import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, readBody, send } from '../../lib/http.js';
import { getUserFromRequest } from '../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const user = await getUserFromRequest(req);
    if (req.method === 'GET') {
      const { data, error } = await supabaseAdmin.from('playlists').select('*').or(`is_public.eq.true,user_id.eq.${user.id}`).order('created_at', { ascending: false });
      if (error) throw error;
      return send(res, 200, { playlists: data });
    }
    if (req.method === 'POST') {
      const body = await readBody(req);
      if (!body.name) return send(res, 400, { error: 'Nome da playlist é obrigatório.' });
      const { data, error } = await supabaseAdmin.from('playlists').insert({ user_id: user.id, name: body.name, description: body.description || '', is_public: Boolean(body.is_public) }).select('*').single();
      if (error) throw error;
      return send(res, 201, { playlist: data });
    }
    return send(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return send(res, 401, { error: error.message });
  }
}
