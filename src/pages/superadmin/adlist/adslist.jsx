import { useEffect, useState, useCallback } from "react";
import http from "../../../helpers/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemsPerPage } from "../../../helpers/constants";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";

const AdsListSuperAdmin = () => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [totalItems, setTotalItems] = useState("");
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1);
    const [isLoading, setIsLoading] = useState(false);
    const [allSelectBox, setAllSelectBox] = useState(false);
    const [selectedAds, setSelectedAds] = useState([]);
    const [searchValue, setSearchValue] = useState(searchParams.get("adminName") || "");
    const [ads, setAds] = useState(null);
    const message = useShowMessage();
    const { _id: currentUserId } = useCurrentUser();

    useEffect(() => {
        document.title = "Ads list";
        fetchAds(pgNumber);
    }, [searchValue]);

    const fetchAds = async (page) => {
        setIsLoading(true);
        const skip = (page - 1) * itemsPerPage;
        try {
            const res = await http.get(`/companies/postedAds/all?limit=${itemsPerPage}&skip=${skip}&name=${searchValue}`);
            setAds(res.data.ads);
            setTotalItems(res.data.total);
        } catch (error) {
            setAds([]);
            setTotalItems(0);
            message({ status: "error", error: { message: "Failed to load ads. Please try again later." } });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAllSelect = useCallback((e) => {
        if (e.target.checked) {
            setAllSelectBox(true);
            let allAds = ads.filter(ad => ad.status === "REVIEW").map(ad => ad._id);
            setSelectedAds(allAds);
        } else {
            setAllSelectBox(false);
            setSelectedAds([]);
        }
    }, [ads]);

    const handleCheckbox = useCallback((id, e) => {
        setAllSelectBox(false);
        setSelectedAds((prevSelectedAds) =>
            prevSelectedAds.includes(id)
                ? prevSelectedAds.filter((ad) => ad !== id)
                : [...prevSelectedAds, id]
        );
    }, []);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setPgNumber(1);
    };

    const handleReleaseClick = () => {
        handleRelease();
    };

    const showMessage = (message, className) => {
        message({ status: "success", message });
        setTimeout(() => {
            message({ status: "success", message: "" });
        }, 1200);
    };

    const handleRelease = () => {
        if (selectedAds.length === 0) {
            showMessage("Please Select an Ad", "alert alert-danger");
        } else {
            let adsData = [];
            selectedAds.forEach((selectedAd) => {
                ads.forEach((ad) => {
                    if (ad._id === selectedAd && ad.status === "REVIEW") {
                        const data = {
                            adminId: currentUserId,
                            adId: ad._id,
                            companyAdsDto: ad
                        };
                        adsData.push(data);
                    }
                });
            });

            if (currentUserId !== "") {
                http.post("/ads/multi_release", adsData)
                    .then(res => window.location.href = '/superadmin/ads')
                    .catch(err => {
                        message({ status: "error", error: err.response.data });
                    });
            }
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'QUEUE': return 'badge-outline-dark';
            case 'REVIEW': return 'badge-outline-info';
            case 'LIVE': return 'badge-success';
            case 'REJECTED': return 'badge-danger';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'QUEUE': return 'In Queue';
            case 'REVIEW': return 'In Review';
            case 'LIVE': return 'Approved';
            case 'REJECTED': return 'Rejected';
            default: return '';
        }
    };

    const AdRow = ({ ad, selectedAds, handleCheckbox, goToAdPage }) => (
        <tr>
            <td>
                {ad.status === "REVIEW" && (
                    <input
                        type="checkbox"
                        checked={selectedAds.includes(ad._id)}
                        onChange={(e) => handleCheckbox(ad._id, e)}
                        className="form-check-input"
                    />
                )}
            </td>
            <td>{ad._id}</td>
            <td>{ad.title}</td>
            <td>{ad.companyName}</td>
            <td>{new Date(ad.creationdate).toLocaleDateString('en-GB')}</td>
            <td>
                <span className={`badge ${getStatusBadgeClass(ad.status)} col-12`}>
                    {getStatusText(ad.status)}
                </span>
            </td>
            <td>
                <button onClick={() => goToAdPage(ad._id)} type="button" className="btn btn-info btn-xs col-12">
                    View
                </button>
            </td>
        </tr>
    );

    const goToAdPage = (id) => {
        navigate(`/superadmin/ads/${id}`);
    };

    return (
        <div className="container-fluid bg-white pt-4">
            <h3 className="fs-4 text-center fw-bold">Ads List</h3>
            <Pagination itemsPerPage={itemsPerPage} currentPage={pgNumber} setCurrentPage={setPgNumber} totalCount={totalItems} fetchItems={fetchAds} pageNumberToShow={2}>
                <div className="bg-white rounded">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="form-control my-3 shadow"
                        placeholder="Search By Ad Title or Reference"
                    />
                    <button 
                        type="button" 
                        onClick={handleReleaseClick} 
                        className="btn btn-outline-dark rounded text-nowrap"
                        disabled={selectedAds.length === 0} // Disable if no ads selected
                    >
                        Release Ads
                    </button>
                    {isLoading ? <Loader /> : (
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>
                                        
                                        {ads && ads.length > 0 && ads.some(ad => ad.status === "REVIEW") && (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    name="allSelect"
                                                    checked={allSelectBox}
                                                    onChange={handleAllSelect}
                                                />
                                                <small>Select All</small>
                                            </>
                                        )}
                                    </th>
                                    <th>Ad ID</th>
                                    <th>Ad Title</th>
                                    <th>Company</th>
                                    <th>Creation Date</th>
                                    <th>Status</th>
                                    <th>View Ad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads && ads.length > 0 && ads.map((ad, index) => (
                                    <AdRow
                                        key={index}
                                        ad={ad}
                                        selectedAds={selectedAds}
                                        handleCheckbox={handleCheckbox}
                                        goToAdPage={goToAdPage}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Pagination>
        </div>
    );
};

export default AdsListSuperAdmin;
