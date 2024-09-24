import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux'

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { fetchEmployerUnreadCount } from '../../helpers/slices/mailCountSlice';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import CompanyHome from "../../pages/company/Home";
import CompanyProfile from "../../pages/company/CompanyProfile";
import Transactions from "../../pages/company/Transactions";
import Postajob from "../../pages/company/jobs/Postajob";
import PostedJobList from "../../pages/company/jobs/PostedJobList";
import BuyCredits from "../../pages/company/jobs/BuyCredits";
import AppliedUsers from "../../pages/company/jobs/AppliedUsers";
import AppliedUserProfile from "../../pages/company/jobs/AppliedUserProfile";
import EmployerContactUs from "../../pages/company/Contact-Us";
import Inbox from "../../pages/company/Inbox";
import RecruiterList from "../../pages/company/Recruiter/RecruiterList";
import ChatPage from '../../components/ChatPage';
import NotFound from '../../components/NotFound';

export default function CompanyLayout() {
    const { role } = useCurrentUser()
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
                        {/* Company and Recruiter shared Routes */}
                        <Route index element={<CompanyHome />} />
                        <Route path="postajob" element={<Postajob name={"Post a Job"} />} />
                        <Route path="editjob/:id" element={<Postajob name={"Edit Job"} />} />
                        <Route path="jobs" element={<PostedJobList />} />
                        <Route path="applied-users/:id" element={<AppliedUsers />} />
                        <Route path="applied-user-profile/:userId" element={<AppliedUserProfile />} />
                        <Route path="contact-us" element={<EmployerContactUs />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="inbox/details/:id" element={<ChatPage name={"Enquirer"} />} />

                        {/* Company only Routes */}
                        <Route path="CompanyProfile" element={role == 'employer' ? <CompanyProfile /> : <CompanyHome />} />
                        <Route path="transactions" element={role == 'employer' ? <Transactions /> : <CompanyHome />} />
                        <Route path="BuyCredits" element={role == 'employer' ? <BuyCredits /> : <CompanyHome />} />
                        <Route path="recruiters" element={role == 'employer' ? <RecruiterList /> : <CompanyHome />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div >
        </>
    )
}