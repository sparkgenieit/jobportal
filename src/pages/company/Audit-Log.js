import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import { itemsPerPage } from "../../helpers/constants";
import http from "../../helpers/http";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import { getDate } from "../../helpers/functions/dateFunctions";

export default function Audit() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [logs, setLogs] = useState([])
    const message = useShowMessage()
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchLogs = async (page) => {
        const skip = (page - 1) * itemsPerPage
        setLoading(true)
        try {
            const res = await http.get(`/companies/logs?limit=${itemsPerPage}&skip=${skip}&s=${search}`)
            setLogs(res.data.logs)
            setTotalItems(res.data.total)
        } catch (error) {
            message({ status: "Error", error })
        } finally {
            setLoading(false)
        }
    }


    const downloadLogs = () => {

    }



    useEffect(() => {
        fetchLogs(pgNumber)
    }, [search])

    return (
        <div className="container-fluid content-wrapper px-0 bg-white">

            <div className="d-flex">
                <h2 className="text-center flex-grow-1 fw-bold fs-3 mb-3" > Audit Log</h2>
                <button type="button" className="btn btn-info rounded-3">Download</button>
            </div>

            <div className="container-fluid">

                <div>
                    <input
                        className="form-control"
                        placeholder="Search logs"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPgNumber(1)
                        }} />
                </div>

                <Pagination itemsPerPage={itemsPerPage} currentPage={pgNumber} pageNumberToShow={2} setCurrentPage={setPgNumber} fetchItems={fetchLogs} totalCount={totalItems}>
                    <div className="table-responsive">

                        {loading &&
                            <div className="container">
                                <Loader />
                            </div>
                        }

                        {!loading && logs.length > 0 &&
                            <table className="text-center my-table mt-2  text-wrap">
                                <thead className="small">
                                    <tr>
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
                                    </tr>
                                </thead>

                                <tbody>

                                    {logs.map((log) => (
                                        <tr style={{ fontSize: "12px" }} key={log._id} className="border rounded border-secondary border-0 border-top" >
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
                            </table>
                        }
                    </div>
                </Pagination>
            </div>

        </div>

    )
}