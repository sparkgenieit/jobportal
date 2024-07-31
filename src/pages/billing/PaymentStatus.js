import { useEffect, useState } from "react";
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "../../helpers/http";

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
        if (session_id && success === "true") {
            http.get(`/payment/session-complete/${session_id}`)
                .then((res) => {
                    if (res.data.status === "complete") {
                        setAmount(res.data.metadata.total)
                        setStatus("Payment Completed")
                        setCredits(res.data.metadata.credits);
                        setLoading(false)
                        // if (localStorage.getItem("placedOrder") === "false") {
                        //     let data = {
                        //         orderId: session_id,
                        //         companyId: localStorage.getItem('user_id'),
                        //         credits: res.data.metadata.credits,
                        //         planName: res.data.metadata.plan
                        //     }
                        //     console.log('Order', data);
                        //     http.post('/orders/create', data) // To Post the Job
                        //         .then((response) => {
                        //             console.log(response);
                        //             const credits = parseInt(localStorage.getItem('credits'));
                        //             localStorage.setItem('credits', credits + +res.data.metadata.credits);
                        //             localStorage.removeItem('placedOrder');
                        //             setLoading(false)
                        //         })
                        //         .catch(err => setLoading(false))
                        // }
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    setStatus("Unable to verify the payment status")
                })
        }
        if (success === "false") {
            setLoading(false)
            setStatus("Payment was Interrupted")
        }

    }, [])

    const PostJob = async () => {
        navigate('/company')
        /* let data = {
             orderId: "123",
             companyId: localStorage.getItem('user_id'),
             credits:credits,
             planName: localStorage.getItem("Plan")
         }
         console.log('Order',data);
         return http.post('/orders/create', data) // To Post the Job
             .then(response => {
                 console.log(response);
                 localStorage.removeItem("Plan")
                 localStorage.removeItem("Jobdata")
                 http.put(`/companies/profile/update/${localStorage.getItem('user_id')}`, {'credits':credits});
                 navigate('/company/postajob')
 
             })
             .catch(err => console.log(err)) */
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
            <div>Please wait, do not refresh the page...</div>

        </div>
        }
    </>

}