import "./Sidebar.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Accordion, Modal } from "react-bootstrap";
import { MdSpaceDashboard } from 'react-icons/md';
import { BsPostcard, BsPostcardFill, BsCreditCard, BsFillPersonCheckFill } from "react-icons/bs";
import { RiAdvertisementFill } from "react-icons/ri";
import { PiListDashesFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdMailOpen } from "react-icons/io";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import Tooltip from '../../components/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { setIsSidebarOpen } from '../../helpers/slices/generalSlice';
import { recruiterUrl } from '../../services/common/urls/recruiterUrls.service';

function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.general.isSidebarOpen)
  const count = useSelector((state) => state.mailCount.EmployerUnreadCount)
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useCurrentUser()
  const credits = user?.companyId?.credits || 0
  const usedFreeCredit = user?.companyId?.usedFreeCredit || false

  const handleNavigation = (path = "") => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false))
    }
    navigate(recruiterUrl.home + path)
  }


  const handleModal = () => {

    if (credits === 0 && !usedFreeCredit) {
      setShow(true);
    }
    else if (credits === 0 && usedFreeCredit) {
      setShow(true);
    }
    else {
      handleNavigation(recruiterUrl.postJob)
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <div className={`border shadow ${isSidebarOpen ? "sidebar-showing" : "sidebar-not-showing"}`} >
        <nav className="sidebar" id="sidebar">
          <div className="  mt-4 pe-1 d-flex justify-content-end d-none d-lg-flex">
            <Tooltip tooltipText={"Menu"}>
              <a className='pe-2' type='button'>
                <span onClick={() => dispatch(setIsSidebarOpen())}><RxHamburgerMenu size="20px" /></span>
              </a>
            </Tooltip>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <div role='button' onClick={() => handleNavigation()} className='nav-link d-flex justify-content-between w-100'>
                <span>Dashboard</span>
                <span>
                  <MdSpaceDashboard size={"20"} />
                </span>
              </div>
            </li>


            <li className="nav-item">
              <div role='button' onClick={() => handleNavigation(recruiterUrl.inbox)} className='d-flex nav-link justify-content-between align-items-center w-100'>
                <span>
                  Mail
                  {count > 0 && <span className=' ps-3 text-danger'>{count}</span>}
                </span>
                <span>
                  <IoMdMailOpen size={"22"} />
                </span>
              </div>
            </li>

            <Accordion alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span className='ps-2 fst-normal'>Jobs</span>
                </Accordion.Header>
                <Accordion.Body>

                  <ul className='list-unstyled d-flex flex-column gap-3'>

                    <li role='button' onClick={() => { handleModal(true) }}>
                      <span className='d-flex justify-content-between w-100'>
                        <span>Post a Job</span>
                        <span>
                          <BsPostcard size={"20"} />
                        </span>
                      </span>
                    </li>

                    <li>
                      <div role='button' onClick={() => handleNavigation(recruiterUrl.postedJobs)} className='d-flex justify-content-between w-100'>
                        <span>Posted Jobs</span>
                        <span>
                          <BsPostcardFill size={"20"} />
                        </span>
                      </div>
                    </li>

                    <li>
                      <div role='button' onClick={() => handleNavigation(recruiterUrl.buyCredits)} className='d-flex   flex-column w-100'>
                        <div className='d-flex  justify-content-between w-100'>
                          <span>Buy Credits</span>
                          <span>
                            <BsCreditCard size={"20"} />
                          </span>
                        </div>
                        <div className="text-secondary small">Available Credits: {credits ? credits : 0}</div>
                      </div>

                    </li>

                    <li >
                      <div role='button' onClick={() => handleNavigation(recruiterUrl.transactions)} className='d-flex  justify-content-between align-items-center w-100'>
                        <span>Transactions</span>
                        <span>
                          <PiListDashesFill size={"22"} />
                        </span>
                      </div>
                    </li>

                    <li >
                      <div role='button' onClick={() => handleNavigation(recruiterUrl.audit)} className='d-flex justify-content-between align-items-center w-100'>
                        <span>
                          Audit Log
                        </span>
                        <span>
                          <HiOutlineDocumentMagnifyingGlass size={"22"} />
                        </span>
                      </div>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <span className='ps-2'>Advertisements</span>
                </Accordion.Header>
                <Accordion.Body>
                  <ul className='list-unstyled d-flex flex-column gap-3'>
                    <li role='button'>
                      <span className='d-flex justify-content-between w-100'>
                        <span>Post an Ad</span>
                        <span>
                          <RiAdvertisementFill size={"20"} />
                        </span>
                      </span>
                    </li>

                    <li>
                      <div role='button' onClick={() => handleNavigation()} className='d-flex justify-content-between w-100'>
                        <span>Posted Ads</span>
                        <span>
                          <RiAdvertisementFill size={"20"} />
                        </span>
                      </div>
                    </li>

                    <li>
                      <div role='button' onClick={() => handleNavigation()} className='d-flex   flex-column w-100'>
                        <div className='d-flex  justify-content-between w-100'>
                          <span>Ad Credits</span>
                          <span>
                            <BsCreditCard size={"20"} />
                          </span>
                        </div>
                        <div className="text-secondary small">Available Credits: {0}</div>
                      </div>

                    </li>

                    <li >
                      <div role='button' onClick={() => handleNavigation()} className='d-flex  justify-content-between align-items-center w-100'>
                        <span>Ad Transactions</span>
                        <span>
                          <PiListDashesFill size={"22"} />
                        </span>
                      </div>
                    </li>

                    <li >
                      <div role='button' onClick={() => handleNavigation()} className='d-flex justify-content-between align-items-center w-100'>
                        <span>
                          Ad Audit Log
                        </span>
                        <span>
                          <HiOutlineDocumentMagnifyingGlass size={"22"} />
                        </span>
                      </div>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>



            {/* <li className="nav-item">
              <div role='button' onClick={() => handleNavigation("/ads")} className='nav-link d-flex justify-content-between w-100'>
                <span>Ads</span>
                <span>
                  <RiAdvertisementFill size={"20"} />
                </span>
              </div>
            </li> */}




          </ul>
        </nav>
      </div >

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          {credits === 0 && !usedFreeCredit &&
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
                  <button type="button" onClick={() => { handleClose(); handleNavigation(recruiterUrl.postJob) }} className="btn btn-info">Post a Job</button>
                </div>
              </div>
            </>}

          {credits === 0 && usedFreeCredit &&
            <><div className="form-row ml-5">
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
                <button type="button" onClick={() => { handleClose(); handleNavigation(recruiterUrl.buyCredits) }} className="btn btn-danger rounded-3">Buy Credits</button>
              </div></>}
        </Modal.Body>
      </Modal >
    </>
  );
}

export default Sidebar;
