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

        <nav id="navbar" style={{"width": "60%"}} class="navbar d-flex ">
          <ul>

            <li><a class="nav-link scrollto mx-3" href="/">Home</a></li>

            <li><a class="nav-link scrollto mx-3" href="/jobd">Jobs</a></li>

            <li class="dropdown">
              <a href="#" class="menu-item first-item expand-btn">Info</a>
              <ul class="dropdown-menu sample">
                <li><a href="about-wfh-visa.html">About WH visa</a></li>
                <li><a href="user-registration.html">Banking</a></li>
                <li><a href="company/index.html">Tax</a></li>
                <li><a href="company/index.html">Types of work</a></li>
                <li><a href="company/index.html">Useful Links</a></li>
                <li><a href="company/index.html">News</a></li>
                <li class="dropdown dropdown-right">
                  <a href="#" class="menu-item expand-btn">
                    Travel
                  </a>
                  <ul class="menu-right menu-left sample">
                    <li><a href="#">Transport</a></li>
                    <li><a href="#">Accommodation</a></li>
                    <li><a href="places.html">Places</a></li>
                    <li><a href="company/index.html">Holiday Parks</a></li>
                    <li><a href="company/index.html">Freedom Camping</a></li>
                    <li><a href="#">Activities</a></li>
                  </ul>
                </li>
              </ul>
            </li>



          </ul>
          <i class="bi bi-list mobile-nav-toggle d-none"></i>
        </nav>

              <div className='col-2'>
                {!token && <><button type="button" class="btn btn-primary" onClick={handleShow}>
                  Login / Register
                </button>
            </>}
            </div>
            
            
            {token && <>
            
              <span className='header mx-5 '>Hi {fullname} {role}</span>
              <button type='button' onClick={() => handleLogout()} className=" btn bg-primary text-light  btn-getstarted scrollto nav-link mx-5" >Logout</button>
              {role == 'employer' && <button type="button" class="btn btn-secondary ml-2" onClick={() => goToDashoard()}>
                Employer Dashboard
              </button>}
              
            </>
            
            }
          
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
