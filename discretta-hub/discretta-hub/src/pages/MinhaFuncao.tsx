import { useEffect, useState } from 'react';

export default function MinhaFuncao() {
  const [user, setUser] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError('');
      try {
        const userId = localStorage.getItem('userId');
        const res = await fetch('http://localhost:3001/users');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao buscar usuário.');
        const found = data.find((u: any) => String(u.id) === String(userId));
        if (found) {
          setUser({ name: found.name || '', role: found.role || '' });
        }
      } catch (err) {
        setError('Erro ao buscar usuário.');
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-10">Carregando...</div>;
  if (error) return <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Minha Função</h2>
      <div className="mb-4">
        <span className="font-semibold">Nome:</span> {user.name}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Cargo:</span> {user.role || 'Não definido'}
      </div>
      <div className="mb-6 text-gray-700">
        {/* Explicação do cargo (exemplo) */}
        {user.role === 'VENDEDORA' && (
          <>
            <h3 className="font-bold mb-2">Vendedora</h3>
            <ul className="list-disc ml-6 mb-2">
              <li>Responsável pelo atendimento ao cliente.</li>
              <li>Realiza vendas e registra pedidos.</li>
              <li>Auxilia na organização do setor.</li>
            </ul>
          </>
        )}
        {user.role === 'ANALISTA_ECOMMERCE' && (
          <>
            <h3 className="font-bold mb-2">Analista E-commerce</h3>
            <ul className="list-disc ml-6 mb-2">
              <li>Gerencia produtos e pedidos online.</li>
              <li>Monitora desempenho de vendas digitais.</li>
              <li>Auxilia na integração de sistemas.</li>
            </ul>
          </>
        )}
        {user.role === 'EMPACOTADOR' && (
          <>
            <h3 className="font-bold mb-2">Empacotador</h3>
            <ul className="list-disc ml-6 mb-2">
              <li>Responsável pela separação e embalagem dos produtos.</li>
              <li>Confere pedidos e prepara para envio.</li>
              <li>Organiza o estoque e área de expedição.</li>
            </ul>
          </>
        )}
        {user.role === 'ADMIN' && (
          <>
            <h3 className="font-bold mb-2">Administrador</h3>
            <ul className="list-disc ml-6 mb-2">
              <li>Gerencia usuários e permissões.</li>
              <li>Define políticas e procedimentos.</li>
              <li>Supervisiona todos os módulos do sistema.</li>
            </ul>
          </>
        )}
        {user.role === 'GESTOR' && (
          <>
            <h3 className="font-bold mb-2">Gestor</h3>
            <ul className="list-disc ml-6 mb-2">
              <li>Supervisiona equipes e processos.</li>
              <li>Autoriza aprovações e comunicados.</li>
              <li>Responsável pelo desempenho operacional.</li>
            </ul>
          </>
        )}
        {!user.role && (
          <span className="text-gray-400">Função não definida.</span>
        )}
      </div>
    </div>
  );
}
