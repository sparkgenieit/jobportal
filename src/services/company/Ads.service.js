import http from "../../helpers/http";
import httpUpload from "../../helpers/httpUpload";

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
        return httpUpload.post("/ads/company", data)
    }

    updateAd(id,data) {
        return httpUpload.put(`/ads/company/${id}`, data)
    }

    getAds() {
        return http.get("/ads/company")
    }

    getAdById(id) {
        return http.get(`/ads/details/${id}`)
    }

    getBlockedDates(type,id) {
        return http.get(`/ads/blocked-dates/${id ? id : ''}?type=${type}`);
    }

    getPageSpecificAds(page) {
        return http.get("/ads/specific-ad-live", { params: { page } })
    }

    showAds(type) {
        return http.get('/ads/show-ad', { params: { type } })
    }

    uploadAdPhoto(data) {
        return httpUpload.post(`/upload/ad-photo?path=ads`, data);
    }


}

export const adService = new AdService();