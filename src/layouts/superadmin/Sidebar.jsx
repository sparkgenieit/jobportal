import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FaUserCircle, FaCogs, FaListUl, FaDollarSign } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { GrDocumentTime } from "react-icons/gr";
import { RiAdminFill, RiAdvertisementFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdMailOpen, IoMdMailUnread } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";

import { setIsSidebarOpen } from "../../helpers/slices/generalSlice";

function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.general.isSidebarOpen);
  const adminMailCount = useSelector(
    (state) => state.mailCount.AdminUnreadCount
  );
  const [isAdsOpen, setIsAdsOpen] = useState(false); // State for toggling Ads Management submenu

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (path) => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false));
    }
    navigate(path);
  };

  return (
    <>
      <div
        className={`border shadow ${
          isSidebarOpen ? "sidebar-showing" : "sidebar-not-showing"
        }`}
      >
        <nav className="sidebar" id="sidebar">
          <ul className="nav">
            <div className=" mt-4 pe-0 justify-content-end d-lg-flex d-none">
              <RxHamburgerMenu
                role="button"
                onClick={() => dispatch(setIsSidebarOpen())}
                fontSize={22}
              />
            </div>

            {/* Ads Management - Clickable Parent */}
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => setIsAdsOpen(!isAdsOpen)}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Ads Management</span>
                  <span>
                    <RiAdvertisementFill size={"22"} />
                    <span className={`ms-2 ${isAdsOpen ? "rotate-icon" : ""}`}>
                      ▼
                    </span>
                  </span>
                </div>
              </div>

              {/* Submenu - Visible only if isAdsOpen is true */}
              {isAdsOpen && (
                <ul className="nav flex-column ms-3">
                  <li className="nav-item">
                    <div
                      className="nav-link"
                      role="button"
                      onClick={() => handleNavigation("/superadmin/admin-ads")}
                    >
                      <span>Admin Ads</span>
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className="nav-link"
                      role="button"
                      onClick={() =>
                        handleNavigation("/superadmin/company-ads")
                      }
                    >
                      <span>Company Ads</span>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/admins/List")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Admin Management</span>
                  <span>
                    <RiAdminFill size={"22"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/orders")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Order Management</span>
                  <span>
                    <BsCardChecklist size={"22"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/mail")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Bulk Mail</span>
                  <span>
                    <IoMdMailUnread size={"22"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/admin-inbox")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span className="d-flex gap-3 align-items-center">
                    <span>Inbox</span>
                    <span className="fs-6 text-danger">
                      {adminMailCount > 0 ? adminMailCount : null}
                    </span>
                  </span>
                  <span>
                    <IoMdMailOpen size={"22"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/jobs")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Jobs List</span>
                  <span>
                    <FaListUl size={"20"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/ads")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Ads List</span>
                  <span>
                    <FaListUl size={"20"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/Skills")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Skills Management</span>
                  <span>
                    <FaCogs size={"22"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/gallery")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Gallery Management</span>
                  <span>
                    <FaCogs size={"22"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/Categorieslist1")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Category Management</span>
                  <span>
                    <BiSolidCategory size={"22"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/pages")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Pages Management</span>
                  <span>
                    <IoDocuments size={"22"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/specific-page")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Specific Page Management</span>
                  <span>
                    <IoDocuments size={"22"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/users")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>User Management</span>
                  <span>
                    <FaUserCircle size={"20"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/audit")}
              >
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>Audit Log</span>
                  <span>
                    <HiOutlineDocumentMagnifyingGlass size={"22"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/audit/admin")}
              >
                <div className="d-flex justify-content-between pe-1 align-items-center w-100">
                  <span>Admin Audit Logs</span>
                  <span>
                    <GrDocumentTime size={"18"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() => handleNavigation("/superadmin/locations")}
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Location List</span>
                  <span>
                    <FaMapLocationDot size={"20"} />
                  </span>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={() =>
                  handleNavigation("/superadmin/credits-management")
                }
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Credits Management</span>
                  <span>
                    <FaDollarSign size={"20"} />
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
