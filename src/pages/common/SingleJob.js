
import './SingleJob.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../layouts/company/Sidebar';
import http from '../../helpers/http';
import { BASE_API_URL } from '../../helpers/constants';
import { getTrueKeys } from '../../helpers/functions';

function SingleJob() {
    const [isJobApplied, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [jobview, setJobview] = useState()
    const [training, setTraining] = useState()
    const [benefits, setBenefits] = useState()
    const [employerQuestions, setEmployerQuestions] = useState()
    const [jobType, setJobType] = useState()
    const role = localStorage.getItem('role');


    const userId = localStorage.getItem('user_id');
    const [message, setMessage] = useState({
        showMsg: false,
        msgclassName: "alert alert-success",
        Msg: ""
    })
    const navigate = useNavigate()

    const params = useParams();

    useEffect(() => {
        if (userId) {
            http.get(`/jobs/appliedjobs/${userId}`)
                .then((response) => {
                    if (response.data) {
                        response.data.map((j) => {
                            if (params.id == j.jobId && j.applied == true) {
                                setIsJobApplied(true);
                            }
                        })
                    }
                })

            http.get(`/jobs/savedJobs/${userId}`)
                .then((response) => {
                    if (response.data) {
                        response.data.map((j) => {
                            if (params.id == j.jobId && j.saved == true) {
                                setIsJobSaved(true);
                            }
                        })
                    }
                })
        }
        http.get(`/jobs/${params.id}`)
            .then((response) => {
                setJobview(response.data)
            })
            .catch(err => setJobview(null))
    }, [])

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

    return (
        <>
            <div className="container-scrollar">
                <Header />
                {message.showMsg &&
                    <div className={message.msgclassName}>
                        {message.Msg}
                    </div>
                }
                {jobview && <div className='container-fluid'>
                    <div className='mb-3 px-3 py-2 row'>
                        <div className='col-6'>
                            <div className='h2'>{jobview.jobTitle}</div>
                            <div className='text-muted mb-4'>{jobview.company}</div>
                        </div>
                        <div className='col-6'>
                            <img src={`${BASE_API_URL}/uploads/logos/${jobview.companyLogo}`} alt='' className='rounded d-block float-end' height="100px" width="100px" />
                        </div>
                        <hr />
                    </div>
                    <div className='rounded border p-3'>
                        <div className='h6 row'>
                            <p className='col-6'>Employment Information</p>
                            <div className='col-6 d-flex justify-content-around'>
                                {!isJobApplied && <button type='button' onClick={handleApply} className='btn btn-outline-primary rounded px-5 '>Apply</button>}
                                {isJobApplied && <button type='button' disabled className='btn btn-primary rounded px-5 '>Applied</button>}
                                {!isJobSaved && <button type='button' onClick={handleSave} className='btn btn-outline-dark rounded px-5 '>Save</button>}
                                {isJobSaved && <button type='button' disabled className='btn btn-dark rounded px-5 '>Saved</button>}
                            </div>
                        </div>
                        <hr />
                        <div className='row justify-content-center'>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Industry</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.jobCategory}/{jobview.subCategory}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Rate Per Hour</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.rateperhour == "" ? "Not Specified" : jobview.rateperhour}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Job Type</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.jobtype}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Duration</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.duration}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Creation Date</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.creationdate}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Close Date</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.closedate.trim() == "" ? "Not Specified" : jobview.closedate}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Location</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.location}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Number of Vacancies</span>
                                <span className='fw-bold col-6 justify-content-start'>{jobview.numberofvacancies}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Weekly Hours</span>
                                <span className='fw-bold col-6 justify-content-start'> {jobview.weeklyperhour?.trim() == "" ? "Not Specified" : jobview.weeklyperhour}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Benefits</span>
                                <span className='fw-bold col-6 justify-content-start'> {getTrueKeys(JSON.parse(jobview.benifits)) == "" ? "Not Specified" : getTrueKeys(JSON.parse(jobview.benifits))}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Training</span>
                                <span className='fw-bold col-6 justify-content-start'> {jobview.training.includes("true") ? `Provided ${JSON.parse(jobview.training).text}` : "Not Provided"}</span>
                            </div>
                            <div className='col-6 row p-3'>
                                <span className='text-muted col-6 justify-content-start'>Employer Job Reference</span>
                                <span className='fw-bold col-6 justify-content-start'> {jobview.employjobreference.trim() == "" ? "Not Specifed" : jobview.employjobreference}</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='h3'> Job Description</div>
                        <p>
                            {jobview.description}
                        </p>
                    </div>
                </div>}
                <Footer />

            </div >
        </>
    );
}

export default SingleJob;
