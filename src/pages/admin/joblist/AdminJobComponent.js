import { useState } from "react"
import { BASE_API_URL, BASE_APP_URL } from '../../../helpers/constants';
import { getTrueKeys, getYoutubeVideoId, timeAgo } from '../../../helpers/functions';
import { FaBowlFood, FaDollarSign, FaLocationDot, FaRegClock, FaShare } from 'react-icons/fa6';
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill, PiTrainFill } from "react-icons/pi";
import { BsFillPersonFill } from 'react-icons/bs';
import { FaCheckSquare, FaHome } from 'react-icons/fa';
import { marked } from 'marked';
import parse from 'html-react-parser';

export default function AdminJob({ jobview, handleApprove, setShow }) {
    const [tooltip, setTooltip] = useState({})

    const handleTooltip = (value, name) => {
        setTooltip({ [name]: value })
    }



    const date = new Date(jobview.creationdate).toLocaleDateString('en-GB')
    const benefits = getTrueKeys(JSON.parse(jobview.benifits))
    const bn = (JSON.parse(jobview.benifits))

    return <>
        {jobview &&
            <div className='container mt-3 '>
                {/* {message.showMsg && <Toaster />} */}
                <div>
                    <div className='mb-3'>
                        {jobview.banner && <img style={{ height: "40vh" }} className="rounded w-100 border border-secondary" src={`${BASE_API_URL}/uploads/banners/${jobview.banner}`} alt={jobview.company} />}
                    </div>
                    <div className='row mb-3 mx-4 align-items-center'>
                        <div style={{ padding: "0" }} className='col-4'>
                            {jobview.companyLogo && jobview.companyLogo.length > 0 && <img style={{ width: "100px", height: "100px" }} className="rounded border border-secondary" src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`} alt={jobview.company} />}
                        </div>
                        <div className='col fw-bold h3'>{jobview.company}</div>
                    </div>

                    <div className='row border border-success rounded mx-4 p-3'>
                        <div className='col-8 d-flex flex-column gap-2 '>
                            <div className='h4'>
                                {jobview.jobTitle}
                            </div>
                            <div>
                                {jobview.jobCategory}/{jobview.subCategory}
                            </div>
                            <div className='mb-4'>
                                <span className='pe-1'><FaLocationDot size="20px" /></span>
                                {jobview.location}
                            </div>
                            <div>
                                {date} ({timeAgo(date)})
                            </div>

                        </div>

                        <div className='col-4 d-flex flex-column gap-1'>
                            <div>
                                <span><FaDollarSign size="16px" /></span>
                                <span className='ps-2'>
                                    {jobview.rateperhour} ph
                                </span>
                            </div>
                            <div>
                                <span>
                                    <span><FaRegClock size="16px" /></span>
                                    <span className='ps-2'>
                                        {jobview.duration}
                                    </span>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <span>Type:</span>
                                    <span className='ps-1'>
                                        {jobview.jobtype}
                                    </span>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <span>Weekly Hours:</span>
                                    <span className='ps-1'>
                                        {jobview.weeklyperhour}
                                    </span>
                                </span>
                            </div>

                            <div>
                                {jobview.numberofvacancies > 1 && <>
                                    <span onMouseOver={() => handleTooltip(true, "vacancies")} onMouseLeave={(e) => handleTooltip(false, "vacancies")} >
                                        <span><BsFillPersonFill size="16px" /></span>
                                        <span className='ps-2'>{jobview.numberofvacancies} Vacancies </span>
                                    </span>

                                    {tooltip.vacancies && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Vacancies</div>}

                                </>}
                            </div>
                            <div className=''>
                                {jobview.training.includes("true") && <span>
                                    Training Provided
                                    <span className='ps-1'>
                                        <FaCheckSquare size="16px" />
                                    </span>
                                </span>
                                }
                            </div>
                            <div>
                                {jobview.benifits && getTrueKeys(JSON.parse(jobview.benifits)).length > 0 &&
                                    <div>
                                        <div className='d-flex'>Benefits:
                                            {benefits.includes("Accommodation") &&
                                                <span onMouseOver={() => handleTooltip(true, "Accommodation")} onMouseLeave={(e) => handleTooltip(false, "Accommodation")} className='px-1'>
                                                    <FaHome size="18px" />
                                                    {tooltip.Accommodation && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Accommodation</div>}
                                                </span>
                                            }
                                            {benefits.includes("Transport") &&
                                                <span onMouseOver={() => handleTooltip(true, "transport")} onMouseLeave={(e) => handleTooltip(false, "transport")} className='px-1'>
                                                    <PiTrainFill size="18px" />
                                                    {tooltip.transport && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Transport</div>}
                                                </span>}
                                            {benefits.includes("Food") &&
                                                <span onMouseOver={() => handleTooltip(true, "food")} onMouseLeave={(e) => handleTooltip(false, "food")} className='px-1'>
                                                    <FaBowlFood size="18px" />
                                                    {tooltip.food && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Food</div>}
                                                </span>}
                                        </div>
                                        {bn.Others && <div>{bn.OthersText}</div>}
                                    </div>}
                            </div>

                        </div>
                    </div>

                    <div className='row border border-success rounded  m-4 p-3'>
                        <p>{parse(marked(jobview.description))}</p>
                        <div className='d-flex justify-content-between'>
                            <div className="gap-2">
                                {jobview.status !== "approved" && <button type='button' onClick={() => { handleApprove(jobview) }} className='btn btn-success mx-2'>Approve</button>}
                                {jobview.status === "approved" && <button type='button' disabled className='btn btn-success mx-2'>Approved</button>}
                                {jobview.status === "rejected" && <button type='button' disabled className='btn btn-danger mx-2'>Rejected</button>}
                                {jobview.status !== "rejected" && <button type='button' onClick={() => { setShow(true) }} className='btn btn-outline-danger mx-2'>Reject</button>}
                                {jobview.reportReason && <span className="fw-bold mx-3 text-danger">This job is reported due to  {jobview.reportReason}</span>}
                            </div>
                        </div>
                    </div>

                    {jobview.youtubeUrl && <div className='m-4'>
                        <iframe
                            className='rounded'
                            width="100%"
                            height="400px"
                            src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                            allowFullScreen
                        />
                    </div>}


                </div>


            </div >

        }
    </>
}