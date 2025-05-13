import React, { useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import http from '../../helpers/http';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import InfoPopup from '../../components/InfoPopup';
import LocationPopup from '../../components/LocationPopup';
import { commonUrls } from '../../services/common/urls/commonUrls.service';
import { Roles } from '../../services/common/Roles.service';

const Home = lazy(() => import('../../pages/common/Home'));
const ViewProfile = lazy(() => import('../../pages/common/ViewProfile'));
const Aboutwhvisa = lazy(() => import('../../pages/common/Aboutwhvisa'));
const Banking = lazy(() => import('../../pages/common/Banking'));
const Typesofwork = lazy(() => import('../../pages/common/Typesofwork'));
const Usefullinks = lazy(() => import('../../pages/common/Usefullinks'));
const Places = lazy(() => import('../../pages/common/Places'));
const AboutUs = lazy(() => import('../../pages/common/AboutUs'));
const Services = lazy(() => import('../../pages/common/Services'));
const Tax = lazy(() => import('../../pages/common/Tax'));
const News = lazy(() => import('../../pages/common/News'));
const Transport = lazy(() => import('../../pages/common/Transport'));
const Accommodation = lazy(() => import('../../pages/common/Accommodation'));
const HolidayParks = lazy(() => import('../../pages/common/HolidayParks'));
const FreedomCampaining = lazy(() => import('../../pages/common/FreedomCamping'));
const Activities = lazy(() => import('../../pages/common/Activities'));
const Terms = lazy(() => import('../../pages/common/Terms'));
const Privacy = lazy(() => import('../../pages/common/Privacy'));
const Jobs = lazy(() => import('../../pages/common/Jobs'));
const Myappliedjobs = lazy(() => import('../../pages/common/Myappliedjobs'));
const Savedjobs = lazy(() => import('../../pages/common/Savedjobs'));
const ForgetPassword = lazy(() => import('../../pages/common/forgetPassword'));
const ResetPassword = lazy(() => import('../../pages/common/ResetPassword'));
const ActivateAccount = lazy(() => import('../../pages/common/ActivateAccount'));
const City = lazy(() => import('../../pages/common/city'));
const ContactUs = lazy(() => import('../../pages/common/contactUs'));
const PaymentStatus = lazy(() => import('../../pages/company/PaymentStatus'));
const NotFound = lazy(() => import('../../components/NotFound'));
const UserProfile = lazy(() => import('../../pages/common/UserProfile'));
const ViewJob = lazy(() => import('../../pages/common/ViewJob/ViewJob'));
const MainContent = lazy(() => import('../../pages/common/NavbarItemPages/MainContent'));

export default function CommonLayout() {
    const { role, _id } = useCurrentUser();

    useEffect(() => {
        fetchSavedJobsByUser();
    }, []);

    const fetchSavedJobsByUser = async () => {
        if (sessionStorage.getItem('savedJobIds')) return;
        if (role === "user") {
            try {
                const res = await http.get(`/users/get-saved-jobs/${_id}`);
                let savedJobsIds = [];
                res.data?.map(item => savedJobsIds.push(item.jobId));
                sessionStorage.setItem("savedJobIds", JSON.stringify(savedJobsIds));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route index element={<Home />} />
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
                    <Route path={commonUrls.singleJob} element={<ViewJob />} />
                    <Route path={commonUrls.city} element={<City />} />
                    <Route path={commonUrls.forgotPassword} element={<ForgetPassword />} />
                    <Route path={commonUrls.resetPassword} element={<ResetPassword />} />
                    <Route path={commonUrls.activateAccount} element={<ActivateAccount />} />
                    <Route path={commonUrls.navBarCategories} element={<MainContent />} />
                    <Route path={commonUrls.paymentStatus} element={(role === Roles.Company || role === Roles.Recruiter) ? <PaymentStatus /> : <Navigate to="/" />} />
                    <Route path={commonUrls.profile} element={(role === Roles.User) ? <UserProfile /> : <Navigate to="/" />} />
                    <Route path={commonUrls.viewProfile} element={(role === Roles.User) ? <ViewProfile /> : <Navigate to="/" />} />
                    <Route path={commonUrls.appliedJobs} element={(role === Roles.User) ? <Myappliedjobs /> : <Navigate to="/" />} />
                    <Route path={commonUrls.savedJobs} element={(role === Roles.User) ? <Savedjobs /> : <Navigate to="/" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <InfoPopup />
            <LocationPopup />
            <Footer />
        </>
    );
}