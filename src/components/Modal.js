import { useState } from 'react';
import './Modal.css';
import http from '../helpers/http';
export default function Modal({ handleClose, job, userId }) {
    const [message, setMessage] = useState("")
    function handleReject(job) {
        if (message.trim() !== "") {
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
        }
    }
    return <>
        <div className='border p-3 bg-light shadow d-flex flex-column justify-content-around myModal-open '>
            <label className='col-form-label d-block h5 text-danger text-center'>Mention why this job was rejected</label>
            <textarea className='textarea shadow-sm' value={message} onChange={(e) => { setMessage(e.target.value) }} rows="5" placeholder='Type Here'></textarea>
            <div className='px-5 d-flex justify-content-between py-2'>
                <button className='my-button button-reject' onClick={() => handleReject(job)} >Reject</button>
                <button className='my-button button-cancel' onClick={handleClose}>Cancel</button>
            </div>
        </div>
    </>

}