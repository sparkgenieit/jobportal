import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../../helpers/http";

export default function MessagePopup({ modal, setModal, handleDelete }) {
    const [message, setMessage] = useState("")

    useEffect(() => {
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


    return (
        <Modal show={modal.show} onHide={() => setModal({ show: false })} centered>
            <Modal.Body>
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
                                <Link to={`/company/editjob/${modal.clickedJob._id}`}>
                                    <button type="button" className="btn btn-info rounded-pill">Ok</button>
                                </Link>
                                {/* <button type="button" onClick={() => setModal({ show: false })} className="btn btn-outline-danger rounded-pill">Cancel</button> */}
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


                    </>
                }

            </Modal.Body>
        </Modal >


    )

}