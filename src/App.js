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
import Terms from "./pages/common/Terms";
import Privacy from "./pages/common/Privacy";

//company
import CompanyHome from "./pages/company/Home";
import CompanyProfile from "./pages/company/CompanyProfile";
import Postajob from "./pages/company/jobs/Postajob";
import JobList from "./pages/company/jobs/JobList";


//Admin

import Jobqueuelist from "./pages/admin/joblist/Jobqueuelist";
import Categories1 from "./pages/superadmin/categories/Categories1";
import Categorieslist1 from "./pages/superadmin/categories/Categorieslist1"
import AdminHome from "./pages/admin/Home";
import Myasignjobs from "./pages/admin/joblist/Myasignjobs";
import Login from "./pages/admin/login";

//superAdmin

import SuperAdminHome from "./pages/superadmin/Home";
import Create from "./pages/superadmin/adimin-management/Create";
import List from "./pages/superadmin/adimin-management/List";
import AddForms from "./pages/superadmin/AddForms";
import Table from "./pages/superadmin/Table";
import CreateUser from "./pages/superadmin/user/CreateUser";
import UserList from "./pages/superadmin/user/UserList";
import Skills from "./pages/superadmin/Skills";
import Myappliedjobs from "./pages/common/Myappliedjobs";
import Savedjobs from "./pages/common/Savedjobs";
import SingleJobAdmin from "./pages/admin/joblist/SingleJobAdmin";
import SuperAdminLogin from "./pages/superadmin/login";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/terms-conditions" element={<Terms />} />
      <Route path="/privacy-policy" element={<Privacy />} />

      <Route path="/login" element={!token ? <UserLogin /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <UserRegistration /> : <Navigate to="/" />} />
      <Route path="/profile" element={token ? <UserProfile /> : <Navigate to="/" />} />
      <Route path="/viewprofile" element={token ? <ViewProfile /> : <Navigate to="/" />} />

      <Route path="/company" element={(token && role == 'employer') ? <CompanyHome /> : <Navigate to="/" />} />
      <Route path="/company/CompanyProfile" element={(token && role == 'employer') ? <CompanyProfile /> : <Navigate to="/" />} />
      <Route path="/company/postajob" element={(token && role == 'employer') ? <Postajob /> :<Navigate to="/" />} />
      <Route path="/company/JobList" element={(token && role == 'employer') ? <JobList /> : <Navigate to="/" />} />


      <Route path="/common/Aboutwhvisa" element={(token && role == 'user') ? <Aboutwhvisa /> : <Aboutwhvisa />} />
      <Route path="/common/Banking" element={(token && role == 'user') ? <Banking /> : <Banking />} />
      <Route path="/common/Typesofwork" element={(token && role == 'user') ? <Typesofwork /> : <Typesofwork />} />
      <Route path="/common/Usefullinks" element={(token && role == 'user') ? <Usefullinks /> : <Usefullinks />} />
      <Route path="/common/Places" element={(token && role == 'user') ? <Places /> : <Places />} />
      <Route path="/common/Tax" element={(token && role == 'user') ? <Tax /> : <Tax />} />
      <Route path="/common/News" element={(token && role == 'user') ? <News /> : <News />} />
      <Route path="/common/Transport" element={(token && role == 'user') ? <Transport /> : <Transport />} />
      <Route path="/common/Accommodation" element={(token && role == 'user') ? <Accommodation /> : <Accommodation />} />
      <Route path="/common/HolidayParks" element={(token && role == 'user') ? <HolidayParks /> : <HolidayParks />} />
      <Route path="/common/FreedomCampaining" element={(token && role == 'user') ? <FreedomCampaining /> : <FreedomCampaining />} />
      <Route path="/common/Activities" element={(token && role == 'user') ? <Activities /> : <Activities />} />
      <Route path="/common/Myappliedjobs" element={(token && role == 'user') ? <Myappliedjobs /> : <Navigate to="/" />} />
      <Route path="/common/Savedjobs" element={(token && role == 'user') ? <Savedjobs /> : <Navigate to="/" />} />




      <Route path="/common/AboutUs" element={(token && role == 'user') ? <AboutUs /> : <AboutUs />} />
      <Route path="/common/Services" element={(token && role == 'user') ? <Services /> : <Services />} />
      <Route path="/common/Termsofservice" element={(token && role == 'user') ? <Termsofservice /> : <Termsofservice />} />
      <Route path="/common/Privacypolicy" element={(token && role == 'user') ? <Privacypolicy /> : <Privacypolicy />} />
      <Route path="/common/WebDesign" element={(token && role == 'user') ? <WebDesign /> : <WebDesign />} />
      <Route path="/common/WebDevelopment" element={(token && role == 'user') ? <WebDevelopment /> : <WebDevelopment />} />
      <Route path="/common/ProductManagement" element={(token && role == 'user') ? <ProductManagement /> : <ProductManagement />} />
      <Route path="/common/Marketing" element={(token && role == 'user') ? <Marketing /> : <Marketing />} />
      <Route path="/common/GraphicDesign" element={(token && role == 'user') ? <GraphicDesign /> : <GraphicDesign />} />


      <Route path="/common/SingleJob/:id" element={(token && role == 'user') ? <SingleJob /> : <SingleJob />} />

      <Route path="/admin" element={(token && role == 'admin') ? <AdminHome /> : <Login />} />
      <Route path="/admin/Jobqueuelist" element={(token && role == 'admin') ? <Jobqueuelist /> : <Login />} />
      <Route path="/admin/Myasignjobs" element={(token && role == 'admin') ? <Myasignjobs /> : <Login />} />
      <Route path="/admin/login" element={(token && role == 'admin') ? <Login /> : <AdminHome />} />




      <Route path="/superadmin/Categories1" element={(token && role == 'superadmin') ? <Categories1 /> : <Categories1 />} />

      <Route path="/superadmin/Categorieslist1" element={(token && role == 'superadmin') ? <Categorieslist1 /> : <Categorieslist1 />} />


      <Route path="/superadmin/list" element={(token && role == 'superadmin') ? <List /> : <List />} />


      <Route path="/superadmin" element={(token && role == 'superadmin') ? <SuperAdminHome /> : <SuperAdminLogin />} />
      <Route path="/superadmin/admins/Create" element={(token && role == 'superadmin') ? <Create /> : <SuperAdminLogin />} />
      <Route path="/superadmin/admins/List" element={(token && role == 'superadmin') ? <List /> : <SuperAdminLogin />} />
      <Route path="/superadmin/AddForms" element={(token && role == 'superadmin') ? <AddForms /> : <SuperAdminLogin />} />
      <Route path="/superadmin/Table" element={(token && role == 'superadmin') ? <Table /> : <SuperAdminLogin />} />
      <Route path="/superadmin/CreateUser" element={(token && role == 'superadmin') ? <CreateUser /> : <SuperAdminLogin />} />
      <Route path="/superadmin/UserList" element={(token && role == 'superadmin') ? <UserList /> : <SuperAdminLogin />} />
      <Route path="/superadmin/Skills" element={(token && role == 'superadmin') ? <Skills /> : <SuperAdminLogin />} />
      <Route path="/superadmin/login" element={(token && role == 'superadmin') ? <SuperAdminHome /> : <SuperAdminLogin />} />


    </Routes>
  </BrowserRouter>
}

export default App;
