import './Header.css';
import { useEffect, useState } from 'react';

import http from '../../helpers/http';
import { Link, useNavigate } from 'react-router-dom';
import { timeAgoMinutes } from '../../helpers/functions';
import handleLogout from '../../helpers/functions/handlelogout';
import Head from './Head';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { setIsSidebarOpen } from '../../helpers/slices/generalSlice';

function Header() {
  const { name, role, first_name, last_name, _id: userId } = useCurrentUser()
  const fullname = role === "recruiter" ? name : first_name + " " + last_name
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    http.get(`/notifications/get/${userId}`)
      .then((res) => setNotificationList(res.data))
      .catch((err) => { console.log(err) })
  }, [])

  const handleNotificationClick = (notification) => {
    if (notification.jobId && notification.status === "Approved") {
      navigate("/company/jobs")

    } else {
      navigate("/company/CompanyProfile")
    }

    setShowNotifications(false)
  }

  return (
    <>
      <Head />
      <nav className="navbar default-layout-navbar col-lg-12 col-12 pt-2 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link to="/">
            <img className=" logo" src="/assets/images/logo-jp.png"
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
                <div className="nav-profile-img d-none d-md-inline">
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

                    if (!notification.jobId) {
                      return <li role='button' onClick={() => handleNotificationClick(notification)} className={"alert border d-flex gap-2 justify-content-between  alert-light"}>
                        < span className='small text-info fw-bold' > {notification.message}</span>
                        <span className='small'>{timeAgoMinutes(notification.createdAt)}</span>
                      </li>
                    }

                    if (notification.status == "Approved") {
                      return (
                        <li style={{ cursor: "pointer" }} onClick={() => handleNotificationClick(notification)} className={`alert border d-flex justify-content-between  alert-light`}>
                          <span className=' small text-success fw-bold'>Your Job for {notification.jobTitle} is now Live</span>
                          <span className='small'>{timeAgoMinutes(notification.createdAt)}</span>
                        </li>
                      )
                    } else {
                      return (<>
                        <li onClick={() => { }} className={`alert border rejected-notification d-flex justify-content-between alert-light`}>
                          <div>
                            <div className=' small text-danger fw-bold'>Your Job for {notification.jobTitle} is {notification.status}</div>
                            <div className='rejected-notification-message'>
                              Reason : <span className=' small fw-bold'>{notification.message}</span>
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
            </li>

            <li className="nav-item nav-logout">
              <span role='button' className="nav-link" onClick={handleLogout}>
                <i className="mdi mdi-power"></i>
              </span>
            </li>
            <li>
              <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" onClick={() => dispatch(setIsSidebarOpen())} type="button">
                <span className="mdi mdi-menu"></span>
              </button>
            </li>
          </ul >
        </div >
      </nav >
    </>
  );
}

export default Header;
