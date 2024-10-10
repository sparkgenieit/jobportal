import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

import http from "../../helpers/http";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";
import { tableToCSV } from "../../helpers/functions/csvFunctions";

export default function DownloadTransactions() {
    const user = useCurrentUser()
    const user_id = user.role === 'recruiter' ? user.companyId._id : user._id
    const [transactionDetails, setTransactionDetails] = useState([])
    const [downloading, setDownloading] = useState(false)
    const [error, setError] = useState("")
    const [toDate, setToDate] = useState("")
    const [fromDate, setFromDate] = useState("")
    const tableRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchTransactions()
    }, [])

    const getTransactionsByDate = async () => {
        setDownloading(true)
        if (!fromDate) {
            setError('From date is required')
            setDownloading(false)
            return
        }
        if (!toDate) {
            setError('To date is required')
            setDownloading(false)
            return
        }

        if (fromDate > toDate) {
            setError('From date cannot be more than to date')
            setDownloading(false)
            return
        }
        setError("")
        await fetchTransactions()
        setDownloading(false)
    }

    const goBack = () => {
        navigate(-1)
    }

    const fetchTransactions = async () => {
        try {
            const response = await http.get(`/orders/download-transactions/${user_id}?from=${fromDate}&to=${toDate}`)
            setTransactionDetails(response.data)
        } catch (error) {
            setTransactionDetails([])
        }
    }

    return (
        <div className="container-fluid mt-3">
            <button onClick={goBack} type="button" className="btn p-2 btn-dark btn-xs rounded-circle ">
                <IoMdArrowBack fontSize={16} />
            </button>
            <div className="d-flex flex-column align-items-center justify-content-center gap-4">
                <div>
                    <h2 className=" flex grow-1 fw-bold fs-3 text-center">Download Transactions</h2>
                    <span className="text-secondary small"><em>Select a date range, then click "Apply" or "Download" to export all transactions.</em></span>
                </div>

                <form className="d-flex gap-5">
                    <div className="d-flex gap-3 input-group align-items-center">
                        <label className="fw-bold">From date</label>
                        <input
                            value={fromDate}
                            onChange={(e) => { setFromDate(e.target.value) }}
                            type="date"
                            className="form-control"
                        />

                        <label className="fw-bold">To date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>


                    <button onClick={getTransactionsByDate} className=" btn btn-info rounded-4" type="button">
                        Apply
                    </button>

                    <button type="button" disabled={downloading} onClick={() => tableToCSV(tableRef.current, 'transactions')} className="btn btn-info rounded-4">Download</button>

                </form>

                {error && <span className="text-danger fw-bold">{error}</span>}
            </div>

            <div className="mt-4 border-top border-2">
                <table ref={tableRef} className="w-100 table">
                    <thead >
                        <tr style={{ fontSize: "14px" }} className="text-center">
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th className="text-start">Description</th>
                            <th className="text-end">Amount</th>
                            <th>Credits Purchased</th>
                            <th>Credits Used</th>
                            <th>Remaining Credits</th>
                            <th>Invoice Number</th>
                        </tr>
                    </thead>

                    <tbody className="border border-secondary ">
                        {transactionDetails && transactionDetails?.map((transaction, i) => {
                            return (
                                <tr key={i} className="text-center small border rounded">
                                    <td style={{ fontSize: "10px" }} className="py-3">{transaction._id}</td>
                                    <td>{new Date(transaction.created_date).toLocaleDateString('en-GB')}</td>
                                    <td className="text-start">{transaction.description}</td>
                                    <td className="text-end">{transaction.amount ? `$ ${transaction.amount}` : "$0"}</td>
                                    <td>{transaction.creditsPurchased ? transaction.creditsPurchased : "0"}</td>
                                    <td>{transaction.creditsUsed}</td>
                                    <td>{transaction.credits}</td>
                                    <td>{transaction.invoiceNumber && transaction.invoiceNumber}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}