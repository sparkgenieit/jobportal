import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"

import http from "../../../helpers/http"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import { getDate } from "../../../helpers/functions/dateFunctions"
import { markdownToPlainText } from "../../../helpers/functions/textFunctions"
import { itemsPerPage } from "../../../helpers/constants"
import Loader from "../../../components/Loader"
import Pagination from "../../../components/Pagination"
import { decrementAdminUnreadCount } from "../../../helpers/slices/mailCountSlice"
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser"


export default function Inbox() {
    const [mails, setMails] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const message = useShowMessage()
    const dispatch = useDispatch()
    const { _id, role } = useCurrentUser()

    const fetchMails = async (page = currentPage, search = searchTerm) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const res = await http.get(`/mails/all?q=${search}&limit=${itemsPerPage}&skip=${skip}`)
            setMails(res.data.mails)
            setTotalItems(res.data.total)
        } catch (error) {
            message({ status: "Error", error })
        } finally {
            setLoading(false)
        }
    }

    const handleClick = (mail) => {
        if (!mail?.readBy?.includes(_id)) {
            dispatch(decrementAdminUnreadCount())
        }
        message({ path: `details/${mail._id}` })
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setSearchParams((params) => {
            params.set("q", e.target.value);
            params.delete("page")
            return params;
        })
        setCurrentPage(1)
        fetchMails(1, e.target.value)
    }

    useEffect(() => {
        document.title = "Admin Inbox"
        fetchMails()
    }, [])

    return (
        <div className="container-fluid  pt-3  bg-white">
            <Pagination currentPage={currentPage} totalCount={totalItems} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} pageNumberToShow={2} fetchItems={fetchMails} >
                <div className="d-flex flex-column flex-md-row">
                    <h2 className="text-center flex-grow-1 fw-bold fs-4">Inbox</h2>
                    <Link to={`/${role}/mail-admin`} className="btn btn-info rounded-4">New Mail</Link>
                </div>

                <div className="my-3">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search inbox"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e)}
                    />
                </div>

                {loading && <Loader />}
                {!loading &&
                    <div className="table-responsive">
                        <table className='table text-start table-hover mt-3'>
                            <thead>
                                <tr>
                                    <th className="text-center">Date</th>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mails.length > 0 && mails?.map((mail, i) => (
                                    <tr role='button' className={mail.readBy?.includes(_id) ? "" : "fw-bold"} onClick={() => handleClick(mail)} key={mail._id}>
                                        <td className="text-center">
                                            {getDate(mail.chat[0]?.date)}
                                        </td>
                                        <td>{mail.chat[0]?.from}</td>
                                        <td className="text-wrap">
                                            {markdownToPlainText(mail?.subject, 40)}</td>
                                        <td className="text-wrap">
                                            {markdownToPlainText(mail.chat[0]?.message, 50)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </Pagination>
        </div>
    )
}