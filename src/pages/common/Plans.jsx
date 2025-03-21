import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { plans } from "../../helpers/constants";

function Plans() {
    const [msg, setMsg] = useState({
        view: false,
        class: "alert alert-success",
        message: ""
    })


    const navigate = useNavigate();
    const choocePlan = (plan) => {


        navigate(`/checkout-page?plan=${plan}`)
        localStorage.setItem("Plan", plan);

        // const data = {
        //     plan: plan,
        //     price: price
        // }

        // http.post('/stripe/create-checkout-session', data)
        //     .then(res => window.location.href = res.data.url)
        //     .catch(err => console.log(err.message))

        // if (mydata) {

        //     // To post the job
        //     axios.post('http://localhost:8080/jobs/create', mydata)
        //         .then(response => {
        //             let data = {
        //                 orderId: "123",
        //                 companyId: response.data.companyId,
        //                 companyName: response.data.company,
        //                 jobId: response.data._id,
        //                 jobTitle: response.data.jobTitle,
        //                 planName: plan
        //             }
        //             // To place the order
        //             return axios.post('http://localhost:8080/orders/create', data)
        //         })
        //         .then(response => {
        //             setMsg({
        //                 view: true,
        //                 message: "Order Placed Successfully",
        //                 class: "alert alert-success"
        //             })
        //             setTimeout(() => {
        //                 navigate('/company/jobs')
        //             }, 2000);
        //         })
        //         .catch(err => setMsg({
        //             view: true,
        //             message: "An Error occured while placing the order",
        //             class: "alert alert-danger"
        //         }))

        //     window.scrollTo({ top: 10, behavior: "smooth" });
        // }
    }
    return (
        <>


            <div className="container p-3">
                {msg.view && <div className={msg.class}>
                    {msg.message}
                </div>}
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-header text-center text-white display-6 bg-success p-5">
                                Basic
                            </div>
                            <div className="card-body d-flex  flex-column justify-content-center">
                                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">${plans.Basic}</div>
                                <ul className="list-group list-group-flush mt-3">
                                    <li className="list-group-item">&#9989; Sample Text Here</li>
                                    <li className="list-group-item"> &#10060; Other Text Title</li>
                                    <li className="list-group-item"> &#10060; Text Space Goes Here</li>
                                    <li className="list-group-item"> &#10060; Description Space </li>

                                </ul>
                                <button type="button" className="btn btn-success  mt-5 p-3" onClick={() => choocePlan("Basic")}>SELECT PACKAGE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-header text-center text-white bg-primary display-6  p-5">
                                Standard
                            </div>
                            <div className="card-body d-flex  flex-column justify-content-center ">
                                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">${plans.Standard}</div>
                                <ul className="list-group list-group-flush mt-3">
                                    <li className="list-group-item">&#9989; Sample Text Here</li>
                                    <li className="list-group-item"> &#9989; Other Text Title</li>
                                    <li className="list-group-item"> &#9989; Text Space Goes Here</li>
                                    <li className="list-group-item"> &#10060; Description Space </li>
                                </ul>
                                <button type="button" className="btn btn-primary mt-5 p-3" onClick={() => choocePlan("Standard")}>SELECT PACKAGE</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-header text-center text-white display-6 bg-warning p-5">
                                Premium
                            </div>
                            <div className="card-body d-flex  flex-column justify-content-center">
                                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">${plans.Premium}</div>
                                <ul className="list-group list-group-flush mt-3">
                                    <li className="list-group-item">&#9989; Sample Text Here</li>
                                    <li className="list-group-item"> &#9989; Other Text Title</li>
                                    <li className="list-group-item"> &#9989; Text Space Goes Here   </li>
                                    <li className="list-group-item"> &#9989; Description Space </li>
                                </ul>
                                <button type="button" className="btn btn-warning mt-5 p-3" onClick={() => choocePlan("Premium")}>SELECT PACKAGE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Plans;