// @ts-ignore
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Início', to: '/dashboard' },
  { label: 'Meu Perfil', to: '/perfil' },
  { label: 'Procedimentos', to: '/procedimentos' },
  { label: 'Comunicados', to: '/comunicados' },
  { label: 'Treinamentos', to: '/treinamentos' },
  { label: 'Presença', to: '/presenca' },
  { label: 'Feedback', to: '/feedback' },
];

const cards = [
  {
    title: 'Meu Perfil',
    desc: 'Veja e atualize seus dados pessoais.',
    icon: (
      <svg className="w-8 h-8 text-pink-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a8.963 8.963 0 01-6.879-3.196z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
    to: '/perfil',
  },
  {
    title: 'Holerites',
    desc: 'Consulte e baixe seus holerites mensais.',
    icon: (
      <svg className="w-8 h-8 text-blue-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m-4-5v9" /></svg>
    ),
    to: '/holerites',
    disabled: true,
  },
  {
    title: 'Minha Função',
    desc: 'Veja detalhes sobre seu cargo e responsabilidades.',
    icon: (
      <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
    ),
    to: '/minha-funcao',
  },
  {
    title: 'Guia da Empresa',
    desc: 'Entenda como cada área funciona e se conecta.',
    icon: (
      <svg className="w-8 h-8 text-yellow-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4" /></svg>
    ),
    to: '/guia-empresa',
  },
  {
    title: 'Procedimentos',
    desc: 'Consulte os procedimentos oficiais da empresa.',
    icon: (
      <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    to: '/procedimentos',
    disabled: true,
  },
  {
    title: 'Comunicados',
    desc: 'Fique por dentro dos avisos e novidades.',
    icon: (
      <svg className="w-8 h-8 text-yellow-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    to: '/comunicados',
    disabled: true,
  },
  {
    title: 'Treinamentos',
    desc: 'Participe dos treinamentos e acompanhe seu progresso.',
    icon: (
      <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 2.485-2.239 4.5-5 4.5s-5-2.015-5-4.5c0-.638.12-1.247.34-1.822L12 14z" /></svg>
    ),
    to: '/treinamentos',
    disabled: true,
  },
  {
    title: 'Presença',
    desc: 'Registre seu ponto e acompanhe seu histórico.',
    icon: (
      <svg className="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 19a7 7 0 100-14 7 7 0 000 14z" /></svg>
    ),
    to: '/presenca',
  },
  {
    title: 'Feedback',
    desc: 'Envie sugestões ou dúvidas para a gestão.',
    icon: (
      <svg className="w-8 h-8 text-red-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 3h-6a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" /></svg>
    ),
    to: '/feedback',
    disabled: true,
  },
];

export default function HomeColaborador({ navOnly = false }: { navOnly?: boolean }) {
  // Busca usuário logado do localStorage (ajuste para contexto global se necessário)
  let user = { name: 'Colaborador', email: 'colaborador@empresa.com' };
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const parsed = JSON.parse(userStr);
      if (parsed && parsed.name && parsed.email) {
        user = { name: parsed.name, email: parsed.email };
      }
    }
  } catch {}
  const [navOpen, setNavOpen] = useState(false);

    if (navOnly) {
      return (
        <header className="w-full sticky top-0 z-40 shadow-lg bg-gradient-to-r from-pink-50 via-white to-pink-50">
          <nav className="w-full flex items-center justify-between px-4 md:px-8 lg:px-12 py-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-pink-600 tracking-tight drop-shadow">Discretta</span>
            </div>
            <div className="hidden lg:flex flex-1 justify-center gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative text-gray-700 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:bg-pink-100 hover:text-pink-700 focus:bg-pink-200 focus:text-pink-800"
                  style={{ boxShadow: '0 1px 8px 0 rgba(233,30,99,0.04)' }}
                >
                  {link.label}
                  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-pink-500 rounded transition-all duration-300 group-hover:w-3/4 group-hover:h-1" />
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-3 ml-4">
              <div className="w-9 h-9 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-lg shadow-inner">
                {user.name[0]}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-gray-700 font-semibold leading-tight">{user.name}</span>
                <span className="text-gray-400 text-xs">{user.email}</span>
              </div>
            </div>
            <button className="lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500" onClick={() => setNavOpen((prev: boolean) => !prev)} aria-label="Abrir menu">
              <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
          {navOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setNavOpen(false)} />
              <div className="fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white border-r shadow-lg z-50 px-6 py-8 animate-fade-in-down flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-extrabold text-pink-600 tracking-tight drop-shadow">Discretta</span>
                  <button className="ml-auto p-2" onClick={() => setNavOpen(false)} aria-label="Fechar menu">
                    <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} className="text-gray-700 hover:text-pink-600 font-semibold px-2 py-4 rounded text-lg transition-all duration-200" onClick={() => setNavOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 font-bold text-xl shadow-inner">
                    {user.name[0]}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-gray-700 font-semibold leading-tight">{user.name}</span>
                    <span className="text-gray-400 text-xs">{user.email}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </header>
      );
    }
    return (
      <main className="flex-1 container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Dashboard</h2>
        <p className="mb-8 text-lg text-gray-600">Bem-vindo! Acesse rapidamente os principais recursos da empresa.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            card.disabled ? (
              <div key={card.title} className="bg-gray-100 rounded-xl shadow flex flex-col items-center p-6 border border-gray-200 opacity-60 cursor-not-allowed">
                {card.icon}
                <h3 className="text-lg font-bold mb-1 text-gray-400">{card.title}</h3>
                <p className="text-gray-400 text-sm text-center">(Em breve)</p>
              </div>
            ) : (
              <Link key={card.title} to={card.to} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-6 group border border-gray-100">
                {card.icon}
                <h3 className="text-lg font-bold mb-1 group-hover:text-pink-600 transition">{card.title}</h3>
                <p className="text-gray-500 text-sm text-center">{card.desc}</p>
              </Link>
            )
          ))}
        </div>
      </main>
    );
}
