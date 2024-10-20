import './Sidebar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaUserCircle, FaCogs, FaListUl, FaDollarSign } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { GrDocumentTime } from "react-icons/gr";
import { RiAdminFill, RiAdvertisementFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdMailOpen, IoMdMailUnread } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true)
  let sidebarClass = showSidebar ? { marginLeft: "0" } : { marginLeft: "-230px" };
  const adminMailCount = useSelector((state) => state.mailCount.AdminUnreadCount)
  return (
    <>
      {<div style={sidebarClass}>

        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">

            <div className=" mt-4 pe-0 d-flex justify-content-end">
              <RxHamburgerMenu role='button' onClick={() => setShowSidebar(prev => !prev)} fontSize={22} />
            </div>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/Table">
                <div className='d-flex justify-content-between w-100'>
                  <span>Ads Management</span>
                  <span>
                    <RiAdvertisementFill size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/admins/List">
                <div className='d-flex justify-content-between w-100'>
                  <span>Admin Management</span>
                  <span>
                    <RiAdminFill size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/orders">
                <div className='d-flex justify-content-between w-100'>
                  <span>Order Management</span>
                  <span>
                    <BsCardChecklist size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/mail">
                <div className='d-flex justify-content-between w-100'>
                  <span>Bulk Mail</span>
                  <span>
                    <IoMdMailUnread size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/admin-inbox">
                <div className='d-flex justify-content-between w-100'>
                  <span className='d-flex gap-3 align-items-center'>
                    <span>Inbox</span>
                    <span className='fs-6 text-danger'>
                      {adminMailCount > 0 ? adminMailCount : null}
                    </span>
                  </span>
                  <span>
                    <IoMdMailOpen size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/jobs">
                <div className='d-flex justify-content-between w-100'>
                  <span>Jobs List</span>
                  <span>
                    <FaListUl size={"20"} />
                  </span>
                </div>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/Skills">
                <div className='d-flex justify-content-between w-100'>
                  <span>Skills Management</span>
                  <span>
                    <FaCogs size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/Categorieslist1">
                <div className='d-flex justify-content-between w-100'>
                  <span>Category Management</span>
                  <span>
                    <BiSolidCategory size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/pages">
                <div className='d-flex justify-content-between w-100'>
                  <span>Pages Management</span>
                  <span>
                    <IoDocuments size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/users">
                <div className='d-flex justify-content-between w-100'>
                  <span>User Management</span>
                  <span>
                    <FaUserCircle size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/audit">
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <span>
                    Audit Log
                  </span>
                  <span>
                    <HiOutlineDocumentMagnifyingGlass size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/audit/admin">
                <div className='d-flex justify-content-between pe-1 align-items-center w-100'>
                  <span>
                    Admin Audit Logs
                  </span>
                  <span>
                    <GrDocumentTime size={"18"} />
                  </span>
                </div>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/locations">
                <div className='d-flex justify-content-between w-100'>
                  <span>Location List</span>
                  <span>
                    <FaMapLocationDot size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/superadmin/credits-management">
                <div className='d-flex justify-content-between w-100'>
                  <span>Credits Management</span>
                  <span>
                    <FaDollarSign size={"20"} />
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      }
    </>
  );
}

export default Sidebar;
