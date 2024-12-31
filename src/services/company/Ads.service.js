import http from "../../helpers/http";

export const initialAdFormValues = {
    title: "",
    description: "",
    ad_image_url: "",
    ad_type: "short",
    redirect_url: ""
}

export const adTypes = [
    {
        name: "Landing Page Popup",
        slugName: "landing-page-popup",
    },
    {
        name: "Home Page Banner",
        slugName: "home-page-banner",
    },
    {
        name: "Home Page Pixel",
        slugName: "home-page-pixel",
    },
    {
        name: "Home Page Map Left",
        slugName: "home-page-map-left",
    },
    {
        name: "Home Page Map Right",
        slugName: "home-page-map-right",
    },
    {
        name: "Specific Page",
        slugName: "specific-page",
    },
    {
        name: "B2B",
        slugName: "b2b",
    },
]

class AdService {

    postAd(data) {
        return http.post("/ads/company", data)
    }

    getAds() {
        return http.get("/ads/company")
    }

    showAds(type) {
        return http.get('/ads/show-ad', { params: { type } })
    }


}

export const adService = new AdService();