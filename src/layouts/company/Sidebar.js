import { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import { SidebarContext } from '../../helpers/Context';
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MdSpaceDashboard } from 'react-icons/md';
import { BsPostcard, BsPostcardFill, BsCreditCard } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

function Sidebar() {

  const { showSidebar } = useContext(SidebarContext);
  const navigate = useNavigate()
  let sidebarClass = showSidebar ? "sidebar-showing" : "sidebar-not-showing";
  const [show, setShow] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  //const [companyProfile,setCompanyProfile] = useState();

  console.log(parseInt(localStorage.getItem('credits')));
  console.log(localStorage.getItem('usedFreeCredit'));

  const handleModal = () => {

    if (parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'false') {
      setShowJob(true);
      setShow(true);

      console.log('showJob', showJob);
    }
    else if (parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'true') {
      setShowBuy(true);
      setShow(true);
      console.log('showBuy', showBuy);
    }
    else {
      navigate('/company/postajob')
    }
    setShowBuy(true);
  }
  const handleClose = () => {
    setShow(false)

  }

  return (
    <>
      {<div className={`${sidebarClass}`}>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="nav-profile-image">
                  <img src="/assets/images/faces/face1.jpg" alt="profile" />
                  <span class="login-status online"></span>
                </div>
                <div class="nav-profile-text d-flex flex-column">
                  <span class="font-weight-bold mb-2">Employer</span>
                  <span class="text-secondary  mb-2">Available Credits: {localStorage.getItem('credits')}</span>
                </div>

              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/company">
                <div className='d-flex justify-content-between w-100'>
                  <span>Dashboard</span>
                  <span>
                    <MdSpaceDashboard size={"20"} />
                  </span>
                </div>
              </a>
            </li>


            <li class="nav-item">
              <a class="nav-link" href="/company/CompanyProfile">
                <div className='d-flex justify-content-between w-100'>
                  <span>Company Profile</span>
                  <span>
                    <ImProfile size={"20"} />
                  </span>
                </div>
              </a>
            </li>


            <li>

              <ul class="nav sub-nav">
                <li class="nav-item">
                  <a href='#' class="nav-link" onClick={() => { handleModal(true) }}>
                    <div className='d-flex justify-content-between w-100'>
                      <span>Post Job</span>
                      <span>
                        <BsPostcard size={"20"} />
                      </span>
                    </div>
                  </a>
                </li>


                <li class="nav-item">
                  <a class="nav-link" href="/company/JobList">
                    <div className='d-flex justify-content-between w-100'>
                      <span>Posted Jobs</span>
                      <span>
                        <BsPostcardFill size={"20"} />
                      </span>
                    </div>
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/company/BuyCredits">
                    <div className='d-flex justify-content-between w-100'>
                      <span>Buy Credits</span>
                      <span>
                        <BsCreditCard size={"20"} />
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'false' && <><div class="form-row ml-5">
            <div class="form-group">
              <div class="form-group">
                <div class="form-check ml-2">
                  <label class="form-check-label" for="invalidCheck2">
                    <span>Hurray you can post your first job for free, for next job you need to buy credits.</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

            <div class="form-row">
              <button type="button" onClick={() => { handleClose(); navigate('/company/postajob') }} class="btn btn-danger">Post A job</button>
            </div></>}

          {parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'true' && <><div class="form-row ml-5">
            <div class="form-group">
              <div class="form-group">
                <div class="form-check ml-2">
                  <label class="form-check-label" for="invalidCheck2">
                    <span>Sorry you dont have credits please buy credits to post the job.</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

            <div class="form-row">
              <button type="button" onClick={() => { handleClose(); navigate('/company/BuyCredits') }} class="btn btn-danger">Buy Credits</button>
            </div></>}
        </Modal.Body>

      </Modal>

      <Modal showBuy={showBuy} onHide={handleClose}>
        <Modal.Body>

          <div class="form-row ml-5">
            <div class="form-group">
              <div class="form-group">
                <div class="form-check ml-2">
                  <label class="form-check-label" for="invalidCheck2">
                    <small><span>By registering you agree to <a href="/privacy" target="_blank" >Privacy Policy</a></span></small>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div class="form-row">
            <button type="button" class="btn btn-danger">Buy Credits</button>
          </div>


        </Modal.Body>

      </Modal>
    </>
  );
}

export default Sidebar;
