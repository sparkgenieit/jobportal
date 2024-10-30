import { getCloseDate } from "../../../helpers/functions";
import http from "../../../helpers/http";
import companyService from "../../../services/common/company.service";

export const postJob = async (data, setMsg) => {
    try {
        const response = await http.post('/jobs/create', data)
        setMsg({
            status: "Success",
            message: "Job Posted Successfully"
        })
    }
    catch (err) {
        setMsg({
            status: "error",
            error: err,
        })
    }
}
export const fetchCategories = async (setCategoriesList, setParent) => {
    try {
        const res = await http.get("/categories/all")
        setCategoriesList(res.data)
        let p = [];
        (res.data).map((x, i) => {
            if (!p.includes(x.parent_id) && x.parent_id !== "None") {
                p.push(x.parent_id)
            }
        })
        setParent(p)
    } catch (error) {
        setCategoriesList([])
        setParent([])
    }
}

export const fetchCompanyInfo = async (user_id, setJobData, initialValues) => {
    try {
        const response = await companyService.get(user_id)
        setJobData({ ...initialValues, company: response.data.name, companyLogo: response.data.logo });
    } catch (error) {
        console.log(error)
    }

}

export const fetchJobForEditing = async (id, setJobData, isReposting = false) => {
    try {
        const response = await http.get(`/jobs/${id}`);
        const benifits = response.data.benifits?.includes("{") ? "" : response.data.benifits
        isReposting ?
            setJobData({ ...response.data, creationdate: new Date(), closedate: getCloseDate(new Date().toISOString()), benifits })
            :
            setJobData({ ...response.data, creationdate: new Date(response.data.creationdate), benifits });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editJob = async (jobID, data, setMsg) => {
    try {
        const response = await http.put(`/jobs/update/${jobID}`, data)
        if (response && response.status) {
            setMsg({
                status: "Success",
                message: "Updated Successfully"
            })
        }
    } catch (err) {
        setMsg({
            status: "error",
            error: err,
        })
    }
}