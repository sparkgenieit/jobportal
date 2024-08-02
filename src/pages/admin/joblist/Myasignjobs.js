import { useEffect, useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import http from "../../../helpers/http";
import Pagination from "../../../components/Pagination";
import RejectJobMessage from "../../../components/RejectJobMessage";

function Myasignjobs() {
    const [assignJobs, setAssignJobs] = useState(null)
    const [msg, setMsg] = useState(false)
    const [error, setError] = useState(false)
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [joblist, setJoblist] = useState(true)
    const [releaseError, setReleaseError] = useState(false)
    const [jobData, setJobData] = useState()
    const navigate = useNavigate()
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(1)
    const [show, setShow] = useState(false)

    useEffect(() => {
        http.get(`/jobs/assignedJobs/${userId}?limit=${itemsPerPage}&skip=0`)
            .then((response) => {
                setTotalItems(response.data.total)
                setAssignJobs(response.data.jobs)
            })
    }, [])

    const handleClose = () => {
        setShow(false)
    }

    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        const skip = (pageNumber - 1) * itemsPerPage
        http.get(`/jobs/assignedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            .then((res) => {
                setTimeout(() => {
                    setAssignJobs(res.data.jobs)
                }, 500)
            })
            .catch(err => {
                console.log(err)
            })

    }

    function handleApprove(job) {
        const data = {
            adminId: userId,
            jobId: job._id,
            jobsDto: job
        }
        http.post("/jobs/approve", data)
            .then((response) => {
                if (response && response.status) {
                    const notification = {
                        userId: job.companyId,
                        jobId: job._id,
                        jobTitle: job.jobTitle,
                        status: "Approved",
                        isRead: false,
                        message: "",
                        createdAt: Date.now()
                    }
                    return http.post("/notifications/create", notification)
                }
            })
            .then(res => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch(err => console.log(err))
    }



    function handleJob(job) {
        navigate(`/admin/view-job/${job._id}`)
    }

    function handleRelease(job) {
        const data = {
            adminId: userId,
            jobId: job._id,
            jobsDto: job
        }
        http.post("/jobs/release", data)
            .then((response) => {
                if (response && response.status) {
                    setTimeout(() => {
                        navigate("/admin/Jobqueuelist");
                    }, 500)
                }
            })
            .catch((e) => {
                setReleaseError(true)
            })

    }
    return (
        <>

            <div class="container-fluid">
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
                                        {releaseError && <div class="alert alert-danger" role="alert">
                                            An Error Ocuured
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
                                                            <td>{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>


                                                            <td>
                                                                <button onClick={() => handleJob(job)} type="button" class="btn btn-info btn-xs col-12 ">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>


                                                                </button>
                                                            </td>
                                                            <td>
                                                                {job.status === "review" && <button onClick={() => handleRelease(job)} type="button" class="btn btn-outline-dark btn-xs col-12  ">
                                                                    Release
                                                                </button>}
                                                            </td>



                                                            <td>
                                                                {job.status !== "approved" && <button onClick={() => handleApprove(job)} type="button" class="btn btn-outline-info btn-xs col-12  ">
                                                                    Approve
                                                                </button>}
                                                                {job.status === "approved" && <button disabled type="button" class="btn btn-success btn-xs col-12  ">
                                                                    Approved
                                                                </button>}
                                                            </td>
                                                            <td>
                                                                {job.status !== "rejected" && < button onClick={() => { setShow(true); setJobData(job) }} type="button" class="btn  btn-xs btn-outline-danger col-12">
                                                                    Reject
                                                                </button>}
                                                                {job.status === "rejected" && < button disabled type="button" class="btn  btn-xs btn-danger col-12">
                                                                    Rejected
                                                                </button>}
                                                            </td>


                                                        </tr>)
                                                    })
                                                }

                                            </thead>

                                        </table>
                                    </div>

                                </form>
                                <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={pgNumber} pageNumberToShow={2} />

                            </div>

                        </div>


                    </div>
                </div>


            </div>



            {show && <RejectJobMessage handleClose={handleClose} job={jobData} userId={userId} />}
        </>
    )
}
export default Myasignjobs;