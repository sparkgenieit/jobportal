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

function Header() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchCity, setSearchCity] = useState("")
  const [showSideBar, setShowSideBar] = useState(false)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearchButton = (e) => {
    e.preventDefault();
    if (!isExpanded) {
      setIsExpanded(true)
    } else {
      navigate(`/cities/${searchCity}`)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    setToken("")
    setFullname("")
    setRole("")
    navigate('/');
  };

  return <>
    <Head />

    <header id="header" className="header" data-scrollto-offset="0">
      <div className='row'>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link to="/" style={{ "width": "15%" }} className="logo d-flex align-items-center scrollto me-auto me-lg-0">
            <img src="/assets/images/logo-jp.png"
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
              <i onClick={() => { setShowSideBar((prev) => !prev) }} className="bi bi-list mobile-nav-toggle d-none"></i>
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
                {!token && <> <button type='button' onClick={() => handleShow()} className="btn btn-primary me-3 py-0" ><Link to="#" >
                  Login
                </Link></button>
                </>}
                {token && <>
                  <span className=' d-flex align-items-center fw-bold'> {fullname}</span>
                  <ul className='list-unstyled'>
                    <li className="dropdown dropdown-right">
                      <Link to="#" className="menu-item first-item expand-btn"><CgProfile size={"40px"} /></Link>
                      <ul className="dropdown-menu menu-left  sample bg-white">
                        {role === "user" && <li><Link to={"/viewprofile"}>My Profile</Link></li>}
                        {role === 'employer' &&
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
          </div>
        </div>
      </div>
    </header>

    <Offcanvas show={showSideBar} onHide={() => { setShowSideBar(false) }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Link to="/" style={{ "width": "15%" }} className="logo d-flex align-items-center scrollto me-auto me-lg-0">
            <img src="/assets/images/logo-jp.png"
              alt="logo" />
          </Link>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='d-flex flex-column gap-4 px-2 fs-5'>
          <div className='d-flex flex-column gap-4 ps-3'>

            <Link to={"/"}>Home</Link>
            <Link to={"/common/jobs"}>Jobs</Link>
          </div>

          <Accordion defaultActiveKey={[]} alwaysOpen flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className='px-0'>Info</Accordion.Header>
              <Accordion.Body>
                <ul className='list-unstyled d-flex gap-3  flex-column'>
                  <li className="ps-3"><Link to="/common/Aboutwhvisa">About WH visa</Link></li>
                  <li className="ps-3"><Link to="/common/Banking">Banking</Link></li>
                  <li className="ps-3"><Link to="/common/Tax">Tax</Link></li>
                  <li className="ps-3"><Link to="/common/Typesofwork">Types of work</Link></li>
                  <li className="ps-3"><Link to="/common/Usefullinks">Useful Links</Link></li>
                  <li className="ps-3"><Link to="/common/News">News</Link></li>
                  <li>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header><small>Travel</small></Accordion.Header>
                      <Accordion.Body>
                        <ul className='list-unstyled d-flex gap-3 flex-column'>
                          <li><Link to="/common/Transport">Transport</Link></li>
                          <li><Link to="/common/Accommodation">Accommodation</Link></li>
                          <li><Link to="/common/Places">Places</Link></li>
                          <li><Link to="/common/HolidayParks">Holiday Parks</Link></li>
                          <li><Link to="/common/FreedomCampaining">Freedom Campaining</Link></li>
                          <li><Link to="/common/Activities">Activities</Link></li>
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

          {!token &&
            <button type='button' onClick={() => handleShow()} className="btn btn-primary" >
              <span>
                Login
              </span>
            </button>
          }

          {token &&
            <Accordion flush>
              <Accordion.Item eventKey="2">
                <div className='d-flex align-items-center'>
                  <span className='flex-grow-1'>{fullname}</span>
                  <CustomToggle eventKey={"2"}>
                    <CgProfile size={"40px"} />
                  </CustomToggle>
                </div>
                <Accordion.Body>
                  <ul className="list-unstyled d-flex flex-column gap-3">
                    {role === "user" && <li><Link to={"/viewprofile"}>My Profile</Link></li>}
                    {role === 'employer' &&
                      <li>
                        <button type='button' onClick={() => { navigate("/company") }} className="btn btn-secondary w-100" >
                          Dashboard
                        </button>
                      </li>}
                    {role === 'admin' &&
                      <li>
                        <button type='button' onClick={() => { navigate("/admin") }} className="btn btn-secondary w-100" >
                          Dashboard
                        </button>
                      </li>
                    }

                    <li>
                      <button type='button' onClick={() => handleLogout()} className="btn btn-primary w-100" >
                        Logout
                      </button>
                    </li>

                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
              <Tab eventKey="loginRecruiter" title="Recruiter Login">
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

export default Header;