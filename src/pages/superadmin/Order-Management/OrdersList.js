import Header from "../../../layouts/superadmin/Header";
import Footer from "../../../layouts/superadmin/Footer";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import { useEffect, useState } from "react";
import http from '../../../helpers/http'

function OrdersList() {

    const [orders, setOrders] = useState(null)

    useEffect(() => {
        http.get('/orders/all')
            .then((res) => setOrders(res.data))
    }, [])


    return (
        <>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">Orders List</h3>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="#">Super Admin</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Orders</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="card-body bg-white my-5">
                                <div className="row p-4">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Company Name</th>
                                                <th>Job Title</th>
                                                <th>Plan Name</th>

                                                <th>Payment Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders && orders.map((order, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.companyName}</td>
                                                        <td>{order.jobTitle} ({order.jobId})</td>
                                                        <td>{order.planName}</td>
                                                        <td>{order.paymentStatus}</td>
                                                        <td><button type="button" className="btn btn-sm btn-gradient-primary">View Invoice</button></td>
                                                    </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}
export default OrdersList;