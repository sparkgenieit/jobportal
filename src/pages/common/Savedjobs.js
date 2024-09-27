import { useEffect, useState } from "react";

import Sidebar from "../../layouts/common/Sidebar";
import http from "../../helpers/http";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../helpers/constants";
import Ads from "./ads";
import Loader from "../../components/Loader";
import JobCardList from "../../components/JobCardsList";

function Savedjobs() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [savedJobs, setSavedJobs] = useState(null)
    const userId = localStorage.getItem('user_id')

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
                    </div>
                    <div class=" row ">
                        <div className="col-9">
                            {loading && <Loader />}
                            {!loading &&
                                <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} pageNumberToShow={2} fetchItems={fetchSavedJobs}>
                                    <div className="p-2 d-flex flex-column align-items-center">
                                        <JobCardList jobs={savedJobs} type={"Saved"} />
                                    </div>
                                </Pagination>
                            }
                        </div>
                        <section className="col-3">
                            <Ads />
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Savedjobs;