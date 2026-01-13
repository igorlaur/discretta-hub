
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm';
import HomeColaborador from './pages/HomeColaborador';
import MeuPerfil from './pages/MeuPerfil';

export default function App() {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <HomeColaborador />
          </MainLayout>
        }
      />
      {/* Removido rota de gibi/minha-funcao */}
      <Route
        path="/perfil"
        element={
          <MainLayout>
            <MeuPerfil />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
            <p className="mt-4 text-center text-sm text-gray-500">
              Não tem conta?{' '}
              <a href="/" className="text-pink-600 hover:underline font-semibold">Criar conta</a>
            </p>
          </AuthLayout>
        }
      />
      <Route
        path="/"
        element={
          <AuthLayout>
            {showRegister ? (
              <>
                <RegisterForm />
                <p className="mt-4 text-center text-sm text-gray-500">
                  Já tem conta?{' '}
                  <button className="text-pink-600 hover:underline font-semibold" onClick={() => setShowRegister(false)}>
                    Entrar
                  </button>
                </p>
              </>
            ) : (
              <>
                <Login />
                <p className="mt-4 text-center text-sm text-gray-500">
                  Não tem conta?{' '}
                  <button className="text-pink-600 hover:underline font-semibold" onClick={() => setShowRegister(true)}>
                    Criar conta
                  </button>
                </p>
              </>
            )}
          </AuthLayout>
        }
      />
    </Routes>
  );
}
