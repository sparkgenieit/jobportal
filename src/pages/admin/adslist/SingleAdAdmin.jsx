import { useEffect, useState } from "react";
import RejectAdMessage from "../../../components/RejectAdMessage";
import AdminAd from "./AdminAdsComponent";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { useParams } from "react-router-dom";
import { tryCatch } from "../../../helpers/functions";

function SingleAdAdmin() {
    const params = useParams();
    const [adView, setAdView] = useState();
    const userId = localStorage.getItem('user_id');
    const [show, setShow] = useState(false);
    const message = useShowMessage();

    const fetchAd = async () => {
        const { data, error } = await tryCatch(() => http.get(`/ads/details/${params.id}`));
        if (data) {
            setAdView(data);
            document.title = data.title;
        }
        if (error) {
            message({ status: "Error", error });
        }
    };

    useEffect(() => {
        fetchAd();
    }, []);

    function handleApprove(ad) {
        const data = {
            adminId: userId,
            adId: ad._id,
            companyAdsDto: ad
        };
        http.post("/ads/approve", data)
            .then((response) => {
                if (response && response.status) {
                    const notification = {
                        userId: ad.companyId,
                        adId: ad._id,
                        adTitle: ad.adTitle,
                        status: "Approved",
                        isRead: false,
                        message: "",
                        createdAt: Date.now()
                    };
                    return http.post("/notifications/create", notification);
                }
            })
            .then(() => {
                fetchAd();
            })
            .catch(err => message({ status: "Error", error: err }));
    }

    const handleClose = () => {
        setShow(false);
    };
    
    return (
        <>
        {console.log(adView)}
            <div className="container-fluid">
                {adView && <AdminAd adView={adView} handleApprove={handleApprove} setShow={setShow} />}
            </div>
            {show && <RejectAdMessage handleClose={handleClose} ad={adView} userId={userId} />}
        </>
    );
}

export default SingleAdAdmin;
