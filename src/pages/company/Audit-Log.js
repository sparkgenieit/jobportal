import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { itemsPerPage } from "../../helpers/constants";
import http from "../../helpers/http";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import { getDate } from "../../helpers/functions/dateFunctions";
import Table from 'react-bootstrap/Table'

export default function Audit() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [logs, setLogs] = useState([])
    const message = useShowMessage()

    const fetchLogs = async (page) => {
        const skip = (page - 1) * itemsPerPage
        try {
            const res = await http.get(`/companies/logs?limit=${itemsPerPage}&skip=${skip}`)
            setLogs(res.data.logs)
            setTotalItems(res.data.total)
        } catch (error) {
            message({ status: "Error", error })
        }
    }

    useEffect(() => {
        fetchLogs(pgNumber)
    }, [])

    return (
        <div className="container-fluid content-wrapper px-0 bg-white">

            <h2 className="text-center fw-bold fs-3 mb-3" > Audit Log</h2>

            <div className="container-fluid">
                {logs.length > 0 &&
                    <div>
                        <input className="form-control" />
                    </div>
                }

                <Pagination itemsPerPage={itemsPerPage} currentPage={pgNumber} pageNumberToShow={2} setCurrentPage={setPgNumber} fetchItems={fetchLogs} totalCount={totalItems}>
                    <div className="table-responsive">
                        {logs.length <= 0 && <div className="text-center  fw-bold mt-3 fs-4">No Logs Yet</div>}
                        {logs.length > 0 &&
                            <Table className="text-center small text-wrap">
                                <thead>
                                    <th>Date</th>
                                    <th>Job ID</th>
                                    <th>Employer Reference</th>
                                    <th>Job Title</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Description</th>
                                    <th>Field Name</th>
                                    <th>Changed From</th>
                                    <th>Changed To</th>
                                </thead>

                                <tbody>

                                    {logs.map((log) => (
                                        <tr key={log._id}>
                                            <td>{getDate(log.date)}</td>
                                            <td className="small">{log.jobId ? log.jobId : "-"} </td>
                                            <td>{log.employerReference ? log.employerReference : "-"} </td>
                                            <td>{log.jobTitle ? log.jobTitle : "-"} </td>
                                            <td>{log.username ? log.username : "-"} </td>
                                            <td>{log.email ? log.email : "-"} </td>
                                            <td className="text-capitalize">{log.description ? log.description : "-"} </td>
                                            <td className="text-capitalize">{log.fieldName ? log.fieldName : "-"} </td>
                                            <td style={{ wordBreak: "break-all" }} className="text-wrap">{log.changedFrom ? log.changedFrom : "-"} </td>
                                            <td style={{ wordBreak: "break-all" }} className="text-wrap">{log.changedTo ? log.changedTo : "-"} </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        }
                    </div>
                </Pagination>
            </div>

        </div>

    )
}