import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { RxDownload } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import Pagination from "../../components/Pagination";
import Tooltip from "../../components/Tooltip";
import Loader from "../../components/Loader";
import { itemsPerPage } from "../../helpers/constants";
import http from "../../helpers/http";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import { getDate } from "../../helpers/functions/dateFunctions";
import { downloadCsv, tableToCSV } from "../../helpers/functions/csvFunctions";

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
    const [filters, setFilters] = useState(inputValues)
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1)
    const [logs, setLogs] = useState([])
    const message = useShowMessage()
    const [loading, setLoading] = useState(false)
    const tableRef = useRef(null)

    const fetchLogs = async (page) => {
        const skip = (page - 1) * itemsPerPage
        setLoading(true)
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

    const convertLogsObjectToCsvString = (log) => {
        return [
            getDate(log.date),
            log.jobId ? log.jobId : "-",
            log.employerReference ? log.employerReference : "-",
            log.jobTitle ? log.jobTitle : "-",
            log.username ? log.username : "-",
            log.email ? log.email : "-",
            log.description ? log.description : "-",
            log.fieldName ? log.fieldName : "-",
            log.changedFrom ? log.changedFrom : "-",
            log.changedTo ? log.changedTo : "-",
        ].join(",") + '\n'
    }

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const FetchLogsWithFilters = () => {
        if (filters.toDate && filters.fromDate > filters.toDate) {
            message({ message: "From date can't be more than to date" })
            return
        }
        window.history.replaceState(null, null, '/company/audit')
        fetchLogs(1)
    }

    const downloadFilteredLogs = async () => {
        document.body.style.cursor = "wait"
        try {
            const res = await http.post(`/companies/logs?limit=${totalItems}&skip=0`, filters)

            let csvString = 'Data,Job ID,Employer Reference,Job Title,User Name,Email,Description,Field Name,Changed From,Changed To \n'

            res.data.logs.forEach(log => {
                csvString += convertLogsObjectToCsvString(log)
            })
            downloadCsv(csvString, "logs")
        } catch (error) {
            message({ status: "Error", error })
        } finally {
            document.body.style.cursor = "auto"
        }
    }

    const downloadAllLogs = async (limit = 1000) => {
        document.body.style.cursor = "wait"
        try {
            const res = await http.post(`/companies/logs?limit=${limit}&skip=0`, inputValues)

            if (limit < res.data.total) {
                downloadAllLogs(res.data.total)
            }

            let csvString = 'Data,Job ID,Employer Reference,Job Title,User Name,Email,Description,Field Name,Changed From,Changed To \n'

            res.data.logs.forEach(log => {
                csvString += convertLogsObjectToCsvString(log)
            })
            downloadCsv(csvString, "all-logs")
        } catch (error) {
            message({ status: "Error", error })
        } finally {
            document.body.style.cursor = "auto"
        }
    }

    useEffect(() => {
        fetchLogs(pgNumber)

        document.title = "Audits Logs"
    }, [])

    return (
        <div className="container-fluid content-wrapper px-0 bg-white">

            <div className="d-flex position-relative align-items-center">
                <h2 className="text-center w-100 fw-bold fs-3 mb-3" > Audit Log</h2>
                <button type="button" onClick={() => downloadAllLogs()} className="btn position-absolute end-0 me-2  btn-info rounded-4">Download All</button>
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

                    <div className="d-flex align-self-end flex-grow-1 gap-2">
                        <input type="text" placeholder="Job Title" className="form-control " name="jobTitle" value={filters.jobTitle} onChange={handleChange} />
                        <input type="text" placeholder="Employer Reference" className="form-control " name="employerReference" value={filters.employerReference} onChange={handleChange} />
                        <input type="text" placeholder="Job ID" className="form-control" name="jobId" value={filters.jobId} onChange={handleChange} />

                        <div className="d-flex align-items-center gap-3">
                            <Tooltip tooltipText={"Apply"}>
                                <span onClick={FetchLogsWithFilters}>
                                    <FaCheck color="green" fontSize={20} />
                                </span>
                            </Tooltip>
                            <Tooltip tooltipText={"Clear"}>
                                <span onClick={() => { setFilters(inputValues) }}>
                                    <RxCross2 color="red" fontSize={20} />
                                </span>
                            </Tooltip>
                            <Tooltip tooltipText={"Download"} rightAlign>
                                <span onClick={() => downloadFilteredLogs()}>
                                    <RxDownload fontSize={20} />
                                </span>
                            </Tooltip>
                        </div>
                    </div>
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