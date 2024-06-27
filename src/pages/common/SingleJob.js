import './SingleJob.css';
import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import http from '../../helpers/http';
import { BASE_API_URL, BASE_APP_URL } from '../../helpers/constants';
import { getTrueKeys, timeAgo } from '../../helpers/functions';
import { FaBowlFood, FaDollarSign, FaRegClock, FaShare } from 'react-icons/fa6';
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill, PiTrainFill } from "react-icons/pi";
import { BsFillPersonFill } from 'react-icons/bs';
import { FaCheckSquare, FaHome } from 'react-icons/fa';

function SingleJob() {
    const [isJobApplied, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [jobview, setJobview] = useState()
    const role = localStorage.getItem('role');
    const navigate = useNavigate()
    const [tooltip, setTooltip] = useState({})
    const params = useParams();
    const userId = localStorage.getItem('user_id');
    const [message, setMessage] = useState({
        showMsg: false,
        msgclassName: "alert alert-success",
        Msg: ""
    })

    useEffect(() => {
        http.get(`/jobs/${params.id}`)
            .then((response) => {
                setJobview(response.data)
            })
            .catch(err => setJobview(null))
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
    }, [])

    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/common/SingleJob/${jobview._id}`)
        // setShareClicked(true)
        // setTimeout(() => {
        //     setShareClicked(false)
        // }, 1000);
        // event.stopPropagation();
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
                    setMessage({
                        showMsg: true,
                        msgclassName: "alert alert-success",
                        Msg: "Applied Successfully"
                    })
                    setTimeout(() => {
                        navigate('/common/Myappliedjobs')
                    }, 2000)
                })
                .catch((e) => {
                    setMessage({
                        showMsg: true,
                        msgclassName: "alert alert-danger",
                        Msg: e.response.data.message
                    })
                    setTimeout(() => {
                        setMessage({ ...message, showMsg: false })
                    }, 3000)
                })

        } else {
            setMessage({
                showMsg: true,
                msgclassName: "alert alert-danger",
                Msg: 'Please login as User to apply job'
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
                    setMessage({
                        showMsg: true,
                        msgclassName: "alert alert-success",
                        Msg: "Job Saved Successfully "
                    })
                    setTimeout(() => {
                        navigate('/common/Savedjobs')
                    }, 2000)
                })


                .catch((e) => {
                    setMessage({
                        showMsg: true,
                        msgclassName: "alert alert-danger",
                        Msg: e.response.data.message
                    })
                    setTimeout(() => {
                        setMessage({ ...message, showMsg: false })
                    }, 3000)
                })
        } else {
            setMessage({
                showMsg: true,
                msgclassName: "alert alert-danger",
                Msg: 'Please login as User to save job'
            })
        }
    }

    const handleTooltip = (value, name) => {
        setTooltip({ [name]: value })
    }

    return (
        <>
            <div className="container-scrollar">
                <Header />
                {message.showMsg &&
                    <div className={message.msgclassName}>
                        {message.Msg}
                    </div>
                }
                {jobview &&
                    <div>
                        <div style={{ height: "15vh" }} className='d-flex justify-content-around'>
                            <img className="rounded border border-secondary" src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`} alt={jobview.company} />
                            <div className='fw-bold h3'>{jobview.company}</div>
                        </div>
                        <div className='row'>
                            <div className='col-9 row border rounded'>
                                <div className='col-9 d-flex  flex-column '>
                                    <div className='h4'>
                                        {jobview.jobTitle}
                                    </div>
                                    <div>
                                        {jobview.jobCategory}/{jobview.subCategory}
                                    </div>
                                    <div>
                                        {jobview.location}
                                    </div>
                                    <div>
                                        {jobview.creationdate} ({timeAgo(jobview.creationdate)})
                                    </div>
                                    <div>
                                        <button type='button' className='btn btn-primary text-white'>Apply</button>
                                        <a className='pe-2' type='button' onMouseOver={() => handleTooltip(true, "share")} onMouseLeave={(e) => handleTooltip(false, "rateperhour")} onClick={(e) => { handleShare(e) }}>
                                            <span><FaShare size="20px" /></span>
                                            {tooltip.share && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Share</div>}
                                        </a>

                                        {!isJobSaved && <a onMouseOver={() => handleTooltip(true, "save")} onMouseLeave={(e) => handleTooltip(false, "save")} onClick={handleSave} type='button'>
                                            <span><PiBookmarkSimpleBold size="22px" /></span>
                                            {tooltip.save && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Save</div>}
                                        </a>}
                                        {isJobSaved && <a type='button'>
                                            <span><PiBookmarkSimpleFill size="22px" /></span>
                                            {tooltip.save && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Saved</div>}
                                        </a>}
                                    </div>
                                </div>
                                <div className='col-3'>
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

                                            {tooltip.vacancies && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Vacancies</div>}

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
                                                <div className='d-flex'>Benefits :
                                                    {getTrueKeys(JSON.parse(jobview.benifits)).includes("Accommodation") &&
                                                        <span onMouseOver={() => handleTooltip(true, "Accommodation")} onMouseLeave={(e) => handleTooltip(false, "Accommodation")} className='px-1'>
                                                            <FaHome size="18px" />
                                                            {tooltip.Accommodation && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Accommodation</div>}
                                                        </span>
                                                    }
                                                    {getTrueKeys(JSON.parse(jobview.benifits)).includes("Transport") &&
                                                        <span onMouseOver={() => handleTooltip(true, "transport")} onMouseLeave={(e) => handleTooltip(false, "transport")} className='px-1'>
                                                            <PiTrainFill size="18px" />
                                                            {tooltip.transport && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Transport</div>}
                                                        </span>}
                                                    {getTrueKeys(JSON.parse(jobview.benifits)).includes("Food") &&
                                                        <span onMouseOver={() => handleTooltip(true, "food")} onMouseLeave={(e) => handleTooltip(false, "food")} className='px-1'>
                                                            <FaBowlFood size="18px" />
                                                            {tooltip.food && <div className='my-tooltip mt-2 py-1 px-2 rounded text-white'>Food</div>}
                                                        </span>}
                                                </div>
                                                {(JSON.parse(jobview.benifits)).Others && <div>{(JSON.parse(jobview.benifits)).OthersText}</div>}
                                            </div>}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Footer />

            </div >
        </>
    );
}

export default SingleJob;
