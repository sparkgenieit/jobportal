import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";
import { RotatingLines } from "react-loader-spinner";

import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import http from "../../../helpers/http";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from '../../../components/Pagination';
import Toaster from "../../../components/Toaster";
import MessagePopup from "./MessagePopup";

function Joblist() {
    const [totalItems, setTotalItems] = useState("")
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [searchParams] = useSearchParams();
    const [modal, setModal] = useState({});
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [assignJobs, setAssignJobs] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({
        show: false,
        text: "",
        type: ""
    })
    const userId = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        showJobsList()
    }, [pgNumber, name])

    const showJobsList = async () => {
        setLoading(true)
        const skip = (pgNumber - 1) * itemsPerPage
        try {
            const { data } = await http.get(`/companies/postedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}&name=${name}`)
            setTotalItems(data.total)
            const jobs = data.jobs;
            await Promise.all(
                jobs.map(async (job) => {
                    if (job.status === "approved") {
                        let { data } = await http.get(`/companies/applied-users-count/${job._id}`)
                        job.count = data.applied
                        job.shortlisted = data.shortlisted
                    }
                })
            )
            setAssignJobs(jobs)
            setLoading(false)
        } catch (error) {
            setAssignJobs([])
            setLoading(false)
        }
    }

    const getAppliedUsers = (job) => {
        navigate(`/company/applied-users/${job._id}`)
    }

    const handleDelete = async (job) => {
        setIsLoading(true)
        try {
            await http.delete(`jobs/delete/${job._id}`)
            setIsLoading(false)
            setModal({ show: false })
            setMessage({
                show: true, text: "Job Deleted", type: "success"
            })
            showJobsList();
        }
        catch (err) {
            setIsLoading(false)
            setModal({ show: false })
            setMessage({
                show: true,
                text: "Failed to delete the job, Please try again later",
                type: "error"
            })
        }
    }

    const closeJob = async (job) => {
        const data = {
            userId,
            jobId: job._id
        }
        try {
            const res = await http.patch('/jobs/close', data)
            setIsLoading(false)
            setModal({ show: false })
            setMessage({
                show: true, text: "Job Closed", type: "success"
            })
            showJobsList();
        }
        catch (error) {
            setIsLoading(false)
            setModal({ show: false })
            setMessage({
                show: true,
                text: "Failed to close the job, Please try again later",
                type: "error"
            })
        }
    }

    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        navigate(`/company/JobList?page=${pageNumber}`)
    }

    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="container-fluid mt-2">
                        <div class=" bg-white">
                            <div class="page-header">
                                <h3 class="page-title">List of Posted Jobs</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Employer</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Posted Jobs</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <Toaster message={message} setMessage={setMessage} />
                                    <div class=" px-5 bg-white rounded ">
                                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control my-3 shadow" placeholder="Search by job title or reference" />
                                        <form class="form-sample">
                                            {
                                                loading &&
                                                <div style={{ height: "60vh" }} className="d-flex w-full justify-content-center align-items-center">
                                                    <RotatingLines
                                                        visible={true}
                                                        height="96"
                                                        width="96"
                                                        color="grey"
                                                        strokeWidth="5"
                                                        animationDuration="0.75"
                                                        ariaLabel="rotating-lines-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                    />
                                                </div>
                                            }
                                            {!loading &&
                                                <div class="col ">
                                                    <table class="table text-center " >
                                                        <thead>
                                                            <tr className="">
                                                                <th className="text-start">Job Title</th>
                                                                <th className="text-start">Job Reference</th>
                                                                <th>Posted Date</th>
                                                                <th className="text-center">Status</th>
                                                                <th>Edit</th>
                                                                <th>{assignJobs?.some((job) => job.status === "approved") && <span>Close</span>}</th>
                                                                <th>{assignJobs?.some((job) => job.status === "expired" || job.status === "closed") && <span>Delete</span>}</th>
                                                                <th className="text-center">Applications</th>
                                                                <th>{assignJobs?.some((job) => job.shortlisted > 0) && <span>Shortlisted</span>}</th>
                                                                <th>{assignJobs?.some((job) => job.status === "expired" || job.status === "closed") && <span>Repost</span>}</th>
                                                            </tr>

                                                        </thead>
                                                        {
                                                            assignJobs?.map((job, index) => {
                                                                return <tr key={index}>
                                                                    <td className="text-start">{job.jobTitle}</td>
                                                                    <td className="text-start">{job.employjobreference}</td>
                                                                    <td>{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>
                                                                    <td className="text-center">
                                                                        {job.status === "queue" || job.status === "review" ? <span>In Review</span> : null}
                                                                        {job.status === "approved" && <span>Live</span>}
                                                                        {job.status === "rejected" &&
                                                                            <span
                                                                                role="button"
                                                                                onClick={() => { setModal({ show: true, type: "rejectedMessage", clickedJob: job }) }}
                                                                                className="text-danger d-flex align-items-center justify-content-center text-decoration-underline"
                                                                            >
                                                                                <CiBellOn />
                                                                                Revise
                                                                            </span>}
                                                                        {job.status === "expired" && <span>Expired</span>}
                                                                        {job.status === "closed" ? <span>Closed</span> : null}
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/company/editjob/${job._id}`} type="button" disabled={isLoading} class="btn btn-outline-info btn-xs ">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                                            </svg>
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        {job.status === "approved" &&
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-xs bg-danger text-white"
                                                                                disabled={isLoading}
                                                                                onClick={() => setModal({ show: true, type: "close", clickedJob: job })}
                                                                            >
                                                                                <RxCross2 fill="white" fontSize={20} />
                                                                            </button>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {job.status === "closed" || job.status === "expired" ?
                                                                            <button type="button" class="btn  btn-xs btn-outline-danger" disabled={isLoading} onClick={() => setModal({ show: true, type: "delete", clickedJob: job })}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                                </svg>
                                                                            </button> : null
                                                                        }
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {job.status === "queue" || job.status === "review" ? <span>In Review</span> : null}
                                                                        {job.status === "approved" &&
                                                                            <>
                                                                                {job.count === 0 ?
                                                                                    <span>None</span> :
                                                                                    <>
                                                                                        <button type="button" class="btn btn-xs " disabled={isLoading} onClick={() => { getAppliedUsers(job) }}>
                                                                                            <span className="text-primary h5 text-decoration-underline">{job.count}</span>
                                                                                        </button>

                                                                                    </>}
                                                                            </>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {job.shortlisted > 0 &&
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-xs"
                                                                                onClick={() => { navigate(`/company/applied-users/${job._id}?s=true`) }}
                                                                            >

                                                                                <span className="text-success h5 text-decoration-underline">{job.shortlisted}</span>
                                                                            </button>
                                                                        }
                                                                    </td>

                                                                    <td className="text-center">
                                                                        {job.status === "expired" || job.status === "closed" ?
                                                                            <button type="button" className="btn btn-xs border-0 btn-outline-secondary" onClick={() => setModal({ show: true, type: "repost", clickedJob: job })}>
                                                                                <MdEmail fontSize={20} />
                                                                            </button>
                                                                            : null
                                                                        }
                                                                    </td>

                                                                </tr>
                                                            })
                                                        }

                                                    </table>
                                                </div>}
                                        </form>
                                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <MessagePopup modal={modal} setModal={setModal} handleDelete={handleDelete} closeJob={closeJob} />
        </>
    )
}
export default Joblist;