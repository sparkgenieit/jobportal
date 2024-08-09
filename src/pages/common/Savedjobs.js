import { useContext, useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Sidebar from "../../layouts/common/Sidebar";

import http from "../../helpers/http";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../helpers/constants";
import Ads from "./ads";
import { JobsContext } from "../../helpers/Context";
import Loader from "../../components/Loader";
import Toaster from "../../components/Toaster";
import LocationPopup from "../../components/LocationPopup";
import { marked } from "marked";
import parse from "html-react-parser";


function Savedjobs() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [savedJobs, setSavedJobs] = useState(null)
    const userId = localStorage.getItem('user_id')

    const { setInfo, message, setMessage, setLocationPopup, info, locationPopup } = useContext(JobsContext)

    useEffect(() => {
        fetchSavedJobs(pgNumber)
    }, [])

    const fetchSavedJobs = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const response = await http.get(`/jobs/savedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            setLoading(false)
            setTotalItems(response.data.total)
            setSavedJobs(response.data.jobs)
        } catch (error) {
            setLoading(false)
            setTotalItems(0)
            setSavedJobs([])
        }
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
                            {loading && <Loader />}
                            {!loading &&
                                <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} pageNumberToShow={2} fetchItems={fetchSavedJobs}>

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
                                </Pagination>
                            }
                        </div>
                        <section className="col-3">
                            <Ads />
                        </section>
                    </div>
                </div>
            </div>


            <Modal size="md" show={info.show} onHide={() => { setInfo({ show: false }) }} centered>
                <Modal.Body>
                    <h3>{info.name}</h3>
                    {info.info && <p>{parse(marked(info.info))}</p>}
                </Modal.Body>
            </Modal>

            <Toaster message={message} setMessage={setMessage} />
            <LocationPopup show={locationPopup.show} handleClose={() => { setLocationPopup({ show: false }) }} city={locationPopup.city} />

        </>
    )
}
export default Savedjobs;