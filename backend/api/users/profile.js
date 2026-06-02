import { supabaseAdmin } from '../../lib/supabase.js';
import { cors, readBody, send } from '../../lib/http.js';
import { getUserFromRequest, ensureProfile } from '../../middleware/auth.js';

export default async function handler(req, res) {
  if (cors(req, res)) return;
  try {
    const user = await getUserFromRequest(req);
    if (req.method === 'GET') {
      await ensureProfile(user);
      const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', user.id).single();
      if (error) throw error;
      return send(res, 200, { profile: data });
    }
    if (req.method === 'PUT') {
      const body = await readBody(req);
      const { data, error } = await supabaseAdmin.from('profiles').update({ name: body.name, bio: body.bio, avatar_url: body.avatar_url, updated_at: new Date().toISOString() }).eq('id', user.id).select('*').single();
      if (error) throw error;
      return send(res, 200, { profile: data });
    }
    return send(res, 405, { error: 'Método não permitido.' });
  } catch (error) {
    return send(res, 401, { error: error.message });
  }
}
