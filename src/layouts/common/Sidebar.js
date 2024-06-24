import './Sidebar.css';

import { CgProfile } from "react-icons/cg";
import { GoBookmarkFill } from "react-icons/go";
import { LuServer } from "react-icons/lu";

function Sidebar() {
  return (
    <>
      <nav style={{ marginTop: "70px" }} class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">

          <li class="nav-item">
            <a class="nav-link" href="/profile">
              <div className='d-flex justify-content-between w-100'>
                <span>My Profile</span>
                <span>
                  <CgProfile size={"20"} />
                </span>
              </div>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/common/Myappliedjobs">
              <div className='d-flex justify-content-between w-100'>
                <span>Applied Jobs</span>
                <span>
                  <LuServer size={"20"} />
                </span>
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/common/Savedjobs">
              <div className='d-flex justify-content-between w-100'>
                <span>Saved Jobs</span>
                <span>
                  <GoBookmarkFill size={"20"} />
                </span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
