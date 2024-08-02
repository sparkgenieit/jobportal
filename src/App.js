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
import Jobs from "./pages/common/Jobs";

//company
import CompanyHome from "./pages/company/Home";
import CompanyProfile from "./pages/company/CompanyProfile";
import Transactions from "./pages/company/Transactions";
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
import AddForms from "./pages/superadmin/adsmanagement/AddForms";
import Table from "./pages/superadmin/adsmanagement/Table";
import CreateUser from "./pages/superadmin/user/CreateUser";
import UserList from "./pages/superadmin/user/UserList";

import Myappliedjobs from "./pages/common/Myappliedjobs";
import Savedjobs from "./pages/common/Savedjobs";
import SuperAdminLogin from "./pages/superadmin/login";

import OrdersList from "./pages/superadmin/Order-Management/OrdersList";
import Addpage from "./pages/superadmin/Pages-Management/AddPages";
import PagesList from "./pages/superadmin/Pages-Management/PagesList";
import Skills from "./pages/superadmin/Skills-Management/Skills";
import Addskills from "./pages/superadmin/Skills-Management/Addskills";
import EditSkill from "./pages/superadmin/Skills-Management/EditSkill";
import EditCategory from "./pages/superadmin/categories/EditCategory";
import EditJob from "./pages/company/jobs/EditJob";
import JobsListSuperAdmin from "./pages/superadmin/joblist/jobslist";
import ForgetPassword from "./pages/common/forgetPassword";
import ResetPassword from "./pages/common/ResetPassword";
import CheckoutForm from "./pages/billing/CheckoutForm";
import PaymentStatus from "./pages/billing/PaymentStatus";
import ActivateAccount from "./pages/common/ActivateAccount";
import JobSuperAdmin from "./pages/superadmin/joblist/JobSuperadmin";
import BuyCredits from "./pages/company/jobs/BuyCredits";
import ContactUs from "./pages/common/contactUs";
import AppliedUsers from "./pages/company/jobs/AppliedUsers";
import AppliedUserProfile from "./pages/company/jobs/AppliedUserProfile";
import Profile from "./pages/superadmin/user/Profile";
import LocationList from "./pages/superadmin/locations-list/LocationList";
import SingleJobAdmin from "./pages/admin/joblist/SingleJobAdmin";
import City from "./pages/common/city";
import CompanyLayout from "./layouts/company/CompanyLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import SuperAdminLayout from "./layouts/superadmin/SuperAdminLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/contact-us" element={<ContactUs />} />



        {/* Company Routes */}
        <Route path="/company" element={(token && role == 'employer') ? <CompanyLayout /> : <Navigate to="/" />}>
          <Route index element={<CompanyHome />} />
          <Route path="CompanyProfile" element={<CompanyProfile />} />
          <Route path="postajob" element={<Postajob />} />
          <Route path="editjob/:id" element={<EditJob />} />
          <Route path="JobList" element={<JobList />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="applied-users/:id" element={<AppliedUsers />} />
          <Route path="applied-user-profile/:userId" element={<AppliedUserProfile />} />
          <Route path="BuyCredits" element={<BuyCredits />} />
        </Route>


        {/* Admin Routes */}
        <Route path="/admin" element={(token && role == 'admin') ? <AdminLayout /> : <Login />}>
          <Route index element={<AdminHome />} />
          <Route path="Jobqueuelist" element={<Jobqueuelist />} />
          <Route path="Myasignjobs" element={<Myasignjobs />} />
          <Route path="view-job/:id" element={<SingleJobAdmin />} />
        </Route>

        {/* SuperAdmin Routes */}
        <Route path="/superadmin" element={(token && role == 'superadmin') ? <SuperAdminLayout /> : <SuperAdminLogin />}>
          <Route index element={<SuperAdminHome />} />
          <Route path="Categories1" element={<Categories1 />} />
          <Route path="AddSkills" element={<Addskills />} />
          <Route path="Categorieslist1" element={<Categorieslist1 />} />
          <Route path="Categories/:id" element={<EditCategory />} />
          <Route path="view-profile/:user/:userId" element={<Profile />} />
          <Route path="locations" element={<LocationList />} />
          <Route path="admins/Create" element={<Create />} />
          <Route path="admins/List" element={<List />} />
          <Route path="AddForms" element={<AddForms />} />
          <Route path="Table" element={<Table />} />
          <Route path="Skills" element={<Skills />} />
          <Route path="users" element={<UserList />} />
          <Route path="Skills/:id" element={<EditSkill />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="add-page" element={<Addpage />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="jobs" element={<JobsListSuperAdmin />} />
          <Route path="jobs/:id" element={<JobSuperAdmin />} />
        </Route>





        <Route path="/login" element={!token ? <UserLogin /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <UserRegistration /> : <Navigate to="/" />} />
        <Route path="/profile" element={(token && role == 'user') ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/viewprofile" element={(token && role == 'user') ? <ViewProfile /> : <Navigate to="/" />} />



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
        <Route path="/common/Jobs" element={(token && role == 'user') ? <Jobs /> : <Jobs />} />



        <Route path="/common/AboutUs" element={(token && role == 'user') ? <AboutUs /> : <AboutUs />} />
        <Route path="/common/Services" element={(token && role == 'user') ? <Services /> : <Services />} />
        <Route path="/common/Termsofservice" element={(token && role == 'user') ? <Termsofservice /> : <Termsofservice />} />
        <Route path="/common/Privacypolicy" element={(token && role == 'user') ? <Privacypolicy /> : <Privacypolicy />} />
        <Route path="/common/WebDesign" element={(token && role == 'user') ? <WebDesign /> : <WebDesign />} />
        <Route path="/common/WebDevelopment" element={(token && role == 'user') ? <WebDevelopment /> : <WebDevelopment />} />
        <Route path="/common/ProductManagement" element={(token && role == 'user') ? <ProductManagement /> : <ProductManagement />} />
        <Route path="/common/Marketing" element={(token && role == 'user') ? <Marketing /> : <Marketing />} />
        <Route path="/common/GraphicDesign" element={(token && role == 'user') ? <GraphicDesign /> : <GraphicDesign />} />
        <Route path="/checkout-page" element={token ? <CheckoutForm /> : <Navigate to="/" />} />
        <Route path="/payment-status" element={token ? <PaymentStatus /> : <Navigate to="/" />} />
        <Route path="/cities/:city" element={<City />} />

        <Route path="/forgotPassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/activate-account" element={<ActivateAccount />} />

        <Route path="/common/SingleJob/:id" element={(token && role == 'user') ? <SingleJob /> : <SingleJob />} />




      </Routes>
    </BrowserRouter>
  )
}

export default App;
