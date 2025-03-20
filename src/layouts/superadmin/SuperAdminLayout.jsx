import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import SuperAdminHome from "../../pages/superadmin/Home";
import Categories1 from "../../pages/superadmin/categories/Categories1";
import Categorieslist1 from "../../pages/superadmin/categories/Categorieslist1"
import Create from "../../pages/superadmin/adimin-management/Create";
import List from "../../pages/superadmin/adimin-management/List";
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
import Audit from '../../pages/superadmin/Audit_Log/Audit_Log';
import AdminAuditLogs from '../../pages/superadmin/Audit_Log/AdminAuditLogs';
import Footer from '../admin/Footer'; // As same footer for both superadmin and admin
import AdForm from '../../pages/superadmin/adsmanagement/AdForm';
import AdminAdsList from '../../pages/superadmin/adsmanagement/AdminAdsList';
import AdsList from '../../pages/company/common/AdsList';


import { superAdminUrl } from '../../services/common/urls/superAdminUrl.service';

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
                        {/* The Path name are defined in the superAdminUrl class */}

                        <Route index element={<SuperAdminHome />} />
                        <Route path={superAdminUrl.addCategory} element={<Categories1 />} />
                        <Route path={superAdminUrl.addSkills} element={<Addskills />} />
                        <Route path={superAdminUrl.categoriesList} element={<Categorieslist1 />} />
                        <Route path={superAdminUrl.editCategory} element={<EditCategory />} />
                        <Route path={superAdminUrl.viewProfile} element={<Profile />} />
                        <Route path={superAdminUrl.locations} element={<LocationList />} />
                        <Route path={superAdminUrl.createAdmin} element={<Create />} />
                        <Route path={superAdminUrl.adminList} element={<List />} />
                        <Route path={superAdminUrl.postAd} element={<AdForm />} />
                        <Route path={superAdminUrl.adsList} element={<AdminAdsList />} />
                        <Route path={superAdminUrl.companyAdsList} element={<AdsList role="SuperAdmin" />} />
                        <Route path={superAdminUrl.skillsList} element={<Skills />} />
                        <Route path={superAdminUrl.users} element={<UserList />} />
                        <Route path={superAdminUrl.editSkills} element={<EditSkill />} />
                        <Route path={superAdminUrl.orders} element={<OrdersList />} />
                        <Route path={superAdminUrl.creditsManagement} element={<CreditsManagement />} />
                        <Route path={superAdminUrl.mail} element={< SendMailToAllEmployer />} />
                        <Route path={superAdminUrl.adminMail} element={< MailAdmin />} />
                        <Route path={superAdminUrl.adminInbox} element={< SuperAdminInbox />} />
                        <Route path={superAdminUrl.inboxDetails} element={< Chat />} />
                        <Route path={superAdminUrl.addPage} element={<Addpage />} />
                        <Route path={superAdminUrl.pages} element={<PagesList />} />
                        <Route path={superAdminUrl.jobs} element={<JobsListSuperAdmin />} />
                        <Route path={superAdminUrl.viewJob} element={<JobSuperAdmin />} />
                        <Route path={superAdminUrl.audit} element={<Audit />} />
                        <Route path={superAdminUrl.adminAudit} element={<AdminAuditLogs />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    )
}