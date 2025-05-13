import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { fetchEmployerUnreadCount, setAdminUnreadCount } from '../../helpers/slices/mailCountSlice';
import http from '../../helpers/http';
import { adminUrls } from '../../services/common/urls/adminUrls.service';

const Jobqueuelist = lazy(() => import('../../pages/admin/joblist/Jobqueuelist'));
const Adsqueuelist = lazy(() => import('../../pages/admin/adslist/Adsqueuelist'));
const Myasignads = lazy(() => import('../../pages/admin/adslist/Myasignads'));
const SingleJobAdmin = lazy(() => import('../../pages/admin/joblist/SingleJobAdmin'));
const SingleAdAdmin = lazy(() => import('../../pages/admin/adslist/SingleAdAdmin'));
const AdminHome = lazy(() => import('../../pages/admin/Home'));
const Myasignjobs = lazy(() => import('../../pages/admin/joblist/Myasignjobs'));
const AdminInbox = lazy(() => import('../../pages/admin/AdminInbox'));
const UnAssignedQueries = lazy(() => import('../../pages/admin/UnAssignedQueries'));
const Chat = lazy(() => import('../../pages/superadmin/mail/Chat'));
const SuperAdminInbox = lazy(() => import('../../pages/superadmin/mail/Inbox'));
const MailAdmin = lazy(() => import('../../pages/superadmin/mail/MailAdmin'));
const ChatPage = lazy(() => import('../../components/ChatPage'));
const NotFound = lazy(() => import('../../components/NotFound'));
const Audit = lazy(() => import('../../pages/superadmin/Audit_Log/Audit_Log'));
const GeneralQueries = lazy(() => import('../../pages/admin/GeneralQueries'));
const AdminAuditLogs = lazy(() => import('../../pages/superadmin/Audit_Log/AdminAuditLogs'));
const ProfilesQueue = lazy(() => import('../../pages/admin/companylist/ProfilesQueue'));
const CompanyProfileChanges = lazy(() => import('../../pages/admin/companylist/CompanyProfileChanges'));
const AssignedProfiles = lazy(() => import('../../pages/admin/companylist/AssigendProfiles'));

export default function AdminLayout() {
    const dispatch = useDispatch();

    const AdminMailUnreadCount = async () => {
        try {
            const { data } = await http.get("/mails/unread-mails");
            dispatch(setAdminUnreadCount(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        AdminMailUnreadCount();
        dispatch(fetchEmployerUnreadCount());
    }, [dispatch]);

    return (
        <div className='container-scroller'>
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route index element={<AdminHome />} />
                        <Route path={adminUrls.jobQueueList} element={<Jobqueuelist />} />
                        <Route path={adminUrls.adsQueueList} element={<Adsqueuelist />} />
                        <Route path={adminUrls.employerQueries} element={<UnAssignedQueries />} />
                        <Route path={adminUrls.generalQueries} element={<GeneralQueries />} />
                        <Route path={adminUrls.inbox} element={<AdminInbox />} />
                        <Route path={adminUrls.inboxDetails} element={<ChatPage name={"Admin"} />} />
                        <Route path={adminUrls.assignedJobs} element={<Myasignjobs />} />
                        <Route path={adminUrls.assignedAds} element={<Myasignads />} />
                        <Route path={adminUrls.viewJob} element={<SingleJobAdmin />} />
                        <Route path={adminUrls.viewAd} element={<SingleAdAdmin />} />
                        <Route path={adminUrls.adminInbox} element={<SuperAdminInbox />} />
                        <Route path={adminUrls.adminMail} element={<MailAdmin />} />
                        <Route path={adminUrls.adminInboxDetails} element={<Chat />} />
                        <Route path={adminUrls.audit} element={<Audit />} />
                        <Route path={adminUrls.logs} element={<AdminAuditLogs />} />
                        <Route path={adminUrls.queueProfiles} element={<ProfilesQueue />} />
                        <Route path={adminUrls.assignedProfiles} element={<AssignedProfiles />} />
                        <Route path={adminUrls.companyProfile} element={<CompanyProfileChanges />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
