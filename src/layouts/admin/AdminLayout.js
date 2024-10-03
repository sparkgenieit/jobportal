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
                        <Route path="jobqueuelist" element={<Jobqueuelist />} />
                        <Route path="employer-queries" element={<UnAssignedQueries />} />
                        <Route path="general-queries" element={<GeneralQueries />} />
                        <Route path="inbox" element={<AdminInbox />} />
                        <Route path="inbox/details/:id" element={<ChatPage name={"Admin"} />} />
                        <Route path="Myasignjobs" element={<Myasignjobs />} />
                        <Route path="view-job/:id" element={<SingleJobAdmin />} />
                        <Route path="admin-inbox" element={<SuperAdminInbox />} />
                        <Route path="mail-admin" element={< MailAdmin />} />
                        <Route path="admin-inbox/details/:id" element={< Chat />} />
                        <Route path="audit" element={< Audit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    )
}