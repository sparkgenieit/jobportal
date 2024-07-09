import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from './Head';
import UserLogin from '../../pages/common/UserLogin';
import UserRegistration from '../../pages/common/UserRegistration';
import CompanyRegistration from '../../pages/common/CompanyRegistration';


function Header() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [profileLink, setProfileLink] = useState("")

  useEffect(() => {
    if (role === "user") {
      setProfileLink("/viewprofile")
    }
    if (role === "employer") {
      setProfileLink("/company/CompanyProfile")
    }

  }, [])

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('fullname');
    navigate('/');
  };

  const goToDashoard = () => {
    console.log("hii")
    navigate('/company');
  }

  return <>
    <Head />

    <header id="header" className="header" data-scrollto-offset="0">
      <div className='row'>
        <div className="container-fluid d-flex align-items-center justify-content-between">

          <a href="/" style={{ "width": "15%" }} className="logo d-flex align-items-center scrollto me-auto me-lg-0">

            <img src="/assets/images/logo-jp.png"
              alt="logo" />

          </a>

          <div className="d-flex" style={{ "width": "100%" }}>
            <nav id="navbar" style={{ "width": "100%" }} className="navbar d-flex ">
              <ul>

                <li><a className="nav-link scrollto mx-3" href="/">Home</a></li>

                <li><a className="nav-link scrollto mx-3" href="/common/Jobs">Jobs</a></li>

                <li className="dropdown">
                  <a href="#" className="menu-item first-item expand-btn">Info</a>
                  <ul className="dropdown-menu sample bg-white">
                    <li><a href="/common/Aboutwhvisa">About WH visa</a></li>
                    <li><a href="/common/Banking">Banking</a></li>
                    <li><a href="/common/Tax">Tax</a></li>
                    <li><a href="/common/Typesofwork">Types of work</a></li>
                    <li><a href="/common/Usefullinks">Useful Links</a></li>
                    <li><a href="/common/News">News</a></li>
                    <li className="dropdown dropdown-right">
                      <a href="#" className="menu-item expand-btn">
                        Travel
                      </a>
                      <ul className="menu-right  menu-left sample bg-white">
                        <li><a href="/common/Transport">Transport</a></li>
                        <li><a href="/common/Accommodation">Accommodation</a></li>
                        <li><a href="/common/Places">Places</a></li>
                        <li><a href="/common/HolidayParks">Holiday Parks</a></li>
                        <li><a href="/common/FreedomCampaining">Freedom Campaining</a></li>
                        <li><a href="/common/Activities">Activities</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li><a className="nav-link scrollto mx-3" href="/contact-us">Contact Us</a></li>



              </ul>
              <i className="bi bi-list mobile-nav-toggle d-none"></i>


              <div className=' col-auto d-flex me-4'>
                {!token && <> <button type='button' onClick={() => handleShow()} className="btn btn-primary me-3 py-0" ><a href="#" >
                  Login
                </a></button>
                </>}
                {token && <>

                  <span className=' d-flex align-items-center fw-bold'> {fullname}</span>


                  {/* <a className='header mx-5 mt-2' href="/profile">My Profile</a> */}




                  {/* <div className='mt-3'>
                    <button type='button' onClick={() => handleLogout()} className="btn btn-primary me-3 py-0" ><a href="#" >
                      Logout
                    </a></button>
                  </div> */}
                  {/* {role == 'employer' &&
                    <div className='mt-3'>
                      <button type='button' className="btn btn-secondary me-2 py-0 my-1" ><a href="/company" >
                        Employer Dashboard
                      </a></button>
                    </div>} */}

                  <ul className='list-unstyled'>
                    <li className="dropdown dropdown-right">
                      <a href="#" className="menu-item first-item expand-btn"><CgProfile size={"40px"} /></a>
                      <ul className="dropdown-menu menu-left  sample bg-white">
                        {role === "user" && <li><a href={profileLink}>My Profile</a></li>}
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>

        <Tabs justify className="mb-3">
          <Tab eventKey="login" title="Login">
            <UserLogin />
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