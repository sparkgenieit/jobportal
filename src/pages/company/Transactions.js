import { useEffect, useState } from "react";
import { RxDownload } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

import http from "../../helpers/http";
import { BASE_API_URL, itemsPerPage } from "../../helpers/constants";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";

export default function Transactions() {
    const [transactionDetails, setTransactionDetails] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(+searchParams.get('page') || 1)

    const userId = localStorage.getItem("user_id")

    useEffect(() => {
        fetchTransactionDetails(currentPage)
    }, [])

    const fetchTransactionDetails = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
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

    return (
        <>
            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <h4 className="text-center">Transactions</h4>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalItems} itemsPerPage={itemsPerPage} fetchItems={fetchTransactionDetails} pageNumberToShow={2} >
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                window.history.replaceState(null, null, '/company/transactions?page=1')
                                setCurrentPage(1)
                                fetchTransactionDetails(1);
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
                                                    <td className="text-end">{transaction.amount ? `$ ${transaction.amount}` : "$0"}</td>
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
                        }
                    </Pagination>
                </div>
            </div >
        </>
    )
}