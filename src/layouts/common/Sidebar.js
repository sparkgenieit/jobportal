import './Sidebar.css';

function Sidebar() {
  return (
    <>
     <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                
                  <span class="login-status online"></span>
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2">User</span>
                 
                </div>
                <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
              </a>
            </li>
  
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
