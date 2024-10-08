import styles from './postedJobs.module.css';


import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Table from 'react-bootstrap/Table';
import { RxCross2 } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BiRepost } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";

import http from "../../../helpers/http";
import { itemsPerPage } from "../../../helpers/constants";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import MessagePopup from "./MessagePopup";
import { GeneralContext } from "../../../helpers/Context";

function PostedJobList() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [name, setName] = useState("")
    const [modal, setModal] = useState({});
    const [assignJobs, setAssignJobs] = useState([]);
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const userId = localStorage.getItem('user_id');
    const { setCurrentJob, isSidebarOpen } = useContext(GeneralContext)
    const message = useShowMessage()

    useEffect(() => {
        showJobsList(pgNumber)
    }, [name])

    const handleDuplicate = (job) => {
        setCurrentJob({ ...job })
        message({ path: `/company/postajob?c=${job._id}` })
    }

    const getExpiry = (closedate) => {
        let close = new Date(closedate)
        const millisecondsDifference = close - new Date();

        const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);

        return Math.round(daysDifference) + "d";
    }

    const showJobsList = async (page) => {
        setIsLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const { data } = await http.get(`/companies/postedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}&name=${name}`)
            setTotalItems(data.total)
            setAssignJobs(data.jobs)
        } catch (error) {
            console.log(error)
            setAssignJobs([])
            message({
                status: "error",
                error
            })
        } finally {
            setIsLoading(false)
        }
    }

    const getAppliedUsers = (job) => {
        message({ path: `/company/applied-users/${job._id}` })
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
            userId,
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
            <div className="container-fluid mt-4">
                <div className=" bg-white">
                    <h4 className="text-center ">List of Posted Jobs</h4>
                    <div>
                        <div>
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
                                            window.history.replaceState(null, null, '/company/jobs')
                                        }}
                                    />
                                    {isLoading && <Loader />}

                                    {!isLoading &&

                                        <div className={isSidebarOpen ? styles.sidebarNotCollasped : styles.sidebarCollasped}>
                                            <Table responsive className="text-wrap text-center">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th className="text-start">Job Title</th>
                                                        <th className="text-start">Job Reference</th>
                                                        <th>Posted Date</th>
                                                        <th>End Date</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-end">Views</th>
                                                        <th className="text-center">Applications</th>
                                                        <th>{assignJobs?.some((job) => job.shortlistedUsers > 0) && <span>Shortlisted</span>}</th>
                                                        {isTableCollapsed &&
                                                            <>
                                                                <th className='text-primary d-flex align-items-center gap-1'>
                                                                    <span role='button' onClick={() => setIsTableCollapsed(prev => !prev)}>
                                                                        <RxHamburgerMenu fontSize={18} />
                                                                    </span>
                                                                    Edit
                                                                </th>
                                                                <th className='text-primary'>Duplicate</th>
                                                                <th className='text-primary'>{assignJobs?.some((job) => job.status === "approved") && <span>Close</span>}</th>
                                                                <th className='text-primary'>{assignJobs?.some((job) => job.status === "expired" || job.status === "closed") && <span>Delete</span>}</th>
                                                                <th className='text-primary'>{assignJobs?.some((job) => job.status === "expired" || job.status === "closed") && <span>Repost</span>}</th>
                                                            </>
                                                        }
                                                        {
                                                            !isTableCollapsed &&
                                                            <th role='button' className="d-flex gap-2 text-primary align-items-center">
                                                                <span>Actions</span>
                                                                <span onClick={() => setIsTableCollapsed(prev => !prev)}>
                                                                    <RxHamburgerMenu fontSize={18} />
                                                                </span>
                                                            </th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        assignJobs.length > 0 && assignJobs?.map((job, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td id="support" className="text-start">
                                                                        <span
                                                                            role="button"
                                                                            onClick={() => {
                                                                                setModal({
                                                                                    show: true,
                                                                                    type: "support",
                                                                                    clickedJob: job
                                                                                })
                                                                            }}
                                                                        >
                                                                            <GoQuestion fontSize={20} />
                                                                        </span>

                                                                    </td>
                                                                    <td id="jobTitle" className="text-start">{job.jobTitle}</td>
                                                                    <td id="jobRef" className="text-start">{job.employjobreference}</td>
                                                                    <td id="Posteddate">{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>
                                                                    <td id="expirydate">
                                                                        {(job.status === 'closed' || job.status === "expired") && <span>{new Date(job.closedate).toLocaleDateString('en-GB')}</span>}
                                                                        {job.status === 'approved' && <span>{getExpiry(job.closedate)} left</span>}
                                                                    </td>
                                                                    <td id="status" className="text-center">
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

                                                                    <td id="views" className="text-end">{job.views ? job.views : 0}</td>
                                                                    <td id="Applicants" className="text-center">
                                                                        {job.status === "approved" &&
                                                                            <>
                                                                                {job.appliedUsers === 0 ?
                                                                                    <span>0</span>
                                                                                    :
                                                                                    <button type="button" className="border-0 bg-white text-primary fw-bold text-decoration-underline " disabled={isLoading} onClick={() => { getAppliedUsers(job) }}>
                                                                                        {job.appliedUsers}
                                                                                    </button>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </td>
                                                                    <td id="shortlistedCount">
                                                                        {job.shortlistedUsers > 0 &&
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-xs"
                                                                                onClick={() => { message({ path: `/company/applied-users/${job._id}?s=true` }) }}
                                                                            >

                                                                                <span className="text-success text-decoration-underline">{job.shortlistedUsers}</span>
                                                                            </button>
                                                                        }
                                                                    </td>
                                                                    {isTableCollapsed &&
                                                                        <>
                                                                            <td id="edit">
                                                                                <Link to={`/company/editjob/${job._id}`} type="button" disabled={isLoading} >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                                                    </svg>
                                                                                </Link>
                                                                            </td>
                                                                            <td id="duplicate">
                                                                                <span role="button" onClick={() => handleDuplicate(job)}><HiOutlineDocumentDuplicate fontSize={20} /></span>
                                                                            </td>
                                                                            <td id="close">
                                                                                {job.status === "approved" &&
                                                                                    <span
                                                                                        role="button"
                                                                                        disabled={isLoading}
                                                                                        onClick={() => setModal({ show: true, type: "close", clickedJob: job })}
                                                                                    >
                                                                                        <RxCross2 color="red" fontSize={22} />
                                                                                    </span>
                                                                                }

                                                                            </td>
                                                                            <td id="delete">
                                                                                {job.status === "closed" || job.status === "expired" ?
                                                                                    <span role="button" disabled={isLoading} onClick={() => setModal({ show: true, type: "delete", clickedJob: job })}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                                        </svg>
                                                                                    </span> : null
                                                                                }
                                                                            </td>

                                                                            <td id="repost" className="text-center">
                                                                                {job.status === "expired" || job.status === "closed" ?
                                                                                    <span role="button" onClick={() => setModal({ show: true, type: "repost", clickedJob: job })}>
                                                                                        <BiRepost fontSize={24} />
                                                                                    </span>
                                                                                    : null
                                                                                }
                                                                            </td>
                                                                        </>
                                                                    }
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>


                                        </div>

                                    }
                                </div>
                            </Pagination>
                        </div>
                    </div>
                </div >
            </div >
            <MessagePopup modal={modal} setModal={setModal} handleDelete={handleDelete} closeJob={closeJob} />
        </>
    )
}
export default PostedJobList;