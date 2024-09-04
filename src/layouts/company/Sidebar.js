import './Sidebar.css';
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Modal } from "react-bootstrap";
import { MdSpaceDashboard } from 'react-icons/md';
import { BsPostcard, BsPostcardFill, BsCreditCard, BsFillPersonCheckFill } from "react-icons/bs";
import { PiListDashesFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { IoMdMailOpen } from "react-icons/io";


import { GeneralContext } from '../../helpers/Context';
import Tooltip from '../../components/Tooltip';

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(GeneralContext)
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  let sidebarClass = isSidebarOpen ? { marginLeft: "0" } : { marginLeft: "-230px" };

  const handleModal = () => {

    if (parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'false') {
      setShow(true);
    }
    else if (parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'true') {
      setShow(true);
    }
    else {
      navigate('/company/postajob')
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <div style={sidebarClass} className="border shadow">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="  mt-4 pe-1 d-flex justify-content-end">
            <Tooltip tooltipText={"Menu"}>
              <a className='pe-2' type='button'>
                <span onClick={() => setIsSidebarOpen(prev => !prev)}><RxHamburgerMenu size="20px" /></span>
              </a>
            </Tooltip>
          </div>
          <ul className="nav">

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
              <Link className="nav-link" to="/company/jobs">
                <div className='d-flex justify-content-between w-100'>
                  <span>Posted Jobs</span>
                  <span>
                    <BsPostcardFill size={"20"} />
                  </span>
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/company/recruiters">
                <div className='d-flex justify-content-between w-100'>
                  <span>Recruiters</span>
                  <span>
                    <BsFillPersonCheckFill size={"20"} />
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

            <li className="nav-item">
              <Link className="nav-link" to="/company/inbox">
                <div className='d-flex justify-content-between align-items-center w-100'>
                  <span>Mail</span>
                  <span>
                    <IoMdMailOpen size={"22"} />
                  </span>
                </div>
              </Link>
            </li>

          </ul>
        </nav>
      </div>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {parseInt(localStorage.getItem('credits')) === 0 && localStorage.getItem('usedFreeCredit') === 'false' &&
            <>
              <div className='d-flex flex-column align-items-center gap-2 p-2'>
                <h3>POST A JOB FOR FREE</h3>
                <div>
                  <img style={{ width: "200px" }} src="/assets/images/free-job.gif" alt='free-job'></img>
                </div>

                <div className='d-flex flex-column align-items-center'>
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
                  <label className="form-check-label">
                    <span>Not Enough Credits</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

            <div className="d-flex justify-content-center">
              <button type="button" onClick={() => { handleClose(); navigate('/company/BuyCredits') }} className="btn btn-danger rounded-3">Buy Credits</button>
            </div></>}
        </Modal.Body>
      </Modal >
    </>
  );
}

export default Sidebar;
