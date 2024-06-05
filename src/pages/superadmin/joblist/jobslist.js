import { useEffect, useState } from "react"
import http from "../../../helpers/http";
import Footer from "../../../layouts/superadmin/Footer";
import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from "../../../components/Pagination";

const JobsListSuperAdmin = () => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [adminList, setAdminList] = useState([])
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [allSelectBox, setAllSelectBox] = useState(false)
    const [selectedJobs, setSelectedJobs] = useState([])
    const [searchValue, setSearchValue] = useState()
    const [table, setTable] = useState(null)
    const [msg, setMsg] = useState({
        show: false,
        class: "",
        message: ""
    })
    const [jobs, setJobs] = useState(null)

    useEffect(() => {
        const skip = (pgNumber - 1) * itemsPerPage
        http.get(`/jobs/all?limit=${itemsPerPage}&skip=${skip}`)
            .then((res) => {
                setJobs(res.data.jobs)
                setTable(res.data.jobs)
                setTotalItems(res.data.total)
            })
            .catch(err => console.log(err))

        http.get("/users/admins/all")
            .then((res) => setAdminList(res.data.admins))
            .catch(err => console.log(err))
    }, [])

    const handleAllSelect = (e) => {
        if (e.target.checked) {
            setAllSelectBox(true)
            let alljobs = []
            table.map(job => {
                if (job.status !== "queue") {
                    alljobs.push(job._id)
                }
            })
            setSelectedJobs(alljobs)
        } else {
            setAllSelectBox(false)
            setSelectedJobs([])
        }
    }

    const handleCheckbox = (id, e) => {
        setAllSelectBox(false)
        if (selectedJobs.includes(id)) {
            let removedJob = selectedJobs.filter((job) => job !== id)
            setSelectedJobs(removedJob)
        } else {
            setSelectedJobs([...selectedJobs, id])
        }
    }

    const handleSearch = (value) => {
        if ((value).trim() === "") {
            setTable(jobs)
        } else {
            let admins = adminList.filter(admin => (admin.first_name + " " + admin.last_name).toLowerCase().includes(value.toLowerCase()))
            let filteredJobs = []
            admins.map((admin) => {
                jobs.map(job => {
                    if (job.adminId === admin._id) {
                        filteredJobs.push(job)
                    }
                })
            })
            setTable(filteredJobs)
        }
    }

    const itemsToShow = (pageNumber) => {
        window.location.href = `/superadmin/jobs?page=${pageNumber}`
    }

    function goToJobPage(id) {
        navigate(`/superadmin/jobs/${id}`)
    }

    function handleRelease() {
        if (selectedJobs.length === 0) {
            setMsg({
                show: true,
                class: "alert alert-danger",
                message: "Please Select a Job"

            })
            setTimeout(() => {
                setMsg({ ...msg, show: false })
            }, 1200);
        } else {
            let jobsData = []
            selectedJobs.forEach((Selectjob) => {
                table.forEach((job) => {
                    if (job._id === Selectjob && job.status !== "queue") {
                        const data = {
                            adminId: userId,
                            jobId: job._id,
                            jobsDto: job
                        }
                        jobsData.push(data)
                    }
                })
            })
            console.log(jobsData)

            if (userId !== "") {
                http.post("/jobs/multi_release", jobsData)
                    .then(res => setTimeout(window.location.reload(), 2000))
                    .catch(err => {
                        setMsg({
                            show: true,
                            class: "alert alert-danger",
                            message: err.response.data.error
                        })
                    })
            }
        }
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
                                <div class="card-body  bg-white ">
                                    {msg.show && <div class={msg.class} role="alert">
                                        {msg.message}

                                    </div>}
                                    <div className="d-flex input-group p-3">
                                        <input type="text" value={searchValue} onChange={(e) => handleSearch(e.target.value)} className="form-control " placeholder="Search By Admin Name" />
                                        <button type="button" onClick={handleRelease} className="btn btn-outline-dark rounded mx-2">Release Jobs</button>
                                    </div>

                                    <form class="form-sample">
                                        <div class="col">

                                            <table class="table" >

                                                <thead>
                                                    <tr >
                                                        <th><input type="checkbox" className="form-check-input" name="allSelect" checked={allSelectBox} onChange={(e) => { handleAllSelect(e) }} /><div className="mt-1">Select All</div></th>
                                                        <th>Job id</th>
                                                        <th>Job Title</th>
                                                        <th>Company</th>
                                                        <th>Creation Date</th>
                                                        <th>Status</th>
                                                        <th>By</th>
                                                        <th>View Job</th>

                                                    </tr>

                                                    {table && table.length > 0 &&
                                                        table.map((job, index) => {
                                                            return <tr key={index}>
                                                                <td>{job.status !== "queue" && <input type="checkbox" checked={selectedJobs.includes(job._id)} onChange={(e) => handleCheckbox(job._id, e)} className="form-check-input" />}</td>
                                                                <td>{job._id}</td>
                                                                <td>{job.jobTitle}</td>
                                                                <td>{job.company}</td>
                                                                <td>{job.creationdate}</td>
                                                                <td>
                                                                    {job.status === "queue" && <span class="badge badge-outline-dark col-12"> In Queue</span>}
                                                                    {job.status === "review" && <span class="badge badge-outline-info col-12"> In Review</span>}
                                                                    {job.status === "approved" && <span class="badge badge-success col-12"> Approved</span>}
                                                                    {job.status === "rejected" && <span class="badge badge-danger col-12"> Rejected</span>}
                                                                </td>
                                                                <td>
                                                                    {job.status === "queue" && <div>Not Assigned</div>}
                                                                    {job.status !== "queue" && adminList.map(admin => {
                                                                        if (job.adminId === admin._id) {
                                                                            return <div>{admin.first_name + " " + admin.last_name}</div>
                                                                        }
                                                                    })}

                                                                </td>

                                                                <td><button onClick={() => goToJobPage(job._id)} type="button" class="btn btn-info btn-xs col-12 ">

                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                    </svg>


                                                                </button></td>
                                                            </tr>
                                                        })
                                                    }

                                                </thead>

                                            </table>
                                        </div>

                                    </form>
                                    <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />

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