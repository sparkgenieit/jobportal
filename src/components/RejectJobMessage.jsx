import { useState } from 'react';
import './reject-message.css';
import http from '../helpers/http';
import { Modal } from "react-bootstrap";

export default function RejectJobMessage({ handleClose, job, userId }) {
    const [message, setMessage] = useState("")
    const [errorClass, setErrorClass] = useState("")
    let show = true;

    function handleMessage(e) {
        setMessage(e.target.value)
        if (e.target.value == "") {
            setErrorClass("border border-danger")
        }
        else {
            setErrorClass("")
        }
    }

    function handleReject(job) {
        if (message.trim() !== "") {
            setErrorClass("")
            const data = {
                adminId: userId,
                jobId: job._id,
                jobsDto: job
            }
            http.post("/jobs/reject", data)
                .then((response) => {
                    if (response && response.status) {
                        const notification = {
                            userId: job.companyId,
                            jobId: job._id,
                            jobTitle: job.jobTitle,
                            status: "Rejected",
                            isRead: false,
                            message: message,
                            createdAt: Date.now()
                        }
                        return http.post("/notifications/create", notification)
                    }
                })
                .then(res => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 500)
                })
                .catch(err => console.log(err))
        } else {
            setErrorClass("border border-danger")
        }
    }
    return <>
        <div className='border p-3 bg-light shadow rounded'>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <label className='col-form-label d-block h5 text-danger text-center'>Mention why this job was rejected</label>
                    <div>
                        <textarea className={'textarea w-100 shadow-sm ' + errorClass} value={message} onChange={(e) => { handleMessage(e) }} rows="5" placeholder='Type Here'></textarea>
                    </div>
                    <div className='px-5 d-flex justify-content-between py-2'>
                        <button className='my-button button-reject' onClick={() => handleReject(job)} >Reject</button>
                        <button className='my-button button-cancel' onClick={handleClose}>Cancel</button>
                    </div>

                </Modal.Body>
            </Modal>
        </div >

    </>

}