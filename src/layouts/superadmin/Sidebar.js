import './Sidebar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaUserCircle, FaCogs, FaListUl, FaDollarSign } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { RiAdminFill, RiAdvertisementFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdMailOpen, IoMdMailUnread } from 'react-icons/io';


function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true)
  let sidebarClass = showSidebar ? { marginLeft: "0" } : { marginLeft: "-230px" };
  return (
    <>
      {<div style={sidebarClass}>

        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">

            <div className=" mt-4 pe-0 d-flex justify-content-end">
              <RxHamburgerMenu role='button' onClick={() => setShowSidebar(prev => !prev)} fontSize={22} />
            </div>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/Table">
                <div className='d-flex justify-content-between w-100'>
                  <span>Ads Management</span>
                  <span>
                    <RiAdvertisementFill size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/admins/List">
                <div className='d-flex justify-content-between w-100'>
                  <span>Admin Management</span>
                  <span>
                    <RiAdminFill size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/orders">
                <div className='d-flex justify-content-between w-100'>
                  <span>Order Management</span>
                  <span>
                    <BsCardChecklist size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/mail">
                <div className='d-flex justify-content-between w-100'>
                  <span>Mail</span>
                  <span>
                    <IoMdMailUnread size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/inbox">
                <div className='d-flex justify-content-between w-100'>
                  <span>Inbox</span>
                  <span>
                    <IoMdMailOpen size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/jobs">
                <div className='d-flex justify-content-between w-100'>
                  <span>Jobs List</span>
                  <span>
                    <FaListUl size={"20"} />
                  </span>
                </div>
              </Link>
            </li>


            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/Skills">
                <div className='d-flex justify-content-between w-100'>
                  <span>Skills Management</span>
                  <span>
                    <FaCogs size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/Categorieslist1">
                <div className='d-flex justify-content-between w-100'>
                  <span>Category Management</span>
                  <span>
                    <BiSolidCategory size={"22"} />
                  </span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/pages">
                <div className='d-flex justify-content-between w-100'>
                  <span>Pages Management</span>
                  <span>
                    <IoDocuments size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/users">
                <div className='d-flex justify-content-between w-100'>
                  <span>User Management</span>
                  <span>
                    <FaUserCircle size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/locations">
                <div className='d-flex justify-content-between w-100'>
                  <span>Location List</span>
                  <span>
                    <FaMapLocationDot size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/superadmin/credits-management">
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
