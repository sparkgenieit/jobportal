import { useEffect, useState } from "react";
import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import http from "../../../helpers/http";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from '../../../components/Pagination';

function Joblist() {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(1)


    const [assignJobs, setAssignJobs] = useState(null);

    useEffect(() => {
        http.get(`/jobs/postedJobs/${userId}?limit=${itemsPerPage}&skip=0`)
            .then((response) => {
                setTotalItems(response.data.total)
                setAssignJobs(response.data.jobs)
            })
    }, [])


    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        const skip = (pageNumber - 1) * itemsPerPage


        http.get(`/jobs/postedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            .then((res) => {
                setTimeout(() => {
                    setAssignJobs(res.data.jobs)
                }, 500)
            })
            .catch(err => {
                console.log(err)
            })

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

                                    <div class="card-body  bg-white ">
                                        <form class="form-sample">
                                            <div class="col">

                                                <table class="table  " >

                                                    <thead>
                                                        <tr >
                                                            <th>Job id</th>
                                                            <th>Job Title</th>
                                                            <th>Company</th>
                                                            <th>Creation Date</th>
                                                            <th>Status</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>


                                                        </tr>

                                                        {assignJobs && assignJobs.length > 0 &&
                                                            assignJobs.map((job, index) => {
                                                                return <tr key={index}>
                                                                    <td>{job._id}</td>
                                                                    <td>{job.jobTitle}</td>
                                                                    <td>{job.company}</td>
                                                                    <td>{job.creationdate}</td>
                                                                    <th>{job.status}</th>
                                                                    <td><a href={`/company/editjob/${job._id}`} type="button" class="btn btn-info btn-xs col-9 ">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                                        </svg>
                                                                    </a></td>
                                                                    <td>

                                                                        <button type="button" class="btn  btn-xs btn-danger col-9">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }

                                                    </thead>

                                                </table>
                                            </div>

                                        </form>
                                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={pgNumber} pageNumberToShow={2} />

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