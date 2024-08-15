import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import CompanyLayout from "./layouts/company/CompanyLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import SuperAdminLayout from "./layouts/superadmin/SuperAdminLayout";
import CommonLayout from "./layouts/common/CommonLayout";

//common
import Home from './pages/common/Home';
import UserProfile from "./pages/common/UserProfile";
import ViewProfile from "./pages/common/ViewProfile";
import Aboutwhvisa from "./pages/common/Aboutwhvisa";
import Banking from "./pages/common/Banking";
import Typesofwork from "./pages/common/Typesofwork";
import Usefullinks from "./pages/common/Usefullinks";
import Places from "./pages/common/Places";
import AboutUs from "./pages/common/AboutUs";
import Services from "./pages/common/Services";
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
import Myappliedjobs from "./pages/common/Myappliedjobs";
import Savedjobs from "./pages/common/Savedjobs";
import ForgetPassword from "./pages/common/forgetPassword";
import ResetPassword from "./pages/common/ResetPassword";
import ActivateAccount from "./pages/common/ActivateAccount";
import City from "./pages/common/city";
import ContactUs from "./pages/common/contactUs";

//company
import CompanyHome from "./pages/company/Home";
import CompanyProfile from "./pages/company/CompanyProfile";
import Transactions from "./pages/company/Transactions";
import Postajob from "./pages/company/jobs/Postajob";
import JobList from "./pages/company/jobs/JobList";
import BuyCredits from "./pages/company/jobs/BuyCredits";
import EditJob from "./pages/company/jobs/EditJob";
import AppliedUsers from "./pages/company/jobs/AppliedUsers";
import AppliedUserProfile from "./pages/company/jobs/AppliedUserProfile";
import EmployerContactUs from "./pages/company/Contact-Us";
import Inbox from "./pages/company/Inbox";


//Admin

import Jobqueuelist from "./pages/admin/joblist/Jobqueuelist";
import SingleJobAdmin from "./pages/admin/joblist/SingleJobAdmin";
import AdminHome from "./pages/admin/Home";
import Myasignjobs from "./pages/admin/joblist/Myasignjobs";
import Login from "./pages/admin/login";
import Queries from "./pages/admin/Queries";

//superAdmin

import SuperAdminHome from "./pages/superadmin/Home";
import Categories1 from "./pages/superadmin/categories/Categories1";
import Categorieslist1 from "./pages/superadmin/categories/Categorieslist1"
import Create from "./pages/superadmin/adimin-management/Create";
import List from "./pages/superadmin/adimin-management/List";
import AddForms from "./pages/superadmin/adsmanagement/AddForms";
import Table from "./pages/superadmin/adsmanagement/Table";
import UserList from "./pages/superadmin/user/UserList";
import SuperAdminLogin from "./pages/superadmin/login";
import OrdersList from "./pages/superadmin/Order-Management/OrdersList";
import Addpage from "./pages/superadmin/Pages-Management/AddPages";
import PagesList from "./pages/superadmin/Pages-Management/PagesList";
import Skills from "./pages/superadmin/Skills-Management/Skills";
import Addskills from "./pages/superadmin/Skills-Management/Addskills";
import EditSkill from "./pages/superadmin/Skills-Management/EditSkill";
import EditCategory from "./pages/superadmin/categories/EditCategory";
import JobsListSuperAdmin from "./pages/superadmin/joblist/jobslist";
import PaymentStatus from "./pages/billing/PaymentStatus";
import JobSuperAdmin from "./pages/superadmin/joblist/JobSuperadmin";
import Profile from "./pages/superadmin/user/Profile";
import LocationList from "./pages/superadmin/locations-list/LocationList";
import DownloadTransactions from "./pages/company/DownloadTransactions";
import { CurrentJobContext } from "./helpers/Context";


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [currentJob, setCurrentJob] = useState({})

  return (
    <BrowserRouter>
      <CurrentJobContext.Provider value={{ currentJob, setCurrentJob }}>
        <Routes>

          {/* Company Routes */}
          <Route path="/company" element={(token && role == 'employer') ? <CompanyLayout /> : <Navigate to="/" />}>
            <Route index element={<CompanyHome />} />
            <Route path="CompanyProfile" element={<CompanyProfile />} />
            <Route path="postajob" element={<Postajob name={"Post a Job"} />} />
            <Route path="editjob/:id" element={<Postajob name={"Edit Job"} />} />
            <Route path="JobList" element={<JobList />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="applied-users/:id" element={<AppliedUsers />} />
            <Route path="applied-user-profile/:userId" element={<AppliedUserProfile />} />
            <Route path="BuyCredits" element={<BuyCredits />} />
            <Route path="contact-us" element={<EmployerContactUs />} />
            <Route path="inbox" element={<Inbox />} />
          </Route>

          <Route path="/company/transactions/download-transactions" element={<DownloadTransactions />} />

          {/* Admin Routes */}
          <Route path="/admin" element={(token && role == 'admin') ? <AdminLayout /> : <Login />}>
            <Route index element={<AdminHome />} />
            <Route path="Jobqueuelist" element={<Jobqueuelist />} />
            <Route path="queries" element={<Queries />} />
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


          {/* Common Layout */}
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="services" element={<Services />} />
            <Route path="terms-conditions" element={<Terms />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="common/Aboutwhvisa" element={<Aboutwhvisa />} />
            <Route path="common/Banking" element={<Banking />} />
            <Route path="/common/SingleJob/:id" element={<SingleJob />} />
            <Route path="/common/Typesofwork" element={<Typesofwork />} />
            <Route path="/common/Usefullinks" element={<Usefullinks />} />
            <Route path="/common/Places" element={<Places />} />
            <Route path="/common/Transport" element={<Transport />} />
            <Route path="/common/News" element={<News />} />
            <Route path="/common/Tax" element={<Tax />} />
            <Route path="/common/Accommodation" element={<Accommodation />} />
            <Route path="/common/HolidayParks" element={<HolidayParks />} />
            <Route path="/common/FreedomCampaining" element={<FreedomCampaining />} />
            <Route path="/common/Activities" element={<Activities />} />
            <Route path="/common/Jobs" element={<Jobs />} />
            <Route path="/payment-status" element={token ? <PaymentStatus /> : <Navigate to="/" />} />
            <Route path="/cities/:city" element={<City />} />
            <Route path="/forgotPassword" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/activate-account" element={<ActivateAccount />} />

            {/* User Protected Routes */}

            <Route path="profile" element={(token && role == 'user') ? <UserProfile /> : <Navigate to="/" />} />
            <Route path="viewprofile" element={(token && role == 'user') ? <ViewProfile /> : <Navigate to="/" />} />
            <Route path="applied-jobs" element={(token && role == 'user') ? <Myappliedjobs /> : <Navigate to="/" />} />
            <Route path="saved-jobs" element={(token && role == 'user') ? <Savedjobs /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </CurrentJobContext.Provider>
    </BrowserRouter>
  )
}

export default App;
