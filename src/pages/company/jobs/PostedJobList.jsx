import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import http from "../../../helpers/http";
import { itemsPerPage,jobColumns } from "../../../helpers/constants";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";

import Pagination from '../../../components/Pagination';
import Loader from '../../../components/Loader';
import DataTable from '../common/DataTable';
import { setCurrentJob } from '../../../helpers/slices/generalSlice';

function SearchInput({ name, setName, setPgNumber }) {
    return (
        <input
            type="text"
            placeholder="Search by job title or reference"
            className="form-control my-3 shadow"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                setPgNumber(1);
                window.history.replaceState(null, null, '/company/jobs');
            }}
        />
    );
}


function PostedJobList() {
    const [totalItems, setTotalItems] = useState(0);
    const [jobs, setJobs] = useState(null);
    const [searchParams] = useSearchParams();
    const [pgNumber, setPgNumber] = useState(+searchParams.get("page") || 1);
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { _id: userId } = useCurrentUser();
    const message = useShowMessage();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Posted Jobs";
        fetchJobs(pgNumber);
    }, [name]);

    const fetchJobs = async (page) => {
        setIsLoading(true);
        const skip = (page - 1) * itemsPerPage;
        try {
            const { data } = await http.get(`/companies/postedJobs/${userId}?limit=${itemsPerPage}&skip=${skip}&name=${name}`);
            setTotalItems(data.total);
            console.log('data1231123',data)
            setJobs(data.jobs);
        } catch (error) {
            console.error(error);
            setJobs([]);
            message({ status: "error", error });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDuplicate = (job) => {
        dispatch(setCurrentJob({ ...job }));
        message({ path: `/company/postajob?c=${job._id}` });
    };

    const goToEdit = (job) => {
        message({ path: `/company/editjob/${job._id}` });
    };

    const getAppliedUsers = (job, isShortlisted) => {
        const url = isShortlisted ? `/company/applied-users/${job._id}?s=true` : `/company/applied-users/${job._id}`;
        message({ path: url });
    };

    const handleDelete = async (job) => {
        setIsLoading(true);
        try {
            await http.delete(`jobs/delete/${job._id}`);
            message({ status: "success", message: "Job deleted" });
            fetchJobs(pgNumber);
        } catch (err) {
            message({ status: "error", error: { message: "Failed to delete the job, Please try again later" } });
        } finally {
            setIsLoading(false);
        }
    };

    const closeJob = async (job) => {
        try {
            await http.patch('/jobs/close', { userId, jobId: job._id });
            message({ status: "success", message: "Job Closed" });
            fetchJobs(pgNumber);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="content-wrapper px-0 bg-white">
                <h4 className="text-center fs-4 fw-bold">List of Posted Jobs</h4>
                <Pagination 
                    itemsPerPage={itemsPerPage} 
                    currentPage={pgNumber} 
                    setCurrentPage={setPgNumber} 
                    totalCount={totalItems} 
                    fetchItems={fetchJobs} 
                    pageNumberToShow={2}
                >
                    <div className="bg-white rounded">
                        <SearchInput name={name} setName={setName} setPgNumber={setPgNumber} />
                        {isLoading ? <Loader /> : 
                          jobs ? (
                        <DataTable 
                        dataType={'Job'}
                        items={jobs} 
                        handleDuplicate={handleDuplicate} 
                        closeAction={closeJob} 
                        handleDelete={handleDelete} 
                        getAppliedUsers={getAppliedUsers} 
                        goToEdit={goToEdit} 
                        columns={jobColumns}
                    />
                 ) : null
                    }
                        
                    </div>
                </Pagination>
            </div>
        </div>
    );
}

export default PostedJobList;
