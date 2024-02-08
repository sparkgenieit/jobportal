import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//common
import Home from './pages/common/Home';
import UserRegistration from "./pages/common/UserRegistration";
import UserLogin from "./pages/common/UserLogin";
import UserProfile from "./pages/common/UserProfile";


//company
import CompanyHome from "./pages/company/Home";
import CompanyProfile from "./pages/company/CompanyProfile";
import Postajob from "./pages/company/jobs/Postajob";





function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!token ? <UserLogin /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <UserRegistration /> : <Navigate to="/" />} />
      <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/" />} />

      <Route path="/company" element={(token && role == 'employer') ? <CompanyHome/> : <Navigate to="/" />} />
      <Route path="/company/profile" element={(token && role == 'employer') ? <CompanyProfile/>  : <CompanyProfile />} /> 
      <Route path="/company/jobs/add" element={(token && role == 'employer') ? <Postajob/>  : <Postajob />} /> 


    </Routes>
</BrowserRouter> 
}

export default App;
