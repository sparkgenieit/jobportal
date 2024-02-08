import { useState } from "react"

import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/company/Sidebar";




const Jobqueuelist = () => {

    const [table, setTable] = useState([
        {
            Jobid: "101",
            JobTitle: "Developer",
            Company: "TCS",
            CreationDate: "06-02-2024",
            ButtonText: "AssignToMe",

        },

        {
            Jobid: "102",
            JobTitle: "Project Manager",
            Company: "Wipro",
            CreationDate: "06-02-2024",
            ButtonText: "Relese",


        },

        {
            Jobid: "103",
            JobTitle: "Web Developer",
            Company: "Tech Mahindra",
            CreationDate: "06-02-2024",
            ButtonText: "AssignToMe",

        },

        {
            Jobid: "104",
            JobTitle: "Software Developer",
            Company: "Amazon",
            CreationDate: "06-02-2024",
            ButtonText: "Relese",



        },


        {
            Jobid: "105",
            JobTitle: "Senior Java Developer",
            Company: "Spark genie",
            CreationDate: "06-02-2024",
            ButtonText: "AssignToMe",


        }

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
                            <h3 class="page-title"> Jobs </h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">My Applied Jobs</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">List</li>
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
                                                        <th>Assign</th>
                                                    </tr>

                                                    {
                                                        table.map((mockdata, index) => {
                                                            return <tr key={index}>
                                                                <td>{mockdata.Jobid}</td>
                                                                <td>{mockdata.JobTitle}</td>
                                                                <td>{mockdata.Company}</td>
                                                                <td>{mockdata.CreationDate}</td>
                                                                <td><button type="button" class="btn btn-info btn-xs col-3 ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>
                                                                </button>

                                                                    <button type="button" class="btn  btn-sm btn-success mx-2 col-7">{mockdata.ButtonText}</button>
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