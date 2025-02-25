import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

import { itemsPerPage } from "../../../helpers/constants";
import http from "../../../helpers/http";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";

const Adsqueuelist = () => {
    const { _id: userId } = useCurrentUser()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [table, setTable] = useState(null)
    const message = useShowMessage()

    useEffect(() => {
        document.title = "Ad Queue List"
        fetchAds(pgNumber)
    }, [])

    const fetchAds = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        const { data, error } = await tryCatch(() => http.get(`/ads/queue?limit=${itemsPerPage}&skip=${skip}`))
        if (data) {
            setTable(data.ads)
            setTotalItems(data.total)
        }

        if (error) {
            message({ status: "Error", error })
        }
        setLoading(false)
    }

    async function handleAssign(ad) {
        const data = {
            adminId: userId,
            adId: ad._id,
            companyAdsDto: ad
        }
        const { error } = await tryCatch(() => http.post("/ads/assign", data))

        if (error) {
            message({ status: "error", error })
            return
        }

        message({ status: "success", message: "Ad Assigend", path: "/admin/myasignads" })
    }

    return (
        <div className="container-fluid content-wrapper  bg-white">
            <h3 className="fs-4 fw-bold text-center "> Ad Queue List </h3>

            <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} pageNumberToShow={2} itemsPerPage={itemsPerPage} fetchItems={fetchAds}>
                <div className="table-responsive">
                    {loading && <Loader />}
                    {!loading &&
                        <table className="table  " >
                            <thead>
                                <tr >
                                    <th>Ad id</th>
                                    <th>Ad Title</th>
                                    <th>Description</th>
                                    <th>Creation Date</th>
                                    <th>Assign</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table && table.length > 0 &&
                                    table.map((ad, index) => {
                                        return (
                                            <tr key={index} className={ad.reportReason ? "bg-gradient-danger" : ""}>
                                                <td>{ad._id}</td>
                                                <td>{ad.title}</td>
                                                <td>
                                                <div class="request-top" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
   <p>{ad.description}</p>
</div>
                                                   </td>
                                                <td>{new Date(ad.creationdate).toLocaleDateString('en-GB')}</td>
                                                <td>
                                                    <button type="button" className="btn  btn-xs btn-success  col-12" onClick={() => handleAssign(ad)}>Assign To Me</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>}
                </div>
            </Pagination >
        </div >
    )
}

export default Adsqueuelist;