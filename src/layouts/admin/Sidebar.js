import './Sidebar.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { MdSpaceDashboard, MdAssignment, MdOutlineQuestionMark, MdAssignmentTurnedIn, MdAssignmentInd } from "react-icons/md";
import { HiMiniQueueList, HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { GrDocumentTime } from "react-icons/gr";
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiUserPin } from "react-icons/bi";
import { IoMdMailOpen } from 'react-icons/io';
import { setIsSidebarOpen } from '../../helpers/slices/generalSlice';

function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.general.isSidebarOpen)
  const adminMailCount = useSelector((state) => state.mailCount.AdminUnreadCount)
  const employerMailCount = useSelector((state) => state.mailCount.EmployerUnreadCount)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNavigation = (path) => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false))
    }
    navigate(path)
  }


  return (
    <>
      <div className={`border shadow ${isSidebarOpen ? "sidebar-showing" : "sidebar-not-showing"}`} >
        <nav className="sidebar" id="sidebar">
          <div className=" mt-4 pe-0 d-lg-flex d-none justify-content-end">
            <RxHamburgerMenu role='button' onClick={() => dispatch(setIsSidebarOpen())} fontSize={22} />
          </div>

          <ul className="nav">
            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin")} >
                <div className='d-flex justify-content-between w-100'>
                  <span>Dashboard</span>
                  <span>
                    <MdSpaceDashboard size={"20"} />
                  </span>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/jobqueuelist")} >
                <div className='d-flex justify-content-between w-100'>
                  <span>Jobs Queue List</span>
                  <span>
                    <HiMiniQueueList size={"20"} />
                  </span>
                </div>
              </div>
            </li>


            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/myasignjobs")} >
                <div className='d-flex justify-content-between w-100'>
                  <span>Assigned Jobs</span>
                  <span>
                    <MdAssignment size={"20"} />
                  </span>
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/profiles/queue")} >
                <div className='d-flex justify-content-between w-100'>
                  <span>Profiles Queue</span>
                  <span>
                    <MdAssignmentInd size={"20"} />
                  </span>
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/profiles/assigned")} >
                <div className='d-flex justify-content-between w-100'>
                  <span>Assigned Profiles</span>
                  <span>
                    <MdAssignmentTurnedIn size={"20"} />
                  </span>
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/employer-queries")} >
                <div className='d-flex justify-content-between w-100'>
                  <span>Employer Queries</span>
                  <span>
                    <BiUserPin size={"22"} />
                  </span>
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/general-queries")}>
                <div className='d-flex justify-content-between w-100'>
                  <span>General Queries</span>
                  <span>
                    < MdOutlineQuestionMark size={"20"} />
                  </span>
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/inbox")} >
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex gap-3 align-items-center'>
                    <span>Mail</span>
                    <span className='fs-6 text-danger'>
                      {employerMailCount > 0 ? employerMailCount : null}
                    </span>
                  </span>
                  <IoMdMailOpen size={"22"} />
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/admin-inbox")} >
                <div className='d-flex align-items-center justify-content-between w-100'>
                  <span className='d-flex gap-3 align-items-center'>
                    <span>Admin Mails</span>
                    <span className='fs-6 text-danger'>
                      {adminMailCount > 0 ? adminMailCount : null}
                    </span>
                  </span>
                  <IoMdMailOpen size={"22"} />
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/audit")} >
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <span>
                    Audit Log
                  </span>
                  <span>
                    <HiOutlineDocumentMagnifyingGlass size={"22"} />
                  </span>
                </div>
              </div>
            </li >

            <li className="nav-item">
              <div className="nav-link" role="button" onClick={() => handleNavigation("/admin/my-logs")} >
                <div className='d-flex justify-content-between pe-1 align-items-center w-100'>
                  <span>
                    Admin Logs
                  </span>
                  <span>
                    <GrDocumentTime size={"18"} />
                  </span>
                </div>
              </div>
            </li >

          </ul >
        </nav >
      </div >
    </>
  );
}

export default Sidebar;
