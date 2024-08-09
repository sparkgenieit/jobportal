import { useContext, useEffect, useState } from "react";
import Sidebar from "../../layouts/common/Sidebar";
import Card from "../../components/Card";
import http from "../../helpers/http";
import Ads from './ads';
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../helpers/constants";
import Pagination from "../../components/Pagination";
import LocationPopup from "../../components/LocationPopup";
import Toaster from "../../components/Toaster";
import { Modal } from 'react-bootstrap';
import { marked } from "marked";
import parse from "html-react-parser";
import { JobsContext } from "../../helpers/Context";
import Loader from "../../components/Loader";


function Myappliedjobs() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [appliedjobs, setAppliedJobs] = useState(null)
    const userId = localStorage.getItem('user_id');

    const { setInfo, message, setMessage, setLocationPopup, info, locationPopup } = useContext(JobsContext)

    useEffect(() => {
        fetchAppliedJobs(pgNumber)
    }, [])


    const fetchAppliedJobs = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage;
        try {
            const response = await http.get(`/jobs/appliedjobs/${userId}?limit=${itemsPerPage}&skip=${skip}`)
            setLoading(false)
            setTotalItems(response.data.total)
            setAppliedJobs(response.data.jobs)
        } catch (error) {
            setLoading(false)
            setTotalItems(0)
            setAppliedJobs([])
        }
    }


    // const itemsToShow = (pageNumber) => {
    //     setPgNumber(pageNumber)
    //     window.location.href = `/common/Myappliedjobs?page=${pageNumber}`
    // }
    return (
        <>


            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="container-fluid">
                    <div className="page-header">
                        <h3 className="page-title">My Applied Jobs</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a>User</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Appliedjobs</li>
                            </ol>
                        </nav>
                    </div>
                    <div className=" row ">


                        <div className="col-9">
                            {loading && <Loader />}
                            {!loading &&
                                <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} pageNumberToShow={2} fetchItems={fetchAppliedJobs}>


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
export default Myappliedjobs;