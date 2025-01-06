import styles from './postedJobs.module.css';

import { useState } from "react";
import Table from 'react-bootstrap/Table';
import { RxCross2 } from "react-icons/rx";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { CiBellOn } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { BiRepost } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from 'react-redux';

import MessagePopup from '../../pages/company/jobs/MessagePopup'

const JobStatus = ({ job, setModal }) => {
    switch (job.status) {
        case "approved":
            return "Live"

        case "rejected":
            return <span
                role="button"
                onClick={() => setModal({ show: true, type: "rejectedMessage", clickedJob: job })}
                className='text-red-600 flex items-center justify-center underline'
            >
                <CiBellOn />
                Revise
            </span>

        case "expired":
            return "Expired"
        case "closed":
            return "Closed"
        default:
            return "In Review"
    }
}


function PostedJobTable({ jobs, handleDuplicate, closeJob, getAppliedUsers, handleDelete, goToEdit }) {
    const isSidebarOpen = useSelector((state) => state.general.isSidebarOpen)
    const [modal, setModal] = useState({});
    const [isTableCollapsed, setIsTableCollapsed] = useState(false);

    const openSupportModal = (job) => {
        return () => {
            setModal({ show: true, type: "support", clickedJob: job })
        }
    }

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
                            <th>Status</th>
                            <th className="text-end">Views</th>
                            <th className="text-center">Applications</th>
                            <th>{jobs?.some((job) => job.shortlistedUsers > 0) && "Shortlisted"}</th>
                            {isTableCollapsed ?
                                <>
                                    <th className='text-blue-600 flex items-center gap-1'>
                                        <RxHamburgerMenu fontSize={18} role='button' onClick={() => setIsTableCollapsed(prev => !prev)} />
                                        Edit
                                    </th>
                                    <th className='text-blue-600'>Duplicate</th>
                                    <th className='text-blue-600'>{jobs?.some((job) => job.status === "approved") && "Close"}</th>
                                    <th className='text-blue-600'>{jobs?.some((job) => job.status === "expired" || job.status === "closed") && "Delete"}</th>
                                    <th className='text-blue-600'>{jobs?.some((job) => job.status === "expired" || job.status === "closed") && "Repost"}</th>
                                </> :
                                <th role='button' className="flex gap-2 text-blue-600 items-center">
                                    Actions
                                    <RxHamburgerMenu fontSize={18} onClick={() => setIsTableCollapsed(prev => !prev)} />
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length > 0 && jobs.map(job => (
                            <tr key={job._id}>
                                <td id="support" className="text-start">
                                    <GoQuestion role="button" onClick={openSupportModal(job)} fontSize={20} />
                                </td>

                                <td id="jobTitle" className="text-start">{job.jobTitle}</td>

                                <td id="jobRef" className="text-start">{job.employjobreference}</td>

                                <td id="Posteddate">{new Date(job.creationdate).toLocaleDateString('en-GB')}</td>

                                <td id="expirydate">
                                    {new Date(job.closedate).toLocaleDateString('en-GB')}

                                    {/* showing days remaining to expiry */}
                                    {(job.status === "approved") && " (" + getExpiry(job.closedate) + ")"}
                                </td>

                                <td id="status" className="text-center ">
                                    <JobStatus job={job} setModal={setModal} />
                                </td>

                                <td id="views" className="text-end">{job.views ? job.views : 0}</td>
                                <td id="Applicants" className="text-center">
                                    {job.status === "approved" &&
                                        <>
                                            {!job.appliedUsers ? // if no applied users
                                                "0"
                                                :
                                                <button type="button" className="border-0 bg-white text-blue-600 font-bold underline " onClick={() => getAppliedUsers(job, false)}>
                                                    {job.appliedUsers}
                                                </button>
                                            }
                                        </>
                                    }
                                </td>
                                <td id="shortlistedCount">
                                    {job.status === "approved" && job.shortlistedUsers &&
                                        <button type="button" className="border-0 bg-white text-green-600 font-bold underline " onClick={() => getAppliedUsers(job, true)}>
                                            {job.shortlistedUsers}
                                        </button>
                                    }
                                </td>
                                {
                                    isTableCollapsed &&
                                    <>
                                        <td id="edit">
                                            <span className='flex justify-center'>
                                                <BsPencilFill onClick={() => goToEdit(job)} type="button" />
                                            </span>
                                        </td>

                                        <td id="duplicate" className='flex justify-center'>
                                            <HiOutlineDocumentDuplicate role="button" onClick={() => handleDuplicate(job)} fontSize={20} />
                                        </td>

                                        <td id="close">
                                            {job.status === "approved" &&
                                                <span
                                                    className='flex justify-center'
                                                    role="button"
                                                    onClick={() => setModal({ show: true, type: "close", clickedJob: job })}
                                                >
                                                    <RxCross2 color="red" fontSize={22} />
                                                </span>
                                            }

                                        </td>
                                        <td id="delete">
                                            {(job.status === "closed" || job.status === "expired") &&
                                                <span role="button" className='flex justify-center' onClick={() => setModal({ show: true, type: "delete", clickedJob: job })}>
                                                    <BsTrash fontSize={16} />
                                                </span>
                                            }
                                        </td>

                                        <td id="repost" className="text-center">
                                            {(job.status === "expired" || job.status === "closed")
                                                &&
                                                <span role="button" className='flex justify-center' onClick={() => setModal({ show: true, type: "repost", clickedJob: job })}>
                                                    <BiRepost fontSize={24} />
                                                </span>}
                                        </td>
                                    </>
                                }
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div >
            <MessagePopup modal={modal} setModal={setModal} handleDelete={handleDelete} closeJob={closeJob} />
        </>
    )
}
export default PostedJobTable;