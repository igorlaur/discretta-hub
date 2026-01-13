
import { useEffect, useState } from 'react';

export default function AdminApprove() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchPending() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao buscar usuários.');
      setPending((data || []).filter((u: any) => !u.approved));
    } catch (err) {
      setError('Erro ao buscar usuários.');
    }
    setLoading(false);
  }

  useEffect(() => { fetchPending(); }, []);

  async function approveUser(id: any) {
    setError('');
    try {
      const res = await fetch('http://localhost:3001/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approved: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao aprovar usuário.');
      setPending(pending.filter((u: any) => u.id !== id));
    } catch (err) {
      setError('Erro ao aprovar usuário.');
    }
  }

  async function rejectUser(id: any) {
    setError('');
    try {
      const res = await fetch('http://localhost:3001/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approved: false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao recusar usuário.');
      setPending(pending.filter((u: any) => u.id !== id));
    } catch (err) {
      setError('Erro ao recusar usuário.');
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Colaboradores pendentes</h2>
      {loading && <div>Carregando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {pending.length === 0 && !loading && <div>Nenhum colaborador pendente.</div>}
      {pending.map((user: any) => (
        <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
          <span>{user.name} - {user.role}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => approveUser(user.id)} style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: 4, padding: '4px 12px', marginLeft: 8, cursor: 'pointer' }}>Aprovar</button>
            <button onClick={() => rejectUser(user.id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>Recusar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
