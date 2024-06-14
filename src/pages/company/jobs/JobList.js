import { useEffect, useState } from "react";
import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import http from "../../../helpers/http";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from '../../../components/Pagination';
import { useNavigate, useSearchParams } from "react-router-dom";

function Joblist() {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [totalItems, setTotalItems] = useState("")
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [assignJobs, setAssignJobs] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({
        show: false,
        text: "",
        class: ""
    })
    const navigate = useNavigate();

    useEffect(() => {
        const skip = (pgNumber - 1) * itemsPerPage
        http.get(`/jobs/postedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            .then((response) => {
                setTotalItems(response.data.total)
                setAssignJobs(response.data.jobs)
            })
    }, [pgNumber, message])

    const getAppliedUsers = (job) => {
        navigate(`/company/applied-users/${job._id}`)
    }

    const handleDelete = (job) => {
        setIsLoading(true)
        http.delete(`jobs/delete/${job._id}`)
            .then((res) => {
                setIsLoading(false)
                setMessage({
                    show: false, text: "", class: ""
                })
            })
            .catch((err) => {
                setIsLoading(false)
                setMessage({
                    show: true,
                    text: err.response.data.error || err.response.data.message || err.message,
                    class: "alert alert-danger"
                })
            })
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
                    <div class="container-fluid">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Job List</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Employer</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Jobs List</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    {message.show && <div className={message.class}>
                                        {message.text}
                                    </div>}

                                    <div class="card-body  bg-white ">
                                        <form class="form-sample">
                                            <div class="col">

                                                <table class="table  " >

                                                    <thead>
                                                        <tr >

                                                            <th>Job Title</th>

                                                            <th>Creation Date</th>
                                                            <th>Status</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                            <th className="text-center">Applied Users</th>
                                                        </tr>

                                                        {assignJobs && assignJobs.length > 0 &&
                                                            assignJobs.map((job, index) => {
                                                                return <tr key={index}>

                                                                    <td>{job.jobTitle}</td>

                                                                    <td>{job.creationdate}</td>
                                                                    <td>{job.status}</td>
                                                                    <td>
                                                                        <a href={`/company/editjob/${job._id}`} type="button" disabled={isLoading} class="btn btn-info btn-xs ">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                                            </svg>
                                                                        </a>
                                                                    </td>
                                                                    <td>
                                                                        <button type="button" class="btn  btn-xs btn-danger" disabled={isLoading} onClick={() => handleDelete(job)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {
                                                                            job.status !== "approved" && <span>This Job is not live yet</span>
                                                                        }
                                                                        {job.status === "approved" &&

                                                                            <button type="button" class="btn btn-xs btn-danger" disabled={isLoading} onClick={() => { getAppliedUsers(job) }}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                                                </svg>
                                                                            </button>

                                                                        }
                                                                    </td>
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


                    </div>



                </div>
                <Footer />

            </div>
        </>
    )
}
export default Joblist;