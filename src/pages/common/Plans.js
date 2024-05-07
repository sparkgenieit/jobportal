import Header from "../../layouts/common/Header";
import Footer from "../../layouts/common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Plans({ mydata }) {
    const [msg, setMsg] = useState({
        view: false,
        class: "alert alert-success",
        message: ""
    })


    const navigate = useNavigate();
    const choocePlan = (plan) => {

        if (mydata) {

            // To post the job
            axios.post('http://localhost:8080/jobs/create', mydata)
                .then(response => {
                    let data = {
                        orderId: "123",
                        companyId: response.data.companyId,
                        companyName: response.data.company,
                        jobId: response.data._id,
                        jobTitle: response.data.jobTitle,
                        planName: plan
                    }
                    // To place the order
                    axios.post('http://localhost:8080/orders/create', data)
                        .then(response => {
                            setMsg({
                                view: true,
                                message: "Order Placed Successfully",
                                class: "alert alert-success"
                            })
                            setTimeout(() => {
                                navigate('/company/JobList')
                            }, 2000);
                        })
                })
                .catch(err => setMsg({
                    view: true,
                    message: "An Error occured while placing the order",
                    class: "alert alert-danger"
                }))

            window.scrollTo({ top: 10, behavior: "smooth" });
        }
    }
    return (
        <>

            <Header />

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
                                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">$2.99</div>
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
                                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">$5.99</div>
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
                                <div className="card bg-dark text-light text-center p-3 h3 opacity-50">$10.99</div>
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


            <Footer />




        </>
    )
}
export default Plans;