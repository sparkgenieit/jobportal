import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import SuperAdminHome from "../../pages/superadmin/Home";
import Categories1 from "../../pages/superadmin/categories/Categories1";
import Categorieslist1 from "../../pages/superadmin/categories/Categorieslist1"
import Create from "../../pages/superadmin/adimin-management/Create";
import List from "../../pages/superadmin/adimin-management/List";
import AddForms from "../../pages/superadmin/adsmanagement/AddForms";
import Table from "../../pages/superadmin/adsmanagement/Table";
import UserList from "../../pages/superadmin/user/UserList";
import OrdersList from "../../pages/superadmin/Order-Management/OrdersList";
import Addpage from "../../pages/superadmin/Pages-Management/AddPages";
import PagesList from "../../pages/superadmin/Pages-Management/PagesList";
import Skills from "../../pages/superadmin/Skills-Management/Skills";
import Addskills from "../../pages/superadmin/Skills-Management/Addskills";
import EditSkill from "../../pages/superadmin/Skills-Management/EditSkill";
import EditCategory from "../../pages/superadmin/categories/EditCategory";
import JobsListSuperAdmin from "../../pages/superadmin/joblist/jobslist";
import JobSuperAdmin from "../../pages/superadmin/joblist/JobSuperadmin";
import Profile from "../../pages/superadmin/user/Profile";
import LocationList from "../../pages/superadmin/locations-list/LocationList";
import SendMailToAllEmployer from "../../pages/superadmin/mail/SendMailToAllEmployer";
import MailAdmin from "../../pages/superadmin/mail/MailAdmin";
import SuperAdminInbox from "../../pages/superadmin/mail/Inbox";
import CreditsManagement from "../../pages/superadmin/Credtis-Management/CreditsManagement";
import Chat from "../../pages/superadmin/mail/Chat";
import { setAdminUnreadCount } from '../../helpers/slices/mailCountSlice';
import http from '../../helpers/http';
import NotFound from '../../components/NotFound';

export default function SuperAdminLayout() {
    const dispatch = useDispatch()

    const AdminMailUnreadCount = async () => {
        try {
            const { data } = await http.get("/mails/unread-mails")
            dispatch(setAdminUnreadCount(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AdminMailUnreadCount()
    }, [])

    return (
        <>
            <div className='container-scroller'>
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <Routes>
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
                        <Route path="credits-management" element={<CreditsManagement />} />
                        <Route path="mail" element={< SendMailToAllEmployer />} />
                        <Route path="mail-admin" element={< MailAdmin />} />
                        <Route path="admin-inbox" element={< SuperAdminInbox />} />
                        <Route path="admin-inbox/details/:id" element={< Chat />} />
                        <Route path="add-page" element={<Addpage />} />
                        <Route path="pages" element={<PagesList />} />
                        <Route path="jobs" element={<JobsListSuperAdmin />} />
                        <Route path="jobs/:id" element={<JobSuperAdmin />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    )
}