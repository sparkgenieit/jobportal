import './Sidebar.css';

function Sidebar() {
  return (
    <>
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
            <a class="nav-link" href="/company">
              <span class="menu-title">Dashboard</span>
              <i class="mdi mdi-home menu-icon"></i>
            </a>
          </li>


          <li class="nav-item">
            <a class="nav-link" href="/company/profile">
              <span class="menu-title">Company Profile</span>
              <i class="mdi mdi-contacts menu-icon"></i>
            </a>
          </li>


          <li>
            <a href="#">Jobs</a>
            <ul class="nav sub-nav">
              <li class="nav-item">
                <a class="nav-link" href="/company/jobs/add">
                  <span class="menu-title">Post a Job</span>
                  <i class="mdi mdi-contacts menu-icon"></i>
                </a>
              </li>


              <li class="nav-item">
                <a class="nav-link" href="/company/jobs/list">
                  <span class="menu-title">Jobs List</span>
                  <i class="mdi mdi-contacts menu-icon"></i>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
