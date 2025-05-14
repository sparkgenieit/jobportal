import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import http from "../../../helpers/http";
import RejectAdMessage from "../../../components/RejectAdMessage";
import AdminAd from "../../admin/adslist/AdminAdsComponent";

export default function AdSuperAdmin() {

    console.log('KKKKKKK');
    const params = useParams();
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [adView, setAdview] = useState(null)
    const [show, setShow] = useState(false)

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {

        http.get(`/ads/details/${params.id}`)
            .then((response) => {
                setAdview(response.data)
                 document.title = response.data.title;
               
            })
            .catch(err => setAdview(null))
    }, [])




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
            .then(res => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch(err => console.log(err))
    }

    return <>
        <div className="container-fluid">

            {adView && <AdminAd adView={adView} handleApprove={handleApprove} setShow={setShow} />}
        </div>


        {show && <RejectAdMessage handleClose={handleClose} adView={adView} userId={userId} />}

    </>
}