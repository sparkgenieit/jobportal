import { useEffect, useState } from "react"

import { useSearchParams } from "react-router-dom"
import Table from 'react-bootstrap/Table'

import http from "../../helpers/http"
import { markdownToPlainText } from "../../helpers/functions/textFunctions"
import { itemsPerPage } from "../../helpers/constants"
import Pagination from "../../components/Pagination"
import Loader from "../../components/Loader"
import { getUserID } from "../../helpers/functions"
import useShowMessage from "../../helpers/Hooks/useShowMessage"

export default function UnAssignedQueries() {
    const [queries, setQueries] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [assigning, setAssigning] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)

    //Custom Hook
    const message = useShowMessage()

    useEffect(() => {
        fetchQueries(currentPage)
    }, [search])


    const fetchQueries = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const response = await http.get(`/contact/unassigned-queries?s=${search}&limit=${itemsPerPage}&skip=${skip}`)
            setQueries(response.data.queries)
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


    const assignedToMe = async (query) => {
        setAssigning(true)
        const user_id = getUserID()
        try {
            await http.patch(`/contact/assign-query/${user_id}?query_id=${query._id}`)
            message({
                status: "Success",
                message: "Assigned Successfully",
                path: "/admin/inbox"
            })
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
                Employer Queries
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
                            </tr>
                        </thead>
                        <tbody>

                            {
                                queries && queries.length > 0 && queries.map((query, i) => {

                                    return (
                                        <tr key={i}>
                                            <td>{new Date(query.createdAt).toLocaleDateString('en-GB')}</td>
                                            <td>{query.organisation}</td>
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