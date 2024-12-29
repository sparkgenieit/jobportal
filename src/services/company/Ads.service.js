import http from "../../helpers/http";

export const initialAdFormValues = {
    title: "",
    description: "",
    ad_image_url: "",
    ad_type: "short",
    redirect_url: ""
}

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