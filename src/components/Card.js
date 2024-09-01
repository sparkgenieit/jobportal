import './Card.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";

import { CiBookmark, CiViewList } from "react-icons/ci";

import { JobsContext } from '../helpers/Context';
import { getTrueKeys, timeAgo } from "../helpers/functions";
import { BASE_API_URL, BASE_APP_URL } from "../helpers/constants"
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from 'react-icons/md';
import { IoBookmark, IoHomeOutline } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';
import { PiCarProfileThin } from 'react-icons/pi';
import Tooltip from './Tooltip';
import http from '../helpers/http';
import { markdownToPlainText } from '../helpers/functions/textFunctions';

export default function Card({ job }) {
    const savedJobIds = JSON.parse(sessionStorage.getItem('savedJobIds'))

    const [isJobSaved, setIsJobSaved] = useState(savedJobIds?.includes(job._id) || false)
    const user_id = localStorage.getItem('user_id')
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    const { setInfo, setMessage, setLocationPopup } = useContext(JobsContext)

    const JobsData = JSON.parse(sessionStorage.getItem('JobsData'))

    const count = JobsData?.JobsCount?.filter(x => x._id === job.companyId)

    const companyInfo = JobsData?.companiesWIthInfo?.filter(x => x.user_id === job.companyId)

    function handleSave(e) {
        if (user_id && role === "user") {
            const data = {
                saved_date: new Date().toLocaleDateString('en-GB'),
                userId: user_id,
                jobId: job._id,
                saved: true
            }

            http.post("/jobs/save", data)
                .then((response) => {
                    setMessage({
                        show: true,
                        type: "success",
                        text: "Job Saved Successfully "
                    })
                    setIsJobSaved(true)
                    savedJobIds.push(job._id)
                    sessionStorage.setItem("savedJobIds", JSON.stringify(savedJobIds))
                })
                .catch((e) => {
                    setMessage({
                        show: true,
                        type: "alert alert-danger",
                        text: e.response.data.message
                    })
                    setTimeout(() => {
                        setMessage({ show: false })
                    }, 3000)
                })
        } else {
            setMessage({
                show: true,
                type: "alert alert-danger",
                text: 'Please login as User to save job'
            })
        }
        e.stopPropagation();
    }


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


    const date = new Date(job.creationdate).toLocaleDateString('en-GB')
    const benefits = getTrueKeys(JSON.parse(job.benifits))
    const bn = (JSON.parse(job.benifits))
    return <>
        <div onClick={() => { navigate(`/common/SingleJob/${job._id}`) }} className='job-card px-3 py-2  border rounded shadow '>
            <div style={{ height: "85%" }} className='d-flex flex-column flex-sm-row'>
                <div style={{ width: "80%" }} className=' h-100  position-relative px-1 '>
                    <div className='fw-bold h4' >{job.jobTitle}</div>
                    <div className='d-flex'>
                        {count?.length > 0 ?
                            <Tooltip tooltipText={"Click to View All Jobs"}>
                                <span onClick={(e) => { getJobsbyCompany(e) }}>
                                    <CiViewList fontSize={22} />
                                </span>
                            </Tooltip> :
                            <span style={{ visibility: "hidden" }}>
                                <CiViewList fontSize={22} />
                            </span>
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
                            <span className=''>
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

                    <p className='description text-secondary mt-2 mb-2  small'> {markdownToPlainText(job.description)}</p>

                </div >

                <div className=' d-flex  flex-column   small'>
                    <div className='h-50'>
                        {job.companyLogo.length > 0 && <img className="rounded border company-logo" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
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
                            {job.training.includes("true") && <span className='text-nowrap'>
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

            <div className='small d-flex align-items-center '>
                <span className='pe-3'>{date} ({timeAgo(date)})</span>
                <Tooltip tooltipText={"Share"}>
                    <a className='pe-2' type='button' onClick={(e) => { handleShare(e) }}>
                        <span><FaShare size="20px" /></span>
                    </a>
                </Tooltip>

                <Tooltip tooltipText={isJobSaved ? "Saved" : "Save"}>
                    <a className='pe-2' type='button'>
                        {isJobSaved ?
                            <span><IoBookmark size="20px" /></span>
                            :
                            <span onClick={(e) => handleSave(e)}><CiBookmark size="22px" /></span>
                        }
                    </a>
                </Tooltip>

            </div>
        </div>
    </>
}