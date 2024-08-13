import './Card.css';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";

import { CiBookmark, CiViewList } from "react-icons/ci";

import { JobsContext } from '../helpers/Context';
import { getTrueKeys, timeAgo } from "../helpers/functions";
import { BASE_API_URL, BASE_APP_URL } from "../helpers/constants"
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from 'react-icons/md';
import { IoHomeOutline } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';
import { PiCarProfileThin } from 'react-icons/pi';
import Tooltip from './Tooltip';

export default function Card({ job }) {
    const navigate = useNavigate()

    const { setInfo, setMessage, setLocationPopup } = useContext(JobsContext)

    const [tooltip, setTooltip] = useState({})

    const JobsData = JSON.parse(sessionStorage.getItem('JobsData'))

    const count = JobsData?.JobsCount?.filter(x => x._id === job.companyId)

    const companyInfo = JobsData?.companiesWIthInfo?.filter(x => x.user_id === job.companyId)


    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${job._id}`)
        setMessage({
            show: true,
            type: "success",
            text: "Link Copied"
        })
        setTimeout(() => {
            setMessage({ show: false })
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
                <div className='d-flex'>
                    {count?.length > 0 &&
                        <Tooltip tooltipText={"Click to View All Jobs"}>
                            <span onClick={(e) => { getJobsbyCompany(e) }}>
                                <CiViewList fontSize={22} />
                            </span>
                        </Tooltip>
                    }
                    {companyInfo?.length > 0 ?
                        <>
                            <Tooltip tooltipText={"View company info"}>
                                <span
                                    className='text-decoration-underline text-primary'
                                    onClick={(e) => {
                                        setInfo({
                                            show: true,
                                            info: companyInfo[0].info,
                                            job: job
                                        });
                                        e.stopPropagation();
                                    }}
                                >
                                    {job.company}
                                </span>
                            </Tooltip>
                        </>
                        :
                        <span>
                            {job.company}
                        </span>
                    }
                </div >

                <div className=' d-flex mt-2'>

                    <MdOutlineLocationOn size="22px" />
                    <Tooltip tooltipText={"Click to View Activities"}>
                        <span
                            onClick={(e) => {
                                setLocationPopup({
                                    show: true,
                                    city: job.location
                                });
                                e.stopPropagation();
                            }}
                            className='text-decoration-underline text-primary'
                        >
                            {job.location}
                        </span>
                    </Tooltip>

                </div>

                <p style={{ lineHeight: "1.2" }} className='text-secondary mt-3 mb-2  small'> {job.description.length > 225 ? `${job.description.slice(0, 225)}...` : job.description}</p>
                <div className='small d-flex position-absolute bottom-0 start-0'>
                    <span className='pe-3'>{date} ({timeAgo(date)})</span>
                    <Tooltip tooltipText={"Share"}>
                        <a className='pe-2' type='button' onClick={(e) => { handleShare(e) }}>
                            <span><FaShare size="20px" /></span>
                        </a>
                    </Tooltip>
                    <Tooltip tooltipText={"Save"}>
                        <a className='pe-2' type='button'>
                            <span><CiBookmark size="22px" /></span>
                        </a>
                    </Tooltip>
                </div>
            </div >

            <div className='col-3 d-flex  flex-column  small'>
                <div className='h-50'>
                    {job.companyLogo.length > 0 && <img style={{ width: "9vw", height: "12vh" }} className="rounded border" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
                </div>
                <div className=''>
                    <Tooltip tooltipText={"Rate per Hour"}>
                        <span><FaDollarSign size="16px" /></span>
                        <span className='ps-2'>
                            {job.rateperhour} ph
                        </span>
                    </Tooltip>

                    <Tooltip tooltipText={"Duration"}>
                        <span><FaRegClock size="16px" /></span>
                        <span className='ps-2'>
                            {job.duration}
                        </span>
                    </Tooltip>

                    <Tooltip tooltipText={"Vacancies"}>
                        {job.numberofvacancies > 1 && <>
                            <span>
                                <span><MdOutlinePeopleOutline size="20px" /></span>
                                <span className='ps-2'>{job.numberofvacancies} </span>
                            </span>
                        </>}
                    </Tooltip>
                    <div className=''>
                        {job.training.includes("true") && <span>
                            Training Provided
                            <span className='ps-1'>
                                <FaCheckSquare size="18px" />
                            </span>
                        </span>
                        }
                    </div>
                    <div>
                        {job.benifits && benefits.length > 0 &&
                            <div>
                                <div className='d-flex'>Benefits:
                                    {benefits.includes("Accommodation") &&
                                        <Tooltip tooltipText={"Accommodation"}>
                                            <span className='px-1'>
                                                <IoHomeOutline size="18px" />
                                            </span>
                                        </Tooltip>
                                    }

                                    {benefits.includes("Food") &&
                                        <Tooltip tooltipText={"Food"}>
                                            <span className='px-1'>
                                                <GiHotMeal size="18px" />
                                            </span>
                                        </Tooltip>
                                    }

                                    {benefits.includes("Transport") &&
                                        <Tooltip tooltipText={"Transport"}>
                                            <span className='px-1'>
                                                <PiCarProfileThin size="22px" />
                                            </span>
                                        </Tooltip>
                                    }
                                </div>
                                {bn.Others && <div>{bn.OthersText}</div>}
                            </div>}
                    </div>
                </div >
            </div >
        </div >
    </>
}