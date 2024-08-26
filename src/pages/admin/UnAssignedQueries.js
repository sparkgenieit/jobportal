import { useEffect, useState } from "react"

import Table from 'react-bootstrap/Table'

import http from "../../helpers/http"

export default function UnAssignedQueries() {
    const [queries, setQueries] = useState([])

    useEffect(() => {
        fetchQueries()
    }, [])

    const fetchQueries = async () => {
        try {
            const response = await http.get('/contact/unassigned-queries')
            console.log(response.data.queries)
            setQueries(response.data.queries)
        } catch (error) {

        }
    }

    return (
        <div className="mt-3 container-fluid">
            <h2 className="fw-bold fs-4 text-center">
                User Queries
            </h2>

            <Table responsive >

                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Date</td>
                        <td>Date</td>
                        <td>Date</td>
                        <td>Date</td>
                    </tr>

                </thead>


            </Table>


        </div>
    )
}