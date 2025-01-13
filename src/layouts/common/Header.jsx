import './Header.css';
import { Modal, Tabs, Tab } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";


import UserLogin from '../../pages/common/UserLogin';
import UserRegistration from '../../pages/common/UserRegistration';
import CompanyRegistration from '../../pages/common/CompanyRegistration';

import RecruiterLogin from '../../pages/company/Recruiter/RecruiterLogin';
import handleLogout from '../../helpers/functions/handlelogout';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { Roles } from '../../services/common/Roles.service';
import { recruiterUrl } from '../../services/common/urls/recruiterUrls.service';
import HomePageBanner from '../../pages/common/Ads/HomePageBanner';

import NavbarInfo from './navbarItems';
import HeaderSidebar from './HeaderSidebar';

export const NavItem = ({ title, path, className }) => {
  return (
    <Link to={path} className={`no-underline  hover:text-blue-700 hover:underline transition-none text-gray-900 ${className}`}>{title}</Link>
  )
}


const NavDropdownItem = ({ title, rightAlign, children }) => {
  return (
    <div className="group lg:block hidden text-black relative">
      <span className='group-hover:text-blue-700 cursor-pointer '>{title}</span>
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


  return <>
    {isHomePage && <HomePageBanner />}

    <header className='bg-white flex items-center py-4 justify-between px-2  gap-2'>

      <Link to="/">
        <img className='h-14' src="/assets/images/logo-jp.png" alt="logo" />
      </Link>

      <NavDropdownItem title="Places">
        <div className='grid grid-cols-2 gap-3  text-sm w-80 p-3'>
          {NavbarInfo.places.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Regions">
        <div className='grid grid-cols-2 gap-3  text-sm w-80 p-3'>
          {NavbarInfo.regions.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Activities">
        <div className='grid grid-cols-5 gap-y-3 gap-x-[20px]  text-sm w-[800px] p-3'>
          {NavbarInfo.activities.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Travel">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.travels.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Stay">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.stay.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Events">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.events.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Shopping">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.shopping.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Entertainment">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.entertainment.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Services">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.services.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Dining">
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.dining.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="Info" rightAlign >
        <div className=' flex flex-col gap-3 text-sm w-60 p-3'>
          {NavbarInfo.info.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
        </div>
      </NavDropdownItem>

      <NavDropdownItem title="B2B" rightAlign >
        <div className=' grid grid-cols-6 gap-y-3 gap-x-[20px] text-sm w-[950px] p-3' >
          {NavbarInfo.b2B.map(item => (
            <div key={item.heading} className='text-[13px]'>
              <div className='font-bold py-1 text-nowrap '>{item.heading}</div>
              <div className='flex flex-col'>
                {item.links.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
              </div>

            </div>
          ))}
        </div>
      </NavDropdownItem>

      <NavItem title="Jobs" path="/jobs" className="lg:block hidden" />

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

      {/* Hamburger menu when the site is viewed in mobile */}
      <button type='button' onClick={() => setShowSideBar(!showSideBar)} className=" lg:hidden block" >
        <RxHamburgerMenu />
      </button>

      {/* Sidebar when the site is viewed in mobile */}
      <HeaderSidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} handleNavigation={handleNavigation} handleShow={handleShow} />
    </header >


    <Modal show={show} onHide={handleClose}>
      <Modal.Body className='responsive-font'>

        <div className='flex lg:hidden justify-end mb-2'><RxCross1 onClick={handleClose} /></div>


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

