
import React, { useState } from 'react';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        return;
      }
      setMessage('Cadastro realizado! Aguarde aprovação do gestor.');
    } catch (err) {
      setMessage('Erro de conexão com o servidor.');
    }
  }

  return (
    <form onSubmit={handleRegister} className="w-full flex flex-col gap-6">
      <input
        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
        placeholder="Nome"
        required
        autoComplete="name"
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
      />
      <input
        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
        placeholder="Email"
        type="email"
        required
        autoComplete="email"
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
      />
      <input
        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400"
        placeholder="Senha"
        type="password"
        required
        autoComplete="current-password"
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
      />
      <select
        className="px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
        onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
      >
        <option value="">Selecione o cargo</option>
        <option value="ADMIN">Administrador</option>
        <option value="GESTOR">Gestor</option>
        <option value="VENDEDORA">Vendedora</option>
        <option value="ANALISTA_ECOMMERCE">Analista E-commerce</option>
        <option value="EMPACOTADOR">Empacotador</option>
      </select>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg shadow-lg transition"
      >
        Cadastrar
      </button>
      {message && <div className="text-center text-sm text-red-500 mt-2">{message}</div>}
    </form>
  );
}
