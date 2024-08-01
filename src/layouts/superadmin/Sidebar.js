import './Sidebar.css';
import { useState } from 'react';

import { FaUserCircle, FaCogs, FaListUl } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { RiAdminFill, RiAdvertisementFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { RxHamburgerMenu } from 'react-icons/rx';


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
              <a class="nav-link" href="/superadmin/Table">
                <div className='d-flex justify-content-between w-100'>
                  <span>Ads Management</span>
                  <span>
                    <RiAdvertisementFill size={"22"} />
                  </span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/superadmin/admins/List">
                <div className='d-flex justify-content-between w-100'>
                  <span>Admin Management</span>
                  <span>
                    <RiAdminFill size={"22"} />
                  </span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/superadmin/orders">
                <div className='d-flex justify-content-between w-100'>
                  <span>Order Management</span>
                  <span>
                    <BsCardChecklist size={"22"} />
                  </span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/superadmin/jobs">
                <div className='d-flex justify-content-between w-100'>
                  <span>Jobs List</span>
                  <span>
                    <FaListUl size={"20"} />
                  </span>
                </div>
              </a>
            </li>


            <li class="nav-item">
              <a class="nav-link" href="/superadmin/Skills">
                <div className='d-flex justify-content-between w-100'>
                  <span>Skills Management</span>
                  <span>
                    <FaCogs size={"22"} />
                  </span>
                </div>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/superadmin/Categorieslist1">
                <div className='d-flex justify-content-between w-100'>
                  <span>Category Management</span>
                  <span>
                    <BiSolidCategory size={"22"} />
                  </span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/superadmin/pages">
                <div className='d-flex justify-content-between w-100'>
                  <span>Pages Management</span>
                  <span>
                    <IoDocuments size={"22"} />
                  </span>
                </div>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/superadmin/users">
                <div className='d-flex justify-content-between w-100'>
                  <span>User Management</span>
                  <span>
                    <FaUserCircle size={"20"} />
                  </span>
                </div>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/superadmin/locations">
                <div className='d-flex justify-content-between w-100'>
                  <span>Location List</span>
                  <span>
                    <FaMapLocationDot size={"20"} />
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      }
    </>
  );
}

export default Sidebar;
