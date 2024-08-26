import { useEffect, useState } from "react"

import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { FaRegMessage } from "react-icons/fa6";

import { itemsPerPage } from "../../helpers/constants"
import Loader from "../../components/Loader"
import Pagination from "../../components/Pagination"
import http from "../../helpers/http"
import { markdownToText } from "../../helpers/functions/textFunctions";

export default function Inbox() {
    const [queries, setQueries] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const user_id = localStorage.getItem('user_id')
    const navigate = useNavigate();

    useEffect(() => {
        fetchQueries(currentPage)
    }, [])


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
            const url = `/contact/company-queries/${user_id}?q=${search}&limit=${itemsPerPage}&skip=${skip}`
            const { data } = await http.get(url)
            setLoading(false)
            setQueries(data.data)
            setTotalItems(data.total)
        } catch (error) {
            setLoading(false)
            setQueries([])
            setTotalItems(0)
        }
    }

    return (
        <div className=" mt-4 container-fluid">
            <div className="d-flex">
                <h2 className="text-center fw-bold flex-grow-1  fs-4">Inbox</h2>
                <Link className="btn btn-info align-items-center d-flex gap-3 rounded-4" to={"/company/contact-us"}>
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
                                        <tr role="button" key={i} onClick={() => { navigate(`/company/inbox/details/${query._id}`) }}>
                                            <td className="text-center">
                                                {new Date(latestChat?.date).toLocaleDateString("en-GB")}
                                            </td>
                                            <td>{latestChat?.from}</td>
                                            <td className="text-wrap">
                                                {query?.subject}</td>
                                            <td className="text-wrap">
                                                {markdownToText(latestChat?.message)}
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                            }
                        </tbody>
                    </table>
                }
            </Pagination>
        </div>
    )
} 