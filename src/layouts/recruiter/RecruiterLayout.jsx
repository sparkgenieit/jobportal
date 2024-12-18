import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import Footer from "../admin/Footer"
import { fetchEmployerUnreadCount } from '../../helpers/slices/mailCountSlice';
import Transactions from "../../pages/company/Transactions";
import Postajob from "../../pages/company/jobs/Postajob";
import PostedJobList from "../../pages/company/jobs/PostedJobList";
import BuyCredits from "../../pages/company/jobs/BuyCredits";
import AppliedUsers from "../../pages/company/jobs/AppliedUsers";
import AppliedUserProfile from "../../pages/company/jobs/AppliedUserProfile";
import EmployerContactUs from "../../pages/company/Contact-Us";
import Inbox from "../../pages/company/Inbox";
import ChatPage from '../../components/ChatPage';
import NotFound from '../../components/NotFound';
import Audit from '../../pages/company/Audit-Log';
import Header from '../company/Header';
import { recruiterUrl } from '../../services/common/urls/recruiterUrls.service';
import Sidebar from './Sidebar';
import RecruiterHome from '../../pages/recruiter/Home';
import RecruiterContactUs from '../../pages/recruiter/RecruiterContactUs';

export default function RecruiterLayout() {
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

                        <Route index element={<RecruiterHome />} />
                        <Route path={recruiterUrl.postJob} element={<Postajob name={"Post a Job"} />} />
                        <Route path={recruiterUrl.editJob} element={<Postajob name={"Edit Job"} />} />
                        <Route path={recruiterUrl.postedJobs} element={<PostedJobList />} />
                        <Route path={recruiterUrl.appliedUsers} element={<AppliedUsers />} />
                        <Route path={recruiterUrl.appliedUserProfile} element={<AppliedUserProfile />} />
                        <Route path={recruiterUrl.companyContact} element={<RecruiterContactUs />} />
                        <Route path={recruiterUrl.inbox} element={<Inbox />} />
                        <Route path={recruiterUrl.inboxDetails} element={<ChatPage name={"Enquirer"} />} />
                        <Route path={recruiterUrl.audit} element={<Audit />} />
                        <Route path={recruiterUrl.transactions} element={<Transactions />} />
                        <Route path={recruiterUrl.buyCredits} element={<BuyCredits />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div >
        </>
    )
}