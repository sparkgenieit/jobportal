import './Sidebar.css';

import { useState } from 'react';
import { MdSpaceDashboard, MdAssignment } from "react-icons/md";
import { HiMiniQueueList } from "react-icons/hi2";
import { RxHamburgerMenu } from 'react-icons/rx';

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
