import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, readBody, send } from '../../lib/http.js';
import { getUserFromRequest } from '../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const user = await getUserFromRequest(req);
    const { id } = req.query;
    if (req.method === 'GET') {
      const { data, error } = await supabaseAdmin.from('playlists').select('*, playlist_tracks(*, tracks(*, artists(name)))').eq('id', id).single();
      if (error) throw error;
      return send(res, 200, { playlist: data });
    }
    if (req.method === 'PUT') {
      const body = await readBody(req);
      const { data, error } = await supabaseAdmin.from('playlists').update({ name: body.name, description: body.description, is_public: body.is_public, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', user.id).select('*').single();
      if (error) throw error;
      return send(res, 200, { playlist: data });
    }
    if (req.method === 'DELETE') {
      const { error } = await supabaseAdmin.from('playlists').delete().eq('id', id).eq('user_id', user.id);
      if (error) throw error;
      return send(res, 200, { message: 'Playlist deletada.' });
    }
    return send(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return send(res, 400, { error: error.message });
  }
}
