import { useEffect, useState } from "react";
import Footer from "../../layouts/company/Footer";
import Header from "../../layouts/company/Header";
import Sidebar from "../../layouts/company/Sidebar";
import http from "../../helpers/http";

export default function Transactions() {

    const [transactionDetails, setTransactionDetails] = useState(null)
    useEffect(() => {
        http.get('/orders/all')
            .then(res => {
                setTransactionDetails(res.data)
            })
            .catch(err => {
                setTransactionDetails([])
            })

    }, [])

    return (
        <>
            <div className="container-scroller">

                <Header />
                <div class="container-fluid page-body-wrapper">

                    <Sidebar />
                    <div class="container-fluid">
                        <div className="content-wrapper bg-white">
                            <h4 className="text-center">Transactions</h4>
                            <div className="my-3">
                                <input type="search" className="form-control" placeholder="Search Transaction by Invoice number, Date, Amount" />
                            </div>

                            <div className="pt-4">
                                <table className="w-100">
                                    <thead >
                                        <tr className="text-center">
                                            <th>Transaction ID</th>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Credits Purchased</th>
                                            <th>Credits Used</th>
                                            <th>Remaining Credits</th>
                                            <th>Invoice Number</th>
                                            <th>Invoice </th>
                                        </tr>
                                    </thead>

                                    <tbody className="border border-secondary ">
                                        {transactionDetails?.map((transaction, i) => {
                                            return (
                                                <tr style={{ fontSize: "10px" }} className="text-center small border rounded">
                                                    <td className="py-3">{transaction._id}</td>
                                                    <td>{new Date(transaction.created_date).toLocaleDateString('en-GB')}</td>
                                                    <td>{transaction.paymentStatus}</td>
                                                    <td>{transaction.amount}</td>
                                                    <td>{transaction.credits}</td>
                                                    <td>{transaction.creditsUsed}</td>
                                                    <td>{transaction.credits}</td>
                                                    <td>{transaction.invoiceNumber}</td>
                                                    <td>{transaction.invoice}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                            </div>




                        </div>
                    </div>

                </div >
                <Footer />


            </div >

        </>
    )
}