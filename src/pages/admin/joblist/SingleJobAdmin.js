import { useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";

function SingleJobAdmin({ joblist }) {
    const [jobview, setJobview] = useState(joblist)
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

                                            <button className=" col-2 btn btn-info">Appprove</button>
                                            <button className=" col-2 btn btn-danger">Reject</button>

                                        </div>


                                        <div className="row ">
                                            <p className="col-3">Job id :</p>
                                            <p className="col-6">{jobview._id}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Company :</p>
                                            <p className="col-6">{jobview.company}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Location :</p>
                                            <p className="col-6">{jobview.location}</p>
                                        </div>
                                        <div className="row my-4">
                                            <p className="col-3">Number of Vacancies :</p>
                                            <p className="col-6">{jobview.numberofvacancies}</p>
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
                                            <p className="col-6">{jobview.employer}</p>
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
