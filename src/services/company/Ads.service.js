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

}

export const adServive = new AdService();