import './Sidebar.css';
import { useContext } from 'react';
import { SidebarContext } from '../../helpers/Context';
import { FaUserCircle, FaCogs, FaListUl, FaLocationArrow } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { RiAdminFill, RiAdvertisementFill } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";


function Sidebar() {
  const { showSidebar } = useContext(SidebarContext)
  let sidebarClass = showSidebar ? "sidebar-showing" : "sidebar-not-showing";
  return (
    <>
      {<div className={`${sidebarClass}`}>

        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                  <img src="/assets/images/faces/face1.jpg" alt="profile" />
                  <span class="login-status online"></span>
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2">Employer</span>
                  <span class="text-secondary text-small">Admin</span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li>
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
