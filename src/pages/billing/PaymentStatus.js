import { useEffect, useState } from "react";
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "../../helpers/http";
import { getCredits } from "../../helpers/functions";
import Loader from "../../components/Loader";

export default function PaymentStatus() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [amount, setAmount] = useState(0);
    const [credits, setCredits] = useState(0);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true)
    const session_id = searchParams.get('session_id')
    const success = searchParams.get('success')

    useEffect(() => {
        fetchPaymentStatus();
    }, [])

    const fetchPaymentStatus = async () => {
        if (session_id && success === "true") {
            try {
                const res = await http.get(`/payment/session-complete/${session_id}`)
                if (res.data.status === "complete") {
                    setAmount(res.data.metadata.total)
                    setStatus("Payment Completed")
                    setCredits(res.data.metadata.credits);
                    setLoading(false)
                }
                await getCredits()
            } catch (error) {
                setLoading(false)
                setStatus("Unable to verify the payment status")
            }
        }
        if (success === "false") {
            setLoading(false)
            setStatus("Payment was Interrupted")
        }
    }



    const PostJob = async () => {
        navigate('/company')
    }
    const myStyles = {
        margin: "auto",
        height: "50vh",
        width: "40vw",
        marginTop: "15vh",
    }

    return <>
        {!loading &&
            <div style={myStyles} className='d-flex justify-content-center align-items-center flex-column gap-4 border rounded p-4 shadow-lg bg-light  '>
                {success === "true" ?
                    <>
                        <h2 className="text-success">{status}</h2>
                        <h3>Amount Paid : <span className='text-success'>${amount / 100}</span></h3>
                        <h3>Credits Purchased : <span className='text-success'>{credits}</span></h3>
                        <div><a type='button' className='btn btn-info' onClick={PostJob}>Go Back</a></div>
                    </> :
                    <>
                        <h2 className="text-danger">{status}</h2>
                        <div><a type='button' className='btn btn-info' onClick={PostJob}>Go Back</a></div>
                    </>
                }

            </div>}



        {loading && <div style={{ height: "90vh" }} className=" d-flex justify-content-center align-items-center gap-3">

            <Loader />
            <div>Please wait, do not refresh the page...</div>

        </div>
        }
    </>

}