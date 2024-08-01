import { useState } from 'react';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MdSpaceDashboard } from 'react-icons/md';
import { BsPostcard, BsPostcardFill, BsCreditCard } from "react-icons/bs";
import { PiListDashesFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImProfile } from "react-icons/im";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true)
  const navigate = useNavigate()
  const [tooltip, setTooltip] = useState({})
  let sidebarClass = showSidebar ? { marginLeft: "0" } : { marginLeft: "-230px" };
  const [show, setShow] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showBuy, setShowBuy] = useState(false);

  const handleModal = () => {

    if (parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'false') {
      setShowJob(true);
      setShow(true);


    }
    else if (parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'true') {
      setShowBuy(true);
      setShow(true);

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
      {<div style={sidebarClass} className={` border shadow`}>
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className=" position-relative mt-4 pe-1 d-flex justify-content-end">
            <span onMouseOver={() => setTooltip({ menu: true })} onMouseLeave={() => setTooltip({ menu: false })} ><RxHamburgerMenu role='button' onClick={() => setShowSidebar(prev => !prev)} fontSize={22} /></span>
            {tooltip.menu && <span style={{ right: '-25px' }} className='position-absolute mt-4 bg-secondary rounded text-white px-1 py-1'>Menu</span>}
          </div>
          <ul style={{ marginLeft: "15px" }} className="nav  border border-top-0 rounded border-secondary">

            {/* <li className="nav-item nav-profile">
              <Link to="#" className="nav-link">
                <div className="nav-profile-image">
                  <img src="/assets/images/faces/face1.jpg" alt="profile" />
                  <span className="login-status online"></span>
                </div>
                <div className="nav-profile-text d-flex flex-column">
                  <span className="font-weight-bold mb-2">Employer</span>
                  <span className="text-secondary  mb-2">Available Credits: {localStorage.getItem('credits')}</span>
                </div>

              </Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link" to="/company">
                <div className='d-flex justify-content-between w-100'>
                  <span>Dashboard</span>
                  <span>
                    <MdSpaceDashboard size={"20"} />
                  </span>
                </div>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/company/CompanyProfile">
                <div className='d-flex justify-content-between w-100'>
                  <span>Company Profile</span>
                  <span>
                    <ImProfile size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <span role='button' className="nav-link" onClick={() => { handleModal(true) }}>
                <div className='d-flex justify-content-between w-100'>
                  <span>Post a Job</span>
                  <span>
                    <BsPostcard size={"20"} />
                  </span>
                </div>
              </span>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/company/JobList">
                <div className='d-flex justify-content-between w-100'>
                  <span>Posted Jobs</span>
                  <span>
                    <BsPostcardFill size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/company/BuyCredits">
                <div className='d-flex flex-column w-100'>
                  <div className='d-flex  justify-content-between w-100'>
                    <span>Buy Credits</span>
                    <span>
                      <BsCreditCard size={"20"} />
                    </span>
                  </div>
                  <div className="text-secondary small">Available Credits: {localStorage.getItem('credits')}</div>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/company/transactions">
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <span>Transactions</span>
                  <span>
                    <PiListDashesFill size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

          </ul>
        </nav>
      </div>}
      <Modal show={show} onHide={handleClose} centered>
        <div className='bg-light'>
          <Modal.Body>
            {parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'false' &&
              <>
                <div className='d-flex flex-column align-items-center gap-2 p-2'>
                  <h3>POST A JOB FOR FREE</h3>
                  <div>
                    <iframe style={{ width: "200px" }} src="https://lottie.host/embed/7e57bc16-9962-42d7-a47c-95c5493b7e18/ugELYiVQBH.json"></iframe>
                  </div>

                  <div className='d-flex flex-column align-items-center   '>
                    <p> You can post the first job for free</p>

                    <p> For your next job you need to buy credits</p>
                  </div>


                  <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => { handleClose(); navigate('/company/postajob') }} className="btn btn-info">Post a Job</button>
                  </div>
                </div>
              </>}

            {parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'true' && <><div className="form-row ml-5">
              <div className="form-group">
                <div className="form-group">
                  <div className="form-check ml-2">
                    <label className="form-check-label" for="invalidCheck2">
                      <span>Sorry you dont have credits please buy credits to post the job.</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

              <div className="form-row">
                <button type="button" onClick={() => { handleClose(); navigate('/company/BuyCredits') }} className="btn btn-danger">Buy Credits</button>
              </div></>}
          </Modal.Body>
        </div>

      </Modal>

      <Modal showBuy={showBuy} onHide={handleClose}>
        <Modal.Body>

          <div className="form-row ml-5">
            <div className="form-group">
              <div className="form-group">
                <div className="form-check ml-2">
                  <label className="form-check-label" for="invalidCheck2">
                    <small><span>By registering you agree to <Link to="/privacy" target="_blank" >Privacy Policy</Link> </span></small>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-danger">Buy Credits</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Sidebar;
