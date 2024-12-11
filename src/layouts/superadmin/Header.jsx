import './Header.css';
import Head from './Head'
import { Link } from 'react-router-dom';
import handleLogout from '../../helpers/functions/handlelogout';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { setIsSidebarOpen } from '../../helpers/slices/generalSlice';

function Header() {
  const { first_name, last_name } = useCurrentUser()
  const fullname = first_name + " " + last_name

  const dispatch = useDispatch()

  return (
    <>
      <Head />
      <nav className="navbar default-layout-navbar col-lg-12 col-12 pt-2 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link to="/"><img className='logo' src="/assets/images/logo-jp.png"
            alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">

          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <Link className="nav-link dropdown-toggle" id="profileDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="nav-profile-img">
                  <img src="/assets/images/faces/face1.jpg" alt="image" />
                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">{fullname}</p>
                </div>
              </Link>
              <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                <Link className="dropdown-item" to="#">
                  <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="#">
                  <i className="mdi mdi-logout me-2 text-primary"></i> Signout </Link>
              </div>
            </li>
            <li className="nav-item d-none d-lg-block full-screen-link">
              <Link className="nav-link">
                <i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link count-indicator dropdown-toggle" id="messageDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="mdi mdi-email-outline"></i>
                <span className="count-symbol bg-warning"></span>
              </Link>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                    <p className="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                    <p className="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Profile picture updated</h6>
                    <p className="text-gray mb-0"> 18 Minutes ago </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <h6 className="p-3 mb-0 text-center">4 new messages</h6>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" to="#" data-bs-toggle="dropdown">
                <i className="mdi mdi-bell-outline"></i>
                <span className="count-symbol bg-danger"></span>
              </Link>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="mdi mdi-calendar"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Event today</h6>
                    <p className="text-gray ellipsis mb-0"> Just a reminder that you have an event today </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="mdi mdi-settings"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Settings</h6>
                    <p className="text-gray ellipsis mb-0"> Update dashboard </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="mdi mdi-link-variant"></i>
                    </div>
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject font-weight-normal mb-1">Launch Admin</h6>
                    <p className="text-gray ellipsis mb-0"> New admin wow! </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <h6 className="p-3 mb-0 text-center">See all notifications</h6>
              </div>
            </li>
            <li className="nav-item nav-logout d-none d-lg-block">
              <span role='button' className="nav-link" onClick={handleLogout}>
                <i className="mdi mdi-power"></i>
              </span>
            </li>
            <li className="nav-item nav-settings d-none d-lg-block">
              <Link className="nav-link" to="#">
                <i className="mdi mdi-format-line-spacing"></i>
              </Link>
            </li>
            <li>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" onClick={() => dispatch(setIsSidebarOpen())} type="button">
                <span className="mdi mdi-menu"></span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
