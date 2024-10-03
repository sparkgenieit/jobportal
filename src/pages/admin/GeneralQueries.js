import { useEffect, useState } from "react"

import { useSearchParams } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import { BsTrash3Fill } from "react-icons/bs";

import http from "../../helpers/http"
import { markdownToPlainText } from "../../helpers/functions/textFunctions"
import { itemsPerPage } from "../../helpers/constants"
import Pagination from "../../components/Pagination"
import Loader from "../../components/Loader"
import useShowMessage from "../../helpers/Hooks/useShowMessage"
import { useDispatch } from "react-redux"
import { fetchEmployerUnreadCount } from "../../helpers/slices/mailCountSlice"

export default function GeneralQueries() {
    const [queries, setQueries] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [assigning, setAssigning] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()

    //Custom Hook
    const message = useShowMessage()

    useEffect(() => {
        fetchQueries(currentPage)
    }, [search])

    const fetchQueries = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const response = await http.get(`/mails/unassigned-mails/general?s=${search}&limit=${itemsPerPage}&skip=${skip}`)
            setQueries(response.data.mails)
            setTotalItems(response.data.total)
        } catch (error) {
            message({ status: 'Error', error })
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setSearchParams((params) => {
            params.delete("page")
            return params;
        })
        setCurrentPage(1)
    }

    const handleDelete = async (query) => {
        setAssigning(true)
        try {
            await http.delete(`/mails/delete/${query._id}`)
            message({
                status: "Success",
                message: "Query deleted",
            })
            fetchQueries(currentPage)
        } catch (error) {
            message({
                status: "Error",
                error
            })
        } finally {
            setAssigning(false)
        }
    }


    const assignedToMe = async (query) => {
        setAssigning(true)
        try {
            await http.patch(`/mails/assign-mail?query_id=${query._id}`)
            message({
                status: "Success",
                message: "Assigned Successfully",
                path: "/admin/inbox"
            })
            dispatch(fetchEmployerUnreadCount())
        } catch (error) {
            message({
                status: "Error",
                error
            })
        } finally {
            setAssigning(false)
        }
    }

    return (
        <div className="mt-3 container-fluid">
            <h2 className="fw-bold fs-4 text-center">
                General Queries
            </h2>

            <div id="search-box" className="my-2">
                <input type="text"
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    className="form-control"
                    placeholder="Search Queries"
                />
            </div>

            <Pagination currentPage={currentPage} totalCount={totalItems} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} pageNumberToShow={2} fetchItems={fetchQueries} >

                {loading && <Loader />}
                {!loading
                    &&
                    <Table responsive className="w-100">
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Company</td>
                                <td>Subject</td>
                                <td>Message</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                queries && queries.length > 0 && queries.map((query, i) => {

                                    return (
                                        <tr key={i}>
                                            <td>{new Date(query.createdAt).toLocaleDateString('en-GB')}</td>
                                            <td>{query.chat[0].from}</td>
                                            <td>{markdownToPlainText(query.subject, 40)}</td>
                                            <td>{query.chat?.length > 0 && markdownToPlainText(query?.chat[0]?.message, 50)}</td>
                                            <td>
                                                <button
                                                    onClick={() => assignedToMe(query)}
                                                    disabled={assigning}
                                                    className="btn btn-xs btn-info rounded-4 "
                                                >
                                                    Assign to me
                                                </button>
                                            </td>

                                            <td>
                                                <button type="button" disabled={assigning} className="border-0 bg-white" onClick={() => handleDelete(query)}>
                                                    <BsTrash3Fill fontSize={18} />
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                }
            </Pagination>
        </div>
    )
}