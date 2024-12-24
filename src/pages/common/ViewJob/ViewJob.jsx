import "./view-job.css"
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import http from '../../../helpers/http';
import Ads from '../ads';
import { Modal } from "react-bootstrap";
import { BASE_API_URL, BASE_APP_URL } from '../../../helpers/constants';
import { getUserID, getYoutubeVideoId, timeAgo } from '../../../helpers/functions';
import { FaDollarSign, FaRegClock, FaShare, FaYoutube } from 'react-icons/fa6';
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill, PiCarProfileThin } from "react-icons/pi";
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from "react-icons/md";
import { FaCheckSquare } from 'react-icons/fa';
import { GiHotMeal } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import Loader from '../../../components/Loader';
import Tooltip from '../../../components/Tooltip';
import useShowMessage from '../../../helpers/Hooks/useShowMessage';
import { markdownToText, salaryPerAnnum } from '../../../helpers/functions/textFunctions';
import { BsBriefcase, BsCalendar3 } from "react-icons/bs";

import { useDispatch } from "react-redux";
import { setInfo, setLocation } from "../../../helpers/slices/generalSlice";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { Roles } from "../../../services/common/Roles.service";
import ReportJob from "./ReportJob";
import UploadDocs from "./UploadDocs";

export default function ViewJob() {
    const [isJobApplied, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [jobview, setJobview] = useState()
    const dispatch = useDispatch()
    const params = useParams()
    const { _id: userId, role } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ show: false })
    const youtubeRef = useRef(null)
    const message = useShowMessage()

    useEffect(() => {
        setLoading(true)
        Promise.all([getJob(), getUserJobStatus()])
            .finally(() => {
                setLoading(false)
            })
    }, [])


    useEffect(() => {
        const timer = setTimeout(() => {
            increaseView(params.id)
        }, 15 * 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [])


    const getJob = () => {
        http.get(`/jobs/${params.id}`)
            .then((response) => {
                setLoading(false)
                setJobview(response.data)
                document.title = response.data.jobTitle + " | " + response.data.company
            })
            .catch(err => setJobview({}))
    }

    const increaseView = async (id) => {
        if (!role || role === Roles.User) {
            try {
                await http.patch(`/jobs/increase-view-count/${id}`)
            } catch (error) {
                console.log("error occured while increasing views")
            }
        }
    }

    const getUserJobStatus = () => {
        if (userId && userId.trim() !== "") {
            http.get(`/jobs/user-job-status/${userId}?jobId=${params.id}`)
                .then(res => {
                    if (res.data.saved) {
                        setIsJobSaved(true)
                    }
                    if (res.data.applied) {
                        setIsJobApplied(true)
                    }
                })
                .catch(err => {
                    setIsJobSaved(false);
                    setIsJobApplied(false)
                })
        }
    }

    const handleClose = () => {
        setShowModal({
            show: false
        })
    }

    const onReportJob = async (reason) => {
        handleClose()
        try {
            if (userId && role === Roles.User) {
                const data = {
                    userId,
                    jobId: jobview._id,
                    reportReason: reason
                }
                await http.post("/jobs/report", data)
                message({
                    status: "Success",
                    message: "Reported Successfully",
                    path: -1
                })
            }
            else {
                throw new Error("Something went wrong")
            }
        } catch (error) {
            message({
                status: "error",
                error
            })
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/jobs/${jobview._id}`)
        message({
            status: "Success",
            message: "Link Copied"
        })
    }

    async function onApply(data) {

        setShowModal({ show: false })
        try {
            await http.post("/jobs/apply", data)
            message({
                status: "Success",
                message: "Applied Successfully"
            })
            setIsJobApplied(true)

        } catch (error) {
            message({
                status: "Error",
                error: e
            })
        }
    }


    function handleApply() {
        if (userId && role === "user") {
            setShowModal({ show: true, type: "apply" })
        } else {
            message({
                status: "Error",
                error: { message: "Please login as user to apply to job" }
            })
        }
    }

    function handleSave() {
        if (userId && role === "user") {
            const data = {
                saved_date: new Date().toLocaleDateString('en-GB'),
                userId: userId,
                jobId: jobview._id,
                saved: true
            }

            http.post("/jobs/save", data)
                .then(() => {
                    message({
                        status: "Success",
                        message: "Job Saved Successfully"
                    })
                    setIsJobSaved(true)
                })
                .catch((e) => {
                    message({
                        status: "Error",
                        error: e
                    })
                })
        } else {
            message({
                status: "Error",
                error: {
                    message: "Please login as user to save to job",
                }
            })
        }
    }

    const handleInfo = (e) => {
        dispatch(setInfo({
            show: true,
            info: jobview.info,
            job: jobview
        }))
        e.stopPropagation();
    }

    return (
        <>
            {loading && <Loader />}
            {!loading && jobview && jobview.status === "approved" &&
                <div className='m-0 p-0 row mt-3'>
                    <div className={`col-md-9 job-details-box`}>
                        <div className='mb-3 mx-4'>
                            {jobview.banner && <img style={{ width: "100%", height: "40vh" }} className="rounded border border-secondary" src={`${BASE_API_URL}/uploads/banners/${jobview.banner}`} alt={jobview.company} />}
                        </div>
                        <div className=' mb-3 mx-4 d-flex align-items-center justify-content-between logo-youtube-container    '>
                            <div className='d-flex align-items-center  gap-3 w-100 justify-content-between justify-content-lg-start  '>
                                {jobview.companyLogo && jobview.companyLogo.length > 0 && <img className="rounded logo-youtube border border-secondary" src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`} alt={jobview.company} />}


                                {jobview.info?.length > 0 ?
                                    <Tooltip tooltipText={"View Company Info"} size={12}>
                                        <span className='text-decoration-underline text-primary fw-bold fs-4' onClick={handleInfo}>
                                            {jobview.company}
                                        </span>
                                    </Tooltip>
                                    :
                                    jobview.company
                                }

                            </div>

                            {jobview.youtubeUrl &&
                                <div className='position-relative d-none d-lg-block'>
                                    <iframe
                                        ref={youtubeRef}
                                        className="rounded logo-youtube"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                                        allowFullScreen
                                    />

                                    <span role='button'
                                        onClick={() => {
                                            youtubeRef.current.requestFullscreen();
                                        }}
                                        className=' youtube-play-button '
                                    >
                                        <FaYoutube fontSize={70} fill="#FF3D00" />
                                    </span>
                                </div>}
                        </div>

                        <div className='row border border-success rounded mx-4 p-3 responsive-font'>
                            <div className='col-md-8 col-12'>
                                <div className='h4'>
                                    {jobview.jobTitle}
                                </div>
                                <div>
                                    {jobview.jobCategory}/{jobview.subCategory}
                                </div>
                                <div role='button' onClick={() => { dispatch(setLocation({ show: true, city: jobview.location })) }}>
                                    <MdOutlineLocationOn fontSize={20} />
                                    <span className='text-decoration-underline text-primary'>
                                        {jobview.location}
                                    </span>
                                </div>
                                <div className="d-none d-md-block">
                                    {new Date(jobview.creationdate).toLocaleDateString('en-GB')} ({timeAgo(new Date(jobview.creationdate).toLocaleDateString('en-GB'))})
                                </div>
                                <div className='d-flex gap-3 d-none d-md-flex mt-3 align-items-center responsive-font'>
                                    {isJobApplied ?
                                        <button type='button' disabled className='btn btn-primary btn-responsive text-white'>Applied</button>
                                        :
                                        <button type='button' onClick={handleApply} className='btn btn-primary btn-responsive  text-white'>Apply</button>
                                    }

                                    <Tooltip tooltipText={"Share"}>
                                        <FaShare fontSize={20} onClick={handleShare} />
                                    </Tooltip>

                                    {isJobSaved ?
                                        <PiBookmarkSimpleFill fontSize={20} />
                                        :
                                        <Tooltip tooltipText={"Save"}>
                                            <PiBookmarkSimpleBold fontSize={25} onClick={handleSave} />
                                        </Tooltip>

                                    }
                                </div>
                            </div>

                            <div className='col-md-4 col-12'>
                                <div className="d-flex gap-2" >
                                    <span><FaDollarSign fontSize={16} /></span>
                                    {jobview.salary_type === "negotiable" ?
                                        <span>Negotiable</span>
                                        :
                                        < span className=''>
                                            {jobview.salary_type === "per annum" ? salaryPerAnnum(jobview.rateperhour) : jobview.rateperhour} {jobview.salary_type}
                                        </span>
                                    }
                                </div>
                                <div className='d-flex gap-2'>
                                    <span><BsBriefcase fontSize={16} /></span>
                                    <span>
                                        {jobview.jobtype}
                                    </span>
                                </div>
                                <div className="d-flex gap-2">
                                    <span><BsCalendar3 fontSize={16} /></span>
                                    <span>
                                        {jobview.duration}
                                    </span>
                                </div>
                                <div className="d-flex gap-2" >
                                    <span><FaRegClock fontSize={16} /></span>
                                    <span>
                                        {jobview.weeklyperhour} hours per week
                                    </span>
                                </div>

                                {jobview.numberofvacancies > 1 &&
                                    <div className="d-flex gap-2">
                                        <span><MdOutlinePeopleOutline fontSize={16} /></span>
                                        <span>{jobview.numberofvacancies} Vacancies </span>
                                    </div>
                                }

                                {jobview.training?.includes("Yes") &&
                                    <div className='d-flex gap-2'>
                                        <span>
                                            <FaCheckSquare fontSize={16} />
                                        </span>
                                        <span>
                                            Training provided
                                        </span>
                                    </div>
                                }


                                {jobview.benifits &&

                                    <div className='d-flex  align-items-center gap-2'>
                                        {jobview.benifits?.includes("Accommodation") &&
                                            <Tooltip tooltipText={"Accommodation"}>
                                                <span>
                                                    <IoHomeOutline fontSize={16} />
                                                </span>
                                            </Tooltip>
                                        }

                                        {jobview.benifits?.includes("Food") &&
                                            <Tooltip tooltipText={"Food"}>
                                                <span >
                                                    <GiHotMeal fontSize={16} />
                                                </span>
                                            </Tooltip>
                                        }

                                        {jobview.benifits?.includes("Transport") &&
                                            <Tooltip tooltipText={"Transport"}>
                                                <span>
                                                    <PiCarProfileThin fontSize={17} />
                                                </span>
                                            </Tooltip>
                                        }
                                        <span style={{ paddingTop: '2px' }} >
                                            Benefits
                                        </span>
                                    </div>
                                }



                                <div className="d-block mt-3 d-md-none">
                                    {new Date(jobview.creationdate).toLocaleDateString('en-GB')} ({timeAgo(new Date(jobview.creationdate).toLocaleDateString('en-GB'))})
                                </div>
                                <div className='d-flex gap-3 d-block d-md-none mt-2  align-items-center responsive-font'>
                                    {isJobApplied ?
                                        <button type='button' disabled className='btn btn-primary btn-responsive text-white'>Applied</button>
                                        :
                                        <button type='button' onClick={handleApply} className='btn btn-primary btn-responsive  text-white'>Apply</button>
                                    }

                                    <Tooltip tooltipText={"Share"}>
                                        <FaShare fontSize={20} onClick={handleShare} />
                                    </Tooltip>

                                    {isJobSaved ?
                                        <PiBookmarkSimpleFill fontSize={20} />
                                        :
                                        <Tooltip tooltipText={"Save"}>
                                            <PiBookmarkSimpleBold fontSize={25} onClick={handleSave} />
                                        </Tooltip>

                                    }
                                </div>
                            </div>
                        </div>

                        <div className='row  responsive-font border border-success rounded  m-4 p-3'>

                            <div>{markdownToText(jobview.description)}</div>

                            <div className='d-flex  justify-content-between align-items-center'>
                                <div className="d-flex gap-3 align-items-center">

                                    {isJobApplied ?
                                        <button type='button' disabled className='btn btn-responsive btn-primary text-white '>Applied</button>
                                        :
                                        <button type='button' onClick={handleApply} className='btn btn-responsive btn-primary text-white  '>Apply</button>
                                    }

                                    <Tooltip tooltipText={"Share"} size={11}>
                                        <FaShare fontSize={25} onClick={handleShare} />
                                    </Tooltip>

                                    {isJobSaved ?
                                        <PiBookmarkSimpleFill fontSize={25} />
                                        :
                                        <Tooltip tooltipText={"Save"} size={11}>
                                            <PiBookmarkSimpleBold fontSize={25} onClick={handleSave} />
                                        </Tooltip>
                                    }

                                </div>
                                <div>
                                    <button type='button' className='btn btn-responsive btn-danger' onClick={() => setShowModal({ show: true, type: "report" })}>Report</button>
                                </div>
                            </div>
                        </div>

                        <div className="d-block d-lg-none position-relative mx-4">
                            <iframe
                                className="rounded"
                                id="youtube-video"
                                src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <Ads />
                    </div>
                </div >

            }
            {(!loading && !jobview) || jobview.status !== "approved" && <h3>Job Not Found</h3>}

            <Modal size="md" show={showModal.show} onHide={handleClose} centered>
                <Modal.Body className="responsive-font">

                    {showModal.type === "report" && <ReportJob onReportJob={onReportJob} role={role} />}

                    {showModal.type === "apply" && <UploadDocs job_id={params.id} user_id={userId} onApply={onApply} message={message} />}

                </Modal.Body>
            </Modal>
        </>
    );
}
