import { useEffect, useState } from "react";

import { RxDownload } from "react-icons/rx";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';

import http from '../../../helpers/http'
import useShowMessage from '../../../helpers/Hooks/useShowMessage'
import { BASE_API_URL } from "../../../helpers/constants";

function OrdersList() {
    const [orders, setOrders] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [sendingRequest, setSendingRequest] = useState(false)

    const message = useShowMessage()

    useEffect(() => {
        document.title = "Transactions"
        fetchOrders()
    }, [])


    const fetchOrders = async () => {
        try {
            const res = await http.get('/orders/all')
            setOrders(res.data)
        } catch (error) {

        }
    }


    async function refundCredits() {
        try {
            setSendingRequest(true)
            await http.put(`/jobs/refund-credits`)
            message({
                status: "success",
                message: "Credits refunded successfully"
            })
            fetchOrders()
        } catch (error) {
            message({
                status: "error",
                error
            })
        } finally {
            setShowModal(false)
            setSendingRequest(false)
        }
    }

    return (
        <>
            <div className="container-fluid mt-4">
                <div className="bg-white">
                    <div className="d-flex ">
                        <h2 className="fw-bold text-center w-100">Transactions</h2>
                        <div className="d-flex flex-shrink-1" >
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(true)
                                }}
                                className="fw-bold btn btn-xs rounded-3 fs-6 btn-primary"
                            >Refund
                            </button>
                        </div>
                    </div>

                    <div className="pt-4  w-100">
                        <table className="w-100 text-center">
                            <thead >
                                <tr style={{ fontSize: "14px" }}>

                                    <th className="d-flex justify-content-center">
                                        <span>Date</span>
                                        {/* {
                                                    sort === "desc" ?
                                                        <span role="button" onClick={() => { setSort("asc") }}><BiSolidDownArrow /></span> :
                                                        <span role="button" onClick={() => { setSort("desc") }}><BiSolidUpArrow /></span>
                                                } */}
                                    </th>
                                    <th>Company Name</th>
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
                                {orders?.map((transaction, i) => {
                                    return (
                                        <tr key={i} style={{ fontSize: "12px" }} className="small border rounded">
                                            <td>{new Date(transaction.created_date).toLocaleDateString('en-GB')}</td>
                                            <td style={{ fontSize: "10px" }} className="py-3">{transaction.companyName}</td>
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
                </div>
            </div >


            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="bg-white">

                    <h3 className="fw-bold text-center">Bulk Refund</h3>

                    <div className="d-flex flex-column justify-content-center gap-3 align-items-center">
                        Are you sure want to refund all the employers with  credits

                        <div className="d-flex gap-3">
                            <button type="button" disabled={sendingRequest} onClick={refundCredits} className="btn btn-info">
                                {sendingRequest ? "Please wait! Refunding in progress" : "Ok"}
                            </button>

                            <button type="button" disabled={sendingRequest} onClick={() => setShowModal(false)} className="btn btn-danger">
                                Cancel
                            </button>
                        </div>

                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
export default OrdersList;