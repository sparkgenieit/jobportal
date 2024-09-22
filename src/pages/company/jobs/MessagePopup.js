import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../../helpers/http";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";

export default function MessagePopup({ modal, setModal, handleDelete, closeJob }) {
    const [message, setMessage] = useState("")
    const [subject, setSubject] = useState("")
    const [error, setError] = useState({})
    const user_id = localStorage.getItem('user_id')
    const showMessage = useShowMessage()
    const user = useCurrentUser()

    useEffect(() => {
        if (modal.type === "support") {
            setSubject("")
            setMessage("")
            setError({})
        }
        if (modal.type === "rejectedMessage") {
            http.get(`/notifications/get-message/${modal.clickedJob._id}`)
                .then((res => {
                    setMessage(res.data.message)
                }))
                .catch(err => {
                    setMessage("There was an error while fetching the message")
                })
        }
    }, [modal])

    const inquiryForm = (setValue, e) => {
        setValue(e.target.value)
        e.target.value.trim() === "" ? setError({ ...error, [e.target.name]: true }) : setError({ ...error, [e.target.name]: false })
    }


    const handleSubmitForInquiry = async (e) => {
        e.preventDefault();
        let errorObj = { ...error };
        if (subject.trim() === "") errorObj = ({ ...errorObj, subject: true });
        if (message.trim() === "") errorObj = ({ ...errorObj, message: true });
        setError(errorObj);

        if (!errorObj.subject && !errorObj.message) {
            try {
                // const inquiryData = {
                // subject,
                // chat: [{
                //     date: new Date(),
                //     from: modal.clickedJob.company,
                //     message,
                //     by: "Enquirer"
                // }],
                // name: modal.clickedJob.jobTitle,
                // organisation: modal.clickedJob.company,
                // jobId: modal.clickedJob._id,
                // companyId: user_id,
                // enquirer: "Job-inquiry"
                //}

                const name = user.role === "recruiter" ? `${user.name}(${user.companyId.first_name + " " + user.companyId.last_name})` : user.first_name + " " + user.last_name

                const mailData = {
                    subject: subject,
                    participants: [user._id],
                    chat: [{
                        date: new Date(),
                        from: name,
                        message: message,
                        by: "employer"
                    }],
                    readBy: [user._id],
                }
                await http.post('/mails/employer/create', mailData)
                setError({ status: "Submitted" })
                showMessage({ status: "success", message: "Support Request Sent", path: "/company/inbox" })
                setModal({ show: false })
            } catch (error) {
                setError({ status: "Failed" })
            }
        }
    }

    const getExpiryDate = (date) => {
        const expiry = new Date(date)
        expiry.setMonth(expiry.getMonth() + 1)
        return expiry.toLocaleDateString("en-GB")
    }

    return (
        <Modal show={modal.show} onHide={() => setModal({ show: false })} centered>
            <Modal.Body style={{ backgroundColor: "white" }}>


                {modal.type === "delete" &&
                    <>
                        <div className="d-flex flex-column align-items-center">
                            <div className="text-center">Are you sure you want to delete this job? This action cannot be undone.</div>
                        </div>
                        <div className="d-flex justify-content-between px-5 pt-4">
                            <button type="button" onClick={() => handleDelete(modal.clickedJob)} className="btn btn-danger rounded-pill">Yes, Delete</button>
                            <button type="button" onClick={() => setModal({ show: false })} className="btn btn-info rounded-pill">Cancel</button>
                        </div>

                    </>
                }
                {modal.type === "repost" && <>
                    {+localStorage.getItem("credits") > 0 ?
                        <>
                            <div className="d-flex flex-column align-items-center">
                                <div className="text-center fw-bold p-3">Please review all details before reposting this job.</div>

                            </div>
                            <div className="d-flex justify-content-center px-5">
                                <Link to={`/company/editjob/${modal.clickedJob._id}?repost=true`}>
                                    <button type="button" className="btn btn-info rounded-pill">Ok</button>
                                </Link>
                            </div>

                        </> :
                        <>
                            <div className="d-flex flex-column align-items-center gap-3">

                                <div>You don't have enough credits to repost the job</div>
                                <button type="button" onClick={() => setModal({ show: false })} className="btn btn-outline-info rounded-pill">Ok</button>
                            </div>

                        </>}
                </>
                }
                {
                    modal.type === "rejectedMessage" && <>
                        <p className="fw-bold">Revise: Corrections Needed for Your Job Submission</p>

                        <p>  We have reviewed your recent job submission and found that some corrections are needed before it can be processed further. The details of the required corrections are as follows:</p>

                        <p className="text-danger fw-bold">{message}</p>

                        <p>Please make the necessary adjustments at your earliest convenience. Once the corrections have been made, kindly resubmit the job for further review.</p>

                        <p>If you have any questions or need assistance with the corrections, please do not hesitate to reach out to us. We are here to help.</p>

                        <p>Thank you for your attention to this matter.</p>

                        <Link to={`/company/editjob/${modal.clickedJob._id}`}>
                            <button type="button" className="btn btn-info rounded-4">Edit Job</button>
                        </Link>


                    </>
                }
                {
                    modal.type === "close" &&
                    <div className="py-3 px-1">
                        <h4>Premature Job Closure</h4>

                        <p>You are attempting to close a job that is still active and has not yet reached its expiry date of <strong>{getExpiryDate(modal.clickedJob.creationdate)}</strong>. Please note that closing the job now will result in the forfeiture of any remaining advertising period. Additionally, please be aware that no credit or refund will be issued for the unused portion of the job posting period.</p>

                        <p>If you are certain you wish to proceed with closing the job early, please confirm. Otherwise, consider allowing the job to run its full course to maximize your recruitment efforts.</p>

                        <div className="d-flex gap-5 pt-3 justify-content-end">
                            <button type="button" onClick={() => closeJob(modal.clickedJob)} className="btn btn-danger rounded-pill">Close</button>
                            <button type="button" onClick={() => setModal({ show: false })} className="btn btn-outline-dark rounded-pill">Cancel</button>
                        </div>
                    </div>
                }
                {
                    modal.type === "support" &&
                    <div className="py-3 px-1">
                        <h4>Inquiry - Support Request</h4>
                        <form onSubmit={handleSubmitForInquiry}>
                            <div className="pt-3 d-flex flex-column justify-content-between gap-3 ">
                                <div>
                                    Job Title: {modal.clickedJob.jobTitle}
                                </div>
                                <div>
                                    Job ID : {modal.clickedJob._id}
                                </div>

                                {modal.clickedJob.employjobreference &&
                                    <div>
                                        Job Reference : {modal.clickedJob.employjobreference}
                                    </div>
                                }

                                <div className="d-flex gap-3 align-items-center">
                                    <span>Subject:</span>
                                    <div className="w-100">
                                        <input
                                            type="text"
                                            name="subject"
                                            className={`w-100 rounded  p-2 ${error.subject ? "border-danger" : "border-light-subtle"}`}
                                            value={subject}
                                            onChange={(e) => inquiryForm(setSubject, e)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div>Message</div>
                                    <textarea
                                        className={`w-100 rounded  p-2 ${error.message ? "border-danger" : "border-light-subtle"}`}
                                        rows={4}
                                        name="message"
                                        value={message}
                                        onChange={(e) => inquiryForm(setMessage, e)}
                                    >
                                    </textarea>
                                </div>

                                <div className="text-center">
                                    {error.status === "Submitted" && <span className="text-success"><em>We will contact you soon regarding your job inquiry.</em></span>}
                                    {error.status === "Failed" && <span className="text-danger"><em>Failed to submit the inquiry.</em></span>}
                                </div>

                                <div>
                                    <button
                                        className="w-100 btn btn-success " type="submit">
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                }
            </Modal.Body>
        </Modal >
    )
}