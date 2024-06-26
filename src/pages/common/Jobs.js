import './jobList.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import http from '../../helpers/http';
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Ads from './ads';
import Card from '../../components/Card';

function Jobs() {
    const [jobs, setJobs] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [categoriesList, setCategoriesList] = useState("")
    const [parent, setParent] = useState("")
    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
    const company = searchParams.get("company")
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [refresh, setRefresh] = useState(true)
    const filter = JSON.parse(localStorage.getItem("filter"))
    const [filterFields, setFilterFields] = useState({
        company: null,
        search: null,
        location: null,
        jobtype: null,
        jobCategory: null,
        subCategory: null,
        salary: null,
        duration: null,
        date: null,
        weeklyperhour: null,
        sort: "creationdate"
    })
    const navigate = useNavigate();

    useEffect(() => {
        // To Fetch all the categories from the database
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
            .catch(err => setParent([]))


    }, [])

    useEffect(() => {
        let currentFilters = { ...filter }
        if (location && location.trim() != "") {
            currentFilters.location = location;
        }
        if (company && company.trim() != "") {
            currentFilters.company = company;
        }
        if (keyword && keyword.trim() != "") {
            currentFilters.search = keyword;
        }
        setFilterFields(currentFilters)
        // To load to appropriate page regarding the filters and page Number
        const skip = (pgNumber - 1) * itemsPerPage
        http.post(`/jobs/filtered-jobs?limit=${itemsPerPage}&skip=${skip}`, currentFilters)
            .then((res) => {
                setTotalItems(res.data.total);
                setJobs(res.data.jobs)
            })
            .catch(err => setTotalItems([]))
    }, [refresh])

    const ResetFilter = () => {
        localStorage.removeItem("filter");
        setFilterFields({
            company: "",
            search: "",
            location: "",
            jobtype: "",
            jobCategory: "",
            subCategory: "",
            rateperhour: null,
            duration: null,
            weeklyperhour: null,
            date: null,
            sort: "creationdate"
        })
        setRefresh(!refresh)
    }

    const handleFilter = () => {
        localStorage.setItem("filter", JSON.stringify(filterFields))
        setRefresh(!refresh)
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
        if (name === "date") {
            if (e.target.value == 5) {
                setFilterFields({ ...filterFields, date: null })
            } else {
                let value = [1, 2, 3, 7, 14]
                setFilterFields({ ...filterFields, date: value[e.target.value] })
            }
        }
    }

    const handleInput = (e) => {
        setFilterFields({ ...filterFields, [e.target.name]: e.target.value })
    }

    const handleSort = (e) => {
        let filters = { ...filterFields }
        filters.sort = e.target.value;
        setFilterFields(filters);
        localStorage.setItem("filter", JSON.stringify(filters))
        setRefresh(!refresh)
    }
    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        navigate(`/common/jobs?page=${pageNumber}`)
        setRefresh(!refresh)
    }

    return <>
        <Header />
        <main id="main" className='d-flex'>
            <section style={{ height: "fit-content" }} className='col-3  p-3 rounded border shadow'>
                <div className=' mb-2'>Filters</div>
                <div className='mb-4'>
                    <input type='text' value={filterFields.search} name='search' onChange={(e) => handleInput(e)} className='form-input d-block w-100 rounded shadow-sm p-2 border-0' placeholder='Search by Job Title' />
                </div>
                <div className='mb-4'>
                    <input type='text' name='location' className='form-input d-block w-100 rounded p-2 shadow-sm border-0' value={filterFields.location} onChange={(e) => handleInput(e)} placeholder='Type Location Here' />
                </div>

                <div className='mb-4'>
                    <input type='text' name='company' value={filterFields.company} onChange={(e) => handleInput(e)} className='form-input d-block w-100 rounded shadow-sm p-2 border-0' placeholder='Search by Company' />
                </div>

                <div className='mb-2'>
                    <div className='d-flex justify-content-between'>
                        <span>Rate per hour : </span>
                        <span className='fw-bold'>{filterFields.rateperhour ? `$ ${filterFields.rateperhour}` : "Any Rate Per Hour"}</span>
                    </div>
                    <input type='range' name='rateperhour' value={filterFields.rateperhour} min="1" max="10" defaultValue="10" onChange={(e) => { handleRanges("rateperhour", e) }} className='form-range' />
                </div>

                <div className='mb-2'>
                    <div className='d-flex justify-content-between'>
                        <span>Duration : </span>
                        <span className='fw-bold'>{filterFields.duration ? filterFields.duration : "Any Duration"}</span>
                    </div>
                    <input type='range' className='form-range' min="0" max="8" defaultValue="8" onChange={(e) => { handleRanges("duration", e) }} />
                </div>

                {/* <div className='mb-2'>
                    <div className='fw-bold'></div>
                    <input type='range' className='form-range' min="0" max="8" />
                </div> */}

                <div className='mb-2'>
                    <div className='d-flex justify-content-between'>
                        <span>Date Posted : </span>
                        <span className='fw-bold'>{filterFields.date ? `${filterFields.date}d ago` : "Any day"}</span>
                    </div>
                    <input type='range' className='form-range' min="0" max="5" defaultValue="5" onChange={(e) => { handleRanges("date", e) }} />
                </div>

                <div className='mb-2'>
                    <div className='d-flex justify-content-between'>
                        <span>Weekly Hours : </span>
                        <span className='fw-bold'>{filterFields.weeklyperhour ? `${filterFields.weeklyperhour} Hours` : "Any Hours"}</span>
                    </div>
                    <input type='range' className='form-range' value={filterFields.weeklyperhour} min="40" max="50" defaultValue="50" onChange={(e) => { handleRanges("weeklyperhour", e) }} />
                </div>
                <div className='mb-4'>
                    <label className='fw-bold form-label '>Job Type</label>
                    <select className='form-select d-block' value={filterFields.jobtype} onChange={(e) => { setFilterFields({ ...filterFields, jobtype: e.target.value }) }}>
                        <option value="">-- Any --</option>
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
                        <option value="">-- Any --</option>
                        {parent && parent.map((p, index) => <option key={index} className="fw-bold" value={p}>{p}</option>)}
                    </select>
                </div>

                <div className='mb-4'>
                    <label className='fw-bold form-label '>Sub Category</label>
                    <select className='form-select d-block ' value={filterFields.subCategory} onChange={(e) => { setFilterFields({ ...filterFields, subCategory: e.target.value }) }}>
                        <option value="">-- Any --</option>
                        {!filterFields.jobCategory && <option disabled>Please Select Job Category</option>}
                        {categoriesList && categoriesList.map((category, index) => {
                            if (category.parent_id === filterFields.jobCategory) {
                                return <option key={index} value={category.name}>{category.name}</option>
                            }
                        })
                        }
                    </select>

                </div>

                <div className='d-flex justify-content-end gap-2'>
                    <button type='button' onClick={handleFilter} className='btn border-dark btn-primary'>Apply</button>
                    <button type='button' onClick={ResetFilter} className='btn btn-outline-light text-dark border-success'>Clear</button>
                </div>

            </section>

            <section className="col-6">
                <div className="container-fluid">
                    <div className='d-flex justify-content-end mb-1'>
                        <label className='small px-2'>Sort By:</label>
                        <select className='rounded px-1' value={filterFields.sort} onChange={(e) => { handleSort(e) }}>
                            <option value="creationdate">Creation Date</option>
                            <option value="rateperhour">Rate per Hour</option>
                            <option value="weeklyperhour">Weekly Hours</option>
                        </select>
                    </div>
                    <div className="container rounded px-3 mb-3">
                        {jobs && jobs.length == 0 && <h2 className='m-2 text-center'>No Jobs Found</h2>}
                        {jobs && jobs.length > 0 &&
                            jobs.map((job, index) => {
                                return (
                                    <Card key={index} job={job} />
                                )
                            })}
                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                    </div>
                </div >
            </section >
            <section className='col-3'>
                <Ads />
            </section>
        </main >
        <Footer />
    </>
}

export default Jobs;
