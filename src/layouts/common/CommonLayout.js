import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import { JobsContext } from '../../helpers/Context';
import http from '../../helpers/http';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import Home from '../../pages/common/Home';
import UserProfile from "../../pages/common/UserProfile";
import ViewProfile from "../../pages/common/ViewProfile";
import Aboutwhvisa from "../../pages/common/Aboutwhvisa";
import Banking from "../../pages/common/Banking";
import Typesofwork from "../../pages/common/Typesofwork";
import Usefullinks from "../../pages/common/Usefullinks";
import Places from "../../pages/common/Places";
import AboutUs from "../../pages/common/AboutUs";
import Services from "../../pages/common/Services";
import Tax from "../../pages/common/Tax";
import News from "../../pages/common/News";
import Transport from "../../pages/common/Transport";
import Accommodation from "../../pages/common/Accommodation";
import HolidayParks from "../../pages/common/HolidayParks";
import FreedomCampaining from "../../pages/common/FreedomCamping";
import Activities from "../../pages/common/Activities";
import SingleJob from "../../pages/common/SingleJob";
import Terms from "../../pages/common/Terms";
import Privacy from "../../pages/common/Privacy";
import Jobs from "../../pages/common/Jobs";
import Myappliedjobs from "../../pages/common/Myappliedjobs";
import Savedjobs from "../../pages/common/Savedjobs";
import ForgetPassword from "../../pages/common/forgetPassword";
import ResetPassword from "../../pages/common/ResetPassword";
import ActivateAccount from "../../pages/common/ActivateAccount";
import City from "../../pages/common/city";
import ContactUs from "../../pages/common/contactUs";
import PaymentStatus from '../../pages/billing/PaymentStatus';
import NotFound from '../../components/NotFound';

export default function CommonLayout() {
    const [info, setInfo] = useState({})
    const [message, setMessage] = useState({})
    const [locationPopup, setLocationPopup] = useState({})
    const { role } = useCurrentUser()

    useEffect(() => {
        fetchSavedJobsByUser()
    }, [])

    const fetchSavedJobsByUser = async () => {
        if (sessionStorage.getItem('savedJobIds')) return
        const role = localStorage.getItem('role')
        if (role === "user") {
            const user_id = localStorage.getItem("user_id")
            try {
                const res = await http.get(`/users/get-saved-jobs/${user_id}`)
                let savedJobsIds = []
                res.data?.map(item => savedJobsIds.push(item.jobId))
                sessionStorage.setItem("savedJobIds", JSON.stringify(savedJobsIds))
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <JobsContext.Provider value={{ info, setInfo, message, setMessage, locationPopup, setLocationPopup }}>
                <Header />
                <Routes>
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
                    <Route path="/payment-status" element={role === "employer" ? <PaymentStatus /> : <Navigate to="/" />} />
                    <Route path="/cities/:city" element={<City />} />
                    <Route path="/forgotPassword" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/activate-account" element={<ActivateAccount />} />

                    {/* User Protected Routes */}

                    <Route path="profile" element={(role == 'user') ? <UserProfile /> : <Navigate to="/" />} />
                    <Route path="viewprofile" element={(role == 'user') ? <ViewProfile /> : <Navigate to="/" />} />
                    <Route path="applied-jobs" element={(role == 'user') ? <Myappliedjobs /> : <Navigate to="/" />} />
                    <Route path="saved-jobs" element={(role == 'user') ? <Savedjobs /> : <Navigate to="/" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </JobsContext.Provider>
        </>
    )
}