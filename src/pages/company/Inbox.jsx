import { useEffect, useState } from "react"

import { Link, useSearchParams } from "react-router-dom"
import { FaRegMessage } from "react-icons/fa6";

import { itemsPerPage } from "../../helpers/constants"
import Loader from "../../components/Loader"
import Pagination from "../../components/Pagination"
import http from "../../helpers/http"
import { markdownToPlainText } from "../../helpers/functions/textFunctions";
import { getDate } from "../../helpers/functions/dateFunctions";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";
import { decrementEmployerUnreadCount } from "../../helpers/slices/mailCountSlice";
import { useDispatch } from "react-redux";

export default function Inbox() {
    const [queries, setQueries] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const message = useShowMessage()
    const dispatch = useDispatch()
    const user = useCurrentUser()

    useEffect(() => {
        document.title = "Inbox"

        fetchQueries(currentPage)
    }, [])

    const handleClick = (mail) => {
        if (!mail?.readBy?.includes(user._id)) {
            dispatch(decrementEmployerUnreadCount())
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
        fetchQueries(1, e.target.value)
    }

    const fetchQueries = async (page, search = searchTerm) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const url = `/mails/employer/all?q=${search}&limit=${itemsPerPage}&skip=${skip}`
            const { data } = await http.get(url)
            setQueries(data.mails)
            setTotalItems(data.total)
        } catch (error) {
            message({ status: "error", error })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className=" mt-4 container-fluid">
            <div className="d-flex flex-column flex-md-row align-items-center  my-2" >
                <h2 className="text-center fw-bold flex-grow-1  fs-4">Inbox</h2>
                <Link className="btn btn-info align-items-center align-self-end d-flex gap-3 rounded-4" to={"/company/contact-us"}>
                    New Mail <FaRegMessage fontSize={20} />
                </Link>
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

            <Pagination currentPage={currentPage} totalCount={totalItems} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} pageNumberToShow={2} fetchItems={fetchQueries} >

                {loading && <Loader />}
                {!loading &&
                    <div className="table-responsive">

                        <table className='table text-start table-hover'>
                            <thead>
                                <tr >
                                    <th className="text-center">Date</th>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queries && queries?.map((query, i) => {
                                    if (query.chat && query.chat?.length > 0) {
                                        const latestChat = query?.chat[0];
                                        return (
                                            <tr role="button" className={query?.readBy?.includes(user._id) ? "" : "fw-bold"} key={i} onClick={() => handleClick(query)}>
                                                <td className="text-center">
                                                    {getDate(latestChat?.date)}
                                                </td>
                                                <td>{latestChat?.from}</td>
                                                <td className="text-wrap">
                                                    {markdownToPlainText(query?.subject, 40)}</td>
                                                <td className="text-wrap">
                                                    {markdownToPlainText(latestChat?.message, 50)}
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </Pagination>
        </div>
    )
} 