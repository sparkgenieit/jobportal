import { getCloseDate } from "../../../helpers/functions";
import http from "../../../helpers/http";
import companyService from "../../../services/common/company.service";

export const postJob = async (data, setMsg) => {
    try {
        const response = await http.post('/jobs/create', data)
        setMsg({
            show: true,
            type: "success",
            text: "Jobs Posted Successfully"
        });
    } catch (err) {
        setMsg({
            show: true,
            type: "error",
            text: err.response.data.error || err.response.data.message || err.message
        });
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

export const fetchCompanyInfo = async (user_id, setJobData, setBenefits, setTraining, setEmployerQuestions, initialValues) => {
    try {
        const response = await companyService.get(user_id)
        setJobData({ ...initialValues, company: response.data.name, companyLogo: response.data.logo });
        setBenefits({})
        setTraining("No")
        setEmployerQuestions([{ value: '' }])
    } catch (error) {
        console.log(error)
    }

}

export const fetchJobForEditing = async (id, setJobData, setBenefits, setTraining, setEmployerQuestions, isReposting = false) => {
    try {
        const response = await http.get(`/jobs/${id}`);
        isReposting ?
            setJobData({ ...response.data, creationdate: new Date(), closedate: getCloseDate(new Date().toISOString()) })
            :
            setJobData({ ...response.data, creationdate: new Date(response.data.creationdate) });
        setBenefits(JSON.parse(response.data.benifits));
        setEmployerQuestions(JSON.parse(response.data.employerquestions));
        setTraining(response.data.training);
        return response
    } catch (error) {
        console.log(error)
    }
}

export const editJob = async (jobID, data, setMsg) => {
    try {
        const response = await http.put(`/jobs/update/${jobID}`, data)
        if (response && response.status) {
            setMsg({
                show: true,
                type: "success",
                text: "Updated Successfully"
            })
        }
    } catch (err) {
        setMsg({
            show: true,
            type: "error",
            text: err.response.data.message || err.message
        })
    }
}