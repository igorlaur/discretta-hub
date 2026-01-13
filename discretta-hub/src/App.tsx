
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MinhaFuncao from './pages/MinhaFuncao';
import './App.css';


function App() {
  return (
    <Router>
      <nav style={{ padding: 16 }}>
        <Link to="/">Início</Link> |{' '}
        <Link to="/minha-funcao">Minha Função (Gibi)</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <h1>Bem-vindo ao Discretta Hub!</h1>
            <p>Escolha uma opção no menu.</p>
          </div>
        } />
        <Route path="/minha-funcao" element={<MinhaFuncao />} />
      </Routes>
    </Router>
  );
}

export default App
