import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import http from '../../helpers/http';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import Home from '../../pages/common/Home';
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
import LocationPopup from '../../components/LocationPopup';
import InfoPopup from '../../components/InfoPopup';
import UserProfile from '../../pages/common/UserProfile';

export default function CommonLayout() {
    const { role, _id } = useCurrentUser()

    useEffect(() => {
        fetchSavedJobsByUser()
    }, [])

    const fetchSavedJobsByUser = async () => {
        if (sessionStorage.getItem('savedJobIds')) return
        if (role === "user") {
            try {
                const res = await http.get(`/users/get-saved-jobs/${_id}`)
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
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="services" element={<Services />} />
                <Route path="terms-conditions" element={<Terms />} />
                <Route path="privacy-policy" element={<Privacy />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="/about-wh-visa" element={<Aboutwhvisa />} />
                <Route path="/banking" element={<Banking />} />
                <Route path="/types-of-work" element={<Typesofwork />} />
                <Route path="/useful-links" element={<Usefullinks />} />
                <Route path="/places" element={<Places />} />
                <Route path="/transport" element={<Transport />} />
                <Route path="/news" element={<News />} />
                <Route path="/tax" element={<Tax />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/holiday-parks" element={<HolidayParks />} />
                <Route path="/freedom-campaining" element={<FreedomCampaining />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<SingleJob />} />
                <Route path="/cities/:city" element={<City />} />
                <Route path="/forgotPassword" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/activate-account" element={<ActivateAccount />} />

                {/* Company Protected Route */}
                <Route path="/payment-status" element={(role === "employer" || role === "recruiter") ? <PaymentStatus /> : <Navigate to="/" />} />

                {/* User Protected Routes */}
                <Route path="profile" element={(role === 'user') ? <UserProfile /> : <Navigate to="/" />} />
                <Route path="viewprofile" element={(role === 'user') ? <ViewProfile /> : <Navigate to="/" />} />
                <Route path="applied-jobs" element={(role === 'user') ? <Myappliedjobs /> : <Navigate to="/" />} />
                <Route path="saved-jobs" element={(role === 'user') ? <Savedjobs /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
            <InfoPopup />
            <LocationPopup />
            <Footer />
        </>
    )
}