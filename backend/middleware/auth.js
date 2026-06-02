import { supabaseAdmin, supabaseAnon } from '../lib/supabase.js';

export async function getUserFromRequest(req) {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '').trim();
  if (!token) throw new Error('Token não informado.');
  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) throw new Error('Sessão inválida.');
  return data.user;
}

export async function ensureProfile(user, name) {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert({ id: user.id, name: name || user.user_metadata?.name || user.email, email: user.email }, { onConflict: 'id' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}
