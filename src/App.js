import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import AOS from 'aos';
import './App.css';
import 'aos/dist/aos.css';
import Home from './pages/common/Home';
import CompanyLogin from "./pages/company/login";
import AdminLogin from "./pages/admin/login";
import SuperAdminLogin from "./pages/superadmin/login";
import UserRegistration from "./pages/common/UserRegistration";
import UserLogin from "./pages/common/UserLogin";
import UserProfile from "./pages/common/UserProfile";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!token ? <UserLogin /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <UserRegistration /> : <Navigate to="/" />} />
      <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/" />} />

      <Route path="/company" element={<CompanyLogin/>} />
      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="/superadmin" element={<SuperAdminLogin/>} />
    </Routes>
</BrowserRouter> 
}

export default App;
