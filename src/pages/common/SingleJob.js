
import './SingleJob.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../layouts/company/Sidebar';

function SingleJob() {
    const [isJobApplied, setIsJobApplied] = useState(false)
    const [isJobSaved, setIsJobSaved] = useState(false)
    const [jobview, setJobview] = useState()
    const userId = localStorage.getItem('user_id');
    const [message, setMessage] = useState({
        showMsg: false,
        msgClass: "alert alert-success",
        Msg: ""
    })
    const navigate = useNavigate()

    const params = useParams();

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8080/jobs/appliedjobs/${userId}`)
                .then((response) => {
                    if (response.data) {
                        response.data.map((j) => {
                            if (params.id == j.jobId && j.applied == true) {
                                setIsJobApplied(true);
                            }
                        })
                    }
                })

            axios.get(`http://localhost:8080/jobs/savedJobs/${userId}`)
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

        axios.get(`http://localhost:8080/jobs/${params.id}`)
            .then((response) => setJobview(response.data))
    }, [])




    function handleApply() {
        if (userId) {
            const data = {
                userId: userId,
                jobId: jobview._id,
                applied: true
            }

            axios.post("http://localhost:8080/jobs/apply", data)
                .then((response) => {
                    setMessage({
                        showMsg: true,
                        msgClass: "alert alert-success",
                        Msg: "Applied Successfully"
                    })
                    setTimeout(() => {
                        navigate('/common/Myappliedjobs')
                    }, 2000)
                })


                .catch((e) => {
                    setMessage({
                        showMsg: true,
                        msgClass: "alert alert-danger",
                        Msg: e.response.data.message
                    })
                    setTimeout(() => {
                        setMessage({ ...message, showMsg: false })
                    }, 3000)
                })

        } else {
            setMessage({
                showMsg: true,
                msgClass: "alert alert-danger",
                Msg: 'Please login to apply job'
            })
        }
    }
    function handleSave() {
        if (userId) {
            const data = {
                userId: userId,
                jobId: jobview._id,
                saved: true
            }

            axios.post("http://localhost:8080/jobs/save", data)
                .then((response) => {
                    setMessage({
                        showMsg: true,
                        msgClass: "alert alert-success",
                        Msg: "Job Saved Successfully "
                    })
                    setTimeout(() => {
                        navigate('/common/Savedjobs')
                    }, 2000)
                })


                .catch((e) => {
                    setMessage({
                        showMsg: true,
                        msgClass: "alert alert-danger",
                        Msg: e.response.data.message
                    })
                    setTimeout(() => {
                        setMessage({ ...message, showMsg: false })
                    }, 3000)
                })
        } else {
            setMessage({
                showMsg: true,
                msgClass: "alert alert-danger",
                Msg: 'Please login to save job'
            })
        }
    }

    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="">

                    <div lass="main-panel">
                        {jobview && <div class="content-wrapper">


                            <div class="row">


                                <div class="col-12 bg-white rounded pt-3">
                                    {message.showMsg && <div class={message.msgClass} role="alert">
                                        {message.Msg}
                                    </div>}
                                    <div class="card-body px-4  ">
                                        <div className="d-flex justify-content-end mt-4 gap-5">
                                            {!isJobApplied && <button type='button' onClick={handleApply} className='btn btn-primary col-2'>Apply</button>}
                                            {isJobApplied && <span style={{ color: 'green' }}>Job Applied</span>}
                                            {!isJobSaved && <button type='button' onClick={handleSave} className='btn btn-outline-dark col-2 '>Save</button>}
                                            {isJobSaved && <span style={{ color: 'green' }}>Job Saved</span>}
                                        </div>


                                        <div className="row ">
                                            <p className="col-3">Job id :</p>
                                            <p className="col-6">{jobview._id}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Company :</p>
                                            <p className="col-6">{jobview.company}</p>

                                            <p><img class="rounded" src={`http://localhost:8080/uploads/logos/${jobview.companyLogo}`} width="70px" height="50px" alt="" /></p>

                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Location :</p>
                                            <p className="col-6">{jobview.location}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Creation Date :</p>
                                            <p className="col-6">{jobview.creationdate}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Closing Date :</p>
                                            <p className="col-6">{jobview.closedate}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Job Type :</p>
                                            <p className="col-6">{jobview.jobtype}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Number of Vacancies :</p>
                                            <p className="col-6">{jobview.numberofvacancies}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Employer Job Reference :</p>
                                            <p className="col-6">{jobview.employjobreference}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Job Title :</p>
                                            <p className="col-6">{jobview.jobTitle}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Rate per Hour:</p>
                                            <p className="col-6">{jobview.rateperhour}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Duration :</p>
                                            <p className="col-6">{jobview.duration}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Job Category :</p>
                                            <p className="col-6">{jobview.jobCategory}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Job Sub-Category:</p>
                                            <p className="col-6">{jobview.subCategory}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Weekly Hours:</p>
                                            <p className="col-6">{jobview.weeklyperhour}</p>
                                        </div>

                                        <div className="row my-4">
                                            <p className="col-3">Job Benefits:</p>
                                            <p className="col-6">{jobview.benifits}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Job Training:</p>
                                            <p className="col-6">{jobview.training}</p>
                                        </div>

                                        <div className="row my-4">
                                            <p className="col-3">Description:</p>
                                            <p className="col-6">{jobview.description}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Employer Questions:</p>
                                            <p className="col-6">{jobview.employerquestions}</p>
                                        </div>

                                        <div className="row my-4">
                                            <p className="col-3">Employer Name:</p>
                                            <p className="col-6">{jobview.company}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Status:</p>
                                            <p className="col-6">{jobview.status}</p>
                                        </div>

                                    </div>

                                </div>


                            </div>


                        </div>}


                    </div>



                </div>
                <Footer />

            </div>
        </>
    );
}

export default SingleJob;
