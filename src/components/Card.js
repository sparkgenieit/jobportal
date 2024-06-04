import './Card.css';
import { getTrueKeys, timeAgo } from "../helpers/functions";

export default function Card({ job }) {
    return <div className='my-job-card'>
        <div style={{ cursor: "pointer" }} onClick={() => { window.location.href = `/common/SingleJob/${job._id}` }} className=" row border shadow-sm rounded p-3 mb-3 ">
            <div className='col-10'>
                <p className='h3'>{job.jobTitle}</p>
                <p className='text-secondary'>{job.company}</p>
                <div className='d-flex h5 justify-content-around mb-3'>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                    </svg>
                        <span className='ps-2'>{job.rateperhour} </span></span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M12 2a7.008 7.008 0 0 0-7 7c0 5.353 6.036 11.45 6.293 11.707l.707.707.707-.707C12.964 20.45 19 14.353 19 9a7.008 7.008 0 0 0-7-7zm0 16.533C10.471 16.825 7 12.553 7 9a5 5 0 0 1 10 0c0 3.546-3.473 7.823-5 9.533z" /><path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" /></svg>
                        <span className='ps-2'>{job.location} </span>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                        <span className='ps-2'>{job.duration} </span>
                    </span>
                    <span>
                        {job.numberofvacancies > 1 && <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <span className='ps-2'>{job.numberofvacancies} </span>
                        </>}
                    </span>

                </div>
                <div className='h6'>
                    <div className='p-1'>{job.training.includes("true") && "Training Provided"}</div>
                    <div className='p-1'>{job.benifits && getTrueKeys(JSON.parse(job.benifits))}</div>
                </div>
                <p className='text-secondary'>
                    {job.description}
                </p>
                <div className='h6'>
                    {new Date(job.creationdate).toLocaleDateString('en-GB')} ( {timeAgo(job.creationdate)} )
                </div>
            </div>
            <div className='col-2 d-flex flex-column justify-content-between align-items-center '>
                <div>
                    <img className="rounded" src={`http://localhost:8080/uploads/logos/${job.companyLogo}`} width="70px" height="50px" alt="" />
                </div>
                <div className='d-flex gap-2'>
                    <a type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21"><path d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z" /></svg>

                    </a>
                    <a type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                    </a>
                </div>

            </div>

        </div>
    </div>

}