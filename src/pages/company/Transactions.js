import { useEffect, useState } from "react";
import { RxDownload } from "react-icons/rx";
import { Link, useSearchParams } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

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
    const [sort, setSort] = useState("desc")
    const [currentPage, setCurrentPage] = useState(+searchParams.get('page') || 1)

    const userId = localStorage.getItem("user_id")

    useEffect(() => {
        fetchTransactionDetails(currentPage)
    }, [searchTerm, sort])

    const fetchTransactionDetails = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const res = await http.get(`/orders/get/${userId}?limit=${itemsPerPage}&skip=${skip}&searchTerm=${searchTerm}&sort=${sort}`)
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
                <div className="mt-4 bg-white">
                    <div className="d-flex align-items-center">
                        <h4 className="flex-grow-1 text-center">Transactions</h4>
                        <Link to='/company/transactions/download-transactions' className="btn btn-info rounded-4">Download</Link>
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalItems} itemsPerPage={itemsPerPage} fetchItems={fetchTransactionDetails} pageNumberToShow={2} >
                        <form>
                            <div className="my-3 input-group">
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setCurrentPage(1)
                                        window.history.replaceState(null, null, '/company/transactions')
                                        setSearchTerm(e.target.value);
                                    }}
                                    className="form-control"
                                    placeholder="Search Transaction by Invoice number, Date (dd/mm/yyyy), Amount or Description"
                                />

                            </div>
                        </form>
                        {loading && <Loader />}
                        {!loading &&
                            <div className="pt-4 w-100">
                                <table className="w-100 text-center">
                                    <thead >
                                        <tr style={{ fontSize: "14px" }}>
                                            <th>Transaction ID</th>
                                            <th className="d-flex justify-content-center">
                                                <span>Date</span>
                                                {
                                                    sort === "desc" ?
                                                        <span role="button" onClick={() => { setSort("asc") }}><BiSolidDownArrow /></span> :
                                                        <span role="button" onClick={() => { setSort("desc") }}><BiSolidUpArrow /></span>
                                                }
                                            </th>
                                            <th className="text-start">Description</th>
                                            <th className="text-end">Amount</th>
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
                                                <tr key={i} style={{ fontSize: "12px" }} className="small border rounded">
                                                    <td style={{ fontSize: "10px" }} className="py-3">{transaction._id}</td>
                                                    <td>{new Date(transaction.created_date).toLocaleDateString('en-GB')}</td>
                                                    <td className="text-start">{transaction.description}</td>
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