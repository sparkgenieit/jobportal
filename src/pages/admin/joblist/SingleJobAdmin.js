import { useState } from "react";
import Footer from "../../../layouts/admin/Footer";
import Header from "../../../layouts/admin/Header";
import Sidebar from "../../../layouts/admin/Sidebar";
import RejectJobMessage from "../../../components/RejectJobMessage";
import AdminJob from "./AdminJobComponent";

function SingleJobAdmin({ joblist, handleApprove }) {
    const [jobview, setJobview] = useState(joblist)
    const userId = localStorage.getItem('user_id')
    const [show, setShow] = useState(false)

    const [message, setMessage] = useState({
        showMsg: false,
        msgclassName: "",
        Msg: ""
    })

    const handleClose = () => {
        setShow(false)
    }
    return (
        <>
            <div className='container-scrollar'>
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    {message.showMsg &&
                        <div className={message.msgclassName}>
                            {message.Msg}
                        </div>
                    }
                    {jobview && <AdminJob jobview={jobview} handleApprove={handleApprove} setShow={setShow} />}
                </div>
                <Footer />

            </div >
            {show && <RejectJobMessage handleClose={handleClose} job={jobview} userId={userId} />}
        </>
    );
}

export default SingleJobAdmin;
