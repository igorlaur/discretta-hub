import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Verifica se está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border border-gray-100">
        {children}
      </div>
    </div>
  );
}
