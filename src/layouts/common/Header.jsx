import './Header.css';
import { Modal, Tabs, Tab, Offcanvas, Accordion } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Head from './Head';
import UserLogin from '../../pages/common/UserLogin';
import UserRegistration from '../../pages/common/UserRegistration';
import CompanyRegistration from '../../pages/common/CompanyRegistration';
import { FaMagnifyingGlass } from "react-icons/fa6";
import CustomToggle from '../../components/CustomToggle';
import RecruiterLogin from '../../pages/company/Recruiter/RecruiterLogin';
import handleLogout from '../../helpers/functions/handlelogout';
import { BsList } from 'react-icons/bs';
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { Roles } from '../../services/common/Roles.service';
import { recruiterUrl } from '../../services/common/urls/recruiterUrls.service';
import HomePageBanner from '../../pages/common/Ads/HomePageBanner';
import { activities, b2B, entertainment, events, info, places, regions, services, shopping, stay, travels } from './navbarItems';

const NavItem = ({ title, path }) => {
  return (
    <Link to={path} className="no-underline hover:underline lg:block hidden  text-black">{title}</Link>
  )
}


const NavDropdownItem = ({ title, rightAlign, children }) => {
  return (
    <div className="group lg:block hidden text-black relative">
      {title}
      <div className={`scale-0 rounded-md z-50 absolute bg-white group-hover:scale-100 transition-all duration-300  ${rightAlign ? ' -right-1' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default function Header() {
  const [isSignedIn] = useState(localStorage.getItem('isSignedIn') || '');
  const { name, role, first_name, last_name } = useCurrentUser()
  const fullname = role === "recruiter" ? name : first_name + " " + last_name
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchCity, setSearchCity] = useState("")
  const [showSideBar, setShowSideBar] = useState(false)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let isHomePage = false
  const currentUrl = window.location.pathname

  if (currentUrl === "/") {
    isHomePage = true
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigation = (path) => {
    setShowSideBar(false)
    navigate(path)
  }

  const handleSearchButton = (e) => {
    e.preventDefault();
    if (!isExpanded) {
      setIsExpanded(true)
    } else {
      navigate(`/cities/${searchCity}`)
    }
  }

  return <>
    {isHomePage && <HomePageBanner />}

    <header className='bg-white flex items-center py-4 justify-between px-2  gap-2'>

      <Link to="/">
        <img className='h-14' src="/assets/images/logo-jp.png" alt="logo" />
      </Link>

      <NavItem title="Jobs" path="/jobs" />

      <NavDropdownItem title="Places">
        <div className='grid grid-cols-2 gap-3  text-sm w-80 p-3'>
          {places.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Regions">
        <div className='grid grid-cols-2 gap-3  text-sm w-80 p-3'>
          {regions.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Activities">
        <div className='grid grid-cols-5 gap-3 text-sm w-[800px] p-3'>
          {activities.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Travel">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {travels.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Stay">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {stay.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Events">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {events.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Shopping">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {shopping.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Entertainment">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {entertainment.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Services">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {services.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="B2B" rightAlign >
        <div className=' grid grid-cols-6 gap-3 text-sm w-[950px] p-3'>
          {b2B.map(item => (
            <div key={item.heading} className='text-[13px]'>
              <div className='font-bold py-1 text-nowrap '>{item.heading}</div>
              {item.links.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
            </div>
          ))}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Info" rightAlign >
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {info.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      {!isSignedIn ?
        <button type='button' onClick={() => handleShow()} className="bg-blue-500 active:bg-blue-600 text-white  py-2 px-4 rounded" >
          Login
        </button> :

        <NavDropdownItem title={<CgProfile size={"40px"} />} rightAlign >
          <div className='w-36 flex flex-col p-2 mt-3 gap-2'>
            {role === "user" && <Link className='btn btn-secondary' to={"/viewprofile"}>My Profile</Link>}

            {role === 'employer' &&
              <button type='button' onClick={() => { navigate("/company") }} className="btn btn-secondary" >
                Dashboard
              </button>
            }

            {role === 'admin' &&
              <button type='button' onClick={() => { navigate("/admin") }} className="btn btn-secondary w-100" >
                Dashboard
              </button>
            }

            {role === Roles.Recruiter &&
              <button type='button' onClick={() => navigate(recruiterUrl.home)} className="btn btn-secondary w-100" >
                Dashboard
              </button>
            }

            <button type='button' onClick={() => handleLogout()} className="bg-blue-500 active:bg-blue-600 text-white  py-2 px-4 rounded" >
              Logout
            </button>
          </div>
        </NavDropdownItem>
      }

      <button type='button' onClick={() => setShowSideBar(!showSideBar)} className=" lg:hidden block" >
        <RxHamburgerMenu />
      </button>

    </header >

    <Offcanvas show={showSideBar} onHide={() => { setShowSideBar(false) }} className="responsive-font">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Link to="/" className="h-32">
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
                      {(role === 'employer') &&
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
                      {role === Roles &&
                        <li>
                          <button type='button' onClick={() => { handleNavigation(recruiterUrl.home) }} className="btn btn-responsive btn-secondary w-100" >
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
            <span onClick={() => handleNavigation("/")} >Home</span>
            <span onClick={() => handleNavigation("/jobs")}>Jobs</span>
          </div>

          <Accordion defaultActiveKey={[]} alwaysOpen flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header className='px-0'>Info</Accordion.Header>
              <Accordion.Body>
                <ul className='list-unstyled d-flex gap-3  flex-column'>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/about-wh-visa")}>About WH visa</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/banking")}>Banking</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/tax")}>Tax</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/types-o-fwork")}>Types of work</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/useful-links")}>Useful Links</li>
                  <li className="ps-3" role="button" onClick={() => handleNavigation("/news")}>News</li>
                  <li>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header><small>Travel</small></Accordion.Header>
                      <Accordion.Body>
                        <ul className='list-unstyled d-flex gap-3 flex-column'>
                          <li role="button" onClick={() => handleNavigation("/transport")}>Transport</li>
                          <li role="button" onClick={() => handleNavigation("/accommodation")}>Accommodation</li>
                          <li role="button" onClick={() => handleNavigation("/places")}>Places</li>
                          <li role="button" onClick={() => handleNavigation("/holiday-parks")}>Holiday Parks</li>
                          <li role="button" onClick={() => handleNavigation("/freedom-campaining")}>Freedom Campaining</li>
                          <li role="button" onClick={() => handleNavigation("/activities")}>Activities</li>
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
      <Modal.Body className='responsive-font'>

        <div className='d-flex d-lg-none justify-content-end mb-2'><RxCross1 onClick={handleClose} /></div>


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

