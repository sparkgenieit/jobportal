import { useEffect, useState } from "react";
import Footer from "../../layouts/company/Footer";
import Header from "../../layouts/company/Header";
import Sidebar from "../../layouts/company/Sidebar";
import http from "../../helpers/http";
import { BASE_API_URL } from "../../helpers/constants";
import { RxDownload } from "react-icons/rx";

export default function Transactions() {
    const [transactionDetails, setTransactionDetails] = useState(null)
    const userId = localStorage.getItem("user_id")

    useEffect(() => {
        http.get(`/orders/get/${userId}`)
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
                                        <tr style={{ fontSize: "14px" }} className="text-center">
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
                                                <tr key={i} style={{ fontSize: "13px" }} className="text-center small border rounded">
                                                    <td style={{ fontSize: "10px" }} className="py-3">{transaction._id}</td>
                                                    <td>{new Date(transaction.created_date).toLocaleDateString('en-GB')}</td>
                                                    <td>{transaction.description}</td>
                                                    <td>{transaction.amount ? `$ ${transaction.amount}` : "$0"}</td>
                                                    <td>{transaction.creditsPurchased ? transaction.creditsPurchased : "0"}</td>
                                                    <td>{transaction.creditsUsed}</td>
                                                    <td>{transaction.credits}</td>
                                                    <td>{transaction.invoiceNumber && transaction.invoiceNumber}</td>
                                                    <td>
                                                        {transaction.invoiceNumber &&
                                                            <a
                                                                href={`${BASE_API_URL}/invoices/${transaction.invoiceNumber}.pdf`}
                                                                download
                                                                target="_blank"
                                                            >
                                                                <RxDownload fontSize={20} />
                                                            </a>
                                                        }
                                                    </td>

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