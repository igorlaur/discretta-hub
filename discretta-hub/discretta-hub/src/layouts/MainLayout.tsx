import React from 'react';
import HomeColaborador from '../pages/HomeColaborador';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50">
      {/* Navbar */}
      <HomeColaborador navOnly />
      {/* Conteúdo */}
      <main className="flex-1 container mx-auto px-4 py-10">
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-white border-t text-gray-400 py-4 text-center text-xs mt-8">
        &copy; {new Date().getFullYear()} Discretta. Todos os direitos reservados.
      </footer>
    </div>
  );
}