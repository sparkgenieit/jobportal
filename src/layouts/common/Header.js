import './Header.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, Button, Tabs, Tab } from "react-bootstrap";


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from './Head';
import UserLogin from '../../pages/common/UserLogin';
import UserRegistration from '../../pages/common/UserRegistration';
import CompanyRegistration from '../../pages/common/CompanyRegistration';


function Header() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');


  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');
    navigate('/');
  };

  const goToDashoard = () => {
    console.log("hii")
    navigate('/company');
  }

  return <>
    <Head />

    <header id="header" class="header" data-scrollto-offset="0">
      <div className='row'>
        <div class="container-fluid d-flex align-items-center justify-content-between">

          <a href="/" style={{ "width": "15%" }} class="logo d-flex align-items-center scrollto me-auto me-lg-0">

            <img src="/assets/images/logo-black.png"
              alt="logo" />

          </a>

          <div class="d-flex" style={{ "width": "100%" }}>
            <nav id="navbar" style={{ "width": "100%" }} class="navbar d-flex ">
              <ul>

                <li><a class="nav-link scrollto mx-3" href="/">Home</a></li>

                <li><a class="nav-link scrollto mx-3" href="/jobd">Jobs</a></li>

                <li class="dropdown">
                  <a href="#" class="menu-item first-item expand-btn">Info</a>
                  <ul class="dropdown-menu sample bg-white">
                    <li><a href="/common/Aboutwhvisa">About WH visa</a></li>
                    <li><a href="/common/Banking">Banking</a></li>
                    <li><a href="/common/Tax">Tax</a></li>
                    <li><a href="/common/Typesofwork">Types of work</a></li>
                    <li><a href="/common/Usefullinks">Useful Links</a></li>
                    <li><a href="/common/News">News</a></li>
                    <li class="dropdown dropdown-right">
                      <a href="#" class="menu-item expand-btn">
                        Travel
                      </a>
                      <ul class="menu-right  menu-left sample bg-white">
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



              </ul>
              <i class="bi bi-list mobile-nav-toggle d-none"></i>


              <div className=' col-auto d-flex me-4'>
                {!token && <> <button type='button' onClick={() => handleShow()} class="btn btn-primary me-3 py-0" ><a href="#" >
                  Login / Register
                </a></button>
                </>}
                {token && <>

                  <span className='header mx-5 mt-4'>Hi {fullname} {role}</span>


                  {/* <a className='header mx-5 mt-2' href="/profile">My Profile</a> */}




                  {/* <div className='mt-3'>
                    <button type='button' onClick={() => handleLogout()} class="btn btn-primary me-3 py-0" ><a href="#" >
                      Logout
                    </a></button>
                  </div> */}
                  {/* {role == 'employer' &&
                    <div className='mt-3'>
                      <button type='button' class="btn btn-secondary me-2 py-0 my-1" ><a href="/company" >
                        Employer Dashboard
                      </a></button>
                    </div>} */}

                  <ul className='list-unstyled'>
                    <li class="dropdown dropdown-right">
                      <a href="#" class="menu-item first-item expand-btn"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{ height: "50px", width: "50px" }}
                        alt="Avatar" /></a>
                      <ul class="dropdown-menu menu-left  sample bg-white">
                        <li className=' pb-2'><a href="#">{fullname}</a></li>
                        <li><a href="/Viewprofile">My Profile</a></li>
                        {role == 'employer' && <li className='px-3'> <button type='button' class="btn btn-secondary mt-2 px-1" ><a className='px-2' href="/company" >
                          <small>Employer Dashboard</small>
                        </a></button></li>}

                        <li> <button type='button' onClick={() => handleLogout()} class="btn btn-primary px-5 mx-3 mt-2" >
                          Logout
                        </button></li>

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