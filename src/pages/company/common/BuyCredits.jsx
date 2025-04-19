import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import http from "../../../helpers/http";
import { plans } from "../../../helpers/constants";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import Loader from "../../../components/Loader";

const PlanCard = ({ plan, onSelect }) => {
    const [selectedDays, setSelectedDays] = useState(1);

    const handleDaysChange = (e) => {
        const days = Math.max(1, Number(event.target.value)); // Ensure at least 1 day
        
        setSelectedDays(days);
        
    };

    return (
        <div className="flex-grow-1">
            <div className="card shadow">
                <div
                    className="card-header text-center text-white fw-bold bg-success py-5 text-nowrap"
                    style={{
                        fontSize: `clamp(1rem, ${Math.max(2 - plan.name.length * 0.05, 1)}rem, 2rem)`
                    }}
                >
                    {plan.name}
                </div>
                <div className="card-body d-flex flex-column justify-content-center">
                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">
                        ${plan.perDayAd ? (selectedDays * plan.price).toFixed(2) : plan.price}
                    </div>
                    <ul className="d-flex flex-column gap-3 mt-3">
                        {plan.perDayAd ? (
                            <li className="text-nowrap">
                                📅 Select No. of Days:
                                <select 
                                    value={selectedDays} 
                                    onChange={handleDaysChange} 
                                    className="form-select mt-2"
                                >
                                    {[...Array(30).keys()].map(day => (
                                        <option key={day + 1} value={day + 1}>
                                            {day + 1} Days
                                        </option>
                                    ))}
                                </select>
                            </li>
                        ) : (
                            plan.credits > 0 && <li className="text-nowrap">✅ Buy {plan.credits} Credits</li>
                        )}
                        <li className="text-nowrap">❌ Other Text Title</li>
                        <li className="text-nowrap">❌ Text Space Goes Here</li>
                        <li className="text-nowrap">❌ Description Space</li>
                    </ul>
                    <button 
                        type="button" 
                        className="btn btn-success mt-3 p-3" 
                        onClick={() => onSelect(plan, selectedDays)}
                    >
                        SELECT PACKAGE
                    </button>
                </div>
            </div>
        </div>
    );
};


const PaymentModal = ({ show, onHide, loading, paymentDetails }) => (
    <Modal size='sm' show={show} onHide={onHide} centered>
        <Modal.Header>
            <Modal.Title>
                <div className='d-flex justify-content-center'>
                    <h2>Payment Details</h2>
                </div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{ height: "250px" }}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Loader />
                    </div>
                ) : (
                    <div className="d-flex h-100 flex-column justify-content-between px-3">
                        <div className='d-flex justify-content-between'><span>Plan</span><span className='fw-bold'>{paymentDetails.plan}</span></div>
                        <div className='d-flex justify-content-between'><span>Price</span><span>$ {paymentDetails.price}</span></div>
                        <div className='d-flex justify-content-between'><span>Gst @15%</span><span>$ {paymentDetails.gst}</span></div>
                        <div style={{ height: "2px" }} className='bg-secondary rounded'></div>
                        <div className='d-flex justify-content-between'><span>Total</span><span className='fw-bold'>$ {paymentDetails.total}</span></div>
                        <div className="d-flex justify-content-between">
                            <button type="button" onClick={onHide} className="btn btn-sm py-3 px-4 btn-outline-dark rounded-pill">Cancel</button>
                            <a type="button" href={paymentDetails.url} className="btn btn-sm py-3 px-4 btn-info rounded-pill">Proceed</a>
                        </div>
                    </div>
                )}
            </div>
        </Modal.Body>
    </Modal>
);

function BuyCredits({ type }) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({});
    const user = useCurrentUser();
    const message = useShowMessage();

    useEffect(() => {
        document.title = `Buy ${type} Credits`;
    }, []);

    const choosePlan = (plan, selectedDays = 0) => {
        if(!plan.perDayAd){
            selectedDays = 0
        }
        const user_id = user.role === "recruiter" ? user.companyId._id : user._id;

        if (user_id) {
            setShow(true);
            setLoading(true);
            const price = (selectedDays)?plan.price * selectedDays:plan.price;
            const credits = (selectedDays)?0:plan.credits;

            const creditType = selectedDays > 0
            ? plan.name.replace(/\s+/g, "_").toLowerCase() // Convert to lowercase and replace spaces
            : type.toLowerCase();

            http.post("/payment/make-payment", {
                plan: plan.name,
                credits: credits, // Use selectedDays if perDayAd exists
                selected_days:selectedDays,
                price: price,
                user_id,
                creditType,
            })
                .then((res) => {
                    localStorage.setItem("placedOrder", "false");
                    setPaymentDetails({
                        url: res.data.url,
                        plan: res.data.metadata.plan,
                        price: +res.data.metadata.price / 100,
                        selected_days:+selectedDays,
                        gst: +res.data.metadata.gst / 100,
                        total: +res.data.metadata.total / 100,
                    });
                    setLoading(false);
                })
                .catch(() => {
                    message({
                        status: "Error",
                        error: { message: "Something Unexpected Occurred! Please try again" },
                    });
                });
        } else {
            message({
                status: "Error",
                error: { message: "Please login to buy credits" },
            });
        }
    };

    // Separate plans into two groups
    const creditPlans = plans[type].filter((plan) => !plan.perDayAd);
    const perDayPlans = plans[type].filter((plan) => plan.perDayAd);

    return (
        <div className="container-fluid">
            <div className="content-wrapper p-0 pt-4 bg-white">
                <h3 className="fs-4 text-center fw-bold">Buy Credits</h3>
                
                {/* First Row: Regular Credit Plans */}
                {creditPlans.length > 0 && (
                    <div className="d-flex flex-wrap gap-3 w-100 pb-3">
                        {creditPlans.slice(0, 6).map((plan, index) => (
                            <div key={index} style={{ width: "23%" }}>
                                <PlanCard plan={plan} onSelect={choosePlan} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Second Row: Plans with perDayAd */}
                {perDayPlans.length > 0 && (
                    <>
                        <div className="d-flex flex-wrap gap-3 w-100 pb-3">
                            {perDayPlans.slice(0, 6).map((plan, index) => (
                                <div key={index} style={{ width: "23%" }}>
                                    <PlanCard plan={plan} onSelect={choosePlan} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <PaymentModal show={show} onHide={() => setShow(false)} loading={loading} paymentDetails={paymentDetails} />
        </div>
    );
}

export default BuyCredits;
