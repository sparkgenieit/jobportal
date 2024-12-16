import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Jobqueuelist from "../../pages/admin/joblist/Jobqueuelist";
import SingleJobAdmin from "../../pages/admin/joblist/SingleJobAdmin";
import AdminHome from "../../pages/admin/Home";
import Myasignjobs from "../../pages/admin/joblist/Myasignjobs";
import AdminInbox from "../../pages/admin/AdminInbox";
import UnAssignedQueries from "../../pages/admin/UnAssignedQueries";
import Chat from "../../pages/superadmin/mail/Chat";
import SuperAdminInbox from "../../pages/superadmin/mail/Inbox";
import MailAdmin from "../../pages/superadmin/mail/MailAdmin";
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { fetchEmployerUnreadCount, setAdminUnreadCount } from '../../helpers/slices/mailCountSlice';
import http from '../../helpers/http';
import ChatPage from '../../components/ChatPage';
import NotFound from '../../components/NotFound';
import Audit from '../../pages/superadmin/Audit_Log/Audit_Log';
import GeneralQueries from '../../pages/admin/GeneralQueries';
import AdminAuditLogs from '../../pages/superadmin/Audit_Log/AdminAuditLogs';
import ProfilesQueue from '../../pages/admin/companylist/ProfilesQueue';
import CompanyProfileChanges from '../../pages/admin/companylist/CompanyProfileChanges';
import AssignedProfiles from '../../pages/admin/companylist/AssigendProfiles';
import { adminUrls } from '../../services/common/urls/adminUrls.service';

export default function AdminLayout() {
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
        dispatch(fetchEmployerUnreadCount())
    }, [])

    return (
        <>
            <div className='container-scroller'>
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <Routes>
                        <Route index element={<AdminHome />} />
                        <Route path={adminUrls.jobQueueList} element={<Jobqueuelist />} />
                        <Route path={adminUrls.employerQueries} element={<UnAssignedQueries />} />
                        <Route path={adminUrls.generalQueries} element={<GeneralQueries />} />
                        <Route path={adminUrls.inbox} element={<AdminInbox />} />
                        <Route path={adminUrls.inboxDetails} element={<ChatPage name={"Admin"} />} />
                        <Route path={adminUrls.assignedJobs} element={<Myasignjobs />} />
                        <Route path={adminUrls.viewJob} element={<SingleJobAdmin />} />
                        <Route path={adminUrls.adminInbox} element={<SuperAdminInbox />} />
                        <Route path={adminUrls.adminMail} element={< MailAdmin />} />
                        <Route path={adminUrls.adminInboxDetails} element={< Chat />} />
                        <Route path={adminUrls.audit} element={< Audit />} />
                        <Route path={adminUrls.logs} element={< AdminAuditLogs />} />
                        <Route path={adminUrls.queueProfiles} element={< ProfilesQueue />} />
                        <Route path={adminUrls.assignedJobs} element={< AssignedProfiles />} />
                        <Route path={adminUrls.companyProfile} element={< CompanyProfileChanges />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    )
}