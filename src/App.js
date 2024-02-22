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
import ViewProfile from "./pages/common/ViewProfile";
import Aboutwhvisa from "./pages/common/Aboutwhvisa";
import Banking from "./pages/common/Banking";
import Typesofwork from "./pages/common/Typesofwork";
import Usefullinks from "./pages/common/Usefullinks";
import Places from "./pages/common/Places";
import AboutUs from "./pages/common/AboutUs";
import Services from "./pages/common/Services";
import Termsofservice from "./pages/common/Termsofservice";
import Privacypolicy from "./pages/common/PrivacyPolicy";
import WebDesign from "./pages/common/WebDesigns";
import WebDevelopment from "./pages/common/WebDevelopment";
import ProductManagement from "./pages/common/ProductManagement";
import Marketing from "./pages/common/Marketing";
import GraphicDesign from "./pages/common/GraphicDesign";
import Tax from "./pages/common/Tax";
import News from "./pages/common/News";
import Transport from "./pages/common/Transport";
import Accommodation from "./pages/common/Accommodation";
import HolidayParks from "./pages/common/HolidayParks";
import FreedomCampaining from "./pages/common/FreedomCamping";
import Activities from "./pages/common/Activities";
import SingleJob from "./pages/common/SingleJob";

//company
import CompanyHome from "./pages/company/Home";
import CompanyProfile from "./pages/company/CompanyProfile";
import Postajob from "./pages/company/jobs/Postajob";
import JobList from "./pages/company/jobs/JobList";


//Admin

import Jobqueuelist from "./pages/admin/joblist/Jobqueuelist";
import AdminHome from "./pages/admin/Home";
import Myasignjobs from "./pages/admin/joblist/Myasignjobs";

//superAdmin

import SuperAdminHome from "./pages/superadmin/Home";
import Create from "./pages/superadmin/adimin-management/Create";
import List from "./pages/superadmin/adimin-management/List";
import AddForms from "./pages/superadmin/AddForms";
import Table from "./pages/superadmin/Table";
import CreateUser from "./pages/superadmin/user/CreateUser";
import UserList from "./pages/superadmin/user/UserList";
import Skills from "./pages/superadmin/Skills";










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
      <Route path="/company/CompanyProfile" element={(token && role == 'employer') ? <CompanyProfile/>  : <CompanyProfile />} /> 
      <Route path="/company/postajob" element={(token && role == 'employer') ? <Postajob/>  : <Postajob/>} />
      <Route path="/company/JobList" element={(token && role == 'employer') ? <JobList/>  : <JobList/>} />
      
      
      <Route path="/common/Aboutwhvisa" element={(token && role == 'employer') ? <Aboutwhvisa/>  : <Aboutwhvisa/>} />
      <Route path="/common/Banking" element={(token && role == 'employer') ? <Banking/>  : <Banking/>} /> 
      <Route path="/common/Typesofwork" element={(token && role == 'employer') ? <Typesofwork/>  : <Typesofwork/>} /> 
      <Route path="/common/Usefullinks" element={(token && role == 'employer') ? <Usefullinks/>  : <Usefullinks/>} /> 
      <Route path="/common/Places" element={(token && role == 'employer') ? <Places/>  : <Places/>} /> 
      <Route path="/common/Tax" element={(token && role == 'employer') ? <Tax/>  : <Tax/>} /> 
      <Route path="/common/News" element={(token && role == 'employer') ? <News/>  : <News/>} /> 
      <Route path="/common/Transport" element={(token && role == 'employer') ? <Transport/>  : <Transport/>} /> 
      <Route path="/common/Accommodation" element={(token && role == 'employer') ? <Accommodation/>  : <Accommodation/>} /> 
      <Route path="/common/HolidayParks" element={(token && role == 'employer') ? <HolidayParks/>  : <HolidayParks/>} /> 
      <Route path="/common/FreedomCampaining" element={(token && role == 'employer') ? <FreedomCampaining/>  : <FreedomCampaining/>} /> 
      <Route path="/common/Activities" element={(token && role == 'employer') ? <Activities/>  : <Activities/>} /> 
      
      
      
      
      
      <Route path="/common/AboutUs" element={(token && role == 'employer') ? <AboutUs/>  : <AboutUs/>} /> 
      <Route path="/common/Services" element={(token && role == 'employer') ? <Services/>  : <Services/>} /> 
      <Route path="/common/Termsofservice" element={(token && role == 'employer') ? <Termsofservice/>  : <Termsofservice/>} /> 
      <Route path="/common/Privacypolicy" element={(token && role == 'employer') ? <Privacypolicy/>  : <Privacypolicy/>} /> 
      <Route path="/common/WebDesign" element={(token && role == 'employer') ? <WebDesign/>  : <WebDesign/>} /> 
      <Route path="/common/WebDevelopment" element={(token && role == 'employer') ? <WebDevelopment/>  : <WebDevelopment/>} />
      <Route path="/common/ProductManagement" element={(token && role == 'employer') ? <ProductManagement/>  : <ProductManagement/>} /> 
      <Route path="/common/Marketing" element={(token && role == 'employer') ? <Marketing/>  : <Marketing/>} />
      <Route path="/common/GraphicDesign" element={(token && role == 'employer') ? <GraphicDesign/>  : <GraphicDesign/>} />


      <Route path="/common/SingleJob" element={(token && role == 'employer') ? <SingleJob/>  : <SingleJob/>} />

      <Route path="/admin" element={(token && role == 'employer') ? <AdminHome/>  : <AdminHome/>} />
      <Route path="/admin/Jobqueuelist" element={(token && role == 'employer') ? <Jobqueuelist/>  : <Jobqueuelist/>} />
      <Route path="/admin/Myasignjobs" element={(token && role == 'employer') ? <Myasignjobs/>  : <Myasignjobs/>} />
      <Route path="/admin/Jobqueuelist" element={(token && role == 'employer') ? <Jobqueuelist/>  : <Jobqueuelist/>} /> 



      <Route path="/superadmin" element={(token && role == 'employer') ? <SuperAdminHome/>  : <SuperAdminHome/>} />
      <Route path="/superadmin/Create" element={(token && role == 'employer') ? <Create/>  : <Create/>} />
      <Route path="/superadmin/List" element={(token && role == 'employer') ? <List/>  : <List/>} />
      <Route path="/superadmin/AddForms" element={(token && role == 'employer') ? <AddForms/>  : <AddForms/>} />
      <Route path="/superadmin/Table" element={(token && role == 'employer') ? <Table/>  : <Table/>} />
      <Route path="/superadmin/CreateUser" element={(token && role == 'employer') ? <CreateUser/>  : <CreateUser/>} />
      <Route path="/superadmin/UserList" element={(token && role == 'employer') ? <UserList/>  : <UserList/>} />
      <Route path="/superadmin/Skills" element={(token && role == 'employer') ? <Skills/>  : <Skills/>} />
      
      
      


    </Routes>
</BrowserRouter> 
}

export default App;
