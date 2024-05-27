import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../../helpers/http";
import Loader from "../../components/Loader";

export default function PaymentStatus() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [amount, setAmount] = useState();
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(false)

    const payment_intent_id = searchParams.get('payment_intent')

    useEffect(() => {
        if (payment_intent_id) {
            http.get(`/payment/payment-intent/${payment_intent_id}`)
                .then((res) => {

                    if (res.data.status === "succeeded") {
                        setAmount(res.data.amount_received)
                        setStatus("Payment Succeeded")
                        const Jobdata = JSON.parse(localStorage.getItem("Jobdata"));
                        return http.post('/jobs/create', Jobdata) // To Post the Job
                    }
                })
                .then(response => {
                    let data = {
                        orderId: "123",
                        companyId: response.data.companyId,
                        companyName: response.data.company,
                        jobId: response.data._id,
                        jobTitle: response.data.jobTitle,
                        planName: localStorage.getItem("Plan")
                    }
                    // To place the order
                    return http.post('/orders/create', data)
                })
                .then(response => {
                    localStorage.removeItem("Plan")
                    localStorage.removeItem("Jobdata")
                    setLoading(false)
                })
                .catch((err) => {
                    setStatus(err.response ? err.response.data.message : err.message)
                })
        }
    }, [])


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
            <div><a type='button' className='btn btn-info' href='/company/JobList'>Go To Posted Jobs</a></div>

        </div>}

    </>

}