import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import http from "../../../helpers/http";
import RejectJobMessage from "../../../components/RejectJobMessage";
import AdminJob from "../../admin/joblist/AdminJobComponent";

export default function JobSuperAdmin() {
    const params = useParams();
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [jobview, setJobview] = useState(null)
    const [show, setShow] = useState(false)

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        http.get(`/jobs/${params.id}`)
            .then((response) => {
                setJobview(response.data)
                document.title = response.data.jobTitle + " | " + response.data.company
            })
            .catch(err => setJobview(null))
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
                        status: "Approved",
                        jobTitle: job.jobTitle,
                        isRead: false,
                        message: "",
                        createdAt: Date.now()
                    }
                    return http.post("/notifications/create", notification)
                }
            })
            .then(res => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch(err => console.log(err))
    }

    return <>
        <div className="container-fluid">

            {jobview && <AdminJob jobview={jobview} handleApprove={handleApprove} setShow={setShow} />}
        </div>


        {show && <RejectJobMessage handleClose={handleClose} job={jobview} userId={userId} />}

    </>
}