import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsPerPage } from '../../helpers/constants';
import http from '../../helpers/http';
import Card from '../../components/Card';

function Home() {
    const [jobs, setJobs] = useState(null)
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    const [searchJob, setSearchJob] = useState("")
    const navigate = useNavigate()
    const [searchButton, setSearchButton] = useState("")
    const [companySuggestions, setCompanySuggestions] = useState(null)
    const [locationSuggestions, setLocationSuggestions] = useState(null)
    const [jobSuggestions, setJobSuggestions] = useState(null)

    useEffect(() => {
        http.get(`/jobs/approved?limit=${itemsPerPage}&skip=0`)
            .then((response) => { setJobs(response.data.jobs) })
    }, [])

    const handleInput = (name, event) => {

        if (name === "company") {
            setCompany(event.target.value)
            clearSuggestions("company")
            let cmpy = []
            jobs.map((job) => {
                if (job.company.toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (!cmpy.includes(job.company)) {
                        cmpy.push(job.company)
                    }
                }
            })
            setCompanySuggestions(cmpy.slice(0, 3))
            if (event.target.value !== "") {
                setSearchButton("")
            }
        }
        if (name === "location") {
            setLocation(event.target.value)
            clearSuggestions("location")
            let locn = []
            jobs.map((job) => {
                if (job.location.toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (!locn.includes(job.location)) {
                        locn.push(job.location)
                    }
                }
            })

            setLocationSuggestions(locn.slice(0, 3))

            if (event.target.value !== "") {
                setSearchButton("")
            }

        }
        if (name === "job") {
            setSearchJob(event.target.value)
            clearSuggestions("job")
            let searchjob = []
            jobs.map((job) => {
                if (job.jobTitle.toLowerCase().includes(event.target.value.toLowerCase())) {
                    if (!searchjob.includes(job.jobTitle)) {
                        searchjob.push(job.jobTitle)
                    }
                }
            })

            setJobSuggestions(searchjob.slice(0, 3))

            if (event.target.value !== "") {
                setSearchButton("")
            }
        }

    }

    const clearSuggestions = (name) => {
        if (name === "company") {
            setLocationSuggestions(null);
            setJobSuggestions(null);
        }
        if (name === "location") {
            setCompanySuggestions(null);
            setJobSuggestions(null);
        }
        if (name === "job") {
            setCompanySuggestions(null);
            setLocationSuggestions(null)
        }
    }

    const handleSearch = () => {
        // checking if the user has enter any one of the fields and trim is used because the user can enter a space and the condition will satisfy
        if (company.trim() === "" && location.trim() === "" && searchJob.trim() === "") {
            setSearchButton("border border-2 border-danger")
        } else {
            navigate(`/common/Jobs?company=${company}&location=${location}&keyword=${searchJob}`)
        }
    }

    return <>
        <Header />

        <main id="main">

            <section class="inner-page">
                <div class="container-fluid homeBg">
                    <div>
                        <div className="text-center banner">
                            <div class="mt-5">
                                <h3>The <span class=" text-success">#1</span> Job Board for hiring or Find your next job</h3>
                                <p>Each month, more than 3 million job seekers turn to website in their search for work, making over
                                    1,40,000 applications every single day </p>
                            </div>
                            <div class="text-center">
                                <div class="p-1 d-flex justify-content-around">
                                    <div className='parent'>
                                        <input type="text" className={`form-control col ${searchButton}`} onClick={() => { clearSuggestions("company") }} value={company} onChange={(e) => handleInput("company", e)} placeholder="Company" />


                                        <div className='suggestions'>
                                            {companySuggestions && companySuggestions.map((sug, i) => {
                                                return <div className='suggestions-items' key={i} onClick={() => { setCompany(sug); setCompanySuggestions(null) }}>{sug}</div>
                                            })}
                                        </div>

                                    </div>
                                    <div className='parent'>
                                        <input type="text" className={`form-control col ${searchButton}`} onClick={() => { clearSuggestions("location") }} value={location} onChange={(e) => handleInput("location", e)} placeholder="Location" />
                                        <div className="suggestions">
                                            {locationSuggestions && locationSuggestions.map((sug, i) => {
                                                return <div className='suggestions-items' key={i} onClick={() => { setLocation(sug); setLocationSuggestions(null) }}>{sug}</div>
                                            })}
                                        </div>
                                    </div>
                                    <div className='parent'>
                                        <input type="text" className={`form-control col ${searchButton}`} onClick={() => { clearSuggestions("job") }} value={searchJob} placeholder="Job" onChange={(e) => handleInput("job", e)} />
                                        <div className="suggestions">
                                            {jobSuggestions && jobSuggestions.map((sug, i) => {
                                                return <div className='suggestions-items' key={i} onClick={() => { setSearchJob(sug); setJobSuggestions(null) }}>{sug}</div>
                                            })}
                                        </div>
                                    </div>
                                    <div className='col-3'>

                                        <button type="button" class="btn btn-primary col-12" onClick={handleSearch} >Search</button>
                                    </div>
                                </div>
                                <div class="">Popular Searches: Designer,Web ,IOS, Developer, PHP, Senior, Engineer</div>

                            </div>

                            <div class="row mt-2">
                                <div class="col-2 m-3">
                                    <p><span class="h4 fw-bolder">2,568+ </span> <br />JobPosted</p>

                                </div>
                                <div class="col-2 m-3" >
                                    <p><span class="h4 fw-bolder">3862+ </span><br />Recruiting</p>

                                </div>
                                <div class="col-2 m-3">
                                    <p><span class="h4 fw-bolder">15k+</span>  <br />Freshers</p>

                                </div>
                                <div class="col-2 m-3">
                                    <p><span class="h4 fw-bolder">15k+</span> <br /> FreeLancers</p>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="container">

                        <div class="container-fluid px-3">
                            <div class="d-flex justify-content-between my-3">
                                <div class="h2 ">Jobs</div>
                                <div class="mt-1">
                                    <button class="btn btn-outline-light btn-sm "> Admin - My Jobs</button>
                                </div>
                            </div>
                            <div class="border rounded  px-5 mb-3">
                                <div class="row rounded p-3">

                                    {jobs && jobs.length > 0 &&
                                        jobs.map((job, index) => {
                                            return (
                                                <Card key={index} job={job} />
                                            )
                                        })}
                                    <div className='d-flex justify-content-end text-decoration-underline text-primary '>
                                        <a href='/common/Jobs'>View All Jobs</a>
                                    </div>

                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </section>


        </main>
        <Footer />
    </>
}

export default Home;
