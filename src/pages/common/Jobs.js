import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import http from '../../helpers/http';
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Ads from './ads';


function Jobs() {
    const [jobs, setJobs] = useState(null)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const company = searchParams.get("company")
    const [categoriesList, setCategoriesList] = useState("")
    const [parent, setParent] = useState("")
    const location = searchParams.get("location")
    const searchJob = searchParams.get("job")
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const filter = JSON.parse(localStorage.getItem("filter"))
    const [filterFields, setFilterFields] = useState(filter ? filter : {
        search: null,
        location: null,
        jobtype: null,
        jobCategory: null,
        subCategory: null,
        salary: null,
        duration: null,
        weeklyperhour: null
    })
    const ResetFilter = () => {
        setFilterFields({
            search: "",
            location: "",
            jobtype: "",
            jobCategory: "",
            subCategory: "",
            rateperhour: null,
            duration: null,
            weeklyperhour: null
        })
    }

    const handleFilter = () => {
        localStorage.setItem("filter", JSON.stringify(filterFields))
        http.post(`/jobs/filtered-jobs?limit=${itemsPerPage}&skip=0`, filterFields)
            .then((res) => {
                setTotalItems(res.data.total);
                setJobs(res.data.jobs)
            })
            .catch(err => console.log(err))
    }

    const handleRanges = (name, e) => {
        if (name === "duration") {
            if (e.target.value == 0) {
                setFilterFields({ ...filterFields, duration: `Less than a month` })
            } else if (e.target.value == 7) {
                setFilterFields({ ...filterFields, duration: `More than 6 months` })
            } else if (e.target.value == 8) {
                setFilterFields({ ...filterFields, duration: null })
            } else {
                setFilterFields({ ...filterFields, duration: `${e.target.value} Month` })
            }
        }
        if (name === "rateperhour") {
            if (e.target.value == 10) {
                setFilterFields({ ...filterFields, rateperhour: null })
            } else {
                setFilterFields({ ...filterFields, rateperhour: e.target.value })
            }
        }
        if (name === "weeklyperhour") {
            if (e.target.value == 50) {
                setFilterFields({ ...filterFields, weeklyperhour: null })
            } else {
                setFilterFields({ ...filterFields, weeklyperhour: e.target.value })
            }
        }
    }

    useEffect(() => {
        http.get("/categories/all")
            .then((res) => {
                setCategoriesList(res.data)
                let p = [];
                (res.data).map((x, i) => {
                    if (!p.includes(x.parent_id) && x.parent_id !== "None") {
                        p.push(x.parent_id)
                    }
                })
                setParent(p)
            })
        const skip = (pgNumber - 1) * itemsPerPage
        http.post(`/jobs/filtered-jobs?limit=${itemsPerPage}&skip=${skip}`, filterFields)
            .then((res) => {
                setTotalItems(res.data.total);
                setJobs(res.data.jobs)
            })
    }, [])

    function getTrueKeys(obj) {
        // Use Object.keys() to get all keys as an array
        const keys = Object.keys(obj);

        // Filter the keys using Array.filter() and a condition
        const truekeys = keys.filter(key => obj[key] === true);

        // This is because in benefits there is an others option with a text box
        if (truekeys.includes("Others")) {
            truekeys.splice(truekeys.indexOf("Others"), 1)
            truekeys.push(obj.OthersText)
        }
        return truekeys.join(" ")
    }

    const itemsToShow = (pageNumber) => {
        window.location.href = `http://localhost:3000/common/jobs?page=${pageNumber}`
    }

    return <>
        <Header />
        <main id="main" style={{ display: "flex" }}>
            <section className='col-3  p-3 rounded'>
                <div className=' mb-2'>Filters</div>
                <div className='mb-4'>
                    <input type='text' value={filterFields.search} onChange={(e) => { setFilterFields({ ...filterFields, search: e.target.value }) }} className='form-input d-block w-100 rounded shadow-sm p-2 border-0' placeholder='Search by Keyword' />
                </div>

                <div className='mb-2'>
                    <div className='fw-bold'> {filterFields.rateperhour ? `$ ${filterFields.rateperhour}` : "Any Rate Per Hour"}</div>
                    <input type='range' name='rateperhour' value={filterFields.rateperhour} min="1" max="10" onChange={(e) => { handleRanges("rateperhour", e) }} className='form-range' />
                </div>

                <div className='mb-2'>
                    <div className='fw-bold'>{filterFields.duration ? filterFields.duration : "Any Duration"}</div>
                    <input type='range' className='form-range' min="0" max="8" onChange={(e) => { handleRanges("duration", e) }} />
                </div>

                <div className='mb-2'>
                    <div className='fw-bold'>{filterFields.weeklyperhour ? `${filterFields.weeklyperhour} Hours` : "Any Hours"}</div>
                    <input type='range' className='form-range' value={filterFields.weeklyperhour} min="40" max="50" onChange={(e) => { handleRanges("weeklyperhour", e) }} />
                </div>

                <div className='mb-4'>
                    <label className='fw-bold form-label '>Location</label>
                    <input type='text' className='form-input d-block w-100 rounded p-2 shadow-sm border-0' value={filterFields.location} onChange={(e) => { setFilterFields({ ...filterFields, location: e.target.value }) }} placeholder='Type your Location Here' />
                </div>

                <div className='mb-4'>
                    <label className='fw-bold form-label '>Job Type</label>
                    <select className='form-select d-block' value={filterFields.jobtype} onChange={(e) => { setFilterFields({ ...filterFields, jobtype: e.target.value }) }}>
                        <option value=""></option>
                        <option value="FullTime">Full Time</option>
                        <option value="PartTime">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">FreeLance</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Casual">Casual</option>
                    </select>
                </div>

                <div className='mb-4'>
                    <label className='fw-bold form-label' >Job Category</label>
                    <select className='form-select d-block' value={filterFields.jobCategory} onChange={(e) => { setFilterFields({ ...filterFields, jobCategory: e.target.value }) }}>
                        <option value=""></option>
                        {parent && parent.map((p, index) => <option key={index} className="fw-bold" value={p}>{p}</option>)}
                    </select>
                </div>

                <div className='mb-4'>
                    <label className='fw-bold form-label '>Sub Category</label>
                    <select className='form-select d-block ' value={filterFields.subCategory} onChange={(e) => { setFilterFields({ ...filterFields, subCategory: e.target.value }) }}>
                        <option value=""></option>
                        {!filterFields.jobCategory && <option disabled>Please Select Job Category</option>}
                        {categoriesList && categoriesList.map((category, index) => {

                            if (category.parent_id === filterFields.jobCategory) {
                                return <option key={index} value={category.name}>{category.name}</option>
                            }
                        })

                        }
                    </select>
                </div>
                <div className='d-flex justify-content-between'>
                    <button type='button' onClick={ResetFilter} className='btn btn-dark'>Reset</button>
                    <button type='button' onClick={handleFilter} className='btn btn-primary'>Apply</button>
                </div>

            </section>

            <section className="col-7">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <div className="h2">Jobs</div>
                    </div>
                    <div className="container rounded px-5">
                        {jobs && jobs.length > 0 &&
                            jobs.map((job, index) => {
                                return (
                                    <div className='my-job-card'>
                                        <div style={{ cursor: "pointer" }} key={index} onClick={() => { navigate(`/common/SingleJob/${job._id}`) }} className=" row border shadow-sm rounded p-3 mb-3 ">
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
                                                    {new Date(job.creationdate).toLocaleDateString('en-GB')} ( 2 days ago )
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

                                )
                            })}
                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                    </div>
                </div >
            </section >
            <section className='col-2'>
                <Ads />
            </section>


        </main >
        <Footer />
    </>
}

export default Jobs;
