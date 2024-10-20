import LocationPopup from "./LocationPopup"
import Toaster from "./Toaster"
import { useContext } from 'react';
import { JobsContext } from '../helpers/Context';
import Card from './Card';

import InfoPopup from './InfoPopup';

export default function JobCardList({ jobs, type }) {

    const { info, setInfo, message, setMessage } = useContext(JobsContext)


    return (
        <>
            {jobs && jobs.length == 0 && <h2 className='m-2 text-center'>No Jobs Found</h2>}
            {jobs && jobs.length > 0 &&
                jobs.map((job, index) => {
                    return (
                        <div key={index}>
                            {type && job.jobId && job?.jobId?.status &&
                                <div style={{ width: "45vw" }}>
                                    <i className="fw-bold">{type} on {type === "Saved" ? job.saved_date : job.applied_date}</i> &nbsp;
                                    {job?.jobId?.status !== "approved" && <i className="text-secondary small">This job was removed</i>}
                                </div>
                            }
                            <div style={{ marginBottom: "15px" }}>
                                {type && job.jobId && job?.jobId?.status &&
                                    <Card job={job?.jobId} />

                                }
                                {!type &&
                                    <Card job={job} />
                                }
                            </div>
                        </ div>
                    )
                })}

            <LocationPopup />
            <Toaster message={message} setMessage={setMessage} />
            <InfoPopup />
        </>
    )
}