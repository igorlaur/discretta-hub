import { useEffect, useState } from 'react';

type Perfil = {
  id: number;
  name: string;
  email: string;
  role: string;
  foto?: string;
  data_entrada?: string;
  supervisor?: string;
};

export default function MeuPerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPerfil() {
      setLoading(true);
      setError('');
      try {
        // Busca o perfil do usuário logado (ajustar endpoint depois se necessário)
        const userId = localStorage.getItem('userId');
        const res = await fetch(`http://localhost:3001/users`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao buscar perfil.');
        // Simples: pega o usuário logado pelo id salvo no localStorage
        const user = data.find((u: any) => String(u.id) === String(userId));
        setPerfil(user);
      } catch (err) {
        setError('Erro ao buscar perfil.');
      }
      setLoading(false);
    }
    fetchPerfil();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!perfil) return <div>Perfil não encontrado.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h2>Meu Perfil</h2>
      {/* Foto (opcional) */}
      {perfil.foto && (
        <img src={perfil.foto} alt="Foto do perfil" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
      )}
      <div><b>Nome:</b> {perfil.name}</div>
      <div><b>Email:</b> {perfil.email}</div>
      <div><b>Cargo:</b> {perfil.role}</div>
      {/* Data de entrada e supervisor não existem ainda no banco, mas já deixo o campo */}
      <div><b>Data de entrada:</b> {perfil.data_entrada || '-'}</div>
      <div><b>Supervisor:</b> {perfil.supervisor || '-'}</div>
    </div>
  );
}
