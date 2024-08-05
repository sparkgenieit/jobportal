import './Card.css';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBowlFood, FaLocationDot } from "react-icons/fa6";
import { PiTrainFill } from "react-icons/pi";
import { FaHome, FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { CiBookmark, CiViewList } from "react-icons/ci";

import { JobsContext } from '../helpers/Context';
import { getTrueKeys, timeAgo } from "../helpers/functions";
import { BASE_API_URL, BASE_APP_URL } from "../helpers/constants"

export default function Card({ job }) {
    const navigate = useNavigate()

    const { setInfo, message, setMessage, setLocationPopup } = useContext(JobsContext)

    const [tooltip, setTooltip] = useState({})

    const JobsData = JSON.parse(sessionStorage.getItem('JobsData'))

    const count = JobsData.JobsCount.filter(x => x._id === job.companyId)

    const companyInfo = JobsData.companiesWIthInfo.filter(x => x.user_id === job.companyId)


    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${job._id}`)
        setMessage({
            show: true,
            type: "success",
            text: "Link Copied"
        })
        setTimeout(() => {
            setMessage({ ...message, show: false })
        }, 3000);
        event.stopPropagation();
    }

    const getJobsbyCompany = (e) => {
        window.location.href = `/common/jobs?company=${job.company}`;
        e.stopPropagation();
    }

    const handleTooltip = (value, name) => {
        setTooltip({ [name]: value })
    }

    const date = new Date(job.creationdate).toLocaleDateString('en-GB')
    const benefits = getTrueKeys(JSON.parse(job.benifits))
    const bn = (JSON.parse(job.benifits))
    return <>
        <div style={{ height: "37vh", width: "45vw" }} onClick={() => { navigate(`/common/SingleJob/${job._id}`) }} className='job-card px-3 py-2  row border rounded shadow '>
            <div className='col-9 h-100  position-relative px-1 '>
                <div className='fw-bold h4' >{job.jobTitle}</div>
                <div className='position-relative'>
                    {count.length > 0 &&
                        <span
                            onMouseOver={() => handleTooltip(true, "company")}
                            onMouseLeave={() => handleTooltip(false, "company")}
                            onClick={(e) => { getJobsbyCompany(e) }}>
                            <CiViewList />
                        </span>}
                    {tooltip.company && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Click to View All Jobs</div>}
                    {companyInfo.length > 0 ?
                        <>
                            <span
                                className='text-decoration-underline text-primary'
                                onMouseOver={() => handleTooltip(true, "info")}
                                onMouseLeave={() => handleTooltip(false, "info")}
                                onClick={(e) => {
                                    setInfo({
                                        show: true,
                                        info: companyInfo[0].info,
                                        name: job.company
                                    });
                                    e.stopPropagation();
                                }}
                            >
                                {job.company}
                            </span>
                            {tooltip.info && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>View company info</div>}
                        </>
                        :
                        <span>
                            {job.company}
                        </span>
                    }
                </div>

                <div className='mt-2'>
                    <span
                        onClick={(e) => {
                            setLocationPopup({
                                show: true,
                                city: job.location
                            });
                            e.stopPropagation();
                        }}
                        className='d-flex'
                    >
                        <FaLocationDot size="20px" />
                        <span onMouseOver={() => handleTooltip(true, "location")} onMouseLeave={() => handleTooltip(false, "location")} className='text-decoration-underline text-primary'>{job.location}</span>
                    </span>
                    {tooltip.location && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Click to View Activities</div>}
                </div>

                <p style={{ lineHeight: "1.2" }} className='text-secondary mt-3 mb-2  small'> {job.description.length > 225 ? `${job.description.slice(0, 225)}...` : job.description}</p>
                <div className='small position-absolute bottom-0 start-0'>
                    <span className='pe-3'>{date} ({timeAgo(date)})</span>

                    <a className='pe-2' type='button' onMouseOver={() => handleTooltip(true, "share")} onMouseLeave={() => handleTooltip(false, "rateperhour")} onClick={(e) => { handleShare(e) }}>
                        <span><FaShare size="20px" /></span>
                        {tooltip.share && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Share</div>}
                    </a>

                    <a onMouseOver={() => handleTooltip(true, "save")} onMouseLeave={() => handleTooltip(false, "save")} type='button'>
                        <span><CiBookmark size="22px" /></span>
                        {tooltip.save && <div className='mt-2 py-1 px-2 position-absolute bg-secondary rounded text-white'>Save</div>}
                    </a>
                </div>
            </div>

            <div className='col-3 d-flex  flex-column  small'>
                <div className='h-50'>
                    {job.companyLogo.length > 0 && <img style={{ width: "9vw", height: "12vh" }} className="rounded border" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
                </div>
                <div className=''>
                    <div >
                        <span onMouseOver={() => handleTooltip(true, "rateperhour")} onMouseLeave={() => handleTooltip(false, "rateperhour")}>
                            <span><FaDollarSign size="16px" /></span>
                            <span className='ps-2'>
                                {job.rateperhour} ph
                            </span>
                        </span>

                        {tooltip.rateperhour && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Rate per Hour</div>}

                    </div>
                    <div>
                        <span onMouseOver={() => handleTooltip(true, "duration")} onMouseLeave={() => handleTooltip(false, "duration")} >
                            <span><FaRegClock size="16px" /></span>
                            <span className='ps-2'>
                                {job.duration}
                            </span>
                        </span>

                        {tooltip.duration && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Duration</div>}
                    </div>
                    <div>
                        {job.numberofvacancies > 1 && <>
                            <span onMouseOver={() => handleTooltip(true, "vacancies")} onMouseLeave={() => handleTooltip(false, "vacancies")} >
                                <span><BsFillPersonFill size="16px" /></span>
                                <span className='ps-2'>{job.numberofvacancies} </span>
                            </span>

                            {tooltip.vacancies && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Vacancies</div>}

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
                                        <span onMouseOver={() => handleTooltip(true, "Accommodation")} onMouseLeave={() => handleTooltip(false, "Accommodation")} className='px-1'>
                                            <FaHome size="18px" />
                                            {tooltip.Accommodation && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Accommodation</div>}
                                        </span>
                                    }
                                    {benefits.includes("Transport") &&
                                        <span onMouseOver={() => handleTooltip(true, "transport")} onMouseLeave={() => handleTooltip(false, "transport")} className='px-1'>
                                            <PiTrainFill size="18px" />
                                            {tooltip.transport && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Transport</div>}
                                        </span>}
                                    {benefits.includes("Food") &&
                                        <span onMouseOver={() => handleTooltip(true, "food")} onMouseLeave={() => handleTooltip(false, "food")} className='px-1'>
                                            <FaBowlFood size="18px" />
                                            {tooltip.food && <div className='position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>Food</div>}
                                        </span>}
                                </div>
                                {bn.Others && <div>{bn.OthersText}</div>}
                            </div>}
                    </div>
                </div >
            </div >
        </div >
    </>
}