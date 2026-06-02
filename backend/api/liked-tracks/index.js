import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, readBody, send } from '../../lib/http.js';
import { getUserFromRequest } from '../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const user = await getUserFromRequest(req);
    if (req.method === 'GET') {
      const { data, error } = await supabaseAdmin.from('liked_tracks').select('*, tracks(*, artists(name))').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      return send(res, 200, { liked_tracks: data });
    }
    if (req.method === 'POST') {
      const body = await readBody(req);
      const { data, error } = await supabaseAdmin.from('liked_tracks').upsert({ user_id: user.id, track_id: body.track_id }, { onConflict: 'user_id,track_id' }).select('*').single();
      if (error) throw error;
      return send(res, 201, { liked_track: data });
    }
    if (req.method === 'DELETE') {
      const { track_id } = req.query;
      const { error } = await supabaseAdmin.from('liked_tracks').delete().eq('user_id', user.id).eq('track_id', track_id);
      if (error) throw error;
      return send(res, 200, { message: 'Música descurtida.' });
    }
    return send(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return send(res, 400, { error: error.message });
  }
}
