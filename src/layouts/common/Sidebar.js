import './Sidebar.css';

function Sidebar() {
  return (
    <>
     <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
           
            <li class="nav-item">
              <a class="nav-link" href="company-profile.html">
                <span class="menu-title">My Profile</span>
                <i class="mdi mdi-contacts menu-icon"></i>
              </a>
            </li>
  
            <li class="nav-item">
              <a class="nav-link" href="jobs.html">
                <span class="menu-title">My Applied Jobs</span>
                <i class="mdi mdi-contacts menu-icon"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="postjob.html">
                <span class="menu-title"> Saved Jobs</span>
                <i class="mdi mdi-contacts menu-icon"></i>
              </a>
            </li>
          </ul>
        </nav>
    </>
  );
}

export default Sidebar;
