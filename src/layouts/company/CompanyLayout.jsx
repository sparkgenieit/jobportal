import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux'

import Header from './Header';
import Footer from "../admin/Footer"
import Sidebar from './Sidebar';
import { fetchEmployerUnreadCount } from '../../helpers/slices/mailCountSlice';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import CompanyHome from "../../pages/company/Home";
import Transactions from "../../pages/company/Transactions";
import Postajob from "../../pages/company/jobs/Postajob";
import PostedJobList from "../../pages/company/jobs/PostedJobList";
import BuyCredits from "../../pages/company/common/BuyCredits";
import AppliedUsers from "../../pages/company/jobs/AppliedUsers";
import AppliedUserProfile from "../../pages/company/jobs/AppliedUserProfile";
import EmployerContactUs from "../../pages/company/Contact-Us";
import Inbox from "../../pages/company/Inbox";
import RecruiterList from "../../pages/company/Recruiter/RecruiterList";
import ChatPage from '../../components/ChatPage';
import NotFound from '../../components/NotFound';
import Audit from '../../pages/company/Audit-Log';
import CompanyProfile from '../../pages/company/CompanyProfile';
import AdsList from '../../pages/company/Ads/AdsList';
import { companyUrls } from '../../services/common/urls/companyUrls.service';
import EditJob from '../../pages/company/jobs/EditJob';
import PostAd from '../../pages/company/Ads/PostAd';
import SelectAdType from '../../pages/company/Ads/SelectAdType';
import PageDeciderBasedOnType from '../../pages/company/Ads/PageDeciderBasedOnType';

export default function CompanyLayout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployerUnreadCount())
    }, [])
    return (
        <>
            <div className='container-scroller'>
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
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
                        <Route path={companyUrls.adTransactions} element={<Transactions type='Ad' />} />
                        <Route path={companyUrls.jobTransactions} element={<Transactions  type='Job' />} />
                        <Route path={companyUrls.buyAdCredits} element={<BuyCredits type='Ad' />} />
                        <Route path={companyUrls.buyJobCredits} element={<BuyCredits  type='Job' />} />
                        

                        <Route path={companyUrls.companyProfile} element={<CompanyProfile />} />
                        <Route path={companyUrls.recruiters} element={<RecruiterList />} />
                        <Route path={companyUrls.ads} element={<AdsList />} />
                        <Route path={companyUrls.selectAdType} element={<SelectAdType />} />
                        <Route path={companyUrls.postAd} element={<PageDeciderBasedOnType />} />
                        <Route path="//" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div >
        </>
    )
}