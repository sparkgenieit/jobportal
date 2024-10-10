import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import { itemsPerPage } from "../../helpers/constants";
import http from "../../helpers/http";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import { getDate } from "../../helpers/functions/dateFunctions";
import { tableToCSV } from "../../helpers/functions/csvFunctions";

const inputValues = {
    toDate: "",
    fromDate: "",
    jobId: "",
    employerReference: "",
    jobTitle: ""
}

export default function Audit() {
    const [totalItems, setTotalItems] = useState(0)
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState(JSON.parse(sessionStorage.getItem("logs-filters")) || inputValues)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [logs, setLogs] = useState([])
    const message = useShowMessage()
    const [loading, setLoading] = useState(false)
    const tableRef = useRef(null)

    const fetchLogs = async (page) => {
        const skip = (page - 1) * itemsPerPage
        setLoading(true)
        console.log(skip);
        try {
            const res = await http.post(`/companies/logs?limit=${itemsPerPage}&skip=${skip}`, filters)
            setLogs(res.data.logs)
            setTotalItems(res.data.total)
        } catch (error) {
            message({ status: "Error", error })
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const FetchLogsWithFilters = () => {
        if (filters.toDate && filters.fromDate > filters.toDate) {
            message({ message: "From date can't be more than to date" })
            return
        }
        sessionStorage.setItem("logs-filters", JSON.stringify(filters))
        window.history.replaceState(null, null, '/company/audit')
        fetchLogs(1)
    }


    useEffect(() => {
        fetchLogs(pgNumber)
    }, [])

    return (
        <div className="container-fluid content-wrapper px-0 bg-white">

            <div className="d-flex">
                <h2 className="text-center flex-grow-1 fw-bold fs-3 mb-3" > Audit Log</h2>
                <button type="button" onClick={() => tableToCSV(tableRef.current, 'logs')} className="btn btn-info rounded-4">Download</button>
            </div>

            <div className="container-fluid">

                <div className="d-flex gap-2 my-3 small">
                    <div className="d-flex flex-column align-items-start">
                        <label>From Date</label>
                        <input type="date" name="fromDate" className="form-control" value={filters.fromDate} onChange={handleChange} />
                    </div>
                    <div className="d-flex flex-column align-items-start">
                        <label>To Date</label>
                        <input type="date" name="toDate" className="form-control" value={filters.toDate} onChange={handleChange} />
                    </div>

                    <input type="text" placeholder="Job Title" className="form-control align-self-end" name="jobTitle" value={filters.jobTitle} onChange={handleChange} />
                    <input type="text" placeholder="Employer Reference" className="form-control align-self-end" name="employerReference" value={filters.employerReference} onChange={handleChange} />
                    <input type="text" placeholder="Job ID" className="form-control align-self-end" name="jobId" value={filters.jobId} onChange={handleChange} />

                    <button onClick={FetchLogsWithFilters} className="btn btn-info align-self-end mt-2 rounded-4 ">Apply</button>
                </div>

                <Pagination itemsPerPage={itemsPerPage} currentPage={pgNumber} pageNumberToShow={2} setCurrentPage={setPgNumber} fetchItems={fetchLogs} totalCount={totalItems}>
                    <div className="table-responsive">

                        {loading &&
                            <div className="container">
                                <Loader />
                            </div>
                        }

                        {!loading && logs.length > 0 &&
                            <table ref={tableRef} className="text-center my-table mt-2  text-wrap">
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