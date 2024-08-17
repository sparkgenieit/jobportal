import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, Button, Tabs, Tab } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from './Head';
import UserLogin from '../../pages/common/UserLogin';
import UserRegistration from '../../pages/common/UserRegistration';
import CompanyRegistration from '../../pages/common/CompanyRegistration';
import { FaMagnifyingGlass } from "react-icons/fa6";


function Header() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [profileLink, setProfileLink] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchCity, setSearchCity] = useState("")
  const [tooltip, setTooltip] = useState({})

  useEffect(() => {
    if (role === "user") {
      setProfileLink("/viewprofile")
    }
  }, [])

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
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
    setToken('');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');
    localStorage.removeItem('fullname');
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
              <i className="bi bi-list mobile-nav-toggle d-none"></i>


              <div style={{ width: "300px" }} className='d-flex justify-content-end' >
                <input
                  type='text'
                  value={searchCity}
                  onChange={(e) => { setSearchCity(e.target.value) }}
                  className={`shadow px-2 search-city-input ${isExpanded ? "expanded-searchbar" : "hidden-searchbar"}`}
                  required />

                <button
                  type='button'
                  onMouseEnter={() => { setTooltip({ search: true }) }}
                  onMouseLeave={() => { setTooltip({ search: false }) }}
                  onClick={handleSearchButton}
                  className='btn btn-light '> <FaMagnifyingGlass />
                </button>
                {tooltip.search &&
                  <div className='my-tooltip absolute mt-5 py-1 px-2 rounded text-white'>Search cities to view there activities</div>
                }
              </div>



              <div className=' col-auto d-flex me-4'>
                {!token && <> <button type='button' onClick={() => handleShow()} className="btn btn-primary me-3 py-0" ><Link to="#" >
                  Login
                </Link></button>
                </>}
                {token && <>

                  <span className=' d-flex align-items-center fw-bold'> {fullname}</span>


                  {/* <Link className='header mx-5 mt-2' to="/profile">My Profile</Link> */}




                  {/* <div className='mt-3'>
                    <button type='button' onClick={() => handleLogout()} className="btn btn-primary me-3 py-0" ><Link to="#" >
                      Logout
                    </Link></button>
                  </div> */}
                  {/* {role == 'employer' &&
                    <div className='mt-3'>
                      <button type='button' className="btn btn-secondary me-2 py-0 my-1" ><Link to="/company" >
                        Employer Dashboard
                      </Link></button>
                    </div>} */}

                  <ul className='list-unstyled'>
                    <li className="dropdown dropdown-right">
                      <Link to="#" className="menu-item first-item expand-btn"><CgProfile size={"40px"} /></Link>
                      <ul className="dropdown-menu menu-left  sample bg-white">
                        {role === "user" && <li><Link to={profileLink}>My Profile</Link></li>}
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