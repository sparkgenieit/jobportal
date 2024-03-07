import { useState } from "react"

import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";




const Jobqueuelist = () => {

    const [table, setTable] = useState([
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
    return (<>


        <div className="container-scroller">

            {/* <Header /> */}
            <Header />
            <div class="container-fluid page-body-wrapper">
                {/* <Sidebar /> */}
                <Sidebar />

                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="page-header">
                            <h3 class="page-title"> Job Queue List </h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Admin</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Job Queue List</li>
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
                                                        <th>View</th>
                                                        <th>Assign</th>

                                                    </tr>

                                                    {
                                                        table.map((job, index) => {
                                                            return <tr key={index}>
                                                                <td>{job._id}</td>
                                                                <td>{job.jobTitle}</td>
                                                                <td>{job.company}</td>
                                                                <td>{job.creationDate}</td>

                                                                <td><a href="/admin/SingleJob" type="button" class="btn btn-info btn-xs col-12 ">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>


                                                                </a></td>
                                                                <td>

                                                                    <button type="button" class="btn  btn-xs btn-success  col-12">Assign To Me</button>
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

                    <Footer />
                </div>
            </div>
        </div>

    </>)

}
export default Jobqueuelist;