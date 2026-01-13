
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || (data.errors && data.errors[0]?.msg) || 'Usuário ou senha inválidos.');
        return;
      }
      // Salva id e dados do usuário logado no localStorage
      if (data.user) {
        localStorage.setItem('userId', String(data.user.id));
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      // Verifica aprovação
      if (data.user && data.user.role) {
        if (data.user.role === 'ADMIN' || data.user.role === 'GESTOR') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setMessage('Erro de conexão com o servidor.');
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-full flex flex-col gap-6"
      style={{ maxWidth: 400, margin: '0 auto' }}
    >
      <input
        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition placeholder-gray-400"
        placeholder="Email"
        type="email"
        required
        autoComplete="email"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f: any) => ({ ...f, email: e.target.value }))}
      />
      <div className="h-0.5 bg-gray-200 rounded-full" />
      <input
        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition placeholder-gray-400"
        placeholder="Senha"
        type="password"
        required
        autoComplete="current-password"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f: any) => ({ ...f, password: e.target.value }))}
      />
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg shadow-lg transition"
      >
        Entrar
      </button>
      {message && <div className="text-center text-sm text-red-500 mt-2">{message}</div>}
    </form>
  );
}
