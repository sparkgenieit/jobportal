import { useEffect, useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import axios from "axios";

function Myasignjobs() {
    const [assignJobs, setAssignJobs] = useState(null)
    const [msg, setMsg] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        axios.get("http://localhost:8080/jobs/123")
            .then((response) => setAssignJobs(response.data))
    }, [])

    function handleApprove(job) {
        const data = {
            adminId: "123",
            jobId: job._id,
            jobsDto: job
        }
        axios.post("http://localhost:8080/jobs/approve", data)
            .then((response) => {
                if (response && response.status) {
                    setMsg(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                }
            })


    }

    function handleReject(job) {
        const data = {
            adminId: "123",
            jobId: job._id,
            jobsDto: job
        }
        axios.post("http://localhost:8080/jobs/reject", data)
            .then((response) => {
                if (response && response.status) {
                    setError(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)


                }
            })

    }


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
                                                {msg && <div class="alert alert-success" role="alert">
                                                    Job Approved
                                                </div>}
                                                {error && <div class="alert alert-danger" role="alert">
                                                    Job Rejected
                                                </div>
                                                }


                                                <table class="table  " >

                                                    <thead>
                                                        <tr >
                                                            <th>Job id</th>
                                                            <th>Job Title</th>
                                                            <th>Company</th>
                                                            <th>Creation Date</th>
                                                            <th>    </th>
                                                            <th>    </th>



                                                        </tr>

                                                        {assignJobs && assignJobs.length > 0 &&
                                                            assignJobs.map((job, index) => {
                                                                return (<tr key={index}>
                                                                    <td>{job._id}</td>
                                                                    <td>{job.jobTitle}</td>
                                                                    <td>{job.company}</td>
                                                                    <td>{job.creationDate}</td>

                                                                    {job.status == "review" && <><td><button onClick={() => handleApprove(job)} type="button" class="btn btn-info btn-xs col-9  ">
                                                                        Approve
                                                                    </button></td>
                                                                        <td>

                                                                            <button onClick={() => handleReject(job)} type="button" class="btn  btn-xs btn-danger col-9">Reject</button>
                                                                        </td></>}
                                                                    {job.status == "rejected" && <td colSpan="2"><button disabled type="button" class="btn  btn-xs btn-danger col-9">Rejected</button></td>}

                                                                    {job.status == "approved" && <td colSpan="2"><button disabled type="button" class="btn  btn-xs btn-success col-9">Approved</button></td>}
                                                                </tr>)
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