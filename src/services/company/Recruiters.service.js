import http from "../../helpers/http";

class RecruiterService {

    async getRecruiters() {
        return  http.get(`/companies/recruiters`)
    }


}

export default new RecruiterService();