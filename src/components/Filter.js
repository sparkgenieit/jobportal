import "../pages/common/jobList.css"

import { useEffect, useState } from "react";
import http from "../helpers/http";
import ComboBox from "./ComboBox";

const PER_HOUR_VALUES = ["20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "125", "150", "175", "200", "250", "300", "350+", null]
const PER_ANNUM_VALUES = ["10K", "20K", "30K", "40K", "50K", "60K", "70K", "80K", "90K", "100K", "125K", "150K", "175K", "200K", "250K", "300K", "300K+", null]

export default function Filter({ filterFields, setFilterFields, setRefresh }) {
    const [categoriesList, setCategoriesList] = useState(null)
    const [parent, setParent] = useState(null)
    const [locationSuggestions, setLocationSuggestions] = useState(null)
    const [jobSuggestions, setJobSuggestions] = useState(null)
    const [companySuggestions, setCompanySuggestions] = useState(null)

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


    const handleInput = async (e) => {
        let filter = { ...filterFields, [e.target.name]: e.target.value };
        setFilterFields(filter)
        try {
            let { data } = await http.get(`/jobs/suggestions?searchTerm=${e.target.name}&searchValue=${e.target.value}`)
            e.target.name === "location" ? setLocationSuggestions(data) : setLocationSuggestions(null)
            e.target.name === "jobTitle" ? setJobSuggestions(data) : setJobSuggestions(null)
            e.target.name === "company" ? setCompanySuggestions(data) : setCompanySuggestions(null)
        }
        catch {
            clearSuggestions()
        }
    }

    const clearSuggestions = () => {
        setJobSuggestions(null);
        setCompanySuggestions(null);
        setLocationSuggestions(null);
    }

    const handleRanges = (name, e) => {
        if (name === "duration") {
            if (e.target.value == 1) {
                setFilterFields({ ...filterFields, duration: `1 month` })
            } else if (e.target.value == 7) {
                setFilterFields({ ...filterFields, duration: `6+ months` })
            } else if (e.target.value == 8) {
                setFilterFields({ ...filterFields, duration: `Permanent` })
            }
            else if (e.target.value == 9) {
                setFilterFields({ ...filterFields, duration: null })
            } else {
                setFilterFields({ ...filterFields, duration: `${e.target.value} Months` })
            }
        }
        if (name === "rateperhour") {
            if (filterFields.salaryType === "per hour") {
                setFilterFields({ ...filterFields, rateperhour: PER_HOUR_VALUES[e.target.value] })
            } else {

                setFilterFields({ ...filterFields, rateperhour: PER_ANNUM_VALUES[e.target.value] })
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

    const handleFilter = () => {
        sessionStorage.setItem("filter", JSON.stringify(filterFields))
        window.history.replaceState(null, null, '/common/jobs')
        setRefresh(prev => !prev)
    }

    const ResetFilter = () => {
        sessionStorage.removeItem("filter");
        window.history.replaceState(null, null, '/common/jobs')
        setFilterFields({
            company: "",
            jobTitle: "",
            location: "",
            jobtype: "",
            jobCategory: "",
            subCategory: "",
            rateperhour: null,
            duration: null,
            weeklyperhour: null,
            date: null,
            sort: "creationdate",
            salaryType: "per hour"
        })
        setRefresh(prev => !prev)
    }

    return <div className='p-3 filter hide-scrollbar rounded border  scrollbar'>
        <form autoComplete="off">
            <div className="fw-bold mb-2">Search By</div>
            <div className="border rounded px-2 py-3 mb-4 d-flex gap-4 flex-column">

                <ComboBox
                    suggestions={jobSuggestions}
                    setSuggestions={setJobSuggestions}
                    onEnter={(suggestion) => {
                        setFilterFields({ ...filterFields, jobTitle: suggestion.value })
                        clearSuggestions()
                    }}
                    label={"value"}
                    suggestionValue={"value"}
                    type='text'
                    value={filterFields.jobTitle}
                    name='jobTitle'
                    onChange={(e) => handleInput(e)}
                    className='form-input d-block w-100 rounded shadow-sm p-2 border-0'
                    placeholder='Job Title'
                    onFocusClasses="border border-dark"
                />

                <ComboBox
                    suggestions={locationSuggestions}
                    setSuggestions={setLocationSuggestions}
                    onEnter={(suggestion) => {
                        setFilterFields({ ...filterFields, location: suggestion.value })
                        clearSuggestions()
                    }}
                    label={"value"}
                    suggestionValue={"value"}
                    type='text'
                    value={filterFields.location}
                    name='location'
                    onChange={(e) => handleInput(e)}
                    className='form-input d-block w-100 rounded shadow-sm p-2 border-0'
                    placeholder='Location'
                    onFocusClasses="border border-dark"
                />

                <ComboBox
                    suggestions={companySuggestions}
                    setSuggestions={setCompanySuggestions}
                    onEnter={(suggestion) => {
                        setFilterFields({ ...filterFields, company: suggestion.value })
                        clearSuggestions()
                    }}
                    label={"value"}
                    suggestionValue={"value"}
                    type='text'
                    value={filterFields.company}
                    name='company'
                    onChange={(e) => handleInput(e)}
                    className='form-input d-block w-100 rounded shadow-sm p-2 border-0'
                    placeholder='Company'
                    onFocusClasses="border border-dark"
                />

            </div>

            <div className='mb-2'>
                <div className='d-flex  small'>
                    <div className='fw-bold text-nowrap'>
                        Minimum Salary
                    </div>
                    <div style={{ fontSize: "10px" }} className="d-flex flex-grow-1  ps-2 align-items-center gap-2">
                        <div className="d-flex align-items-center">
                            <input type="radio" name="salary" id="per annum" checked={filterFields.salaryType === "per annum"} onChange={() => { setFilterFields({ ...filterFields, rateperhour: PER_ANNUM_VALUES[PER_HOUR_VALUES.indexOf(filterFields.rateperhour)] || PER_ANNUM_VALUES[16], salaryType: "per annum" }) }} />
                            <label className="ms-1" htmlFor="per annum">Yearly</label>
                        </div>
                        <div className="d-flex align-items-center ">
                            <input type="radio" name="salary" id="per hour" checked={filterFields.salaryType === "per hour"} onChange={() => { setFilterFields({ ...filterFields, rateperhour: PER_HOUR_VALUES[PER_ANNUM_VALUES.indexOf(filterFields.rateperhour)], salaryType: "per hour" }) }} />
                            <label className="ms-1" htmlFor="per hour">Hourly</label>
                        </div>
                    </div>
                    <span className=" ps-1 text-nowrap" >
                        {filterFields.rateperhour ?
                            `$${filterFields.rateperhour}`
                            : "Any"}
                    </span>

                </div>
                {filterFields.salaryType === "per hour" && < input type='range' name='rateperhour' value={PER_HOUR_VALUES.indexOf(filterFields.rateperhour)} min={0} max={24} onChange={(e) => { handleRanges("rateperhour", e) }} className='form-range' />}
                {filterFields.salaryType === "per annum" && <input type='range' name='rateperhour' value={PER_ANNUM_VALUES.indexOf(filterFields.rateperhour)} min={0} max={17} onChange={(e) => { handleRanges("rateperhour", e) }} className='form-range' />}
            </div>

            <div className='mb-2'>
                <div className='d-flex justify-content-between'>
                    <span className='fw-bold'>Duration  </span>
                    <span >{filterFields.duration ? filterFields.duration : "Any"}</span>
                </div>
                <input type='range' className='form-range' min="1" max="9" defaultValue="9" onChange={(e) => { handleRanges("duration", e) }} />
            </div>

            <div className='mb-2'>
                <div className='d-flex justify-content-between'>
                    <span className='fw-bold'>Date Posted  </span>
                    <span>{filterFields.date ? `${filterFields.date}d ago` : "Any "}</span>
                </div>
                <input type='range' className='form-range' min="0" max="5" defaultValue="5" onChange={(e) => { handleRanges("date", e) }} />
            </div>

            <div className='mb-2'>
                <div className='d-flex justify-content-between'>
                    <span className='fw-bold'>Weekly Hours  </span>
                    <span>{filterFields.weeklyperhour ? `${filterFields.weeklyperhour} Hours` : "Any "}</span>
                </div>
                <input type='range' className='form-range' value={filterFields.weeklyperhour} min="40" max="50" onChange={(e) => { handleRanges("weeklyperhour", e) }} />
            </div>
            <div className='mb-4'>
                <label className='fw-bold form-label '>Job Type</label>
                <select className='form-select d-block' value={filterFields.jobtype} onChange={(e) => { setFilterFields({ ...filterFields, jobtype: e.target.value }) }}>
                    <option value="">Any</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Casual">Casual</option>
                </select>
            </div>

            <div className='mb-4'>
                <label className='fw-bold form-label' >Job Category</label>
                <select className='form-select d-block' value={filterFields.jobCategory} onChange={(e) => { setFilterFields({ ...filterFields, jobCategory: e.target.value }) }}>
                    <option value="">Any</option>
                    {parent && parent.map((p, index) => <option key={index} className="fw-bold" value={p}>{p}</option>)}
                </select>
            </div>

            {/* <div className='mb-4'>
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

            </div> */}

            <div className='d-flex justify-content-end gap-2'>
                <button type='button' onClick={handleFilter} className='btn border-dark btn-primary btn-responsive'>Apply</button>
                <button type='button' onClick={ResetFilter} className='btn btn-outline-light text-dark border-success btn-responsive'>Clear</button>
            </div>
        </form >

    </div >
}