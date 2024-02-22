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

import Jobqueuelist from "./pages/admin/joblist/Jobqueuelist";
import ViewProfile from "./pages/common/ViewProfile";
import Categories1 from "./pages/superadmin/categories/Categories1";
import Categorieslist1 from"./pages/superadmin/categories/Categorieslist1"
import List from "./pages/superadmin/adimin-management/List";





function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!token ? <UserLogin /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <UserRegistration /> : <Navigate to="/" />} />
      <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/" />} />
      <Route path="/viewprofile" element={token ? <ViewProfile /> : <Navigate to="/" />} />

      <Route path="/company" element={(token && role == 'employer') ? <CompanyHome/> : <Navigate to="/" />} />
      <Route path="/company/profile" element={(token && role == 'employer') ? <CompanyProfile/>  : <Navigate to="/" />} /> 
      <Route path="/company/postajob" element={(token && role == 'employer') ? <Postajob/>  : <Postajob/>} /> 

      <Route path="/admin/Jobqueuelist" element={(token && role == 'employer') ? <Jobqueuelist/>  : <Jobqueuelist/>} /> 
      
      
      <Route path="/superadmin/Categories1" element={(token && role == 'employer') ? <Categories1/>  : <Categories1/>} />

       <Route path="/superadmin/Categorieslist1" element={(token && role == 'employer') ? <Categorieslist1/>  : <Categorieslist1/>} />  


      <Route path="/superadmin/list" element={(token && role == 'employer') ? <List/>  : <List/>} /> 



    </Routes>
</BrowserRouter> 
}

export default App;
