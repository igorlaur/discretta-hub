
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import RegisterForm from './pages/RegisterForm';
import AdminApprove from './pages/AdminApprove';
import Dashboard from './pages/Dashboard';
import HomeColaborador from './pages/HomeColaborador';
import MeuPerfil from './pages/MeuPerfil';
import MinhaFuncao from './pages/MinhaFuncao';

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
      <Route
        path="/minha-funcao"
        element={
          <MainLayout>
            <MinhaFuncao />
          </MainLayout>
        }
      />
      <Route
        path="/perfil"
        element={
          <MainLayout>
            <MeuPerfil />
          </MainLayout>
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
