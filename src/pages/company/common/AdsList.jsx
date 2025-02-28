import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import http from "../../../helpers/http";
import { itemsPerPage, adColumns } from "../../../helpers/constants";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";

import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import DataTable from '../common/DataTable';
import { setCurrentJob } from '../../../helpers/slices/generalSlice';

function SearchInput({ name, setName, setPgNumber }) {
    return (
        <input
            type="text"
            placeholder="Search by job title or reference"
            className="form-control my-3 shadow"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                setPgNumber(1);
                window.history.replaceState(null, null, '/ads');
            }}
        />
    );
}

function AdsList({ role }) {
    console.log(role);
    const [totalItems, setTotalItems] = useState(0);
    const [ads, setAds] = useState(null);
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const { _id: userId } = useCurrentUser();
    const message = useShowMessage();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Posted Ads";
        fetchAds(pgNumber);
    }, [name, pgNumber]);

    const fetchAds = async (page) => {
        setIsLoading(true);
        const skip = (page - 1) * itemsPerPage;
        
        let endpoint = role === "SuperAdmin"
            ? `/companies/postedAds/all?limit=${itemsPerPage}&skip=${skip}&name=${name}`
            : `/companies/postedAds/${userId}?limit=${itemsPerPage}&skip=${skip}&name=${name}`;
        
        try {
            const { data } = await http.get(endpoint);
            setTotalItems(data.total);
            setAds(data.ads);
        } catch (error) {
            console.error(error);
            setAds([]);
            message({ status: "error", error });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDuplicate = (ad) => {
        dispatch(setCurrentJob({ ...ad }));
        message({ path: `/company/postajob?c=${ad._id}` });
    };

    const goToEdit = (ad) => {
        console.log(ad);
        message({ path: `/company/ads/editad/${ad._id}` });
    };

    const handleDelete = async (ad) => {
        setIsLoading(true);
        try {
            await http.delete(`/ads/delete/${ad._id}`);
            message({ status: "success", message: "Ad deleted successfully" });
            fetchAds(pgNumber);
        } catch (err) {
            message({ status: "error", error: { message: "Failed to delete the ad, please try again" } });
        } finally {
            setIsLoading(false);
        }
    };

    const closeAd = async (ad) => {
        try {
            await http.patch('/ads/ad', { userId, adId: ad._id });
            message({ status: "success", message: "Ad Closed" });
            fetchAds(pgNumber);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="content-wrapper px-0 bg-white">
                <h4 className="text-center fs-4 fw-bold">List of Posted Ads</h4>
                <Pagination 
                    itemsPerPage={itemsPerPage} 
                    currentPage={pgNumber} 
                    setCurrentPage={setPgNumber} 
                    totalCount={totalItems} 
                    fetchItems={fetchAds} 
                    pageNumberToShow={2}
                >
                    <div className="bg-white rounded">
                        <SearchInput name={name} setName={setName} setPgNumber={setPgNumber} />
                        {isLoading ? <Loader /> : ads ? (
                            <DataTable 
                                items={ads} 
                                handleDuplicate={handleDuplicate} 
                                closeAction={role !== "SuperAdmin" ? closeAd : null} 
                                handleDelete={role !== "SuperAdmin" ? handleDelete : null} 
                                goToEdit={goToEdit} 
                                columns={adColumns}
                            />
                        ) : null}
                    </div>
                </Pagination>
            </div>
        </div>
    );
}

export default AdsList;
