import { useEffect, useState } from "react"

import Footer from "../../../layouts/superadmin/Footer";
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const JobsListSuperAdmin = () => {

    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');


    const [selectedJobs, setSelectedJobs] = useState([])


    const navigate = useNavigate()

    const [table, setTable] = useState(null)
    const [msg, setMsg] = useState(false)


    useEffect(() => {
        axios.get("http://localhost:8080/jobs/all")
            .then((res) => setTable(res.data))
    }, [])

    const handleAllSelect = (e) => {
        if (e.target.checked) {
            let alljobs = []
            table.map(job => {
                alljobs.push(job._id)
            })
            setSelectedJobs(alljobs)
        } else {
            setSelectedJobs([])
        }


    }

    const handleCheckbox = (id, e) => {
        if (selectedJobs.includes(id)) {
            let removedJob = selectedJobs.filter((job) => job !== id)
            setSelectedJobs(removedJob)

        } else {
            setSelectedJobs([...selectedJobs, id])
        }
        console.log(selectedJobs)
    }


    function handleAssign(job) {
        const data = {
            adminId: userId,
            jobId: job._id,
            jobsDto: job
        }

        axios.post("http://localhost:8080/jobs/assign", data)
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
                                {msg && <div class="alert alert-success" role="alert">
                                    Job Assigned SuccessFully

                                </div>}

                                <div class="card-body  bg-white ">

                                    <form class="form-sample">
                                        <div class="col">

                                            <table class="table  " >

                                                <thead>
                                                    <tr >
                                                        <th><input type="checkbox" className="form-check-input" name="allSelect" onChange={(e) => { handleAllSelect(e) }} /><div className="mt-1">Select All</div></th>
                                                        <th>Job id</th>
                                                        <th>Job Title</th>
                                                        <th>Company</th>
                                                        <th>Creation Date</th>
                                                        {/* <th>View</th> */}
                                                        <th>Status</th>

                                                    </tr>

                                                    {table && table.length > 0 &&
                                                        table.map((job, index) => {
                                                            return <tr key={index}>
                                                                <td><input type="checkbox" checked={selectedJobs.includes(job._id)} onChange={(e) => handleCheckbox(job._id, e)} className="form-check-input" /></td>
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
                                                                    {job.status === "queue" && <button type="button" class="btn  btn-xs btn-outline-dark  col-12" >In Queue</button>}
                                                                    {job.status === "review" && <button type="button" class="btn  btn-xs btn-outline-info  col-12" >Assigned</button>}
                                                                    {job.status === "approved" && <button type="button" class="btn  btn-xs btn-outline-success  col-12" >Approved</button>}
                                                                    {job.status === "rejected" && <button type="button" class="btn  btn-xs btn-outline-danger  col-12" >Rejected</button>}
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
export default JobsListSuperAdmin;