import { useDebugValue, useEffect, useState } from "react";
import Header from "../../layouts/common/Header";
import Sidebar from "../../layouts/common/Sidebar";
import Footer from "../../layouts/common/Footer";
import http from "../../helpers/http";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../helpers/constants";
import Ads from "./ads";

function Savedjobs() {
    const [totalItems, setTotalItems] = useState("")
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [savedJobs, setSavedJobs] = useState(null)
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        const skip = (pgNumber - 1) * itemsPerPage
        http.get(`/jobs/savedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            .then((response) => {
                setTotalItems(response.data.total)
                setSavedJobs(response.data.jobs)
            })
    }, [pgNumber])

    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        window.location.href = `/common/Savedjobs?page=${pageNumber}`
    }

    return (
        <>
            <div class="container-fluid page-body-wrapper">
                <Sidebar />
                <div class="container-fluid">
                    <div class="page-header">
                        <h3 class="page-title">Saved Jobs</h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">User</a></li>
                                <li class="breadcrumb-item active" aria-current="page">SavedJobs</li>
                            </ol>
                        </nav>
                    </div>
                    <div class=" row ">
                        <div className="col-9">
                            {savedJobs && savedJobs.length > 0 && savedJobs.map((job, index) => {
                                return <>
                                    {job.jobId &&

                                        <div key={index} className="p-2 d-flex flex-column align-items-center">
                                            <div style={{ width: "45vw" }}>
                                                <i className="fw-bold">Saved on {job.saved_date}</i> &nbsp;
                                                {job.jobId.status !== "approved" && <i className="text-secondary small">This job was removed</i>}
                                            </div>
                                            {job.jobId.status && <Card job={job.jobId} />}
                                        </div>
                                    }
                                </>

                            })
                            }
                            {savedJobs && savedJobs.length == 0 && <div className="p-3">No Saved Jobs</div>}
                        </div>
                        <section className="col-3">
                            <Ads />
                        </section>
                    </div>
                    <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                </div>
            </div>
        </>
    )
}
export default Savedjobs;