import { useEffect, useState } from "react";
import { adService } from "../../../services/company/Ads.service";
import { BASE_API_URL } from '../../../helpers/constants';

const bannerShowStyles = {  // Styles for the banner to show when scrolling
    position: "fixed",
    zIndex: 10,
    top: 0,
    height: "4rem",
    width: "100vw",
    boxShadow: "1px 1px 5px grey",
    transition: "top 1s",
}


let prevScrollpos = 0

export default function HomePageBanner() {
    const [bannerStyles, setBannerStyles] = useState({});
    const [adData, setAdData] = useState(null);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos < 300) {
                setBannerStyles({});
                return;
            }

            if (prevScrollpos > currentScrollPos) {
                setBannerStyles(bannerShowStyles);
            } else {
                setBannerStyles({});
            }

            prevScrollpos = currentScrollPos;
        }

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        adService.showAds("home-page-banner")
            .then((res) => setAdData(res.data))
            .catch(() => setAdData(null));
    }, []);

    if (!adData) return null;

    const imgSrc = adData?.company_id 
    ? `${BASE_API_URL}/uploads/ads/${adData.image}` 
    : adData?.ad_image_url || '';
    return (
        <div className="bg-white-500 text-center py-1">
            <img
                src={imgSrc}
                style={{ width: "100%", height: "250px" }}
                alt={adData.title}
            />
        </div>
    );
}
