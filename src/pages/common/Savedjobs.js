import { useDebugValue, useEffect, useState } from "react";
import Header from "../../layouts/common/Header";
import Sidebar from "../../layouts/common/Sidebar";
import Footer from "../../layouts/common/Footer";
import axios from "axios";
import http from "../../helpers/http";

function Savedjobs() {
    const [savedJobs, setSavedJobs] = useState(null)
    const [allJobs, setAllJobs] = useState(null)
    const [filteredJobs, setFilteredJobs] = useState(null)
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        http.get(`/jobs/savedJobs/${userId}`)
            .then((response) => {
                setSavedJobs(response.data)
            })

        http.get("/jobs/approved")
            .then((res) => {
                setAllJobs(res.data.jobs)
            })
    }, [])

    useEffect(() => {
        let filtered = []
        if (savedJobs && allJobs) {
            savedJobs.map((savedjob) => {
                for (const jobs of allJobs) {
                    if (savedjob.saved === true && savedjob.jobId === jobs._id) {
                        filtered.push({ ...jobs, saved_date: savedjob.saved_date })
                    }
                }
            })
        }
        console.log(filtered)
        setFilteredJobs(filtered)
    }, [savedJobs, allJobs])

    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Saved Jobs</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">User</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">SavedJobs</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">
                                <div class="card-body pt-3 px-3 bg-white ">
                                    <table class="table p-4" >
                                        <thead>
                                            <tr >
                                                <th>Job id</th>
                                                <th>Job Title</th>
                                                <th>Company</th>
                                                <th>Applied Date</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredJobs && filteredJobs.length > 0 && filteredJobs.map((job, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{job._id}</td>
                                                        <td>{job.jobTitle}</td>
                                                        <td>{job.company}</td>
                                                        <td>{job.saved_date}</td>


                                                    </tr>)
                                            })
                                            }
                                        </tbody>



                                    </table>



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
export default Savedjobs;