import { useEffect, useState } from "react"
import http from "../../../helpers/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";

const JobsListSuperAdmin = () => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [adminList, setAdminList] = useState([])
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [isLoading, setIsLoading] = useState(false)
    const [allSelectBox, setAllSelectBox] = useState(false)
    const [selectedJobs, setSelectedJobs] = useState([])
    const [searchValue, setSearchValue] = useState(searchParams.get("adminName") || "")
    const [table, setTable] = useState(null)
    const [msg, setMsg] = useState({
        show: false,
        class: "",
        message: ""
    })

    useEffect(() => {
        document.title = "Jobs list"
        fetchJobs(pgNumber)
    }, [searchValue])

    const fetchJobs = async (page) => {
        setIsLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const res = await http.get(`/jobs/all?limit=${itemsPerPage}&skip=${skip}&adminName=${searchValue}`)
            setTable(res.data.jobs)
            setTotalItems(res.data.total)
            setIsLoading(false)
        } catch (error) {
            setTable([])
            setTotalItems(0)
            setIsLoading(false)
        }
    }

    const handleAllSelect = (e) => {
        if (e.target.checked) {
            setAllSelectBox(true)
            let alljobs = []
            table.map(job => {
                if (job.status === "review") {
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
                    if (job._id === Selectjob && job.status === "review") {
                        const data = {
                            adminId: userId,
                            jobId: job._id,
                            jobsDto: job
                        }
                        jobsData.push(data)
                    }
                })
            })


            if (userId !== "") {
                http.post("/jobs/multi_release", jobsData)
                    .then(res => window.location.href = '/superadmin/jobs')
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

        <div class="container-fluid bg-white pt-4">
            <h3 className="fs-4 text-center fw-bold">Jobs List</h3>

            <Pagination itemsPerPage={itemsPerPage} currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} fetchItems={fetchJobs} pageNumberToShow={2}>
                {msg.show && <div class={msg.class} role="alert">
                    {msg.message}
                </div>}
                <div className="d-flex flex-column flex-md-row gap-3 mb-2">
                    <input type="text" value={searchValue} onChange={(e) => { setSearchValue(e.target.value); setPgNumber(1) }} className="form-control " placeholder="Search By Admin Name" />
                    <button type="button" onClick={handleRelease} className="btn btn-outline-dark rounded text-nowrap">Release Jobs</button>
                </div>
                <div className="table-responsive">
                    {isLoading && <Loader />}
                    {
                        !isLoading &&
                        <table class="table table-sm" >
                            <thead>
                                <tr >
                                    <th>{table && table.length > 0 && table.some(job => job.status === "review") && <><input type="checkbox" className="form-check-input" name="allSelect" checked={allSelectBox} onChange={(e) => { handleAllSelect(e) }} /><small>Select All</small></>}</th>
                                    <th>Job id</th>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Creation Date</th>
                                    <th>Status</th>
                                    <th className="text-center">By</th>
                                    <th>View Job</th>
                                </tr>
                                {table && table.length > 0 &&
                                    table.map((job, index) => {
                                        return <tr key={index}>
                                            <td>{job.status === "review" && <input type="checkbox" checked={selectedJobs.includes(job._id)} onChange={(e) => handleCheckbox(job._id, e)} className="form-check-input" />}</td>
                                            <td>{job._id}</td>
                                            <td>{job.jobTitle}</td>
                                            <td>{job.company}</td>
                                            <td>{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>
                                            <td>
                                                {job.status === "queue" && <span class="badge badge-outline-dark col-12"> In Queue</span>}
                                                {job.status === "review" && <span class="badge badge-outline-info col-12"> In Review</span>}
                                                {job.status === "approved" && <span class="badge badge-success col-12"> Approved</span>}
                                                {job.status === "rejected" && <span class="badge badge-danger col-12"> Rejected</span>}
                                            </td>
                                            <td>
                                                {job.status === "queue" && <div>Not Assigned</div>}
                                                {job.status !== "queue" && job.adminName}
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
                    }
                </div>

            </Pagination >
        </div >
    </>)
}
export default JobsListSuperAdmin;