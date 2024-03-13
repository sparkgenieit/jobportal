import { useEffect, useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import axios from "axios";
import Joblist from "../../company/jobs/JobList";

import SingleJobAdmin from "./SingleJobAdmin";

function Myasignjobs() {
    const [assignJobs, setAssignJobs] = useState(null)
    const [msg, setMsg] = useState(false)
    const [error, setError] = useState(false)
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [joblist, setJoblist] = useState(true)
    const [jobData, setJobData] = useState()
    


    useEffect(() => {
        axios.get(`http://localhost:8080/jobs/assignedJobs/${userId}`)
            .then((response) => setAssignJobs(response.data))
    }, [])

    function handleApprove(job) {
        const data = {
            adminId: userId,
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
            adminId: userId,
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

    function handleJob(job) {
        setJoblist(false)
        setJobData(job)
    }



    return (
        <>
            {joblist && <div className="container-scrollar">
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
                                                                    <td>{index+1}</td>
                                                                    <td>{job.jobTitle}</td>
                                                                    <td>{job.company}</td>
                                                                    <td>{job.creationDate}</td>

                                                                    <td><button onClick={() => handleJob(job)} type="button" class="btn btn-info btn-xs col-12 ">

<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
</svg>


</button></td> 

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

            </div>}
            {!joblist && <SingleJobAdmin handleReject={handleReject} handleApprove={handleApprove} joblist={jobData} />}
        </>
    )
}
export default Myasignjobs;