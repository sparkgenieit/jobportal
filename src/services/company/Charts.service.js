import http from "../../helpers/http";

class ChartsService {

    async getCompanyGraphs(data) {
        return http.post("/charts/company", data)
    }

    async getRecruiterGraphs(data) {
        return http.post("/charts/recruiter", data)
    }


}

export default new ChartsService();