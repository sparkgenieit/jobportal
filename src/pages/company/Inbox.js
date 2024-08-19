import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { itemsPerPage } from "../../helpers/constants"
import { Link, useSearchParams } from "react-router-dom"
import http from "../../helpers/http"
import Pagination from "../../components/Pagination"
import { IoEyeSharp } from "react-icons/io5"
import { FaRegMessage } from "react-icons/fa6";

import QueryDetails from "../admin/QueryDetails"

export default function Inbox() {
    const [queries, setQueries] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const [modal, setModal] = useState({})
    const user_id = localStorage.getItem('user_id')
    useEffect(() => {
        fetchQueries(currentPage)
    }, [])


    const fetchQueries = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const url = `/contact/company-queries/${user_id}?limit=${itemsPerPage}&skip=${skip}`
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
                <input type="search" className=" w-100 p-2 border-dark border-1" placeholder="Search inbox" />
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
                                const latestChat = query?.chat[query?.chat?.length - 1];
                                return (
                                    <tr key={i}>
                                        <td className="text-center">
                                            {new Date(latestChat?.date).toLocaleDateString("en-GB")}
                                        </td>
                                        <td>{latestChat?.from}</td>
                                        <td>
                                            {query?.subject?.length > 80 ? `${query?.subject?.slice(0, 80)}...` : query?.subject}</td>
                                        <td>
                                            {latestChat?.message?.length > 80 ? `${latestChat?.message?.slice(0, 80)}...` : latestChat?.message}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>

                    </table>
                }

            </Pagination>
            <QueryDetails modal={modal} setModal={setModal} fetchQueries={fetchQueries} pgNumber={currentPage} />
        </div>
    )
} 