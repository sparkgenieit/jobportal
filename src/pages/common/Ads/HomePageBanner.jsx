import { useEffect, useState } from "react";
import { adService } from "../../../services/company/Ads.service";

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
        adService.showAds("short")
            .then((res) => setAdData(res.data))
            .catch(() => setAdData(null));
    }, []);

    if (!adData) return null;

    return (
        <div style={bannerStyles}>
            <img
                src={adData.ad_image_url}
                style={{ width: "100%", height: "30vh" }}
                alt={adData.title}
            />
        </div>
    );
}
