import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

import { itemsPerPage } from "../../../helpers/constants";
import http from "../../../helpers/http";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";

const Jobqueuelist = () => {
    const { _id: userId } = useCurrentUser()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [table, setTable] = useState(null)
    const message = useShowMessage()

    useEffect(() => {
        document.title = "Job Queue List"
        fetchJobs(pgNumber)
    }, [])

    const fetchJobs = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        const { data, error } = await tryCatch(() => http.get(`/jobs/queue?limit=${itemsPerPage}&skip=${skip}`))
        if (data) {
            setTable(data.jobs)
            setTotalItems(data.total)
        }

        if (error) {
            message({ status: "Error", error })
        }
        setLoading(false)
    }

    async function handleAssign(job) {
        const data = {
            adminId: userId,
            jobId: job._id,
            jobsDto: job
        }
        const { error } = await tryCatch(() => http.post("/jobs/assign", data))

        if (error) {
            message({ status: "error", error })
            return
        }

        message({ status: "success", message: "Job Assigend", path: "/admin/myasignjobs" })
    }

    return (
        <div className="container-fluid content-wrapper  bg-white">
            <h3 className="fs-4 fw-bold text-center "> Job Queue List </h3>

            <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} pageNumberToShow={2} itemsPerPage={itemsPerPage} fetchItems={fetchJobs}>
                <div className="table-responsive">
                    {loading && <Loader />}
                    {!loading &&
                        <table className="table  " >
                            <thead>
                                <tr >
                                    <th>Job id</th>
                                    <th>Job Title</th>
                                    <th>Company</th>
                                    <th>Creation Date</th>
                                    <th>Assign</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table && table.length > 0 &&
                                    table.map((job, index) => {
                                        return (
                                            <tr key={index} className={job.reportReason ? "bg-gradient-danger" : ""}>
                                                <td>{job._id}</td>
                                                <td>{job.jobTitle}</td>
                                                <td>{job.company}</td>
                                                <td>{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>
                                                <td>
                                                    <button type="button" className="btn  btn-xs btn-success  col-12" onClick={() => handleAssign(job)}>Assign To Me</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>}
                </div>
            </Pagination >
        </div >
    )
}

export default Jobqueuelist;