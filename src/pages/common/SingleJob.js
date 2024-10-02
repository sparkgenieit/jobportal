import "./SingleJob.css"
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import http from '../../helpers/http';
import Ads from './ads';
import { Modal } from "react-bootstrap";
import { BASE_API_URL, BASE_APP_URL } from '../../helpers/constants';
import { getTrueKeys, getUserID, getYoutubeVideoId, timeAgo } from '../../helpers/functions';
import { FaDollarSign, FaRegClock, FaShare, FaYoutube } from 'react-icons/fa6';
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill, PiCarProfileThin } from "react-icons/pi";
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from "react-icons/md";
import { FaCheckSquare } from 'react-icons/fa';
import { GiHotMeal } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import Loader from '../../components/Loader';
import LocationPopup from '../../components/LocationPopup';
import Tooltip from '../../components/Tooltip';
import { JobsContext } from '../../helpers/Context';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import { markdownToText, parseString } from '../../helpers/functions/textFunctions';
import { BsBriefcase, BsCalendar3 } from "react-icons/bs";
import InfoPopup from "../../components/InfoPopup";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";

function SingleJob() {
    const [isJobApplied, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [jobview, setJobview] = useState()
    const { setLocationPopup, setInfo } = useContext(JobsContext);
    const params = useParams();
    const role = localStorage.getItem('role')
    const userId = getUserID()
    const [loading, setLoading] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [reportReason, setReportReason] = useState("")
    const [reportError, setReportError] = useState(false)
    const youtubeRef = useRef(null)
    const message = useShowMessage()

    useEffect(() => {
        setLoading(true)
        Promise.all([getJob(), getUserJobStatus()])
            .then(res => {
                setLoading(false)
            }).catch(e => {
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
            })
            .catch(err => setJobview())
    }

    const increaseView = async (id) => {
        if (!role || role === "user") {
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

    const handleReportReason = (e) => {
        setReportReason(e.target.value)
    }

    const handleClose = () => {
        setShowReport(false)
        setReportReason("")
        setReportError(false)
    }

    const ReportJob = async () => {
        try {
            if (userId && role == "user") {
                const data = {
                    userId,
                    jobId: jobview._id,
                    reportReason
                }
                await http.post("jobs/report", data)
                handleClose();
                message({
                    status: "Success",
                    message: "Reported Successfully",
                    path: -1
                })
            }
            else {
                throw new Error
            }
        } catch (error) {
            setReportError(true)
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${jobview._id}`)
        message({
            status: "Success",
            message: "Link Copied"
        })
    }

    function handleApply() {
        if (userId && role === "user") {
            const data = {
                applied_date: new Date().toLocaleDateString('en-GB'),
                userId: userId,
                jobId: jobview._id,
                applied: true
            }
            http.post("/jobs/apply", data)
                .then((response) => {

                    message({
                        status: "Success",
                        message: "Applied Successfully"
                    })
                    setIsJobApplied(true)
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
                .then((response) => {

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


    return (
        <>
            {loading && <Loader />}
            {!loading && jobview && jobview.status === "approved" &&
                <div className='row mt-3 '>
                    <div style={{ paddingLeft: "100px" }} className={`col-md-9 job-details-box`}>
                        <div className='mb-3 mx-4'>
                            {jobview.banner && <img style={{ width: "100%", height: "40vh" }} className="rounded border border-secondary" src={`${BASE_API_URL}/uploads/banners/${jobview.banner}`} alt={jobview.company} />}
                        </div>
                        <div className=' mb-3 mx-4 d-flex justify-content-between '>
                            <div style={{ padding: "0" }} className='d-flex align-items-center'>
                                {jobview.companyLogo && jobview.companyLogo.length > 0 && <img style={{ width: "9vw", height: "12vh" }} className="rounded border border-secondary" src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`} alt={jobview.company} />}
                                <div className='col fw-bold h3' style={{ marginLeft: "30px" }}>
                                    {jobview.info?.length > 0 ?
                                        <>
                                            <Tooltip tooltipText={"View Company Info"} size={12}>
                                                <span
                                                    className='text-decoration-underline text-primary'
                                                    onClick={(e) => {
                                                        setInfo({
                                                            show: true,
                                                            info: jobview.info,
                                                            job: jobview
                                                        });
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    {jobview.company}
                                                </span>
                                            </Tooltip>
                                        </>
                                        :
                                        <span className=''>
                                            {jobview.company}
                                        </span>
                                    }
                                </div>
                            </div>
                            <div>

                                {jobview.youtubeUrl && <div className='position-relative'  >
                                    <iframe
                                        ref={youtubeRef}
                                        className='rounded no-scrollbar'
                                        width="150px"
                                        height="90px"
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(jobview.youtubeUrl)}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    />
                                    <span role='button' onClick={() => { youtubeRef.current.requestFullscreen() }} style={{ right: "40px", top: "11px" }} className='position-absolute'>
                                        <FaYoutube fontSize={70} fill="#FF3D00" />
                                    </span>
                                </div>}

                            </div>
                        </div>

                        <div className='row border border-success rounded mx-4 p-3'>
                            <div className='col-md-8 col-12'>
                                <div className='h4'>
                                    {jobview.jobTitle}
                                </div>
                                <div>
                                    {jobview.jobCategory}/{jobview.subCategory}
                                </div>
                                <div role='button' onClick={() => { setLocationPopup({ show: true, city: jobview.location }) }}>
                                    <span className='pe-1 '><MdOutlineLocationOn size="20px" /></span>
                                    <span className='text-decoration-underline text-primary'>
                                        {jobview.location}
                                    </span>
                                </div>
                                <div>
                                    {new Date(jobview.creationdate).toLocaleDateString('en-GB')} ({timeAgo(new Date(jobview.creationdate).toLocaleDateString('en-GB'))})
                                </div>
                                <div className='d-flex gap-4  mt-3 align-items-center'>
                                    {isJobApplied ?
                                        <button type='button' disabled className='btn btn-primary text-white'>Applied</button>
                                        :
                                        <button type='button' onClick={handleApply} className='btn btn-primary text-white'>Apply</button>
                                    }

                                    <Tooltip tooltipText={"Share"}>
                                        <a className='pe-2' type='button' onClick={() => { handleShare() }}>
                                            <span><FaShare size="20px" /></span>
                                        </a>
                                    </Tooltip>

                                    {isJobSaved ?
                                        <a type='button'>
                                            <span><PiBookmarkSimpleFill size="25px" /></span>
                                        </a>
                                        :
                                        <Tooltip tooltipText={"Save"}>
                                            <a type='button' onClick={handleSave}>
                                                <span><PiBookmarkSimpleBold size="25px" /></span>
                                            </a>
                                        </Tooltip>

                                    }
                                </div>
                            </div>

                            <div className='col-md-4 col-12'>
                                <div className="d-flex gap-2" >
                                    <span><FaDollarSign fontSize={16} /></span>
                                    <span>
                                        {jobview.rateperhour} per hour
                                    </span>
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

                                {jobview.training.includes("true") &&
                                    <div className='d-flex gap-2'>
                                        <span>
                                            <FaCheckSquare fontSize={16} />
                                        </span>
                                        <span>
                                            Training provided
                                        </span>
                                    </div>
                                }


                                {jobview.benifits && getTrueKeys(JSON.parse(jobview.benifits)).length > 0 &&

                                    <div className='d-flex gap-2'>
                                        {getTrueKeys(JSON.parse(jobview.benifits)).includes("Accommodation") &&
                                            <Tooltip tooltipText={"Accommodation"}>
                                                <span>
                                                    <IoHomeOutline fontSize={16} />
                                                </span>
                                            </Tooltip>
                                        }

                                        {getTrueKeys(JSON.parse(jobview.benifits)).includes("Food") &&
                                            <Tooltip tooltipText={"Food"}>
                                                <span >
                                                    <GiHotMeal fontSize={16} />
                                                </span>
                                            </Tooltip>
                                        }

                                        {getTrueKeys(JSON.parse(jobview.benifits)).includes("Transport") &&
                                            <Tooltip tooltipText={"Transport"}>
                                                <span>
                                                    <PiCarProfileThin fontSize={16} />
                                                </span>
                                            </Tooltip>
                                        }
                                        <span>Benefits</span>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className='row border border-success rounded  m-4 p-3'>
                            <div>
                                <div>{markdownToText(jobview.description)}</div>

                                {parseString(jobview.employerquestions).some(question => question.value !== "") &&
                                    <p className='fw-bold'>Employer Questions</p>}
                                <ul className='list-unstyled d-flex flex-column gap-3'>
                                    {parseString(jobview.employerquestions).map((question, i) => {
                                        if (question.value) {
                                            return (
                                                <li key={question.value}>Q{i + 1}. {question.value}</li>
                                            )
                                        }
                                    })}
                                </ul>

                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex gap-4  mt-2 align-items-center'>
                                    {isJobApplied ?
                                        <button type='button' disabled className='btn btn-primary text-white'>Applied</button>
                                        :
                                        <button type='button' onClick={handleApply} className='btn btn-primary text-white'>Apply</button>
                                    }

                                    <Tooltip tooltipText={"Share"}>
                                        <a className='pe-2' type='button' onClick={() => { handleShare() }}>
                                            <span><FaShare size="20px" /></span>
                                        </a>
                                    </Tooltip>

                                    {isJobSaved ?
                                        <a type='button'>
                                            <span><PiBookmarkSimpleFill size="25px" /></span>
                                        </a>
                                        :
                                        <Tooltip tooltipText={"Save"}>
                                            <a type='button' onClick={handleSave}>
                                                <span><PiBookmarkSimpleBold size="25px" /></span>
                                            </a>
                                        </Tooltip>
                                    }
                                </div>
                                <div>
                                    <button type='button' className='btn btn-danger' onClick={() => setShowReport(true)}>Report</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <Ads />
                    </div>
                </div>

            }
            {!loading && !jobview || jobview.status !== "approved" && <h3>Job Not Found</h3>}

            <LocationPopup />
            <InfoPopup />

            <Modal size="md" show={showReport} onHide={handleClose} centered>
                <Modal.Body>
                    {userId &&
                        <>
                            <div>
                                <h5>Report Job</h5>
                            </div>
                            <form className=' d-flex flex-column gap-3 p-2'>
                                <div className='d-flex align-items-center'>
                                    <input type='radio' id="discriminatory-content" name='report-job' value="Contains Discriminatory Content" className='form-check-input' onChange={handleReportReason} />
                                    <label for='discriminatory-content' className='form-check-label ps-3' >Contains Discriminatory Content</label>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <input type='radio' id="fake-job" name='report-job' value="Fake Job/Scam" className='form-check-input' onChange={handleReportReason} />
                                    <label for='fake-job' className='form-check-label ps-3' >Fake Job/Scam</label>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <input type='radio' id="inaccurate-information" name='report-job' value="Inaccurate Information" className='form-check-input' onChange={handleReportReason} />
                                    <label for='inaccurate-information' className='form-check-label ps-3' >Inaccurate Information</label>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <input type='radio' id="offensive-language" name='report-job' value="Offensive Language" className='form-check-input' onChange={handleReportReason} />
                                    <label for='offensive-language' className='form-check-label ps-3' >Offensive Language</label>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button type='button' disabled={reportReason === "" ? true : false} onClick={ReportJob} className='btn btn-danger'>Report this job</button>
                                </div>
                                {reportError && <div className='text-danger text-center'><em>There has been an error reporting this job, Please try again</em></div>}
                            </form>
                        </>
                    }
                    {
                        !userId && <>
                            <h3 className='text-center p-5'>Please Login to report the job</h3>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SingleJob;
