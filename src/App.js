import { BrowserRouter, Routes, Route  } from "react-router-dom";
import AOS from 'aos';
import './App.css';
import 'aos/dist/aos.css';
import Home from './pages/common/Home';
import CompanyLogin from "./pages/company/login";
import AdminLogin from "./pages/admin/login";
import SuperAdminLogin from "./pages/superadmin/login";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company" element={<CompanyLogin/>} />
      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="/superadmin" element={<SuperAdminLogin/>} />
    </Routes>
</BrowserRouter > 
}

export default App;
