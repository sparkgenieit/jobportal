import LocationPopup from "./LocationPopup"
import Toaster from "./Toaster"
import { useContext } from 'react';
import { JobsContext } from '../helpers/Context';
import Card from './common/Card';
import InfoPopup from './InfoPopup';

export default function JobCardList({ jobs, type }) {

    const { info, setInfo, message, setMessage } = useContext(JobsContext)

    return (
        <>
            {jobs && jobs.length == 0 && <h3 className='m-2 w-100 text-center'>No Jobs Found</h3>}
            {jobs && jobs.length > 0 &&
                jobs.map((job, index) => {
                    return (
                        <div key={index} className="w-100">
                            {type && job.jobId && job?.jobId?.status &&
                                <div>
                                    <i className="fw-bold text-nowrap">{type} on {type === "Saved" ? job.saved_date : job.applied_date}</i> &nbsp;
                                    {job?.jobId?.status !== "approved" && <i className="text-secondary small">This job was removed</i>}
                                </div >
                            }
                            <div style={{ marginBottom: "15px" }}>
                                {type && job.jobId && job?.jobId?.status &&
                                    <Card job={job?.jobId} />

                                }
                                {!type &&
                                    <Card job={job} />
                                }
                            </div>
                        </ div >
                    )
                })}

            <LocationPopup />
            <Toaster message={message} setMessage={setMessage} />
            <InfoPopup />
        </>
    )
}