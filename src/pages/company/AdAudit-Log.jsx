import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RxDownload, RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

import Pagination from "../../components/Pagination";
import Tooltip from "../../components/Tooltip";
import Loader from "../../components/Loader";
import ShowMore from "../../components/common/ShowMore";
import { itemsPerPage } from "../../helpers/constants";
import http from "../../helpers/http";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import { getDate } from "../../helpers/functions/dateFunctions";

const inputValues = {
    toDate: "",
    fromDate: "",
    adId: "",
    adTitle: "",
    email: "",
    username: ""
};

const FilterControls = ({ filters, handleChange, FetchLogsWithFilters, resetFilters, downloadFilteredLogs }) => (
    <div className="d-flex flex-column flex-md-row gap-2 my-3 small">
        <input type="date" name="fromDate" className="form-control" value={filters.fromDate} onChange={handleChange} placeholder="From Date" />
        <input type="date" name="toDate" className="form-control" value={filters.toDate} onChange={handleChange} placeholder="To Date" />
        <input type="text" placeholder="Ad ID" className="form-control" name="adId" value={filters.adId} onChange={handleChange} />
        <input type="text" placeholder="Ad Title" className="form-control" name="adTitle" value={filters.adTitle} onChange={handleChange} />
        <input type="text" placeholder="Email" className="form-control" name="email" value={filters.email} onChange={handleChange} />
        <input type="text" placeholder="User Name" className="form-control" name="username" value={filters.username} onChange={handleChange} />
        <div className="d-flex align-items-center gap-3">
            <Tooltip tooltipText="Apply"><FaCheck color="green" fontSize={20} onClick={FetchLogsWithFilters} /></Tooltip>
            <Tooltip tooltipText="Clear"><RxCross2 color="red" fontSize={20} onClick={resetFilters} /></Tooltip>
            <Tooltip tooltipText="Download"><RxDownload fontSize={20} onClick={downloadFilteredLogs} /></Tooltip>
        </div>
    </div>
);

const LogsTable = ({ logs, loading }) => (
    <div className="table-responsive">
        {loading ? <Loader /> : logs.length > 0 && (
            <table className="text-center my-table w-100 mt-2 text-wrap">
                <thead className="small">
                    <tr>
                        {['Date', 'Ad ID', 'Ad Title', 'User Name', 'Email', 'Description', 'Field Name', 'Changed From', 'Changed To'].map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log._id} className="border rounded border-secondary border-0 border-top" style={{ fontSize: "12px" }}>
                            <td>{getDate(log.date)}</td>
                            <td>{log.adId || "-"}</td>
                            <td>{log.adTitle || "-"}</td>
                            <td>{log.username || "-"}</td>
                            <td>{log.email || "-"}</td>
                            <td>{log.description || "-"}</td>
                            <td>{log.fieldName || "-"}</td>
                            <td>{log.changedFrom ? <ShowMore content={log.changedFrom} /> : "-"}</td>
                            <td>{log.changedTo ? <ShowMore content={log.changedTo} /> : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);

export default function AdAuditLog() {
    const [totalItems, setTotalItems] = useState(0);
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState(inputValues);
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1);
    const [logs, setLogs] = useState([]);
    const message = useShowMessage();
    const [loading, setLoading] = useState(false);

    const fetchLogs = async (page) => {
        setLoading(true);
        try {
            const res = await http.post(`/audit/ad/logs?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`, filters);
            setLogs(res.data.logs);
            setTotalItems(res.data.total);
        } catch (error) {
            message({ status: "Error", error });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(pgNumber);
        document.title = "Ad Audit Logs";
    }, []);

    const FetchLogsWithFilters = () => {
        if (filters.fromDate && filters.toDate && filters.fromDate > filters.toDate) {
            message({ message: "From date can't be more than to date" });
            return;
        }
        fetchLogs(1);
    };

    const resetFilters = () => setFilters(inputValues);

    const downloadFilteredLogs = () => {
        message({ message: "Download not implemented yet" });
    };

    return (
        <div className="container-fluid content-wrapper px-0 bg-white">
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center mb-3">
                <h2 className="text-center w-100 fw-bold fs-3">Ad Audit Log</h2>
                <button type="button" onClick={downloadFilteredLogs} className="btn btn-info rounded-4">Download All</button>
            </div>
            <FilterControls {...{
                filters,
                handleChange: (e) => setFilters({ ...filters, [e.target.name]: e.target.value }),
                FetchLogsWithFilters,
                resetFilters,
                downloadFilteredLogs
            }} />
            <Pagination {...{
                itemsPerPage,
                currentPage: pgNumber,
                setCurrentPage: setPgNumber,
                fetchItems: fetchLogs,
                totalCount: totalItems
            }}>
                <LogsTable logs={logs} loading={loading} />
            </Pagination>
        </div>
    );
}
