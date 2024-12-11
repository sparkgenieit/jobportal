import { useEffect, useState } from "react";
import RejectJobMessage from "../../../components/RejectJobMessage";
import AdminJob from "./AdminJobComponent";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { useParams } from "react-router-dom";
import { tryCatch } from "../../../helpers/functions";

function SingleJobAdmin() {
    const params = useParams()
    const [jobview, setJobview] = useState()
    const userId = localStorage.getItem('user_id')
    const [show, setShow] = useState(false)
    const message = useShowMessage()

    const fetchJob = async () => {
        const { data, error } = await tryCatch(() => http.get(`/jobs/${params.id}`))
        if (data) {
            setJobview(data)
            document.title = data.jobTitle + " | " + data.company
        }
        if (error) {
            message({ status: "Error", error })
        }
    }

    useEffect(() => {
        fetchJob()
    }, [])

    function handleApprove(job) {
        const data = {
            adminId: userId,
            jobId: job._id,
            jobsDto: job
        }
        http.post("/jobs/approve", data)
            .then((response) => {
                if (response && response.status) {
                    const notification = {
                        userId: job.companyId,
                        jobId: job._id,
                        jobTitle: job.jobTitle,
                        status: "Approved",
                        isRead: false,
                        message: "",
                        createdAt: Date.now()
                    }
                    return http.post("/notifications/create", notification)
                }
            })
            .then(res => {
                fetchJob()
            })
            .catch(err => message({ status: "Error", error: err }))
    }

    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <div className="container-fluid">
                {jobview && <AdminJob jobview={jobview} handleApprove={handleApprove} setShow={setShow} />}

            </div>
            {show && <RejectJobMessage handleClose={handleClose} job={jobview} userId={userId} />}
        </>
    );
}

export default SingleJobAdmin;
