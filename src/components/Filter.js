import "../pages/common/jobList.css"

import { useEffect, useState } from "react";
import http from "../helpers/http";
import Suggestions from './Suggestions';
import { salaryPerAnnum } from "../helpers/functions/textFunctions";

export default function Filter({ filterFields, setFilterFields, setRefresh }) {
    const [categoriesList, setCategoriesList] = useState(null)
    const [parent, setParent] = useState(null)
    const [focus, setFocus] = useState(-1)
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

    const handleKeyDown = (Suggestions, e) => {
        if (e.keyCode == 40) {
            let current = focus + 1
            if (Suggestions && current > -1 && Suggestions.length > current) {
                setFocus(current);
            }
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
        } else if (e.keyCode == 38) { //ups
            let current = focus - 1
            if (Suggestions && current > -1 && Suggestions.length > current) {
                setFocus(current)
            }
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
        } else if (e.keyCode == 13) {
            if (Suggestions && focus > -1 && Suggestions.length > focus) {
                let filter = { ...filterFields, [e.target.name]: Suggestions[focus].value };
                setFilterFields(filter)
                clearSuggestions()
            }
        }
    }

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
        setFocus(-1)
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
                let values = ["20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "125", "150", "175", "200", "250", "300", "350+"]
                setFilterFields({ ...filterFields, rateperhour: values[e.target.value] })
            } else {
                let values = ["10K", "20K", "30K", "40K", "50K", "60K", "70K", "80K", "90K", "100K", "125K", "150K", "175K", "200K", "250K", "300K", "300K+"]
                setFilterFields({ ...filterFields, rateperhour: values[e.target.value] })
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
            salaryType: "hour"
        })
        setRefresh(prev => !prev)
    }

    return <div className='p-3 filter hide-scrollbar rounded border shadow scrollbar'>
        <form autoComplete="off">
            <div className="fw-bold mb-2">Search By</div>
            <div className="border rounded px-2 py-3 mb-4">
                <div className='mb-4 position-relative'>
                    <input type='text' value={filterFields.jobTitle} name='jobTitle' onKeyDown={(e) => { handleKeyDown(jobSuggestions, e) }} onChange={(e) => handleInput(e)} className='form-input d-block w-100 rounded shadow-sm p-2 border-0' placeholder='Job Title' />
                    <Suggestions SuggestionsList={jobSuggestions} focus={focus} clearSuggestions={clearSuggestions} name="jobTitle" setValue={setFilterFields} value={filterFields} />
                </div>
                <div className='mb-4 position-relative'>
                    <input type='text' name='location' className='form-input d-block w-100 rounded p-2 shadow-sm border-0' value={filterFields.location} onKeyDown={(e) => { handleKeyDown(locationSuggestions, e) }} onChange={(e) => handleInput(e)} placeholder='Location' />
                    <Suggestions SuggestionsList={locationSuggestions} focus={focus} clearSuggestions={clearSuggestions} name="location" setValue={setFilterFields} value={filterFields} />
                </div>

                <div className=' position-relative'>
                    <input type='text' name='company' value={filterFields.company} onChange={(e) => handleInput(e)} onKeyDown={(e) => { handleKeyDown(companySuggestions, e) }} className='form-input d-block w-100 rounded shadow-sm p-2 border-0' placeholder='Company' />
                    <Suggestions SuggestionsList={companySuggestions} focus={focus} clearSuggestions={clearSuggestions} name="company" setValue={setFilterFields} value={filterFields} />
                </div>
            </div>

            <div className='mb-2'>
                <div className='d-flex  small'>
                    <div className='fw-bold text-nowrap'>
                        Minimum Salary
                    </div>
                    <div style={{ fontSize: "10px" }} className="d-flex flex-grow-1  ps-2 align-items-center gap-2">
                        <div className="d-flex align-items-center">
                            <input type="radio" name="salary" id="per annum" checked={filterFields.salaryType === "per annum"} onChange={() => { setFilterFields({ ...filterFields, rateperhour: null, salaryType: "per annum" }) }} />
                            <label className="ms-1" for="per annum">Yearly</label>
                        </div>
                        <div className="d-flex align-items-center ">
                            <input type="radio" name="salary" id="per hour" checked={filterFields.salaryType === "per hour"} onChange={() => { setFilterFields({ ...filterFields, rateperhour: null, salaryType: "per hour" }) }} />
                            <label className="ms-1" for="per hour">Hourly</label>
                        </div>
                    </div>
                    <span className=" ps-1 text-nowrap" >
                        {filterFields.rateperhour ?
                            `$${filterFields.rateperhour}`
                            : "Any"}
                    </span>

                </div>
                <input type='range' name='rateperhour' min={0} max={filterFields.salaryType === "per hour" ? 24 : 17} defaultValue={0} onChange={(e) => { handleRanges("rateperhour", e) }} className='form-range' />
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
                <input type='range' className='form-range' value={filterFields.weeklyperhour} min="40" max="50" defaultValue="50" onChange={(e) => { handleRanges("weeklyperhour", e) }} />
            </div>
            <div className='mb-4'>
                <label className='fw-bold form-label '>Job Type</label>
                <select className='form-select d-block' value={filterFields.jobtype} onChange={(e) => { setFilterFields({ ...filterFields, jobtype: e.target.value }) }}>
                    <option value="">Any</option>
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
                <button type='button' onClick={handleFilter} className='btn border-dark btn-primary'>Apply</button>
                <button type='button' onClick={ResetFilter} className='btn btn-outline-light text-dark border-success'>Clear</button>
            </div>
        </form >

    </div >
}