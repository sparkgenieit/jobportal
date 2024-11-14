import './Card.css';

import { useContext, useState } from 'react';

import { FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";
import { BsBriefcase, BsCalendar3, BsInfoCircleFill } from 'react-icons/bs';
import { CiBookmark, CiViewList } from "react-icons/ci";
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from 'react-icons/md';
import { IoBookmark, IoHomeOutline } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';
import { PiCarProfileThin } from 'react-icons/pi';

import { JobsContext } from '../../helpers/Context';
import { timeAgo } from "../../helpers/functions";
import { BASE_API_URL, BASE_APP_URL } from "../../helpers/constants"
import Tooltip from '../Tooltip';
import http from '../../helpers/http';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { markdownToPlainText, salaryPerAnnum } from '../../helpers/functions/textFunctions';

export default function Card2({ job }) {
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
                .then(() => {
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


    const openInNewTab = () => {
        const url = `${BASE_APP_URL}/common/SingleJob/${job._id}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${job._id}`)
        message({
            status: "success",
            message: "Link Copied"
        })
        event.stopPropagation();
    }

    const handleLocation = (e) => {
        setLocationPopup({
            show: true,
            city: job.location
        });
        e.stopPropagation();
    }

    const handleInfo = (e) => {
        setInfo({
            show: true,
            info: job.info,
            job: job
        });
        e.stopPropagation();
    }

    const getJobsbyCompany = (e) => {
        window.location.href = `/common/jobs?company=${job.company}`;
        e.stopPropagation();
    }


    const date = new Date(job?.creationdate).toLocaleDateString('en-GB')

    return (
        <div onClick={openInNewTab} className='job-card  border rounded  m-0 row p-1 pt-2'>
            <div className=' col-lg-9 d-flex flex-column h-100 gap-1'>

                <div className=' d-block d-lg-none'>
                    {job.companyLogo.length > 0 && <img className="rounded border company-logo" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
                </div>


                <h3 className='fw-bold fs-4'>{job.jobTitle}</h3>

                <div className='d-flex'>
                    <Tooltip tooltipText={"View All Jobs"} size={12}>
                        <CiViewList fontSize={22} onClick={(e) => { getJobsbyCompany(e) }} />
                    </Tooltip>

                    {job.info?.length > 0 ?
                        <Tooltip tooltipText={"View Company Info"} size={12}>
                            <span className='text-decoration-underline text-primary' onClick={handleInfo}>
                                {job.company}
                            </span>
                        </Tooltip>
                        :
                        job.company}
                </div>

                <div className='d-flex'>
                    <MdOutlineLocationOn size="22px" />
                    <Tooltip tooltipText={"View Activities"} size={12}>
                        <span onClick={handleLocation} className='text-decoration-underline text-primary'>
                            {job.location}
                        </span>
                    </Tooltip>
                </div>

                <div className='flex-grow-1 mt-1'>
                    <p className='text-secondary small   description'> {markdownToPlainText(job.description)}</p>
                </div>

                <div className='d-flex gap-2 small align-items-center'>
                    {date} ({timeAgo(date)})
                    <Tooltip tooltipText={"Share"} size={10} >
                        <FaShare fontSize={20} onClick={handleShare} />
                    </Tooltip>

                    <Tooltip tooltipText={isJobSaved ? "Saved" : "Save"} size={10} >
                        {isJobSaved ?
                            <IoBookmark fontSize={20} />
                            :
                            <CiBookmark fontSize={22} onClick={handleSave} />
                        }
                    </Tooltip>
                </div>
            </div>


            <div className='col-lg-3 m-0 p-0 d-flex flex-column  px-3'>
                <div className=' d-none d-lg-block'>
                    {job.companyLogo.length > 0 && <img className="rounded border company-logo" src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`} alt={job.company} />}
                </div>

                <div className=' mobile-card'>
                    <div className='d-flex d-lg-none justify-content-end py-1'>
                        <BsInfoCircleFill onClick={handleInfo} fontSize={17} />
                    </div>

                    <div className='job-details'>
                        {job.rateperhour &&
                            <Tooltip tooltipText={"Approximate salary"}>
                                <span className='d-flex gap-1 align-items-center'>
                                    <FaDollarSign fontSize={13} />
                                    {job.salary_type === "negotiable" ?
                                        "Negotiable"
                                        :
                                        <>
                                            {job.salary_type === "per annum" ? salaryPerAnnum(job.rateperhour) : job.rateperhour} {job.salary_type}
                                        </>
                                    }
                                </span>
                            </Tooltip>
                        }

                        <Tooltip tooltipText={"Job Type"}>
                            <span className='d-flex gap-1 align-items-center'>
                                <BsBriefcase fontSize={13} />
                                {job.jobtype}
                            </span>
                        </Tooltip>


                        <Tooltip tooltipText={"Duration"}>
                            <span className='d-flex gap-1 align-items-center'>
                                <BsCalendar3 fontSize={13} />
                                {job.duration}
                            </span>
                        </Tooltip>

                        {job.weeklyperhour > 0 &&
                            <Tooltip tooltipText={"Weekly Hours"} className="d-flex gap-2">
                                <span className='d-flex gap-1 align-items-center'>
                                    <FaRegClock fontSize={13} />
                                    {job.weeklyperhour} hours per week
                                </span>
                            </Tooltip>
                        }


                        {job.numberofvacancies > 1 &&
                            <Tooltip tooltipText={"Vacancies"}>
                                <span className='d-flex gap-1 align-items-center'>
                                    <MdOutlinePeopleOutline fontSize={16} />
                                    {job.numberofvacancies} Vacancies
                                </span>
                            </Tooltip>
                        }

                        {job.training?.includes("Yes") &&
                            <span className=' d-flex  gap-1'>
                                <FaCheckSquare fontSize={13} />
                                Training provided
                            </span>
                        }

                        {job.benifits.trim() &&

                            <ul className='d-flex gap-2 m-0  small align-items-end list-unstyled '>
                                {job.benifits?.includes("Accommodation") &&
                                    <li>
                                        <Tooltip tooltipText={"Accommodation"}>
                                            <IoHomeOutline fontSize={13} className='' />
                                        </Tooltip>
                                    </li>
                                }

                                {job.benifits?.includes("Food") &&
                                    <li>
                                        <Tooltip tooltipText={"Food"}>
                                            <GiHotMeal fontSize={13} className='' />
                                        </Tooltip>
                                    </li>
                                }

                                {job.benifits?.includes("Transport") &&
                                    <li>
                                        <Tooltip tooltipText={"Transport"}>
                                            <PiCarProfileThin fontSize={17} />
                                        </Tooltip>
                                    </li>
                                }
                                <li>
                                    Benefits
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div >
        </div>
    )
}