import { getCloseDate } from "../../helpers/functions";
import http from "../../helpers/http";
import companyService from "../common/company.service";

export const initialValues = {
    company: "",
    jobtype: "",
    jobTitle: "",
    closedate: getCloseDate(new Date().toString()),
    jobCategory: "",
    subCategory: "",
    numberofvacancies: "",
    location: "",
    description: "",
    duration: "",
    creationdate: new Date(),
    employjobreference: "",
    rateperhour: "",
    weeklyperhour: "",
    benifits: "",
    salary_type: "per hour"
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

