import Ads from '../pages/common/Ads/Ads';
import Card from './common/Card';

export default function JobCardList({ jobs, type }) {

    const shouldAdsRender = index => {
        if ((index + 1) % 4 !== 0) {
            return false
        } else {
            return true
        }
    }

    if (!jobs || jobs.length === 0) {
        return <h3 className=' h-screen flex justify-center items-center '>No Jobs Found</h3>
    }

    return <>
        {jobs.map((job, index) => (
            <div key={index} className="w-full">
                {type && job.jobId && job?.jobId?.status &&
                    <div>
                        <i className="font-bold text-nowrap">{type} on {type === "Saved" ? job.saved_date : job.applied_date}</i> &nbsp;
                        {job?.jobId?.status !== "approved" && <i className="text-slate-300 text-sm">This job was removed</i>}
                    </div >
                }
                <div className='mb-[15px]'>
                    {type && job.jobId && job?.jobId?.status &&
                        <Card job={job?.jobId} />
                    }
                    {!type &&
                        <Card job={job} />
                    }

                    {shouldAdsRender(index) && <Ads type='short' />}
                </div>
            </ div >
        ))}
    </>
}