import './Sidebar.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Accordion, Modal } from "react-bootstrap";
import { MdSpaceDashboard } from 'react-icons/md';
import { BsPostcard, BsPostcardFill, BsCreditCard, BsFillPersonCheckFill } from "react-icons/bs";
import { RiAdvertisementFill } from "react-icons/ri";
import { PiListDashesFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { IoMdMailOpen } from "react-icons/io";
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { setIsSidebarOpen } from '../../helpers/slices/generalSlice';
import { companyUrls } from '../../services/common/urls/companyUrls.service';
import Tooltip from '../../components/Tooltip';
import CustomCreditModal from '../../components/company/common/CustomCreditModal';


function Sidebar() {
  const isSidebarOpen = useSelector((state) => state.general.isSidebarOpen)
  const count = useSelector((state) => state.mailCount.EmployerUnreadCount)
  const [show, setShow] = useState(false);
  const [showJobCredit, setShowJobCredit] = useState(false);
  const [showAdCredit, setShowAdCredit] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useCurrentUser()
  const job_credits = user?.job_credits
  const ad_credits = user?.ad_credits
  const banner_ad_days = user?.banner_ad_days
  const landing_page_ad_days = user?.landing_page_ad_days

  const usedFreeJobCredit = user?.usedFreeJobCredit
  const usedFreeAdCredit = user?.usedFreeAdCredit

  const handleNavigation = (path = "") => {
    if (window.innerWidth < 1024) {
      dispatch(setIsSidebarOpen(false))
    }
    navigate(companyUrls.home + path)
  }


  const handleJobCreditModal = () => {
    if (job_credits === 0 && !usedFreeJobCredit) {
      setShowJobCredit(true);
    } else if (job_credits === 0 && usedFreeJobCredit) {
      setShowJobCredit(true);
    } else {
      handleNavigation('/postajob');
    }
  };
  
  const handleAdCreditModal = () => {
    if (ad_credits === 0 && !usedFreeAdCredit) {
      setShowAdCredit(true);
    } else if (ad_credits === 0 && usedFreeAdCredit) {
      setShowAdCredit(true);
    } else {
      handleNavigation(companyUrls.selectAdType)
    }
  };

 
  
  const handleJobClose = () => {
    setShowJobCredit(false)
  }

  const handleAdClose = () => {
    setShowAdCredit(false)
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
              <div role='button' onClick={() => handleNavigation("/CompanyProfile")} className='nav-link d-flex justify-content-between w-100'>
                <span>Company Profile</span>
                <span>
                  <ImProfile size={"20"} />
                </span>
              </div>
            </li>


            <li className="nav-item">
              <div role='button' onClick={() => handleNavigation("/recruiters")} className='d-flex nav-link justify-content-between w-100'>
                <span>Staff</span>
                <span>
                  <BsFillPersonCheckFill size={"20"} />
                </span>
              </div>
            </li>


            <li className="nav-item">
              <div role='button' onClick={() => handleNavigation("/inbox")} className='d-flex nav-link justify-content-between align-items-center w-100'>
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

                    <li>
                      <div role='button' onClick={() => handleNavigation("/BuyJobCredits")} className='d-flex   flex-column w-100'>
                        <div className='d-flex  justify-content-between w-100'>
                          <span>Buy Credits</span>
                          <span>
                            <BsCreditCard size={"20"} />
                          </span>
                        </div>
                        <div className="text-secondary small">Available Credits: {job_credits ? job_credits : 0}</div>
                      </div>

                    </li>


                    <li role='button' onClick={() => handleJobCreditModal("job")}>
                      <span className='d-flex justify-content-between w-100'>
                        <span>Post a Job</span>
                        <span>
                          <BsPostcard size={"20"} />
                        </span>
                      </span>
                    </li>

                    <li>
                      <div role='button' onClick={() => handleNavigation("/jobs")} className='d-flex justify-content-between w-100'>
                        <span>Posted Jobs</span>
                        <span>
                          <BsPostcardFill size={"20"} />
                        </span>
                      </div>
                    </li>


                    <li >
                      <div role='button' onClick={() => handleNavigation("/JobTransactions")} className='d-flex  justify-content-between align-items-center w-100'>
                        <span>Transactions</span>
                        <span>
                          <PiListDashesFill size={"22"} />
                        </span>
                      </div>
                    </li>

                    <li >
                      <div role='button' onClick={() => handleNavigation("/audit")} className='d-flex justify-content-between align-items-center w-100'>
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
                    <li>
                      <div role='button' onClick={() => handleNavigation("/BuyAdCredits")} className='d-flex   flex-column w-100'>
                        <div className='d-flex  justify-content-between w-100'>
                          <span>Ad Credits</span>
                          <span>
                            <BsCreditCard size={"20"} />
                          </span>
                        </div>
                        <div className="text-secondary small">Available Credits: {ad_credits ? ad_credits : 0}</div>
                        {landing_page_ad_days > 0 && (
                            <div className="text-secondary small">
                                Landing Page Ad Days: {landing_page_ad_days}
                            </div>
                        )}    
                         {banner_ad_days > 0 && (
                            <div className="text-secondary small">
                                Banner Ad Days: {banner_ad_days}
                            </div>
                        )}                
                      </div>
                    </li>

                    <li role='button' onClick={() => handleAdCreditModal("ad")}>
                      <span className='d-flex justify-content-between w-100'>
                        <span>Post an Ad</span>
                        <span>
                          <RiAdvertisementFill size={"20"} />
                        </span>
                      </span>
                    </li>

                    <li>
                      <div role='button' onClick={() => handleNavigation(companyUrls.ads)} className='d-flex justify-content-between w-100'>
                        <span>Posted Ads</span>
                        <span>
                          <RiAdvertisementFill size={"20"} />
                        </span>
                      </div>
                    </li>


                    <li >
                      <div role='button' onClick={() =>  handleNavigation("/AdTransactions")} className='d-flex  justify-content-between align-items-center w-100'>
                        <span>Ad Transactions</span>
                        <span>
                          <PiListDashesFill size={"22"} />
                        </span>
                      </div>
                    </li>

                    <li >
                      <div role='button' onClick={() => handleNavigation("/adAudit")} className='d-flex justify-content-between align-items-center w-100'>
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
      <CustomCreditModal
  show={showJobCredit}
  handleClose={handleJobClose}
  handleNavigation={handleNavigation}
  type="job"
  credits={job_credits}
  usedFreeCredit={usedFreeJobCredit}
/>

<CustomCreditModal
  show={showAdCredit}
  handleClose={handleAdClose}
  handleNavigation={handleNavigation}
  type="ad"
  credits={ad_credits}
  usedFreeCredit={usedFreeAdCredit}
/>
      
    </>
  );
}

export default Sidebar;
