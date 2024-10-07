import { lazy, Suspense, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./pages/admin/login";
import SuperAdminLogin from "./pages/superadmin/login";

//Context
import GeneralProvider from "./helpers/Context/GeneralContext";

// Functions
import { fetchUser } from "./helpers/slices/userSlice";
import useCurrentUser from "./helpers/Hooks/useCurrentUser";
import Loader from "./components/Loader";

// Layouts
const CompanyLayout = lazy(() => import("./layouts/company/CompanyLayout"))
const AdminLayout = lazy(() => import("./layouts/admin/AdminLayout"))
const SuperAdminLayout = lazy(() => import("./layouts/superadmin/SuperAdminLayout"))
const CommonLayout = lazy(() => import("./layouts/common/CommonLayout"))

const DownloadTransactions = lazy(() => import("./pages/company/DownloadTransactions"));

function App() {
  const { role } = useCurrentUser()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (localStorage.getItem("isSignedIn")) {
      dispatch(fetchUser())
    }
  }, [])

  return (
    <BrowserRouter>
      <GeneralProvider>
        <Routes>

          <Route
            path="/company/transactions/download-transactions"
            element={
              (role === 'employer' || role === "recruiter") ?
                <Suspense fallback={<Loader />}>
                  < DownloadTransactions />
                </Suspense>
                :
                <Navigate to="/" />
            }
          />

          <Route
            path="/company/*"
            element={
              (role == 'employer' || role === "recruiter") ?
                <Suspense fallback={<Loader />}>
                  <CompanyLayout />
                </Suspense>
                :
                <Navigate to="/" />
            }
          />

          <Route
            path="/admin/*"
            element={
              (role == 'admin') ?
                <Suspense fallback={<Loader />}>
                  <AdminLayout />
                </Suspense>
                :
                <Login />
            }
          />

          <Route
            path="/superadmin/*"
            element={
              (role == 'superadmin') ?
                <Suspense fallback={<Loader />}>
                  <SuperAdminLayout />
                </Suspense>
                :
                <SuperAdminLogin />
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
      </GeneralProvider>
    </BrowserRouter >
  )
}

export default App;
