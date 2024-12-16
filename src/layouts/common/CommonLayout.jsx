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
import { commonUrls } from '../../services/common/urls/commonUrls.service';


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

                {/* The Urls for all the path is defined in the common url class */}

                <Route path={commonUrls.aboutUs} element={<AboutUs />} />
                <Route path={commonUrls.services} element={<Services />} />
                <Route path={commonUrls.termConditions} element={<Terms />} />
                <Route path={commonUrls.privacyPolicy} element={<Privacy />} />
                <Route path={commonUrls.contactUs} element={<ContactUs />} />
                <Route path={commonUrls.aboutWhVisa} element={<Aboutwhvisa />} />
                <Route path={commonUrls.banking} element={<Banking />} />
                <Route path={commonUrls.typesOfWork} element={<Typesofwork />} />
                <Route path={commonUrls.usefulLinks} element={<Usefullinks />} />
                <Route path={commonUrls.places} element={<Places />} />
                <Route path={commonUrls.transport} element={<Transport />} />
                <Route path={commonUrls.news} element={<News />} />
                <Route path={commonUrls.tax} element={<Tax />} />
                <Route path={commonUrls.accommodation} element={<Accommodation />} />
                <Route path={commonUrls.holidayParks} element={<HolidayParks />} />
                <Route path={commonUrls.freedomCampaining} element={<FreedomCampaining />} />
                <Route path={commonUrls.activities} element={<Activities />} />
                <Route path={commonUrls.jobs} element={<Jobs />} />
                <Route path={commonUrls.singleJob} element={<SingleJob />} />
                <Route path={commonUrls.city} element={<City />} />
                <Route path={commonUrls.forgotPassword} element={<ForgetPassword />} />
                <Route path={commonUrls.resetPassword} element={<ResetPassword />} />
                <Route path={commonUrls.activateAccount} element={<ActivateAccount />} />

                {/* Company Protected Route */}
                <Route path={commonUrls.paymentStatus} element={(role === "employer" || role === "recruiter") ? <PaymentStatus /> : <Navigate to="/" />} />

                {/* User Protected Routes */}
                <Route path={commonUrls.profile} element={(role === 'user') ? <UserProfile /> : <Navigate to="/" />} />
                <Route path={commonUrls.viewProfile} element={(role === 'user') ? <ViewProfile /> : <Navigate to="/" />} />
                <Route path={commonUrls.appliedJobs} element={(role === 'user') ? <Myappliedjobs /> : <Navigate to="/" />} />
                <Route path={commonUrls.savedJobs} element={(role === 'user') ? <Savedjobs /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
            <InfoPopup />
            <LocationPopup />
            <Footer />
        </>
    )
}