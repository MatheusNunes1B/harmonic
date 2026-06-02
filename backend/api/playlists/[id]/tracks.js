import { supabaseAdmin } from '../../../lib/supabase.js';
import { cors, readBody, send } from '../../../lib/http.js';
import { getUserFromRequest } from '../../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    await getUserFromRequest(req);
    const { id, track_id } = req.query;
    if (req.method === 'POST') {
      const body = await readBody(req);
      const { data, error } = await supabaseAdmin.from('playlist_tracks').insert({ playlist_id: id, track_id: body.track_id }).select('*').single();
      if (error) throw error;
      return send(res, 201, { playlist_track: data });
    }
    if (req.method === 'DELETE') {
      const { error } = await supabaseAdmin.from('playlist_tracks').delete().eq('playlist_id', id).eq('track_id', track_id);
      if (error) throw error;
      return send(res, 200, { message: 'Música removida da playlist.' });
    }
    return send(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return send(res, 400, { error: error.message });
  }
}
