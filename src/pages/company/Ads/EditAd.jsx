import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostSpecificPageAd from "../../../pages/company/Ads/PostSpecificPageAd";
import { adService } from "../../../services/company/Ads.service";

export default function EditAd() {
    const { id } = useParams();
    const [adData, setAdData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await adService.getAdById(id);
                setAdData(response.data);
            } catch (err) {
                console.error("Error fetching ad:", err);
                setError("Failed to fetch ad details.");
            } finally {
                setLoading(false);
            }
        };
        fetchAd();
    }, [id]);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return adData ? <PostSpecificPageAd pageType={adData.type} existingAd={adData} onSuccess={() => console.log("Ad Updated Successfully")} /> : null;
}
