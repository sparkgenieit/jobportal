import { useState } from 'react';
import './reject-message.css';
import http from '../helpers/http';
import { Modal } from "react-bootstrap";

export default function RejectAdMessage({ handleClose, ad, userId }) {
    const [message, setMessage] = useState("")
    const [errorClass, setErrorClass] = useState("")
    let show = true;

    function handleMessage(e) {
        setMessage(e.target.value)
        if (e.target.value == "") {
            setErrorClass("border border-red-500")
        }
        else {
            setErrorClass("")
        }
    }

    function handleReject(ad) {
        if (message.trim() !== "") {
            setErrorClass("")
            const data = {
                adminId: userId,
                adId: ad._id,
                adsDto: ad
            }
            http.post("/ads/reject", data)
                .then((response) => {
                    if (response && response.status) {
                        const notification = {
                            userId: ad.adminId,
                            adId: ad._id,
                            adTitle: ad.adTitle,
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
            setErrorClass("border border-red-500")
        }
    }
    return <>
        <div className='border p-3 bg-white shadow-sm rounded-lg'>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                    <label className='font-bold text-center'>Mention why this ad was rejected</label>
                    <div>
                        <textarea className={'textarea w-100 shadow-sm ' + errorClass} value={message} onChange={(e) => { handleMessage(e) }} rows="5" placeholder='Type Here'></textarea>
                    </div>
                    <div className='px-5 flex justify-between py-2'>
                        <button className='my-button button-reject' onClick={() => handleReject(ad)} >Reject</button>
                        <button className='my-button button-cancel' onClick={handleClose}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div >

    </>

}