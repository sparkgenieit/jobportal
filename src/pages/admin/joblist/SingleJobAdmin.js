import { useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";

function SingleJobAdmin({ joblist, handleApprove, handleReject }) {
    const [jobview, setJobview] = useState(joblist)
    const [training, setTraining] = useState(JSON.parse(joblist.training))

    function getTrueKeys(obj) {
        // Use Object.keys() to get all keys as an array
        const keys = Object.keys(obj);

        // Filter the keys using Array.filter() and a condition
        const truekeys = keys.filter(key => obj[key] === true);

        // This is because in benefits there is an others option with a text box
        if (truekeys.includes("Others")) {
            truekeys.push(obj.OthersText)
        }

        return truekeys

    }

    const [benefits, setBenefits] = useState(getTrueKeys(JSON.parse(joblist.benifits)))
    const [jobType, setJobType] = useState(getTrueKeys(JSON.parse(joblist.jobtype)))

    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">{jobview.company}</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Job</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">
                                <div class="col-12 bg-white">

                                    <div class="card-body px-4  ">
                                        <div className="d-flex justify-content-end mt-4 gap-5">

                                            <button onClick={() => handleApprove(joblist)} className=" col-2 btn btn-info">Appprove</button>
                                            <button onClick={() => handleReject(joblist)} className=" col-2 btn btn-danger">Reject</button>

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
                                            <p className="col-6">{jobType.map((j, index) => <span>{j}&nbsp;</span>)}</p>
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
                                            <p className="col-6">{benefits.map((b, index) => {
                                                if (b === "Others") {
                                                    return
                                                }
                                                else {
                                                    return <span>{b}&nbsp;</span>
                                                }
                                            }

                                            )}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Job Training:</p>
                                            <div className="col-6">
                                                <p >{training.status === true ? `Yes ${training.text}` : "No"}</p>
                                            </div>

                                        </div>

                                        <div className="row my-4">
                                            <p className="col-3">Description:</p>
                                            <p className="col-6">{jobview.description}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Employer Questions:</p>
                                            <div className="col-6">{JSON.parse(jobview.employerquestions).map((question, index) => {
                                                return <p>{question.value}</p>

                                            })}</div>
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


                        </div>


                    </div>



                </div>
                <Footer />

            </div>
        </>
    );
}

export default SingleJobAdmin;
