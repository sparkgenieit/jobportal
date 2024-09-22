import './Header.css';
import './assets/css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import handleLogout from "../../helpers/functions/handlelogout"

function Heder() {
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');

  return (
    <>
      <nav class="navbar default-layout-navbar col-lg-12 col-12 pt-2 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link to="/"><img style={{ objectFit: "contain" }} src="/assets/images/logo-jp.png"
            alt="logo" /></Link>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">

          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown">
              <Link class="nav-link dropdown-toggle" id="profileDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="nav-profile-img">
                  <img src="/assets/images/faces/face1.jpg" alt="image" />
                  <span class="availability-status online"></span>
                </div>
                <div class="nav-profile-text">
                  <p class="mb-1 text-black">{fullname}</p>
                </div>
              </Link>
              <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                <Link class="dropdown-item" to="#">
                  <i class="mdi mdi-cached me-2 text-success"></i> Activity Log </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item" to="#">
                  <i class="mdi mdi-logout me-2 text-primary"></i> Signout </Link>
              </div>
            </li>
            <li class="nav-item d-none d-lg-block full-screen-link">
              <Link class="nav-link">
                <i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </Link>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link count-indicator dropdown-toggle" id="messageDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-email-outline"></i>
                <span class="count-symbol bg-warning"></span>
              </Link>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <h6 class="p-3 mb-0">Messages</h6>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img src="assets/images/faces/face4.jpg" alt="image" class="profile-pic" />
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                    <p class="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img src="/assets/images/faces/face2.jpg" alt="image" class="profile-pic" />
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                    <p class="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <img src="assets/images/faces/face3.jpg" alt="image" class="profile-pic" />
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                    <p class="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </Link>
                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li>
            <li class="nav-item dropdown">
              <Link class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-bs-toggle="dropdown">
                <i class="mdi mdi-bell-outline"></i>
                <span class="count-symbol bg-danger"></span>
              </Link>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 class="p-3 mb-0">Notifications</h6>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-success">
                      <i class="mdi mdi-calendar"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Event today</h6>
                    <p class="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                  </div>
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-warning">
                      <i class="mdi mdi-settings"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Settings</h6>
                    <p class="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </Link>
                <div class="dropdown-divider"></div>
                <Link class="dropdown-item preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 class="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                    <p class="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </Link>
                <div class="dropdown-divider"></div>
                <h6 class="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li>
            <li class="nav-item nav-logout d-none d-lg-block">
              <span role='button' className="nav-link" onClick={handleLogout}>
                <i className="mdi mdi-power"></i>
              </span>
            </li>
            <li class="nav-item nav-settings d-none d-lg-block">
              <Link class="nav-link" to="#">
                <i class="mdi mdi-format-line-spacing"></i>
              </Link>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Heder;
