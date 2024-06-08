import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "../../helpers/http";
import { plans } from "../../helpers/constants";
import Loader from "../../components/Loader";

export default function PaymentStatus() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [amount, setAmount] = useState();
    const [credits,setCredits] = useState();
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(true)
    const payment_intent_id = searchParams.get('payment_intent')
   
    useEffect(() => {
        const selectedPlan = localStorage.getItem("Plan")
        const plan = plans.find((plan) => plan.name === selectedPlan);
        setCredits(plan.credits);
        if (payment_intent_id) {
            http.get(`/payment/payment-intent/${payment_intent_id}`)
                .then((res) => {

                    if (res.data.status === "succeeded") {
                        setAmount(res.data.amount_received)
                        setStatus("Payment Succeeded")
                        setLoading(false)
                    }
                })

                .catch((err) => {
                    setStatus(err.response ? err.response.data.message : err.message)
                })
        }
    }, [])

    const PostJob = async () => {
        setLoading(true)
        const Jobdata = JSON.parse(localStorage.getItem("Jobdata"));
        let data = {
            orderId: "123",
            companyId: localStorage.getItem('user_id'),
            credits:credits,
            planName: localStorage.getItem("Plan")
        }
        return http.post('/orders/create', data) // To Post the Job
            .then(response => {
                let data = {
                    orderId: "123",
                    companyId: localStorage.getItem('user_id'),
                    credits:credits,
                    planName: localStorage.getItem("Plan")
                }
                // To place the order
                
            })
            .then(response => {
                localStorage.removeItem("Plan")
                localStorage.removeItem("Jobdata")
                navigate('/company/postajob')

            })
            .catch(err => console.log(err))
    }


    const myStyles = {
        margin: "auto",
        height: "50vh",
        width: "40vw",
        marginTop: "15vh",
    }

    return <>
        {loading && <Loader />}
        {!loading && <div style={myStyles} className='d-flex justify-content-center align-items-center flex-column gap-4 border rounded p-4 shadow-lg bg-light  '>
            <h2>{status}</h2>
            <h3>Amount Paid : <span className='text-success'>{amount}</span></h3>
            <h3>Credits Purchased : <span className='text-success'>{credits}</span></h3>
            <div><a type='button' className='btn btn-info' onClick={PostJob}>Post the Job</a></div>

        </div>}

    </>

}