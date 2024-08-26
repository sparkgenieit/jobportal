import './Sidebar.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MdSpaceDashboard, MdAssignment } from "react-icons/md";
import { HiMiniQueueList } from "react-icons/hi2";
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiUserPin } from "react-icons/bi";
import { IoMdMailOpen } from 'react-icons/io';

function Sidebar() {
  // const { showSidebar } = useContext(SidebarContext)
  const [showSidebar, setShowSidebar] = useState(true)
  let sidebarClass = showSidebar ? { marginLeft: "0" } : { marginLeft: "-230px" };
  return (
    <>
      <div style={sidebarClass}>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <div className=" mt-4 pe-0 d-flex justify-content-end">
            <RxHamburgerMenu role='button' onClick={() => setShowSidebar(prev => !prev)} fontSize={22} />
          </div>
          <ul class="nav">
            {/* <li class="nav-item nav-profile">
              <Link to="#" class="nav-link">
                <div class="nav-profile-image">
                  <img src="/assets/images/faces/face1.jpg" alt="profile" />
                  <span class="login-status online"></span>
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2">Employer</span>
                  <span class="text-secondary text-small">Admin</span>
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </Link>
            </li> */}
            <li class="nav-item">
              <Link class="nav-link" to="/admin">
                <div className='d-flex justify-content-between w-100'>
                  <span>Dashboard</span>
                  <span>
                    <MdSpaceDashboard size={"20"} />
                  </span>
                </div>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/admin/jobqueuelist">
                <div className='d-flex justify-content-between w-100'>
                  <span>Jobs Queue List</span>
                  <span>
                    <HiMiniQueueList size={"20"} />
                  </span>
                </div>
              </Link>
            </li>


            <li class="nav-item">
              <Link class="nav-link" to="/admin/myasignjobs">
                <div className='d-flex justify-content-between w-100'>
                  <span>Assigned Jobs</span>
                  <span>
                    <MdAssignment size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/admin/user-queries">
                <div className='d-flex justify-content-between w-100'>
                  <span>User Queries</span>
                  <span>
                    <BiUserPin size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/admin/inbox">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span>Mail</span>

                  <IoMdMailOpen size={"22"} />

                </div>
              </Link>
            </li>

            {/* <li class="nav-item">
              <Link class="nav-link" to="jobs.html">
                <span class="menu-title">Posted Jobs</span>
                <i class="mdi mdi-contacts menu-icon"></i>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
