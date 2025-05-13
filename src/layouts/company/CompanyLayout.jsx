import React, { useEffect, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './Header';
import Footer from '../admin/Footer';
import Sidebar from './Sidebar';
import { fetchEmployerUnreadCount } from '../../helpers/slices/mailCountSlice';
import { companyUrls } from '../../services/common/urls/companyUrls.service';

const CompanyHome = lazy(() => import('../../pages/company/Home'));
const Transactions = lazy(() => import('../../pages/company/Transactions'));
const Postajob = lazy(() => import('../../pages/company/jobs/Postajob'));
const PostedJobList = lazy(() => import('../../pages/company/jobs/PostedJobList'));
const BuyCredits = lazy(() => import('../../pages/company/common/BuyCredits'));
const AppliedUsers = lazy(() => import('../../pages/company/jobs/AppliedUsers'));
const AppliedUserProfile = lazy(() => import('../../pages/company/jobs/AppliedUserProfile'));
const EmployerContactUs = lazy(() => import('../../pages/company/Contact-Us'));
const Inbox = lazy(() => import('../../pages/company/Inbox'));
const RecruiterList = lazy(() => import('../../pages/company/Recruiter/RecruiterList'));
const ChatPage = lazy(() => import('../../components/ChatPage'));
const NotFound = lazy(() => import('../../components/NotFound'));
const Audit = lazy(() => import('../../pages/company/Audit-Log'));
const AdAudit = lazy(() => import('../../pages/company/AdAudit-Log'));
const CompanyProfile = lazy(() => import('../../pages/company/CompanyProfile'));
const AdsList = lazy(() => import('../../pages/company/common/AdsList'));
const EditJob = lazy(() => import('../../pages/company/jobs/EditJob'));
const EditAd = lazy(() => import('../../pages/company/Ads/EditAd'));
const SelectAdType = lazy(() => import('../../pages/company/Ads/SelectAdType'));
const PageDeciderBasedOnType = lazy(() => import('../../pages/company/Ads/PageDeciderBasedOnType'));

export default function CompanyLayout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployerUnreadCount());
    }, [dispatch]);

    return (
        <div className='container-scroller'>
            <Header />
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route index element={<CompanyHome />} />
                        <Route path={companyUrls.postJob} element={<Postajob />} />
                        <Route path={companyUrls.editJob} element={<EditJob />} />
                        <Route path={companyUrls.postedJobs} element={<PostedJobList />} />
                        <Route path={companyUrls.appliedUsers} element={<AppliedUsers />} />
                        <Route path={companyUrls.appliedUserProfile} element={<AppliedUserProfile />} />
                        <Route path={companyUrls.companyContact} element={<EmployerContactUs />} />
                        <Route path={companyUrls.inbox} element={<Inbox />} />
                        <Route path={companyUrls.inboxDetails} element={<ChatPage name={"Enquirer"} />} />
                        <Route path={companyUrls.audit} element={<Audit />} />
                        <Route path={companyUrls.adAudit} element={<AdAudit />} />
                        <Route path={companyUrls.adTransactions} element={<Transactions type='Ad' />} />
                        <Route path={companyUrls.jobTransactions} element={<Transactions type='Job' />} />
                        <Route path={companyUrls.buyAdCredits} element={<BuyCredits type='Ad' />} />
                        <Route path={companyUrls.buyJobCredits} element={<BuyCredits type='Job' />} />
                        <Route path={companyUrls.companyProfile} element={<CompanyProfile />} />
                        <Route path={companyUrls.recruiters} element={<RecruiterList />} />
                        <Route path={companyUrls.ads} element={<AdsList role="CompanyAdmin" />} />
                        <Route path={companyUrls.selectAdType} element={<SelectAdType />} />
                        <Route path={companyUrls.postAd} element={<PageDeciderBasedOnType />} />
                        <Route path={companyUrls.editAd} element={<EditAd />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
