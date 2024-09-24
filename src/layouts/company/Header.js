import './Header.css';
import { useEffect, useState } from 'react';

import http from '../../helpers/http';
import { Link, useNavigate } from 'react-router-dom';
import { timeAgoMinutes } from '../../helpers/functions';
import handleLogout from '../../helpers/functions/handlelogout';
import Head from './Head';

function Header() {
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    http.get(`/notifications/get/${userId}`)
      .then((res) => setNotificationList(res.data))
      .catch((err) => { console.log(err) })
  }, [])

  const handleNotification = (notification) => {
    navigate(`/company/jobs`);
  }

  return (
    <>
      <Head />
      <nav className="navbar default-layout-navbar col-lg-12 col-12 pt-2 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link to="/">
            <img src="/assets/images/logo-jp.png"
              alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">

              </div>
            </form>
          </div>
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
            <li className="nav-item nav-logout d-none d-lg-block">
              <Link className="nav-link" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" fill="currentColor" className="bi bi-house-dash " viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 1 1 0-1" />
                  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z" />
                </svg>
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
                    <img src="/assets/images/faces/face4.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Mark send you a message</h6>
                    <p className="text-gray mb-0"> 1 Minutes ago </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="/assets/images/faces/face2.jpg" alt="image" className="profile-pic" />
                  </div>
                  <div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                    <h6 className="preview-subject ellipsis mb-1 font-weight-normal">Cregh send you a message</h6>
                    <p className="text-gray mb-0"> 15 Minutes ago </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img src="/assets/images/faces/face3.jpg" alt="image" className="profile-pic" />
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
            <li className="nav-item dropdown" >
              <a style={{ cursor: "pointer" }} className="nav-link count-indicator dropdown-toggle" onClick={() => setShowNotifications(!showNotifications)} id="notificationDropdown" data-bs-toggle="dropdown">
                <i className="mdi mdi-bell-outline"></i>
                <span className="count-symbol bg-danger"></span>
              </a>
              {showNotifications && <div className="notification-menu">
                <div className='d-flex justify-content-between'>
                  <h4>Notifications</h4>
                  <a type='button' onClick={() => setShowNotifications(false)}>&#10060;</a>
                </div>
                <ul className='list-unstyled'>
                  {notificationList && notificationList.map((notification, index) => {
                    if (notification.status == "Approved") {
                      return (
                        <li style={{ cursor: "pointer" }} onClick={() => handleNotification(notification)} className={`alert border d-flex justify-content-between ${notification.isRead ? "alert-light" : "alert-dark"}`}>
                          <span className='text-success fw-bold'>Your Job for {notification.jobTitle} is now Live</span>
                          <span className='small'>{timeAgoMinutes(notification.createdAt)}</span>
                        </li>
                      )
                    } else {
                      return (<>
                        <li onClick={() => { }} className={`alert border rejected-notification d-flex justify-content-between ${notification.isRead ? "alert-light" : "alert-dark"}`}>
                          <div>
                            <div className='text-danger fw-bold'>Your Job for {notification.jobTitle} is {notification.status}</div>
                            <div className='rejected-notification-message'>
                              Reason : <span className='fw-bold'>{notification.message}</span>
                              <div>
                                <Link to={`/company/editjob/${notification.jobId}`}>Click Here to go to Job</Link>
                              </div>
                            </div>
                          </div>
                          <span className='small'>{timeAgoMinutes(notification.createdAt)}</span>
                        </li>
                      </>
                      )
                    }
                  })}
                </ul>
              </div>}
              {/* <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider"></div>
                <Link  className="dropdown-item preview-item">
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
                <Link  className="dropdown-item preview-item">
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
                <Link  className="dropdown-item preview-item">
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
              </div> */}
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
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav >
    </>
  );
}

export default Header;
