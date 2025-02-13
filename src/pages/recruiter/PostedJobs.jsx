import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import http from "../../helpers/http";
import { itemsPerPage,jobColumns } from "../../helpers/constants";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';

import { useDispatch } from 'react-redux';
import { setCurrentJob } from '../../helpers/slices/generalSlice';
import DataTable from '../company/common/DataTable';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';

function PostedJobs() {
    const [totalItems, setTotalItems] = useState(0)
    const [jobs, setJobs] = useState(null)
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const user = useCurrentUser()
    const companyId = user.companyId._id
    const message = useShowMessage()

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Posted Jobs"
        showJobsList(pgNumber)
    }, [name])

    const handleDuplicate = (job) => {
        dispatch(setCurrentJob({ ...job }))
        message({ path: `/recruiter/postajob?c=${job._id}` })
    }

    const showJobsList = async (page) => {
        setIsLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const { data } = await http.get(`/companies/postedJobs/${companyId}?limit=${itemsPerPage}&skip=${skip}&name=${name}`)
            setTotalItems(data.total)
            setJobs(data.jobs)
        } catch (error) {
            console.log(error)
            setJobs([])
            message({
                status: "error",
                error
            })
        } finally {
            setIsLoading(false)
        }
    }

    const goToEdit = (job) => {
        const url = `/recruiter/editjob/${job._id}`

        message({ path: url })
    }

    const getAppliedUsers = (job, isShortlisted) => {
        let url = `/recruiter/applied-users/${job._id}`
        if (isShortlisted) {
            url = url + '?s=true'
        }
        message({ path: url })
    }

    const handleDelete = async (job) => {
        setIsLoading(true)
        try {
            await http.delete(`jobs/delete/${job._id}`)
            setIsLoading(false)
            setModal({ show: false })
            message({
                status: "success",
                message: "Job deleted"
            })
            showJobsList(pgNumber);
        }
        catch (err) {
            setIsLoading(false)
            setModal({ show: false })
            message({
                status: "error",
                error: {
                    message: "Failed to delete the job, Please try again later",
                }
            })
        }
    }

    const closeJob = async (job) => {
        const data = {
            userId: companyId,
            jobId: job._id
        }
        try {
            const res = await http.patch('/jobs/close', data)
            setIsLoading(false)
            setModal({ show: false })
            message({
                status: "success",
                message: "Job Closed"
            })
            showJobsList(pgNumber);
        }
        catch (error) {
            setIsLoading(false)
            setModal({ show: false })
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="content-wrapper px-0 bg-white">
                    <h4 className="text-center fs-4 fw-bold ">List of Posted Jobs</h4>
                    <Pagination itemsPerPage={itemsPerPage} currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} fetchItems={showJobsList} pageNumberToShow={2}>
                        <div className="bg-white rounded ">
                            <input
                                type="text"
                                placeholder="Search by job title or reference"
                                className="form-control my-3 shadow"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setPgNumber(1)
                                    window.history.replaceState(null, null, '/recruiter/jobs')
                                }}
                            />
                            {isLoading && <Loader />}

                            {!isLoading && jobs && <DataTable jobs={jobs} handleDuplicate={handleDuplicate} closeJob={closeJob} handleDelete={handleDelete} getAppliedUsers={getAppliedUsers} goToEdit={goToEdit} />}
                        </div>
                    </Pagination>
                </div>
            </div>
        </>
    )
}
export default PostedJobs;