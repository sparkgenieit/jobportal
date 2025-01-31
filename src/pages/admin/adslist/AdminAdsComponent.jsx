import { useState } from "react"
import { FaBowlFood, FaDollarSign, FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { PiTrainFill } from "react-icons/pi";
import { BsFillPersonFill } from 'react-icons/bs';
import { FaCheckSquare, FaHome } from 'react-icons/fa';
import { marked } from 'marked';
import parse from 'html-react-parser';

import { BASE_API_URL } from '../../../helpers/constants';
import { getYoutubeVideoId, timeAgo } from '../../../helpers/functions';
import Tooltip from '../../../components/Tooltip';

export default function AdminJob({ jobview, handleApprove, setShow }) {
    const [tooltip, setTooltip] = useState({})

    const handleTooltip = (value, name) => {
        setTooltip({ [name]: value })
    }

    const date = new Date(jobview.creationdate).toLocaleDateString('en-GB')

    return <>
        {jobview &&
            <div className='d-flex flex-column gap-3 mt-3  '>
                <div className=' '>
                    {jobview.banner && <img style={{ maxHeight: "40vh" }} className="rounded w-100 h-100  border border-secondary" src={`${BASE_API_URL}/uploads/banners/${jobview.banner}`} alt={jobview.company} />}
                </div>
                <div className='d-flex  gap-2 mb-3  align-items-center'>
                    <div style={{ padding: "0" }}>
                        {jobview.companyLogo && jobview.companyLogo.length > 0 && <img style={{ width: "100px", height: "100px" }} className="rounded border border-secondary" src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`} alt={jobview.company} />}
                    </div>
                    <div className=' fw-bold h3'>{jobview.company}</div>
                </div>

                <div className='row p-3 m-0 border border-success rounded'>
                    <div className='col-12 col-md-8 d-flex flex-column '>
                        <div className='h4'>
                            {jobview.jobTitle}
                        </div>
                        <div>
                            {jobview.jobCategory}/{jobview.subCategory}
                        </div>
                        <div>
                            <span className='pe-1'><FaLocationDot size="20px" /></span>
                            {jobview.location}
                        </div>


                    </div>

                    <div className='col-12 col-md-4  d-flex flex-column gap-1'>
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
                            {jobview.weeklyperhour &&
                                <span>
                                    <span>Weekly Hours:</span>
                                    <span className='ps-1'>
                                        {jobview.weeklyperhour}
                                    </span>
                                </span>
                            }
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
                            {jobview.training?.includes("true") && <span>
                                Training Provided
                                <span className='ps-1'>
                                    <FaCheckSquare size="16px" />
                                </span>
                            </span>
                            }
                        </div>
                        <div>
                            {jobview.benifits &&
                                <div>
                                    <div className='d-flex'>Benefits:
                                        {jobview.benifits?.includes("Accommodation") &&
                                            <Tooltip tooltipText={"Accommodation"}>
                                                <FaHome size="18px" />
                                            </Tooltip>
                                        }
                                        {jobview.benifits?.includes("Transport") &&
                                            <Tooltip tooltipText={"Transport"}>
                                                <PiTrainFill size="18px" />
                                            </Tooltip>
                                        }

                                        {jobview.benifits?.includes("Food") &&
                                            <Tooltip tooltipText={"Food"}>
                                                <FaBowlFood size="18px" />
                                            </Tooltip>
                                        }
                                    </div>
                                </div>}
                        </div>
                    </div>
                    <div>
                        {date} ({timeAgo(date)})
                    </div>
                </div>

                <div className='row border border-success rounded m-0  p-3'>
                    <p>{parse(marked(jobview.description))}</p>
                    <div className='d-flex flex-column flex-md-row gap-2'>
                        {jobview.status !== "approved" && <button type='button' onClick={() => { handleApprove(jobview) }} className='btn btn-success mx-2'>Approve</button>}
                        {jobview.status === "approved" && <button type='button' disabled className='btn btn-success mx-2'>Approved</button>}
                        {jobview.status === "rejected" && <button type='button' disabled className='btn btn-danger mx-2'>Rejected</button>}
                        {jobview.status !== "rejected" && <button type='button' onClick={() => { setShow(true) }} className='btn btn-outline-danger mx-2'>Reject</button>}
                        {jobview.reportReason && <span className="fw-bold mx-3 text-danger">This job is reported due to  {jobview.reportReason}</span>}
                    </div>
                </div>

                {jobview.youtubeUrl &&
                    <div>
                        <iframe
                            className='rounded'
                            width="100%"
                            height="400px"
                            src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                            allowFullScreen
                        />
                    </div>}
            </div >
        }
    </>
}