import http from "../../helpers/http";

class RecruiterService {

    async getRecruiters() {
        return await http.get(`/companies/recruiters`)
    }


}

export default new RecruiterService();