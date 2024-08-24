import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import http from "../../helpers/http";
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';

export default function Queries() {
    const [queries, setQueries] = useState(null)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const navigate = useNavigate()

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
            const url = `/contact/all-queries/?s=${search}&limit=${itemsPerPage}&skip=${skip}`
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

                <div className='container'>
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
                                    const latestChat = query?.chat[0];
                                    return <tr role='button' onClick={() => { navigate(`details/${query._id}?type=${query.enquirer}`) }} key={i}>

                                        {query.enquirer === "Visitor" ?
                                            <>
                                                <td className='text-center'>{new Date(query.createdAt).toLocaleDateString('en-GB')}</td>
                                                <td>{query.name}</td>
                                                <td className="text-wrap">{query.subject}</td>
                                                <td className="text-wrap">{query.message}</td>
                                            </>
                                            :
                                            <>
                                                <td className="text-center">
                                                    {new Date(latestChat?.date).toLocaleDateString("en-GB")}
                                                </td>
                                                <td>{latestChat?.from}</td>
                                                <td className="text-wrap">
                                                    {query?.subject}</td>
                                                <td className="text-wrap">
                                                    {latestChat?.message}
                                                </td>
                                            </>
                                        }
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </Pagination>
        </div >
    )
}