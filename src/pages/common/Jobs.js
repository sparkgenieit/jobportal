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
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const company = searchParams.get("company")
    const [categoriesList, setCategoriesList] = useState("")
    const [parent, setParent] = useState("")
    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
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

        // To load to appropriate page regarding the filters and page Number
        const skip = (pgNumber - 1) * itemsPerPage
        http.post(`/jobs/filtered-jobs?limit=${itemsPerPage}&skip=${skip}`, filterFields)
            .then((res) => {
                setTotalItems(res.data.total);
                setJobs(res.data.jobs)
            })
            .catch(err => setTotalItems([]))
    }, [])

    const ResetFilter = () => {
        localStorage.removeItem("filter");
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
                                    <Card key={index} job={job} />
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
