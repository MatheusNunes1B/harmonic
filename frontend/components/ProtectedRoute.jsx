'use client';

import { useEffect, useState } from 'react';
import { getToken } from '../lib/auth';
import Loading from './Loading';

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      window.location.href = '/login/';
      return;
    }
    setAllowed(true);
  }, []);

  if (!allowed) return <Loading label="Verificando sessão" />;
  return children;
}
