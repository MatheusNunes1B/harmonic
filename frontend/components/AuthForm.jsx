'use client';

import Link from 'next/link';
import { useState } from 'react';
import { api } from '../lib/api';
import { saveSession } from '../lib/auth';

export default function AuthForm({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', terms: false });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    if (!form.email || !form.password || (isRegister && !form.name)) return setStatus({ type: 'error', message: 'Preencha todos os campos obrigatórios.' });
    if (isRegister && form.password !== form.confirmPassword) return setStatus({ type: 'error', message: 'As senhas não conferem.' });
    if (isRegister && !form.terms) return setStatus({ type: 'error', message: 'Você precisa aceitar os termos de uso.' });
    setLoading(true);
    try {
      const data = isRegister ? await api.register(form) : await api.login({ email: form.email, password: form.password });
      if (data.session) saveSession(data.session);
      setStatus({ type: 'success', message: isRegister ? 'Cadastro criado com sucesso.' : 'Login realizado com sucesso.' });
      window.location.href = '/app/';
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md rounded-[2rem] bg-harmonic-panel p-6 shadow-glow">
      <h1 className="text-3xl font-black">{isRegister ? 'Criar conta' : 'Entrar'}</h1>
      <p className="mt-2 text-sm text-harmonic-muted">{isRegister ? 'Comece sua biblioteca Harmonic.' : 'Volte para suas playlists.'}</p>
      <div className="mt-6 space-y-4">
        {isRegister && <input value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-harmonic-lime" placeholder="Nome" />}
        <input value={form.email} onChange={(e) => update('email', e.target.value)} type="email" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-harmonic-lime" placeholder="E-mail" />
        <input value={form.password} onChange={(e) => update('password', e.target.value)} type="password" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-harmonic-lime" placeholder="Senha" />
        {isRegister && <input value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} type="password" className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-harmonic-lime" placeholder="Confirmar senha" />}
        {isRegister && (
          <label className="flex items-start gap-3 text-sm text-harmonic-muted">
            <input checked={form.terms} onChange={(e) => update('terms', e.target.checked)} type="checkbox" className="mt-1" />
            <span>Li e aceito os <Link href="/termos/" className="text-harmonic-lime underline">termos de uso</Link>.</span>
          </label>
        )}
      </div>
      {status.message && <p className={`mt-4 rounded-2xl p-3 text-sm ${status.type === 'error' ? 'bg-red-500/15 text-red-200' : 'bg-green-500/15 text-green-200'}`}>{status.message}</p>}
      <button disabled={loading} className="mt-6 w-full rounded-2xl bg-harmonic-lime px-5 py-3 font-black text-black transition hover:scale-[1.02] disabled:opacity-60">{loading ? 'Processando...' : isRegister ? 'Cadastrar' : 'Entrar'}</button>
      <p className="mt-5 text-center text-sm text-harmonic-muted">
        {isRegister ? 'Já tem conta?' : 'Ainda não tem conta?'} <Link className="text-harmonic-lime" href={isRegister ? '/login/' : '/cadastro/'}>{isRegister ? 'Entrar' : 'Cadastrar'}</Link>
      </p>
    </form>
  );
}
