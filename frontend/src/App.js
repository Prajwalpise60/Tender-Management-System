import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import TenderForm from './components/TenderForm';
import ReportPage from './components/ReportPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />             
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tender" element={<TenderForm />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="*" element={<Dashboard />} />              
      </Routes>
    </BrowserRouter>
  );
}

export default App;
