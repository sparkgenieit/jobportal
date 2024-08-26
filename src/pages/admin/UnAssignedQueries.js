import { useContext, useEffect, useState } from "react"

import { useNavigate, useSearchParams } from "react-router-dom"
import Table from 'react-bootstrap/Table'

import http from "../../helpers/http"
import { markdownToText } from "../../helpers/functions/textFunctions"
import { itemsPerPage } from "../../helpers/constants"
import Pagination from "../../components/Pagination"
import Loader from "../../components/Loader"
import { getUserID } from "../../helpers/functions"
import { ToasterContext } from "../../helpers/Context"

export default function UnAssignedQueries() {
    const [queries, setQueries] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(false)
    const [assigning, setAssigning] = useState(false)
    const [searchParams] = useSearchParams()
    const { setShowToaster } = useContext(ToasterContext)
    const [currentPage, setCurrentPage] = useState(+searchParams.get("page") || 1)
    const navigate = useNavigate()

    useEffect(() => {
        fetchQueries(currentPage)
    }, [])


    const fetchQueries = async (page) => {
        setLoading(true)
        const skip = (page - 1) * itemsPerPage
        try {
            const response = await http.get(`/contact/unassigned-queries?limit=${itemsPerPage}&skip=${skip}`)
            setQueries(response.data.queries)
            setTotalItems(response.data.total)
        } catch (error) {
            setShowToaster({
                show: true,
                type: "error",
                text: error.response?.data?.message || error.message
            })
            setQueries([])
            setTotalItems(0)
        } finally {
            setLoading(false)
        }
    }


    const assignedToMe = async (query) => {
        setAssigning(true)
        const user_id = getUserID()
        try {
            const res = await http.patch(`/contact/assign-query/${user_id}?query_id=${query._id}`)
            setShowToaster({
                show: true,
                type: "success",
                text: "Assigned Successfully"
            })
            setTimeout(() => {
                navigate('/admin/inbox')
            }, 1200);
        } catch (error) {
            console.log(error)
            setShowToaster({
                show: true,
                type: "error",
                text: error.response?.data?.message || error.message
            })
        } finally {
            setAssigning(false)
        }
    }

    return (
        <div className="mt-3 container-fluid">
            <h2 className="fw-bold fs-4 text-center">
                User Queries
            </h2>

            <Pagination currentPage={currentPage} totalCount={totalItems} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} pageNumberToShow={2} fetchItems={fetchQueries} >

                {loading && <Loader />}
                {!loading
                    &&
                    <Table responsive className="w-100">
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Organisation</td>
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
                                            <td>{query.subject}</td>
                                            <td>{query.chat?.length > 0 && markdownToText(query?.chat[0]?.message)}</td>
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