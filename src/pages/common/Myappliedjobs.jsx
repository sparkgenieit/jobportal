import { useEffect, useState } from "react";
import Sidebar from "../../layouts/common/Sidebar";
import http from "../../helpers/http";
import Ads from './ads';
import { useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../helpers/constants";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import JobCardList from "../../components/JobCardsList";


function Myappliedjobs() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [appliedjobs, setAppliedJobs] = useState(null)
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        fetchAppliedJobs(pgNumber)

        document.title = "Applied Jobs"
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

    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="container-fluid">
                    <div className=" row m-0    p-0 ">
                        <div className="col-md-9 col-12 p-0">
                            {loading && <Loader />}
                            {!loading && <>
                                <h3 className="fs-4 fw-bold text-center ">Applied Jobs</h3>
                                <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} pageNumberToShow={2} fetchItems={fetchAppliedJobs}>
                                    <div className=" d-flex flex-column align-items-center">
                                        <JobCardList jobs={appliedjobs} type={"Applied"} />
                                    </div>
                                </Pagination>
                            </>
                            }
                        </div>

                        <section className="col-md-3 col-12">
                            <Ads />
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Myappliedjobs;