import './Card.css';
import { getTrueKeys, timeAgo } from "../helpers/functions";
import { BASE_API_URL, BASE_APP_URL } from "../helpers/constants"
import { useState } from 'react';
import { FaBowlFood, FaLocationDot } from "react-icons/fa6";
import { PiTrainFill } from "react-icons/pi";
import { FaHome, FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { marked } from 'marked';
import parse from 'html-react-parser';

export default function Card({ job }) {
    const [tooltip, setTooltip] = useState({})
    const [shareClicked, setShareClicked] = useState(false)

    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${job._id}`)
        setShareClicked(true)
        setTimeout(() => {
            setShareClicked(false)
        }, 1000);
        event.stopPropagation();
    }

    const getJobsbyCompany = (e) => {
        window.location.href = `/common/jobs?company=${job.company}`;
        e.stopPropagation();
    }

    const handleTooltip = (value, name) => {
        setTooltip({ [name]: value })
    }

    const benefits = getTrueKeys(JSON.parse(job.benifits))
    const bn = (JSON.parse(job.benifits))
    return <>
        <div style={{ height: "45vh" }} onClick={() => { window.location.href = `/common/SingleJob/${job._id}` }} className='job-card mb-4 row border rounded shadow p-3'>
            <div className='col-9 h-100  position-relative px-1 '>
                <div className='fw-bold h4'>{job.jobTitle}</div>
                <div>
                    <span onMouseOver={() => handleTooltip(true, "company")} onMouseLeave={(e) => handleTooltip(false, "company")} onClick={(e) => { getJobsbyCompany(e) }}>{job.company}</span>
                    {tooltip.company && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Click to search by company</div>}
                </div>
                <div className=''>
                    <span className='pe-1'><FaLocationDot size="20px" /></span>
                    {job.location}
                </div>
                <div className='text-secondary my-3 small'> {job.description.length > 250 ? `${job.description.slice(0, 250)}...` : job.description}</div>
                <div className='small position-absolute bottom-0 start-0'>
                    <span className='pe-3'>{job.creationdate} ({timeAgo(job.creationdate)})</span>

                    <a className='pe-2' type='button' onMouseOver={() => handleTooltip(true, "share")} onMouseLeave={(e) => handleTooltip(false, "rateperhour")} onClick={(e) => { handleShare(e) }}>
                        <span><FaShare size="20px" /></span>
                        {tooltip.share && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Share</div>}
                    </a>

                    <a onMouseOver={() => handleTooltip(true, "save")} onMouseLeave={(e) => handleTooltip(false, "save")} type='button'>
                        <span><CiBookmark size="22px" /></span>
                        {tooltip.save && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Save</div>}
                    </a>
                </div>
            </div>

            <div className='col-3 d-flex  flex-column  small'>
                <div className='h-50'>
                    {job.companyLogo.length > 0 && <img style={{ height: "15vh" }} className="rounded border w-100" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
                </div>
                <div className='mt-3'>
                    <div >
                        <span onMouseOver={() => handleTooltip(true, "rateperhour")} onMouseLeave={(e) => handleTooltip(false, "rateperhour")}>
                            <span><FaDollarSign size="16px" /></span>
                            <span className='ps-2'>
                                {job.rateperhour} ph
                            </span>
                        </span>

                        {tooltip.rateperhour && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Rate per Hour</div>}

                    </div>
                    <div>
                        <span onMouseOver={() => handleTooltip(true, "duration")} onMouseLeave={(e) => handleTooltip(false, "duration")} >
                            <span><FaRegClock size="16px" /></span>
                            <span className='ps-2'>
                                {job.duration}
                            </span>
                        </span>

                        {tooltip.duration && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Duration</div>}
                    </div>
                    <div>
                        {job.numberofvacancies > 1 && <>
                            <span onMouseOver={() => handleTooltip(true, "vacancies")} onMouseLeave={(e) => handleTooltip(false, "vacancies")} >
                                <span><BsFillPersonFill size="16px" /></span>
                                <span className='ps-2'>{job.numberofvacancies} </span>
                            </span>

                            {tooltip.vacancies && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Vacancies</div>}

                        </>}
                    </div>
                    <div className=''>
                        {job.training.includes("true") && <span>
                            Training Provided
                            <span className='ps-1'>
                                <FaCheckSquare size="16px" />
                            </span>
                        </span>
                        }
                    </div>
                    <div>
                        {job.benifits && benefits.length > 0 &&
                            <div>
                                <div className='d-flex'>Benefits:
                                    {benefits.includes("Accommodation") &&
                                        <span onMouseOver={() => handleTooltip(true, "Accommodation")} onMouseLeave={(e) => handleTooltip(false, "Accommodation")} className='px-1'>
                                            <FaHome size="18px" />
                                            {tooltip.Accommodation && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Accommodation</div>}
                                        </span>
                                    }
                                    {benefits.includes("Transport") &&
                                        <span onMouseOver={() => handleTooltip(true, "transport")} onMouseLeave={(e) => handleTooltip(false, "transport")} className='px-1'>
                                            <PiTrainFill size="18px" />
                                            {tooltip.transport && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Transport</div>}
                                        </span>}
                                    {benefits.includes("Food") &&
                                        <span onMouseOver={() => handleTooltip(true, "food")} onMouseLeave={(e) => handleTooltip(false, "food")} className='px-1'>
                                            <FaBowlFood size="18px" />
                                            {tooltip.food && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Food</div>}
                                        </span>}
                                </div>
                                {bn.Others && <div>{bn.OthersText}</div>}
                            </div>}
                    </div>
                </div >
            </div >
        </div >
        {shareClicked && <div className='link-copied  py-1 px-2 rounded text-white'>Link Copied</div>}
    </>
}