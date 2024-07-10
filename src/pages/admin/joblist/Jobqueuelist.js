import { useEffect, useState } from "react"

import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import http from "../../../helpers/http";
import Pagination from "../../../components/Pagination";

const Jobqueuelist = () => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const navigate = useNavigate()
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(1)
    const [table, setTable] = useState(null)
    const [msg, setMsg] = useState(false)

    useEffect(() => {
        http.get(`/jobs/queue?limit=${itemsPerPage}&skip=0`)
            .then((res) => {
                setTable(res.data.jobs)
                setTotalItems(res.data.total)
            })
    }, [])


    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        const skip = (pageNumber - 1) * itemsPerPage
        http.get(`/jobs/queue?limit=${itemsPerPage}&skip=${skip}`)
            .then((res) => {
                setTimeout(() => {
                    setTable(res.data.jobs)
                }, 500)
            })
            .catch(err => {
                console.log(err)
            })

    }



    function handleAssign(job) {
        const data = {
            adminId: userId,
            jobId: job._id,
            jobsDto: job
        }

        http.post("/jobs/assign", data)
            .then(response => {
                if (response && response.status) {
                    setMsg(true)
                    setTimeout(() => {
                        navigate("/admin/myasignjobs")
                    }, 2000)
                }
            })
    }




    return (<>


        <div className="container-scroller">

            {/* <Header /> */}
            <Header />
            <div class="container-fluid page-body-wrapper">
                {/* <Sidebar /> */}
                <Sidebar />

                <div class="container-fluid">
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
                                {msg && <div class="alert alert-success" role="alert">
                                    Job Assigned SuccessFully

                                </div>}

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
                                                        {/* <th>View</th> */}
                                                        <th>Assign</th>

                                                    </tr>

                                                    {table && table.length > 0 &&
                                                        table.map((job, index) => {
                                                            return (
                                                                <tr key={index} className={job.reportReason ? "bg-gradient-danger" : ""}>
                                                                    <td>{job._id}</td>
                                                                    <td>{job.jobTitle}</td>
                                                                    <td>{job.company}</td>
                                                                    <td>{job.creationdate}</td>
                                                                    {/* 
                                                                <td><button onClick={() => handleJob(job)} type="button" class="btn btn-info btn-xs col-12 ">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>


                                                                </button></td> */}
                                                                    <td>

                                                                        <button type="button" class="btn  btn-xs btn-success  col-12" onClick={() => handleAssign(job)}>Assign To Me</button>
                                                                    </td>
                                                                </tr>
                                                            )
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

                    <Footer />
                </div>
            </div>
        </div>

    </>)

}
export default Jobqueuelist;