import { useEffect, useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import RejectJobMessage from "../../../components/RejectJobMessage";
import AdminJob from "./AdminJobComponent";
import http from "../../../helpers/http";
import { useParams } from "react-router-dom";

function SingleJobAdmin() {
    const params = useParams()
    const [jobview, setJobview] = useState()
    const userId = localStorage.getItem('user_id')
    const [show, setShow] = useState(false)
    useEffect(() => {
        http.get(`/jobs/${params.id}`)
            .then((response) => {
                setJobview(response.data)
            })
            .catch(err => setJobview(null))
    }, [])

    const [message, setMessage] = useState({
        showMsg: false,
        msgclassName: "",
        Msg: ""
    })


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
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            })
            .catch(err => console.log(err))
    }

    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <div className="container-fluid">
                {message.showMsg &&
                    <div className={message.msgclassName}>
                        {message.Msg}
                    </div>
                }
                {jobview && <AdminJob jobview={jobview} handleApprove={handleApprove} setShow={setShow} />}

            </div>
            {show && <RejectJobMessage handleClose={handleClose} job={jobview} userId={userId} />}
        </>
    );
}

export default SingleJobAdmin;
