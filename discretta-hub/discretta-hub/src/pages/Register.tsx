
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || (data.errors && data.errors[0]?.msg) || 'Erro ao cadastrar.');
        setLoading(false);
        return;
      }
      setMessage('Cadastro realizado! Aguarde aprovação do gestor.');
    } catch (err) {
      setMessage('Erro de conexão com o servidor.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
        <div className="mb-6 flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-500 tracking-tight mb-2">Discretta Hub</span>
          <span className="text-gray-400 text-sm">Intranet corporativa moderna para colaboradores</span>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Nome"
            required
            autoComplete="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f: any) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f: any) => ({ ...f, email: e.target.value }))}
          />
          <input
            className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Senha"
            type="password"
            required
            autoComplete="current-password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setForm((f: any) => ({ ...f, password: e.target.value }))}
          />
          <select
            className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setForm((f: any) => ({ ...f, role: e.target.value }))}
          >
            <option value="">Selecione o cargo</option>
            <option value="VENDEDORA">Vendedora</option>
            <option value="ANALISTA_ECOMMERCE">Analista E-commerce</option>
            <option value="EMPACOTADOR">Empacotador</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Cadastrar'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 text-center text-sm font-medium ${message.includes('Aguarde') ? 'text-green-400' : 'text-red-400'}`}>{message}</div>
        )}
      </div>
    </div>
  );
}
