import './Sidebar.css';

import { useContext } from 'react';
import { SidebarContext } from '../../helpers/Context';
import { MdSpaceDashboard, MdAssignment } from "react-icons/md";
import { HiMiniQueueList } from "react-icons/hi2";

function Sidebar() {
  const { showSidebar } = useContext(SidebarContext)
  let sidebarClass = showSidebar ? "sidebar-showing" : "sidebar-not-showing";
  return (
    <>
      <div className={`${sidebarClass}`}>
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
              <a class="nav-link" href="/admin">
                <div className='d-flex justify-content-between w-100'>
                  <span>Dashboard</span>
                  <span>
                    <MdSpaceDashboard size={"20"} />
                  </span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/jobqueuelist">
                <div className='d-flex justify-content-between w-100'>
                  <span>Jobs Queue List</span>
                  <span>
                    <HiMiniQueueList size={"20"} />
                  </span>
                </div>
              </a>
            </li>


            <li class="nav-item">
              <a class="nav-link" href="/admin/myasignjobs">
                <div className='d-flex justify-content-between w-100'>
                  <span>Assigned Jobs</span>
                  <span>
                    <MdAssignment size={"20"} />
                  </span>
                </div>
              </a>
            </li>

            {/* <li class="nav-item">
              <a class="nav-link" href="jobs.html">
                <span class="menu-title">Posted Jobs</span>
                <i class="mdi mdi-contacts menu-icon"></i>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
