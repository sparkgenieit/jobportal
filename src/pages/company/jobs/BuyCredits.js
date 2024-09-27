import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Modal } from "react-bootstrap";

import http from "../../../helpers/http";
import { plans } from "../../../helpers/constants";
import Toaster from "../../../components/Toaster";

function BuyCredits() {
    const [user_id, setUser_id] = useState(localStorage.getItem('user_id'));
    const [message, setMessage] = useState({})
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState({})

    const choocePlan = (plan) => {
        if (user_id) {
            setShow(true)
            setLoading(true)
            const data = {
                plan: plan.name,
                credits: plan.credits,
                price: plan.price,
                user_id
            }
            http.post('/payment/make-payment', data)
                .then(res => {
                    localStorage.setItem("placedOrder", "false")
                    setPaymentDetails({
                        url: res.data.url,
                        plan: res.data.metadata.plan,
                        price: +res.data.metadata.price / 100,
                        gst: +res.data.metadata.gst / 100,
                        total: +res.data.metadata.total / 100
                    })
                    setLoading(false)
                })
                .catch(err => {
                    setMessage({
                        show: true,
                        type: "error",
                        text: "An Error occured, Please try again"
                    })
                })
        }
        else {
            setMessage({
                show: true,
                type: "error",
                text: "Please login to buy credits"
            }
            )
        }
    }
    return (
        <>

            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <div class="page-header">
                        <h3 class="page-title">Buy Credits</h3>
                    </div>

                    <div className="row">
                        {
                            plans.map((plan, index) => {
                                return <div key={index} className="col-md-4">
                                    <div className="card shadow">
                                        <div className="card-header text-center text-white display-6 bg-success p-5">
                                            {plan.name}
                                        </div>
                                        <div className="card-body d-flex  flex-column justify-content-center">
                                            <div className="card bg-dark text-light text-center p-3 h3 opacity-50">${plan.price}</div>
                                            <ul className="list-group list-group-flush mt-3">
                                                <li className="list-group-item">&#9989; Buy {plan.credits} Credits</li>
                                                <li className="list-group-item"> &#10060; Other Text Title</li>
                                                <li className="list-group-item"> &#10060; Text Space Goes Here</li>
                                                <li className="list-group-item"> &#10060; Description Space </li>

                                            </ul>
                                            <button type="button" className="btn btn-success  mt-5 p-3" onClick={() => choocePlan(plan)}>SELECT PACKAGE</button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div >

            <Toaster
                setMessage={setMessage}
                message={message}
            />

            <Modal
                size='sm'
                show={show}
                onHide={() => setShow(false)}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className='d-flex justify-content-center'>
                            <h2>Payment Details</h2>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ height: "250px", }} >
                        {
                            loading ?
                                <div className="d-flex justify-content-center align-items-center h-100">
                                    <RotatingLines
                                        visible={loading}
                                        height="96"
                                        width="96"
                                        color="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div> :
                                <div className="d-flex h-100 flex-column justify-content-between px-3">

                                    <div className='d-flex justify-content-between'>
                                        <span>Plan</span>
                                        <span className='fw-bold'>{paymentDetails.plan}</span>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <span>Price</span>
                                        <span>$ {paymentDetails.price}</span>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <span>Gst @15%
                                        </span>
                                        <span>$ {paymentDetails.gst}</span>
                                    </div>

                                    <div style={{ height: "2px" }} className='bg-secondary rounded'></div>
                                    <div className='d-flex justify-content-between'>
                                        <span>Total</span>
                                        <span className='fw-bold'>$ {paymentDetails.total}</span>
                                    </div>


                                    <div className="d-flex justify-content-between">
                                        <a type="button" onClick={() => { setShow(false) }} className="btn btn-sm py-3 px-4 btn-outline-dark rounded-pill">Cancel</a>
                                        <a type="button" href={paymentDetails.url} className="btn btn-sm py-3 px-4 btn-info rounded-pill">Proceed</a>
                                    </div>

                                </div>
                        }
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
export default BuyCredits;