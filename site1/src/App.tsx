import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter basename="/aplicativo">
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
