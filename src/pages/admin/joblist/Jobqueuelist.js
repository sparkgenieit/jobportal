import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

import { itemsPerPage } from "../../../helpers/constants";
import http from "../../../helpers/http";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";

const Jobqueuelist = () => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [table, setTable] = useState(null)
    const [msg, setMsg] = useState(false)

    useEffect(() => {
        document.title = "Job Queue List"
        fetchJobs(pgNumber)
    }, [])

    const fetchJobs = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const { data } = await http.get(`/jobs/queue?limit=${itemsPerPage}&skip=${skip}`)
            setLoading(false)
            setTable(data.jobs)
            setTotalItems(data.total)
        } catch (error) {
            setLoading(false)
            setTable([])
            setTotalItems(0)
        }
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
        <div className="container-fluid">
            <div className="content-wrapper bg-white">

                <h3 className="fs-4 fw-bold text-center "> Job Queue List </h3>


                <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} pageNumberToShow={2} itemsPerPage={itemsPerPage} fetchItems={fetchJobs}>

                    <div className="row">
                        <div className="col-12">
                            {msg && <div className="alert alert-success" role="alert">
                                Job Assigned SuccessFully

                            </div>}

                            <div className="card-body  bg-white ">
                                <form className="form-sample">
                                    <div className="col">
                                        {loading && <Loader />}
                                        {!loading &&
                                            <table className="table  " >

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
                                                                    <td>{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>
                                                                    {/* 
                                                                <td><button onClick={() => handleJob(job)} type="button" className="btn btn-info btn-xs col-12 ">
                                                                
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                                        </svg>
                                                                        
                                                                        
                                                                        </button></td> */}
                                                                    <td>

                                                                        <button type="button" className="btn  btn-xs btn-success  col-12" onClick={() => handleAssign(job)}>Assign To Me</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </thead>
                                            </table>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Pagination>
            </div>

        </div >


    </>)

}
export default Jobqueuelist;