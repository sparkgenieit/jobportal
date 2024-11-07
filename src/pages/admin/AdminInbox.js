import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import http from "../../helpers/http";
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import { markdownToPlainText } from '../../helpers/functions/textFunctions';
import { getDate } from '../../helpers/functions/dateFunctions';
import { useDispatch } from 'react-redux';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { decrementEmployerUnreadCount } from '../../helpers/slices/mailCountSlice';
import useShowMessage from '../../helpers/Hooks/useShowMessage';

export default function Queries() {
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
            const url = `/mails/employer/all?s=${search}&limit=${itemsPerPage}&skip=${skip}`
            const { data } = await http.get(url)
            setLoading(false)
            setQueries(data.mails)
            setTotalItems(data.total)
        } catch (error) {
            setLoading(false)
            setQueries([])
            setTotalItems(0)
        }
    }

    return (
        <div className=" mt-3 container-fluid">
            <Pagination currentPage={currentPage} totalCount={totalItems} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} pageNumberToShow={2} fetchItems={fetchQueries} >
                <h2 className="fw-bold fs-4 text-center">
                    Inbox
                </h2>

                <div className="my-3">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search inbox"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e)}
                    />
                </div>

                <div className='table-responsive'>
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
                                    return <tr role='button' className={query?.readBy?.includes(user._id) ? "" : "fw-bold"} key={i} onClick={() => handleClick(query)}>

                                        {query.enquirer === "Visitor" ?
                                            <>
                                                <td className='text-center'>{getDate(query.createdAt)}</td>
                                                <td>{query.name}</td>
                                                <td className="text-wrap">{query.subject}</td>
                                                <td className="text-wrap">{query.chat?.length > 0 && query.chat[0]?.message}</td>
                                            </>
                                            :
                                            <>{query.chat && query.chat?.length > 0 &&
                                                <>
                                                    <td className="text-center">
                                                        {getDate(query.chat[0]?.date)}
                                                    </td>
                                                    <td>{query.chat[0]?.from}</td>
                                                    <td className="text-wrap">
                                                        {markdownToPlainText(query?.subject, 40)}</td>
                                                    <td className="text-wrap">
                                                        {markdownToPlainText(query.chat[0]?.message, 50)}
                                                    </td>
                                                </>
                                            }
                                            </>
                                        }
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </Pagination >
        </div >
    )
}