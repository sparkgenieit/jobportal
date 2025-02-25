import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { itemsPerPage } from "../../../helpers/constants";
import http from "../../../helpers/http";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { tryCatch } from "../../../helpers/functions";

const ViewAds = () => {
    const [searchParams] = useSearchParams();
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1);
    const [ads, setAds] = useState([]);
    const message = useShowMessage();

    useEffect(() => {
        document.title = "View Ads";
        fetchAds(pgNumber);
    }, []);

    const fetchAds = async (page) => {
        setLoading(true);
        const skip = (page - 1) * itemsPerPage;
        const { data, error } = await tryCatch(() => http.get(`/ads?limit=${itemsPerPage}&skip=${skip}`));

        if (data) {
            setAds(data.ads);
            setTotalItems(data.total);
        }
        if (error) {
            message({ status: "Error", error });
        }
        setLoading(false);
    };

    return (
        <div className="container-fluid content-wrapper bg-white">
            <h3 className="fs-4 fw-bold text-center">View Ads</h3>
            
            <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} pageNumberToShow={2} itemsPerPage={itemsPerPage} fetchItems={fetchAds}>
                <div className="table-responsive">
                    {loading && <Loader />}
                    {!loading && ads.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ad ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Creation Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads.map((ad, index) => (
                                    <tr key={index}>
                                        <td>{ad._id}</td>
                                        <td>{ad.title}</td>
                                        <td>
                                            <div className="request-top" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                                <p>{ad.description}</p>
                                            </div>
                                        </td>
                                        <td>{new Date(ad.creationdate).toLocaleDateString('en-GB')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No ads available</p>
                    )}
                </div>
            </Pagination>
        </div>
    );
};

export default ViewAds;
