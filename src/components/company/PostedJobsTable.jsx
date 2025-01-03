import styles from './postedJobs.module.css';

import { useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { RxCross2 } from "react-icons/rx";
import { CiBellOn } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BiRepost } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from 'react-redux';

import MessagePopup from '../../pages/company/jobs/MessagePopup'


function PostedJobTable({ jobs, handleDuplicate, closeJob, getAppliedUsers, handleDelete, goToEdit }) {
    const isSidebarOpen = useSelector((state) => state.general.isSidebarOpen)
    const [modal, setModal] = useState({});
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);

    const getExpiry = (closedate) => {
        let close = new Date(closedate)
        const millisecondsDifference = close - new Date();

        const daysDifference = millisecondsDifference / (1000 * 60 * 60 * 24);

        return Math.round(daysDifference) + "d";
    }

    return (
        <>
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
                            <th>{jobs?.some((job) => job.shortlistedUsers > 0) && <span>Shortlisted</span>}</th>
                            {isTableCollapsed &&
                                <>
                                    <th className='text-primary d-flex align-items-center gap-1'>
                                        <span role='button' onClick={() => setIsTableCollapsed(prev => !prev)}>
                                            <RxHamburgerMenu fontSize={18} />
                                        </span>
                                        Edit
                                    </th>
                                    <th className='text-primary'>Duplicate</th>
                                    <th className='text-primary'>{jobs?.some((job) => job.status === "approved") && <span>Close</span>}</th>
                                    <th className='text-primary'>{jobs?.some((job) => job.status === "expired" || job.status === "closed") && <span>Delete</span>}</th>
                                    <th className='text-primary'>{jobs?.some((job) => job.status === "expired" || job.status === "closed") && <span>Repost</span>}</th>
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
                            jobs.length > 0 && jobs?.map((job, index) => {
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
                                            <span>{new Date(job.closedate).toLocaleDateString('en-GB')}</span>
                                            {(job.status !== "closed" && job.status !== "expired") && <> ({getExpiry(job.closedate)}) </>}
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
                                                        <button type="button" className="border-0 bg-white text-primary fw-bold text-decoration-underline " onClick={() => getAppliedUsers(job, false)}>
                                                            {job.appliedUsers}
                                                        </button>
                                                    }
                                                </>
                                            }
                                        </td>
                                        <td id="shortlistedCount">

                                            {job.shortlistedUsers > 0 && job.status === "approved" &&
                                                <button type="button" className="border-0 bg-white text-success fw-bold text-decoration-underline " onClick={() => getAppliedUsers(job, true)}>
                                                    {job.shortlistedUsers}
                                                </button>
                                            }
                                        </td>
                                        {isTableCollapsed &&
                                            <>
                                                <td id="edit">
                                                    <a onClick={() => goToEdit(job)} type="button"  >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                        </svg>
                                                    </a>
                                                </td>
                                                <td id="duplicate">
                                                    <span role="button" onClick={() => handleDuplicate(job)}><HiOutlineDocumentDuplicate fontSize={20} /></span>
                                                </td>
                                                <td id="close">
                                                    {job.status === "approved" &&
                                                        <span
                                                            role="button"

                                                            onClick={() => setModal({ show: true, type: "close", clickedJob: job })}
                                                        >
                                                            <RxCross2 color="red" fontSize={22} />
                                                        </span>
                                                    }

                                                </td>
                                                <td id="delete">
                                                    {job.status === "closed" || job.status === "expired" ?
                                                        <span role="button" onClick={() => setModal({ show: true, type: "delete", clickedJob: job })}>
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

            <MessagePopup modal={modal} setModal={setModal} handleDelete={handleDelete} closeJob={closeJob} />
        </>
    )
}
export default PostedJobTable;