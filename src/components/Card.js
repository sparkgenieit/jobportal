import './Card.css';

import { useContext, useState } from 'react';

import { FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";
import { BsBriefcase, BsCalendar3 } from 'react-icons/bs';
import { CiBookmark, CiViewList } from "react-icons/ci";
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from 'react-icons/md';
import { IoBookmark, IoHomeOutline } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';
import { PiCarProfileThin } from 'react-icons/pi';

import { JobsContext } from '../helpers/Context';
import { getTrueKeys, timeAgo } from "../helpers/functions";
import { BASE_API_URL, BASE_APP_URL } from "../helpers/constants"
import Tooltip from './Tooltip';
import http from '../helpers/http';
import useShowMessage from '../helpers/Hooks/useShowMessage';
import useCurrentUser from '../helpers/Hooks/useCurrentUser';
import { markdownToPlainText } from '../helpers/functions/textFunctions';

export default function Card({ job }) {
    const savedJobIds = JSON.parse(sessionStorage.getItem('savedJobIds'))
    const [isJobSaved, setIsJobSaved] = useState(savedJobIds?.includes(job?._id) || false)
    const { _id: user_id, role } = useCurrentUser()
    const message = useShowMessage()
    const { setInfo, setLocationPopup } = useContext(JobsContext)

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
                    message({
                        status: "success",
                        message: "Job Saved Successfully "
                    })
                    setIsJobSaved(true)
                    savedJobIds.push(job._id)
                    sessionStorage.setItem("savedJobIds", JSON.stringify(savedJobIds))
                })
                .catch((e) => {
                    message({
                        status: "error",
                        error: e
                    })
                })
        } else {
            message({
                status: "error",
                error: { message: "Please login as user to save job" }
            })
        }
        e.stopPropagation();
    }

    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${job._id}`)
        message({
            status: "success",
            message: "Link Copied"
        })
        event.stopPropagation();
    }

    const getJobsbyCompany = (e) => {
        window.location.href = `/common/jobs?company=${job.company}`;
        e.stopPropagation();
    }

    const date = new Date(job?.creationdate).toLocaleDateString('en-GB')
    const benefits = getTrueKeys(JSON.parse(job?.benifits))

    return (
        <div onClick={() => { message({ path: `/common/SingleJob/${job._id}` }) }} className='job-card border shadow rounded '>
            <div className='row h-100 p-3 '>
                <div className='col-9 h-100 d-flex flex-column justify-content-between'>
                    <div>
                        <div className='fw-bold h5' >
                            {job.jobTitle}
                        </div>
                        <div className='d-flex'>
                            <div>
                                <Tooltip tooltipText={"View All Jobs"}>
                                    <span onClick={(e) => { getJobsbyCompany(e) }}>
                                        <CiViewList fontSize={22} />
                                    </span>
                                </Tooltip>
                            </div>
                            {job.info?.length > 0 ?
                                <>
                                    <Tooltip tooltipText={"View Company Info"}>
                                        <span
                                            className='text-decoration-underline text-primary'
                                            onClick={(e) => {
                                                setInfo({
                                                    show: true,
                                                    info: job.info,
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
                    </div>

                    <div className='h-100 flex-grow-1 d-flex  flex-column justify-content-between'>
                        <p className='description text-secondary mt-2  flex-grow-1  small'> {markdownToPlainText(job.description, 190)}</p>

                        <div className='small d-flex align-items-center '>
                            <span className='pe-3'>{date} ({timeAgo(date)})</span>
                            <Tooltip tooltipText={"Share"} size={10} >
                                <a className='pe-2' type='button' onClick={(e) => { handleShare(e) }}>
                                    <span><FaShare size="20px" /></span>
                                </a>
                            </Tooltip>

                            <Tooltip tooltipText={isJobSaved ? "Saved" : "Save"} size={10} >
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
                </div>

                <div className='col-3 h-100'>
                    <div style={{ fontSize: "11px" }} className=' h-100 d-flex flex-column'>
                        <div className='h-50'>
                            {job.companyLogo.length > 0 && <img className="rounded border company-logo" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
                        </div>
                        <div className='flex-grow-1 h-100 d-flex flex-column justify-content-end'>
                            <Tooltip tooltipText={"Approximate salary"}>
                                <div className='d-flex gap-2'>
                                    <span><FaDollarSign fontSize={13} /></span>
                                    <span className=''>
                                        {job.rateperhour} per hour
                                    </span>
                                </div>
                            </Tooltip>

                            <Tooltip tooltipText={"Job Type"}>
                                <div className='d-flex  gap-2'>
                                    <span><BsBriefcase fontSize={13} /></span>
                                    <span>
                                        {job.jobtype}
                                    </span>
                                </div>
                            </Tooltip>


                            <Tooltip tooltipText={"Duration"}>
                                <div className='d-flex  gap-2'>
                                    <span><BsCalendar3 fontSize={13} /></span>
                                    <span className=''>
                                        {job.duration}
                                    </span>
                                </div>
                            </Tooltip>

                            {job.weeklyperhour > 0 &&
                                <Tooltip tooltipText={"Weekly Hours"}>
                                    <div className='d-flex  gap-2'>
                                        <span><FaRegClock fontSize={13} /></span>
                                        <span className=''>
                                            {job.weeklyperhour} hours per week
                                        </span>
                                    </div>
                                </Tooltip>
                            }

                            {job.numberofvacancies > 1 &&
                                <Tooltip tooltipText={"Vacancies"}>
                                    <div className='d-flex gap-1'>
                                        <span>
                                            <MdOutlinePeopleOutline fontSize={17} />
                                        </span>
                                        <span>
                                            {job.numberofvacancies} Vacancies
                                        </span>
                                    </div>
                                </Tooltip>
                            }


                            {job.training.includes("true") &&
                                <span className='text-nowrap d-flex gap-2'>
                                    <span>
                                        <FaCheckSquare fontSize={13} />
                                    </span>
                                    Training provided
                                </span>
                            }

                            <div>
                                {job.benifits && benefits?.length > 0 &&

                                    <div className='d-flex gap-2 '>
                                        {benefits.includes("Accommodation") &&
                                            <Tooltip tooltipText={"Accommodation"}>
                                                <span>
                                                    <IoHomeOutline fontSize={13} />
                                                </span>
                                            </Tooltip>
                                        }

                                        {benefits.includes("Food") &&
                                            <Tooltip tooltipText={"Food"}>
                                                <span>
                                                    <GiHotMeal fontSize={13} />
                                                </span>
                                            </Tooltip>
                                        }

                                        {benefits.includes("Transport") &&
                                            <div style={{ paddingTop: '1px' }}>
                                                <Tooltip tooltipText={"Transport"}>
                                                    <span >
                                                        <PiCarProfileThin fontSize={17} />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        }
                                        <span style={{ paddingTop: '2px' }} >
                                            Benefits
                                        </span>

                                    </div>
                                }
                            </div>
                        </div >
                    </div >
                </div>

            </div>
        </div >
    )
}