import http from "../../helpers/http";

class ChartsService {

    async getCharts(data) {
        return await http.post("/charts/company", data)
    }


}

export default new ChartsService();