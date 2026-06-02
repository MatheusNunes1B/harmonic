const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path, options = {}) {
  if (!API_URL) throw new Error('Configure NEXT_PUBLIC_API_URL no ambiente do front-end.');
  const token = typeof window !== 'undefined' ? localStorage.getItem('harmonic_token') : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Erro inesperado na API.');
  return data;
}

export const api = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  profile: () => request('/api/users/profile'),
  updateProfile: (payload) => request('/api/users/profile', { method: 'PUT', body: JSON.stringify(payload) }),
  tracks: () => request('/api/tracks'),
  playlists: () => request('/api/playlists'),
  createPlaylist: (payload) => request('/api/playlists', { method: 'POST', body: JSON.stringify(payload) }),
  updatePlaylist: (id, payload) => request(`/api/playlists/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deletePlaylist: (id) => request(`/api/playlists/${id}`, { method: 'DELETE' }),
  addTrack: (id, track_id) => request(`/api/playlists/${id}/tracks`, { method: 'POST', body: JSON.stringify({ track_id }) }),
  removeTrack: (id, track_id) => request(`/api/playlists/${id}/tracks?track_id=${track_id}`, { method: 'DELETE' }),
  likedTracks: () => request('/api/liked-tracks'),
  likeTrack: (track_id) => request('/api/liked-tracks', { method: 'POST', body: JSON.stringify({ track_id }) }),
  unlikeTrack: (track_id) => request(`/api/liked-tracks?track_id=${track_id}`, { method: 'DELETE' }),
  acceptTerms: () => request('/api/terms/accept', { method: 'POST' })
};
