import "./App.css"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./pages/admin/login";
import SuperAdminLogin from "./pages/superadmin/login";

// Functions
import { fetchUser } from "./helpers/slices/userSlice";
import useCurrentUser from "./helpers/Hooks/useCurrentUser";
import Loader from "./components/Loader";
import Toaster from "./components/Toaster";
import { Roles } from "./services/common/Roles.service";
import LandingPageAdvert from "./pages/common/Ads/LandingPageAdvert";

// Layouts
const CompanyLayout = lazy(() => import("./layouts/company/CompanyLayout"));
const AdminLayout = lazy(() => import("./layouts/admin/AdminLayout"));
const SuperAdminLayout = lazy(() => import("./layouts/superadmin/SuperAdminLayout"));
const CommonLayout = lazy(() => import("./layouts/common/CommonLayout"));
const RecruiterLayout = lazy(() => import("./layouts/recruiter/RecruiterLayout"));
const DownloadTransactions = lazy(() => import("./pages/company/DownloadTransactions"));

function App() {
  const { role } = useCurrentUser();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (localStorage.getItem("isSignedIn")) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <BrowserRouter>
      <AppContent role={role} />
    </BrowserRouter>
  );
}

function AppContent({ role }) {
  const location = useLocation(); // ✅ Now inside BrowserRouter

  return (
    <>
      <Routes>
        <Route
          path="/company/transactions/download-transactions"
          element={
            role === Roles.Company || role === Roles.Recruiter ? (
              <Suspense fallback={<Loader />}>
                <DownloadTransactions />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/company/*"
          element={
            role === Roles.Company ? (
              <Suspense fallback={<Loader />}>
                <CompanyLayout />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/recruiter/*"
          element={
            role === Roles.Recruiter ? (
              <Suspense fallback={<Loader />}>
                <RecruiterLayout />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin/*"
          element={
            role === Roles.Admin ? (
              <Suspense fallback={<Loader />}>
                <AdminLayout />
              </Suspense>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/superadmin/*"
          element={
            role === Roles.SuperAdmin ? (
              <Suspense fallback={<Loader />}>
                <SuperAdminLayout />
              </Suspense>
            ) : (
              <SuperAdminLogin />
            )
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <CommonLayout />
            </Suspense>
          }
        />
      </Routes>

      <Toaster />

      {/* ✅ Show LandingPageAdvert ONLY on Home Page */}
      {location.pathname === "/" && <LandingPageAdvert />}
    </>
  );
}

export default App;
