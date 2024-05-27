import './CheckoutForm.css';

import { useEffect, useState } from "react";
import http from "../../helpers/http";
import { useSearchParams } from "react-router-dom";
import { plans, stripePromise } from "../../helpers/constants";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";




function CheckoutForm() {
    const [clientSecret, setClientSecret] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()
    const user_id = localStorage.getItem('user_id')
    const selectedPlan = searchParams.get("plan")
    useEffect(() => {
        if (selectedPlan) {

            const data = {
                plan: selectedPlan,
                price: plans[selectedPlan],
                user_id: user_id
            }

            http.post('/payment/create-payment-intent', data)
                .then(res => setClientSecret(res.data.clientSecret))
                .catch(err => console.log(err))
        }

    }, [])


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return <>
        <div className="body">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            )}
        </div >
    </>
}


export default CheckoutForm;