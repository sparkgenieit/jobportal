import { useEffect, useState } from "react";
import Header from "../../layouts/common/Header";
import Sidebar from "../../layouts/common/Sidebar";
import Footer from "../../layouts/common/Footer";


function Myappliedjobs() {
    const [assignJobs, setAssignJobs] = useState([
        {
            _id: "65e9a0a4a91caf3b376107b9",
            company: "Infosis",
            location: "channai",
            numberofvacancies: null,
            jobTitle: "Developer",
            rateperhour: null,
            duration: "Technology",
            jobCategory: "Technology",
            subCategory: "",
            weeklyperhour: null,
            benifits: "",
            training: "",
            description: "Testing",
            employerquestions: "",
            employer: "",
            status: "review",
            __v: 0,
        },
        {
            _id: "65e9a0a4a91caf3b376107b9",
            company: "Wipro",
            location: "Vijayawada",
            numberofvacancies: null,
            jobTitle: " Developer",
            rateperhour: null,
            duration: "Technology",
            jobCategory: "Technology",
            subCategory: "",
            weeklyperhour: null,
            benifits: "",
            training: "",
            description: "Testing",
            employerquestions: "",
            employer: "",
            status: "review",
            __v: 0,
        },
        {
            _id: "65e9a0a4a91caf3b376107b9",
            company: "HCL",
            location: "Hydrabad",
            numberofvacancies: null,
            jobTitle: "Developer",
            rateperhour: null,
            duration: "Technology",
            jobCategory: "Technology",
            subCategory: "",
            weeklyperhour: null,
            benifits: "",
            training: "",
            description: "Testing",
            employerquestions: "",
            employer: "",
            status: "review",
            __v: 0,
        },

    ])

    
    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Saved Jobs</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">User</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">SavedJobs</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">
                                <div class="col-12">

                                    <div class="card-body  bg-white ">
                                        <form class="form-sample">
                                            <div class="col">

                                                <table class="table  " >

                                                    <thead>
                                                        <tr >
                                                            <th>Job id</th>
                                                            <th>Job Title</th>
                                                            <th>Company</th>
                                                            <th>Applied Date</th>


                                                        </tr>

                                                        {
                                                            assignJobs.map((job, index) => {
                                                                return <tr key={index}>
                                                                    <td>{job._id}</td>
                                                                    <td>{job.jobTitle}</td>
                                                                    <td>{job.company}</td>
                                                                    <td>{job.AppliedDate}</td>

                                                                    <td><button type="button" class="btn btn-info btn-xs col-9 ">
                                                                       Remove
                                                                    </button></td>
                                                                    <td>

                                                                        <button type="button" class="btn  btn-xs btn-danger col-9">Reject</button>
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }

                                                    </thead>

                                                </table>
                                            </div>

                                        </form>
                                    </div>

                                </div>


                            </div>
                        </div>


                    </div>



                </div>
                <Footer />

            </div>
        </>
    )
}
export default Myappliedjobs;