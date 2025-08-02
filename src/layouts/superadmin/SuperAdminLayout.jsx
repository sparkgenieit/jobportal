import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "../admin/Footer";
import { setAdminUnreadCount } from "../../helpers/slices/mailCountSlice";
import http from "../../helpers/http";
import { superAdminUrl } from "../../services/common/urls/superAdminUrl.service";

// Lazy load all route components
const SuperAdminHome = lazy(() => import("../../pages/superadmin/Home"));
const Categories1 = lazy(() =>
  import("../../pages/superadmin/categories/Categories1")
);
const Categorieslist1 = lazy(() =>
  import("../../pages/superadmin/categories/Categorieslist1")
);
const Create = lazy(() =>
  import("../../pages/superadmin/adimin-management/Create")
);
const List = lazy(() =>
  import("../../pages/superadmin/adimin-management/List")
);
const UserList = lazy(() => import("../../pages/superadmin/user/UserList"));
const OrdersList = lazy(() =>
  import("../../pages/superadmin/Order-Management/OrdersList")
);
const Addpage = lazy(() =>
  import("../../pages/superadmin/Pages-Management/AddPages")
);
const PagesList = lazy(() =>
  import("../../pages/superadmin/Pages-Management/PagesList")
);
const SpecificPageList = lazy(() =>
  import("../../pages/superadmin/Specific-Page-Management/SpecificPageList")
);
const Skills = lazy(() =>
  import("../../pages/superadmin/Skills-Management/Skills")
);
const Addskills = lazy(() =>
  import("../../pages/superadmin/Skills-Management/Addskills")
);
const EditSkill = lazy(() =>
  import("../../pages/superadmin/Skills-Management/EditSkill")
);

const GalleryList = lazy(() =>
  import("../../pages/superadmin/Gallery-Management/GalleryList")
);
const AddGalleryItem = lazy(() =>
  import("../../pages/superadmin/Gallery-Management/AddGalleryItem")
);
const EditGalleryItem = lazy(() =>
  import("../../pages/superadmin/Gallery-Management/EditGalleryItem")
);

const GalleryAdList = lazy(() =>
  import("../../pages/superadmin/GalleryAd-Management/GalleryAdList")
);
const AddGalleryAd = lazy(() =>
  import("../../pages/superadmin/GalleryAd-Management/AddGalleryAd")
);

const EditGalleryAd = lazy(() =>
  import("../../pages/superadmin/GalleryAd-Management/EditGalleryAd")
);

const EditCategory = lazy(() =>
  import("../../pages/superadmin/categories/EditCategory")
);
const JobsListSuperAdmin = lazy(() =>
  import("../../pages/superadmin/joblist/jobslist")
);
const AdsListSuperAdmin = lazy(() =>
  import("../../pages/superadmin/adlist/adslist")
);
const JobSuperAdmin = lazy(() =>
  import("../../pages/superadmin/joblist/JobSuperadmin")
);
const AdSuperAdmin = lazy(() =>
  import("../../pages/superadmin/adlist/AdSuperadmin")
);

const Profile = lazy(() => import("../../pages/superadmin/user/Profile"));
const LocationList = lazy(() =>
  import("../../pages/superadmin/locations-list/LocationList")
);
const SendMailToAllEmployer = lazy(() =>
  import("../../pages/superadmin/mail/SendMailToAllEmployer")
);
const MailAdmin = lazy(() => import("../../pages/superadmin/mail/MailAdmin"));
const SuperAdminInbox = lazy(() => import("../../pages/superadmin/mail/Inbox"));
const CreditsManagement = lazy(() =>
  import("../../pages/superadmin/Credtis-Management/CreditsManagement")
);
const Chat = lazy(() => import("../../pages/superadmin/mail/Chat"));
const Audit = lazy(() => import("../../pages/superadmin/Audit_Log/Audit_Log"));
const AdminAuditLogs = lazy(() =>
  import("../../pages/superadmin/Audit_Log/AdminAuditLogs")
);
const AdForm = lazy(() =>
  import("../../pages/superadmin/adsmanagement/AdForm")
);
const AdminAdsList = lazy(() =>
  import("../../pages/superadmin/adsmanagement/AdminAdsList")
);
const AdsList = lazy(() => import("../../pages/company/common/AdsList"));
const NotFound = lazy(() => import("../../components/NotFound"));

export default function SuperAdminLayout() {
  const dispatch = useDispatch();

  const AdminMailUnreadCount = async () => {
    try {
      const { data } = await http.get("/mails/unread-mails");
      dispatch(setAdminUnreadCount(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AdminMailUnreadCount();
  }, []);

  return (
    <div className="container-scroller">
      <Header />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<SuperAdminHome />} />
            <Route path={superAdminUrl.addCategory} element={<Categories1 />} />
            <Route path={superAdminUrl.addSkills} element={<Addskills />} />
            <Route
              path={superAdminUrl.categoriesList}
              element={<Categorieslist1 />}
            />
            <Route
              path={superAdminUrl.editCategory}
              element={<EditCategory />}
            />
            <Route path={superAdminUrl.viewProfile} element={<Profile />} />
            <Route path={superAdminUrl.locations} element={<LocationList />} />
            <Route path={superAdminUrl.createAdmin} element={<Create />} />
            <Route path={superAdminUrl.adminList} element={<List />} />
            <Route path={superAdminUrl.postAd} element={<AdForm />} />
            <Route path={superAdminUrl.adsList} element={<AdminAdsList />} />
            <Route
              path={superAdminUrl.companyAdsList}
              element={<AdsList role="SuperAdmin" />}
            />
            <Route path={superAdminUrl.skillsList} element={<Skills />} />
            <Route path={superAdminUrl.users} element={<UserList />} />
            <Route path={superAdminUrl.editSkills} element={<EditSkill />} />
            <Route path={superAdminUrl.galleryList} element={<GalleryList />} />
            <Route path={superAdminUrl.addGallery} element={<AddGalleryItem />} />
            <Route path={superAdminUrl.editGallery} element={<EditGalleryItem />} />
            <Route path={superAdminUrl.galleryAdList} element={<GalleryAdList />} />
            <Route path={superAdminUrl.addGalleryAd} element={<AddGalleryAd />} />
            <Route path={superAdminUrl.editGalleryAd} element={<EditGalleryAd />} />
          
            <Route path={superAdminUrl.orders} element={<OrdersList />} />
            <Route
              path={superAdminUrl.creditsManagement}
              element={<CreditsManagement />}
            />
            <Route
              path={superAdminUrl.mail}
              element={<SendMailToAllEmployer />}
            />
            <Route path={superAdminUrl.adminMail} element={<MailAdmin />} />
            <Route
              path={superAdminUrl.adminInbox}
              element={<SuperAdminInbox />}
            />
            <Route path={superAdminUrl.inboxDetails} element={<Chat />} />
            <Route path={superAdminUrl.addPage} element={<Addpage />} />
            <Route path={superAdminUrl.pages} element={<PagesList />} />
            <Route
              path={superAdminUrl.specificPage}
              element={<SpecificPageList />}
            />
            <Route path={superAdminUrl.jobs} element={<JobsListSuperAdmin />} />
            <Route path={superAdminUrl.ads} element={<AdsListSuperAdmin />} />
            <Route path={superAdminUrl.viewAd} element={<AdSuperAdmin />} />
            <Route path={superAdminUrl.viewJob} element={<JobSuperAdmin />} />
            <Route path={superAdminUrl.audit} element={<Audit />} />
            <Route
              path={superAdminUrl.adminAudit}
              element={<AdminAuditLogs />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
