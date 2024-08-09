import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { itemsPerPage } from "../../helpers/constants"
import { useSearchParams } from "react-router-dom"
import http from "../../helpers/http"
import Pagination from "../../components/Pagination"
import { IoEyeSharp } from "react-icons/io5"
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

            <h2 className="text-center ">Replied Queries</h2>


            <Pagination currentPage={currentPage} totalCount={totalItems} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} pageNumberToShow={2} fetchItems={fetchQueries} >

                {loading && <Loader />}
                {!loading &&
                    <table className='table text-center'>
                        <thead>
                            <tr >
                                <th>Inquiry type</th>
                                <th>Name</th>
                                <th>Organisation</th>
                                <th >Subject</th>
                                <th >Reply</th>
                                <th >View</th>
                            </tr>
                        </thead>

                        <tbody>
                            {queries && queries?.map((query, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {query.enquirer}
                                        </td>
                                        <td>{query.name}</td>
                                        <td>{query.organisation}</td>
                                        <td className='text-start'>{query.subject.length > 80 ? `${query.subject.slice(0, 80)}...` : query.subject}</td>
                                        <td >

                                            {query.enquirer === "Visitor" ? <span className='small fw-light'>Reply to this query via email</span> :

                                                query.reply ?
                                                    <span className='badge text-bg-success py-2 rounded-pill'>Replied</span>
                                                    :
                                                    <span className='badge text-bg-warning py-2 rounded-pill'>Pending</span>
                                            }

                                        </td>
                                        <td >
                                            <span onClick={() => setModal({ show: true, clickedQuery: query })}>
                                                <IoEyeSharp fontSize={20} />
                                            </span>
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