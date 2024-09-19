import './Sidebar.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { MdSpaceDashboard, MdAssignment } from "react-icons/md";
import { HiMiniQueueList } from "react-icons/hi2";
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiUserPin } from "react-icons/bi";
import { IoMdMailOpen } from 'react-icons/io';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true)
  let sidebarClass = showSidebar ? { marginLeft: "0" } : { marginLeft: "-230px" };
  const adminMailCount = useSelector((state) => state.mailCount.AdminUnreadCount)
  const employerMailCount = useSelector((state) => state.mailCount.EmployerUnreadCount)


  return (
    <>
      <div style={sidebarClass}>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <div className=" mt-4 pe-0 d-flex justify-content-end">
            <RxHamburgerMenu role='button' onClick={() => setShowSidebar(prev => !prev)} fontSize={22} />
          </div>

          <ul class="nav">
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
              <Link class="nav-link" to="/admin/employer-queries">
                <div className='d-flex justify-content-between w-100'>
                  <span>Employer Queries</span>
                  <span>
                    <BiUserPin size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/admin/inbox">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex gap-3 align-items-center'>
                    <span>Mail</span>
                    <span className='fs-6 text-danger'>
                      {employerMailCount > 0 ? employerMailCount : null}
                    </span>
                  </span>
                  <IoMdMailOpen size={"22"} />
                </div>
              </Link>
            </li>

            <li class="nav-item">
              <Link class="nav-link" to="/admin/admin-inbox">
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex gap-3 align-items-center'>
                    <span>Admin Mails</span>
                    <span className='fs-6 text-danger'>
                      {adminMailCount > 0 ? adminMailCount : null}
                    </span>
                  </span>
                  <IoMdMailOpen size={"22"} />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
