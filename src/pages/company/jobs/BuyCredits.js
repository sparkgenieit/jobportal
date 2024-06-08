import { useEffect, useState } from "react";
import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import http from "../../../helpers/http";
import  {plans}  from "../../../helpers/constants";
import Pagination from '../../../components/Pagination';
import { useNavigate } from "react-router-dom";

function BuyCredits() {
    const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(1)


    const [assignJobs, setAssignJobs] = useState(null);
    console.log(plans);
    const [msg, setMsg] = useState({
        view: false,
        class: "alert alert-success",
        message: ""
    })


    const navigate = useNavigate();
    const choocePlan = (plan) => {
        localStorage.setItem("Plan", plan);

            navigate(`/checkout-page?plan=${plan}`)
           
        





    }
    return (
        <>
            <div className="container-scrollar">
                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Buy Credits</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Employer</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Buy Credits</li>
                                    </ol>
                                </nav>
                            </div>

                            <div className="row">
                            { 
                            
                            plans.map((plan, index) => {
                            return <div className="col-md-4">
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
                                <button type="button" className="btn btn-success  mt-5 p-3" onClick={() => choocePlan(plan.name)}>SELECT PACKAGE</button>
                            </div>
                        </div>
                            </div> 
                    })
                    }
                    
                </div>
                        </div>


                    </div>



                </div>
                <Footer />

            </div>
        </>
    )
}
export default BuyCredits;