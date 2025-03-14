import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import PostSpecificPageAd from "../../../pages/company/Ads/PostSpecificPageAd";
import PostAd from "../../../pages/company/Ads/PostAd"; // Import the PostAd component
import { adService } from "../../../services/company/Ads.service";

export default function EditAd() {
    const { id } = useParams();
    const [adData, setAdData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("Invalid ad ID.");
            setLoading(false);
            return;
        }

        let isMounted = true; // Prevent state update if unmounted

        const fetchAd = async () => {
            try {
                const response = await adService.getAdById(id);
                if (isMounted) setAdData(response.data);
            } catch (err) {
                console.error("Error fetching ad:", err);
                if (isMounted) setError("Failed to fetch ad details. Please try again.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchAd();

        return () => {
            isMounted = false; // Cleanup function
        };
    }, [id]);

    const handleSuccess = useCallback(() => {
        console.log("Ad Updated Successfully");
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
    if (!adData) return <div className="text-center p-4 text-gray-500">No ad found.</div>;

    // Conditional rendering based on adData.type
    if (adData.type !== "specific-page" && adData.type !== "b2b") {
        return <PostAd  pageType={adData.type} existingAd={adData} onSuccess={handleSuccess} />;
    }

    return <PostSpecificPageAd pageType={adData.type} existingAd={adData} onSuccess={handleSuccess} />;
}
