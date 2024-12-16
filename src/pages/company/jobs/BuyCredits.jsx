import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import http from "../../../helpers/http";
import { plans } from "../../../helpers/constants";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import Loader from "../../../components/Loader";

function BuyCredits() {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState({})
    const user = useCurrentUser()
    const message = useShowMessage()

    useEffect(() => {
        document.title = "Buy Credits"
    }, [])

    const choocePlan = (plan) => {

        const user_id = user.role === "recruiter" ? user.companyId._id : user._id

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
                    message({
                        status: "Error",
                        error: { message: "Something Unexpected Occurred! Please try again" },
                    })
                })
        }
        else {
            message({
                status: "Error",
                error: { message: "Please login to buy credits" },
            })
        }
    }
    return (
        <>
            <div class="container-fluid">
                <div className="content-wrapper p-0 pt-4 bg-white">
                    <h3 class="fs-4 text-center fw-bold">Buy Credits</h3>
                    <div className="d-flex flex-wrap gap-3 w-100 pb-3">
                        {
                            plans.map((plan, index) => {
                                return <div key={index} className="flex-grow-1">
                                    <div className="card shadow">
                                        <div className="card-header text-center text-white fw-bold fs-2 bg-success py-5  text-nowrap">
                                            {plan.name}
                                        </div>
                                        <div className="card-body d-flex  flex-column justify-content-center">
                                            <div className="card bg-dark text-light text-center p-3 h3 opacity-50">${plan.price}</div>
                                            <ul className="d-flex flex-column gap-3 mt-3">
                                                <li className="text-nowrap">&#9989; Buy {plan.credits} Credits</li>
                                                <li className="text-nowrap"> &#10060; Other Text Title</li>
                                                <li className="text-nowrap"> &#10060; Text Space Goes Here</li>
                                                <li className="text-nowrap"> &#10060; Description Space </li>
                                            </ul>
                                            <button type="button" className="btn btn-success  mt-3 p-3" onClick={() => choocePlan(plan)}>SELECT PACKAGE</button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div >
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
                                    <Loader />
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