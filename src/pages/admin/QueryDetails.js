import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import http from "../../helpers/http";

const myStyle = {
    backgroundColor: 'white'
}

export default function QueryDetails({ modal, setModal, fetchQueries, pgNumber }) {
    const [reply, setReply] = useState("")
    const [error, setError] = useState(false)

    async function sendReply(e) {
        e.preventDefault();
        if (reply.trim() === "") {
            setError(true)
            return
        } else {
            setError(false)
            try {
                const data = {
                    date: new Date(),
                    from: "Admin",
                    message: reply,
                    by: "Admin"
                }
                const response = await http.patch(`/contact/query/reply/${modal.clickedQuery._id}`, data)
                setModal({ ...modal, status: "posted" })
                fetchQueries(pgNumber)
                setTimeout(() => {
                    setModal({ show: false })
                }, 1200);
            } catch (error) {
                console.log(error)
                setModal({ ...modal, status: 'failed' })
            }
        }
    }
    return (
        <Modal
            show={modal.show}
            onHide={() => {
                setError(false);
                setReply("");
                setModal({ show: false })
            }}
            centered
        >
            <Modal.Header style={myStyle} closeButton>
                <Modal.Title>Inquiry Details</Modal.Title>
            </Modal.Header>
            <form onSubmit={sendReply}>

                <Modal.Body style={myStyle}>
                    <div>
                        <div className="row">
                            <p className="col-3">Name:</p>
                            <p className="col-9">{modal.clickedQuery?.name}</p>
                        </div>
                        {modal.clickedQuery?.enquirer === "Job-inquiry" ?
                            <div className="row">
                                <p className="col-3">Job Id:</p>
                                <p className="col-9">{modal.clickedQuery?.jobId}</p>
                            </div>
                            :
                            <div className="row">
                                <p className="col-3">Email:</p>
                                <p className="col-9">{modal.clickedQuery?.email}</p>
                            </div>
                        }

                        {modal.clickedQuery?.enquirer === "Visitor" ?
                            <div className="row">
                                <p className="col-3">Phone:</p>
                                <p className="col-9">{modal.clickedQuery?.phone}</p>
                            </div> :
                            null
                        }

                        <div className="row">
                            <p className="col-3">Organisation:</p>
                            <p className="col-9">{modal.clickedQuery?.organisation}</p>
                        </div>
                        <div className="row">
                            <p className="col-3">Subject:</p>
                            <p className="col-9">{modal.clickedQuery?.subject}</p>
                        </div>

                        <div className="row">
                            <p className="col-3">Message:</p>
                            <p className="col-9">{modal.clickedQuery?.message}</p>
                        </div>


                        {modal.clickedQuery?.enquirer !== "Visitor" &&
                            <div className="">
                                {
                                    modal.clickedQuery?.reply ?
                                        <div className='row'>
                                            <p className='col-3'>Reply:</p>
                                            <p className='col-9'>
                                                {modal.clickedQuery?.reply}
                                            </p>
                                        </div>
                                        :
                                        <>
                                            <p className="">Reply:</p>
                                            <textarea
                                                className={`w-100  p-2 ${error ? "border border-danger" : "border-0"}  rounded shadow `}
                                                rows={4}
                                                value={reply}
                                                onChange={(e) => { setReply(e.target.value) }}
                                                placeholder='Type your reply here...'
                                            >
                                            </textarea>
                                        </>
                                }
                            </div>
                        }

                    </div>
                </Modal.Body>

                {modal.clickedQuery?.enquirer !== "Visitor" &&
                    <Modal.Footer style={myStyle} className='d-flex justify-content-between' >
                        <div>
                            {modal.status === "failed" && <span className='text-danger'><em>Unable to post the reply</em></span>}
                            {modal.status === "posted" && <span className='text-success'><em>Reply posted</em></span>}
                        </div>
                        {modal.clickedQuery?.reply ?
                            <span className="badge p-3 fs-6 rounded-pill text-bg-success">Replied</span>
                            :
                            <div>
                                <button type='submit' className='btn btn-primary rounded-pill'>Send</button>
                            </div>
                        }

                    </Modal.Footer>
                }
            </form>
        </Modal >

    )
}