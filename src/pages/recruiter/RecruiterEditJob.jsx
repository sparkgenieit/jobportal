import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import { setCurrentJob } from '../../helpers/slices/generalSlice';
import PostjobForm from '../../components/company/PostJobForm';
import { companyUrls } from '../../services/common/urls/companyUrls.service';
import http from '../../helpers/http';
import { fetchJobForEditing } from '../../services/company/postAndEditJob.service';
import { fetchUser } from '../../helpers/slices/userSlice';


export default function RecruiterEditJob() {
    const [jobData, setJobData] = useState(null)
    // const [employerquestions, setEmployerQuestions] = useState([{ value: "" }])
    const params = useParams()
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const user = useCurrentUser()
    const message = useShowMessage()

    useEffect(() => {
        document.title = "Edit Job"

        fetchJobForEditing(params.id, setJobData, searchParams.get("repost") === "true" ? true : false)
            .then(data => {
                if (data.other_benefits) setShowOthersBenefits(true)
            })

    }, [])

    const handleClone = () => {
        dispatch(setCurrentJob({ ...jobData }))
        const url = companyUrls.getUrl(companyUrls.postJob) + '?c=' + jobData._id
        message({ path: url })
        window.scrollTo({ top: 20, behavior: "smooth" })
    }

    const submitJob = async (data) => {
        data.employer = user.name
        data.companyId = user.companyId._id
        data.posted_by = user._id
        try {
            const response = await http.put(`/jobs/update/${params.id}`, data)
            if (response && response.status) {
                message({
                    status: "Success",
                    message: "Updated Successfully",
                    path: companyUrls.getUrl(companyUrls.postedJobs)
                })
            }
        } catch (err) {
            message({
                status: "error",
                error: err,
            })
        }

        dispatch(fetchUser()) //To Update Credits
        window.scrollTo({ top: 40, behavior: "smooth" })
    }

    return (
        <div className="container-fluid">
            <div className="content-wrapper bg-white">
                <h3 className="fs-4 fw-bold text-center"> Edit Job </h3>
                <div className="row">
                    <div className=" bg-white">
                        {jobData && <PostjobForm initialValues={jobData} onFormSubmit={submitJob} showButton={true} btnOnClick={handleClone} btnText={"Duplicate Job"} />}
                    </div>
                </div>
            </div >
        </div >
    )
}