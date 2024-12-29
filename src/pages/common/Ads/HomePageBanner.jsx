import { useEffect, useState } from "react";
import { adService } from "../../../services/company/Ads.service";

export default function HomePageBanner() {
    const [advertisement, setAdvertisement] = useState(null);

    useEffect(() => {
        adService.showAds('short')
            .then(response => setAdvertisement(response.data))
            .catch(() => setAdvertisement(null));
    }, []);

    return (
        <div>
            <img src={advertisement?.ad_image_url} style={{ width: '100%', height: "30vh " }} alt="" />
        </div>
    )
}
