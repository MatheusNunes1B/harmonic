export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('harmonic_token');
}

export function saveSession(session) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('harmonic_token', session.access_token);
  localStorage.setItem('harmonic_user', JSON.stringify(session.user || {}));
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('harmonic_token');
  localStorage.removeItem('harmonic_user');
  window.location.href = '/login/';
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('harmonic_user'));
  } catch {
    return null;
  }
}
