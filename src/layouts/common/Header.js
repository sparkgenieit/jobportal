import './Header.css';
import 'aos/dist/aos.css';
import { Modal, Tabs, Tab, Offcanvas, Accordion } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from './Head';
import UserLogin from '../../pages/common/UserLogin';
import Tooltip from '../../components/Tooltip';
import UserRegistration from '../../pages/common/UserRegistration';
import CompanyRegistration from '../../pages/common/CompanyRegistration';
import { FaMagnifyingGlass } from "react-icons/fa6";
import CustomToggle from '../../components/CustomToggle';
import RecruiterLogin from '../../pages/company/Recruiter/RecruiterLogin';
import handleLogout from '../../helpers/functions/handlelogout';
import { BsList } from 'react-icons/bs';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';

export default function Header() {
  const [isSignedIn] = useState(localStorage.getItem('isSignedIn') || '');
  const { role, first_name, last_name } = useCurrentUser()
  const fullname = first_name + " " + last_name
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchCity, setSearchCity] = useState("")
  const [showSideBar, setShowSideBar] = useState(false)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigation = (path) => {
    setShowSideBar(false)
    navigate(path)
  }

  const teet = 23;

  const handleSearchButton = (e) => {
    e.preventDefault();
    if (!isExpanded) {
      setIsExpanded(true)
    } else {
      navigate(`/cities/${searchCity}`)
    }
  }

  return <>
    <Head />

    <header id="header" className="header" data-scrollto-offset="0">
      <div className='row'>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link to="/" className=" d-flex align-items-center scrollto me-auto me-lg-0">
            <img className='logo' src="/assets/images/logo-jp.png"
              alt="logo" />
          </Link>

          <div className="d-flex" style={{ "width": "100%" }}>
            <nav id="navbar" style={{ "width": "100%" }} className="navbar d-flex ">
              <ul>

                <li><Link className="nav-link scrollto mx-3" to="/">Home</Link></li>

                <li><Link className="nav-link scrollto mx-3" to="/common/Jobs">Jobs</Link></li>

                <li className="dropdown">
                  <Link to="#" className="menu-item first-item expand-btn">Info</Link>
                  <ul className="dropdown-menu sample bg-white">
                    <li><Link to="/common/Aboutwhvisa">About WH visa</Link></li>
                    <li><Link to="/common/Banking">Banking</Link></li>
                    <li><Link to="/common/Tax">Tax</Link></li>
                    <li><Link to="/common/Typesofwork">Types of work</Link></li>
                    <li><Link to="/common/Usefullinks">Useful Links</Link></li>
                    <li><Link to="/common/News">News</Link></li>
                    <li className="dropdown dropdown-right">
                      <Link to="#" className="menu-item expand-btn">
                        Travel
                      </Link>
                      <ul className="menu-right  menu-left sample bg-white">
                        <li><Link to="/common/Transport">Transport</Link></li>
                        <li><Link to="/common/Accommodation">Accommodation</Link></li>
                        <li><Link to="/common/Places">Places</Link></li>
                        <li><Link to="/common/HolidayParks">Holiday Parks</Link></li>
                        <li><Link to="/common/FreedomCampaining">Freedom Campaining</Link></li>
                        <li><Link to="/common/Activities">Activities</Link></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><Link className="nav-link scrollto mx-3" to="/contact-us">Contact Us</Link></li>
              </ul>

              {/* {!showSideBar && <i onClick={() => { setShowSideBar(true) }} className="bi bi-list mobile-nav-toggle d-none"></i>} */}

              <div style={{ width: "300px" }} className='d-flex justify-content-end' >
                <input
                  type='text'
                  value={searchCity}
                  onChange={(e) => { setSearchCity(e.target.value) }}
                  className={`shadow px-2 search-city-input ${isExpanded ? "expanded-searchbar" : "hidden-searchbar"}`}
                  required />
                <Tooltip tooltipText={"Search cities to view there activities"}>
                  <button
                    type='button'
                    onClick={handleSearchButton}
                    className='btn btn-light '
                  >
                    <FaMagnifyingGlass />
                  </button>
                </Tooltip>
              </div>
              <div className=' col-auto d-flex me-4'>
                {!isSignedIn && <> <button type='button' onClick={() => handleShow()} className="btn btn-primary me-3 py-0" ><Link to="#" >
                  Login
                </Link></button>
                </>}
                {isSignedIn && <>
                  <span className=' d-flex align-items-center fw-bold'> {fullname}</span>
                  <ul className='list-unstyled'>
                    <li className="dropdown dropdown-right">
                      <Link to="#" className="menu-item first-item expand-btn"><CgProfile size={"40px"} /></Link>
                      <ul className="dropdown-menu menu-left  sample bg-white">
                        {role === "user" && <li><Link to={"/viewprofile"}>My Profile</Link></li>}
                        {(role === 'employer' || role === "recruiter") &&
                          <li className='px-4 pb-2'>
                            <button type='button' onClick={() => { navigate("/company") }} className="btn btn-secondary w-100" >
                              Dashboard
                            </button>
                          </li>}
                        {role === 'admin' &&
                          <li className='px-4 pb-2'>
                            <button type='button' onClick={() => { navigate("/admin") }} className="btn btn-secondary w-100" >
                              Dashboard
                            </button>
                          </li>
                        }
                        <li className='px-4 pb-1'>
                          <button type='button' onClick={() => handleLogout()} className="btn btn-primary w-100" >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
                }
              </div>
            </nav>
            {!showSideBar && <BsList onClick={() => { setShowSideBar(true) }} className='d-flex d-xl-none position-absolute end-0 mx-2' fontSize={25} />}
          </div>
        </div>
      </div>
    </header>

    <Offcanvas show={showSideBar} onHide={() => { setShowSideBar(false) }} className="responsive-font">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Link to="/" className="logo d-flex align-items-center scrollto me-auto me-lg-0">
            <img src="/assets/images/logo-jp.png" className='logo'
              alt="logo" />
          </Link>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='d-flex flex-column gap-4 px-2 fs-5'>
          <div className='d-flex flex-column gap-4 ps-3'>

            {isSignedIn &&
              <Accordion flush>
                <Accordion.Item eventKey="2">
                  <CustomToggle eventKey={"2"}>
                    <div className='d-flex align-items-center'>
                      <span className='flex-grow-1'>{fullname}</span>
                      <CgProfile size={"40px"} />
                    </div>
                  </CustomToggle>
                  <Accordion.Body>
                    <ul className="list-unstyled d-flex flex-column gap-3">
                      {role === "user" &&
                        <>
                          <li role='button' onClick={() => handleNavigation("/viewprofile")}>My Profile</li>
                          <li role='button' onClick={() => handleNavigation("/saved-jobs")}>Saved Jobs</li>
                          <li role='button' onClick={() => handleNavigation("/applied-jobs")}>Applied Jobs</li>
                        </>
                      }
                      {(role === 'employer' || role === "recruiter") &&
                        <li>
                          <button type='button' onClick={() => { handleNavigation("/company") }} className="btn btn-responsive btn-secondary w-100" >
                            Dashboard
                          </button>
                        </li>}
                      {role === 'admin' &&
                        <li>
                          <button type='button' onClick={() => { handleNavigation("/admin") }} className="btn btn-responsive btn-secondary w-100" >
                            Dashboard
                          </button>
                        </li>
                      }

                      <li>
                        <button type='button' onClick={() => handleLogout()} className="btn btn-responsive btn-primary w-100" >
                          Logout
                        </button>
                      </li>

                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            }
            <Link to={"/"}>Home</Link>
            <Link to={"/common/jobs"}>Jobs</Link>
          </div>

          <Accordion defaultActiveKey={[]} alwaysOpen flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className='px-0'>Info</Accordion.Header>
              <Accordion.Body>
                <ul className='list-unstyled d-flex gap-3  flex-column'>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/common/Aboutwhvisa")}>About WH visa</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/common/Banking")}>Banking</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/common/Tax")}>Tax</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/common/Typesofwork")}>Types of work</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/common/Usefullinks")}>Useful Links</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/common/News")}>News</li>
                  <li>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header><small>Travel</small></Accordion.Header>
                      <Accordion.Body>
                        <ul className='list-unstyled d-flex gap-3 flex-column'>
                          <li role="button" onClick={() => handleNavigation("/common/Transport")}>Transport</li>
                          <li role="button" onClick={() => handleNavigation("/common/Accommodation")}>Accommodation</li>
                          <li role="button" onClick={() => handleNavigation("/common/Places")}>Places</li>
                          <li role="button" onClick={() => handleNavigation("/common/HolidayParks")}>Holiday Parks</li>
                          <li role="button" onClick={() => handleNavigation("/common/FreedomCampaining")}>Freedom Campaining</li>
                          <li role="button" onClick={() => handleNavigation("/common/Activities")}>Activities</li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>


          <div className='d-flex' >
            <input
              type='text'
              value={searchCity}
              onChange={(e) => { setSearchCity(e.target.value) }}
              className={`shadow flex-grow-1 rounded border-0 small px-2 `}
              required
              placeholder='Search cities to view there activities'
            />
            <button
              type='button'
              onClick={handleSearchButton}
              className='btn btn-light '
            >
              <FaMagnifyingGlass />
            </button>
          </div>

          {!isSignedIn &&
            <button
              type='button'
              onClick={() => {
                handleShow();
                setShowSideBar(false)
              }}
              className="btn btn-primary"
            >
              <span>
                Login
              </span>
            </button>
          }

        </div>
      </Offcanvas.Body>
    </Offcanvas >


    <Modal show={show} onHide={handleClose}>
      <Modal.Body>

        <Tabs justify className="mb-3">
          <Tab eventKey="login" title="Login">
            <Tabs justify className="mb-3">
              <Tab eventKey="loginUser" title="User Login">
                <UserLogin />
              </Tab>
              <Tab eventKey="loginRecruiter" title="Company Login">
                <RecruiterLogin />
              </Tab>
            </Tabs>
          </Tab>



          <Tab eventKey="register" title="Register">

            <Tabs justify className="mb-3">
              <Tab eventKey="user" title="Register as User">
                <UserRegistration />
              </Tab>
              <Tab eventKey="company" title="Register as Employer">
                <CompanyRegistration />
              </Tab>
            </Tabs>

          </Tab>
        </Tabs>

      </Modal.Body>

    </Modal>
  </>
}

