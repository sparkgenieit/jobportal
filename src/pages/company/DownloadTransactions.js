import { useEffect, useRef, useState } from "react"

import http from "../../helpers/http";

export default function DownloadTransactions() {
    const user_id = localStorage.getItem('user_id')
    const [transactionDetails, setTransactionDetails] = useState([])
    const [downloading, setDownloading] = useState(false)
    const [error, setError] = useState("")
    const [toDate, setToDate] = useState("")
    const [fromDate, setFromDate] = useState("")
    const tableRef = useRef(null)

    function tableToCSV() {
        setDownloading(true)
        const table = tableRef.current
        let csvContent = "";
        for (let i = 0; i < table.rows.length; i++) {
            let row = table.rows[i];
            let rowData = [];

            // Iterate through each cell in the row
            for (let j = 0; j < row.cells.length; j++) {
                rowData.push(row.cells[j].textContent);
            }
            csvContent += rowData.join(",") + "\n";
        }
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'transactions.csv';
        link.click();
        link.remove()
        setDownloading(false)
    }

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

    const fetchTransactions = async () => {
        try {
            const response = await http.get(`/orders/download-transactions/${user_id}?from=${fromDate}&to=${toDate}`)
            const data = response.data
            setTransactionDetails(response.data)
        } catch (error) {
            setTransactionDetails([])
        }
    }

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex flex-column align-items-center justify-content-center gap-4">
                <div className="d-flex gap-4">
                    <h2 className="text-center">Download transactions</h2>
                    <button type="button" disabled={downloading} onClick={tableToCSV} className="btn btn-info">Download</button>
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
                    </div>

                    <div className="d-flex gap-3 align-items-center input-group">
                        <label className="fw-bold">To date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>

                    <button onClick={getTransactionsByDate} className=" btn btn-light" type="button">
                        Get Transactions
                    </button>

                </form>

                {error && <span className="text-danger fw-bold">{error}</span>}
            </div>

            <div className="mt-4">
                <table ref={tableRef} className="w-100 table">
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
                        </tr>
                    </thead>

                    <tbody className="border border-secondary ">
                        {transactionDetails && transactionDetails?.map((transaction, i) => {
                            return (
                                <tr key={i} className="text-center small border rounded">
                                    <td style={{ fontSize: "10px" }} className="py-3">{transaction._id}</td>
                                    <td>{new Date(transaction.created_date).toLocaleDateString('en-GB')}</td>
                                    <td>{transaction.description}</td>
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