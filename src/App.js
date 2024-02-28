import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//common
import Home from './pages/common/Home';
import UserRegistration from "./pages/common/UserRegistration";
import UserLogin from "./pages/common/UserLogin";
import UserProfile from "./pages/common/UserProfile";
import Aboutus from "./pages/common/Aboutus";
import Services from "./pages/common/Services";
import Terms from "./pages/common/Terms";
import Privacy from "./pages/common/Privacy";


//company
import CompanyHome from "./pages/company/Home";
import CompanyProfile from "./pages/company/CompanyProfile";
import Postajob from "./pages/company/jobs/Postajob";

import Jobqueuelist from "./pages/admin/joblist/Jobqueuelist";
import ViewProfile from "./pages/common/ViewProfile";









function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/services" element={<Services />} />
      <Route path="/terms-conditions" element={<Terms />} />
      <Route path="/privacy-policy" element={<Privacy />} />

      <Route path="/login" element={!token ? <UserLogin /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <UserRegistration /> : <Navigate to="/" />} />
      <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/" />} />
      <Route path="/viewprofile" element={token ? <ViewProfile /> : <Navigate to="/" />} />

      <Route path="/company" element={(token && role == 'employer') ? <CompanyHome /> : <Navigate to="/" />} />
      <Route path="/company/profile" element={(token && role == 'employer') ? <CompanyProfile /> : <Navigate to="/" />} />
      <Route path="/company/postajob" element={(token && role == 'employer') ? <Postajob /> : <Postajob />} />

      <Route path="/admin/Jobqueuelist" element={(token && role == 'employer') ? <Jobqueuelist /> : <Jobqueuelist />} />


    </Routes>
  </BrowserRouter>
}

export default App;
