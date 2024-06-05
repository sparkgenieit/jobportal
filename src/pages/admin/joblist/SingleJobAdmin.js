import { useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import { BASE_API_URL } from "../../../helpers/constants";
import { getTrueKeys } from "../../../helpers/functions";

function SingleJobAdmin({ joblist, handleApprove, handleReject }) {
    const [jobview, setJobview] = useState(joblist)
    const [message, setMessage] = useState({
        showMsg: false,
        msgclassName: "",
        Msg: ""
    })

    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
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
                                    {jobview.status !== "approved" && <button type='button' onClick={() => handleApprove(joblist)} className='btn btn-outline-success rounded px-5 '>Approve</button>}
                                    {jobview.status === "approved" && <button type='button' disabled className='btn btn-success rounded px-5 '>Approved</button>}
                                    {jobview.status !== "rejected" && <button type='button' onClick={() => handleReject(joblist)} className='btn btn-outline-danger rounded px-5 '>Reject</button>}
                                    {jobview.status === "rejected" && <button type='button' disabled className='btn btn-danger rounded px-5 '>Rejected</button>}
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
                                    <span className='fw-bold col-6 justify-content-start'> {jobview.weeklyperhour == "" ? "Not Specified" : jobview.weeklyperhour}</span>
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


                </div>
                <Footer />

            </div >
        </>
    );
}

export default SingleJobAdmin;
