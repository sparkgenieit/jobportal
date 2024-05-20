import { useEffect, useState } from "react";
import Header from "../../layouts/common/Header";
import Sidebar from "../../layouts/common/Sidebar";
import Footer from "../../layouts/common/Footer";
import axios from "axios";

function Myappliedjobs() {
    const [appliedjobs, setAppliedJobs] = useState(null)
    const [allJobs, setAllJobs] = useState(null)
    const [filteredJobs, setFilteredJobs] = useState(null)
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        axios.get(`http://localhost:8080/jobs/appliedjobs/${userId}`)
            .then((response) => {
                setAppliedJobs(response.data)
            })

        axios.get("http://localhost:8080/jobs/approved")
            .then((res) => {
                setAllJobs(res.data)
            })
    }, [])

    useEffect(() => {
        let filtered = []
        if (appliedjobs && allJobs) {
            appliedjobs.map((appliedjob) => {
                for (const jobs of allJobs) {
                    if (appliedjob.applied === true && appliedjob.jobId === jobs._id) {
                        filtered.push({ ...jobs, applied_date: appliedjob.applied_date })
                    }
                }
            })
        }
        setFilteredJobs(filtered)
    }, [appliedjobs, allJobs])


    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">My Applied Jobs</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">User</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Appliedjobs</li>
                                    </ol>
                                </nav>
                            </div>

                            <div class="row">


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
                                                {filteredJobs && filteredJobs.length > 0 &&
                                                    filteredJobs.map((job, index) => {
                                                        return <tr key={index}>
                                                            <td>{job._id}</td>
                                                            <td>{job.jobTitle}</td>
                                                            <td>{job.company}</td>
                                                            <td>{job.applied_date}</td>

                                                        </tr>
                                                    })
                                                }
                                            </tbody>

                                        </table>
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
export default Myappliedjobs;