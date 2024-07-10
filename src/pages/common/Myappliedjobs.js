import { useEffect, useState } from "react";
import Header from "../../layouts/common/Header";
import Sidebar from "../../layouts/common/Sidebar";
import Footer from "../../layouts/common/Footer";
import Card from "../../components/Card";
import http from "../../helpers/http";
import Ads from './ads';
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../helpers/constants";
import Pagination from "../../components/Pagination";

function Myappliedjobs() {
    const [totalItems, setTotalItems] = useState("")
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [appliedjobs, setAppliedJobs] = useState(null)
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const skip = (pgNumber - 1) * itemsPerPage
        http.get(`/jobs/appliedjobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            .then((response) => {
                setTotalItems(response.data.total)
                setAppliedJobs(response.data.jobs)
            })
    }, [pgNumber])

    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        window.location.href = `/common/Myappliedjobs?page=${pageNumber}`
    }
    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="container-fluid">
                        <div class="page-header">
                            <h3 class="page-title">My Applied Jobs</h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a>User</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Appliedjobs</li>
                                </ol>
                            </nav>
                        </div>
                        <div class=" row ">
                            <div className="col-9">
                                {
                                    appliedjobs && appliedjobs.length > 0 && appliedjobs.map((job, index) => {
                                        return <>
                                            {job.jobId &&
                                                <div key={index} className="p-2 d-flex flex-column align-items-center">
                                                    <div style={{ width: "45vw" }}>
                                                        <i className="fw-bold">Applied on {job.applied_date}</i> &nbsp;
                                                        {job.jobId && job.jobId.status !== "approved" && <i className="text-secondary small">This job was removed</i>}
                                                    </div>
                                                    {job.jobId && <Card job={job.jobId} />}
                                                </div>
                                            }
                                        </>
                                    })
                                }
                                {
                                    appliedjobs && appliedjobs.length == 0 && <div className="p-3">No Applied Jobs</div>
                                }
                            </div>

                            <section className="col-3">
                                <Ads />
                            </section>
                        </div>
                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Myappliedjobs;