import { useEffect, useState } from "react";
import Footer from "../../layouts/company/Footer";
import Header from "../../layouts/company/Header";
import Sidebar from "../../layouts/company/Sidebar";
import http from "../../helpers/http";
import { BASE_API_URL, itemsPerPage } from "../../helpers/constants";
import { RxDownload } from "react-icons/rx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Transactions() {
    const [transactionDetails, setTransactionDetails] = useState(null)
    const userId = localStorage.getItem("user_id")
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const navigate = useNavigate()

    useEffect(() => {
        fetchTransactionDetails()
    }, [pgNumber])

    const fetchTransactionDetails = async () => {
        setLoading(true)
        const skip = (pgNumber - 1) * itemsPerPage
        try {
            const res = await http.get(`/orders/get/${userId}?limit=${itemsPerPage}&skip=${skip}&searchTerm=${searchTerm}`)
            setTransactionDetails(res.data.details)
            setTotalItems(res.data.total)
            setLoading(false)

        } catch (error) {
            setTransactionDetails([])
            setTotalItems(0)
            setLoading(false)
        }
    }

    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        navigate(`/company/transactions?page=${pageNumber}`)
    }

    return (
        <>

            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <h4 className="text-center">Transactions</h4>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            fetchTransactionDetails();
                        }}
                    >
                        <div className="my-3 input-group">
                            <input type="search" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} className="form-control" placeholder="Search Transaction by Invoice number, Date (dd/mm/yyyy), Amount" />
                            <button type="submit" className="btn border-0 btn-outline-secondary"><FaMagnifyingGlass fontSize={20} fill="black" /></button>
                        </div>
                    </form>
                    {loading && <Loader />}
                    {!loading &&
                        <div className="pt-4 w-100">
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
                                            <tr key={i} style={{ fontSize: "12px" }} className="text-center small border rounded">
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

                            <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />

                        </div>
                    }

                </div>
            </div>



        </>
    )
}