import { useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";

function Myasignjobs() {
    const [assignJobs, setAssignJobs] = useState([
        {
            _id: "65e9a0a4a91caf3b376107b9",
            company: "TCS",
            location: "Hyderabad",
            numberofvacancies: null,
            jobTitle: "Web Developer",
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
            company: "TCS",
            location: "Hyderabad",
            numberofvacancies: null,
            jobTitle: "Web Developer",
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
            company: "TCS",
            location: "Hyderabad",
            numberofvacancies: null,
            jobTitle: "Web Developer",
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
                                <h3 class="page-title">Assign Jobs</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Admin</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Jobs List</li>
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
                                                            <th>Creation Date</th>


                                                        </tr>

                                                        {
                                                            assignJobs.map((job, index) => {
                                                                return <tr key={index}>
                                                                    <td>{job._id}</td>
                                                                    <td>{job.jobTitle}</td>
                                                                    <td>{job.company}</td>
                                                                    <td>{job.creationDate}</td>

                                                                    <td><button type="button" class="btn btn-info btn-xs col-9 ">
                                                                        Approve
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
export default Myasignjobs;