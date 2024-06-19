import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsPerPage } from '../../helpers/constants';
import http from '../../helpers/http';
import Card from '../../components/Card';
import Ads from './ads';

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
            navigate(`/common/Jobs?location=${location}&keyword=${searchJob}`)
        }
    }

    return <>
        <Header />

        <main id="main">
            <div className="container-fluid homeBg">
                <div style={{ height: "50vh", width: "100%" }} className="banner d-flex justify-content-center align-items-center">
                    <div style={{ width: "80%" }} className='input-group gap-2'>
                        <input type="text" className={`rounded form-control opacity-75 ${searchButton}`} value={searchJob} placeholder="Job Title" onChange={(e) => handleInput("job", e)} />
                        <input type="text" className={`rounded form-control opacity-75 ${searchButton}`} value={location} onChange={(e) => handleInput("location", e)} placeholder="Location" />
                        <button type="button" className="btn btn-primary rounded " onClick={handleSearch} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                        <a type="button" href='/common/jobs' className="btn btn-outline-light rounded" >View All Jobs</a>
                    </div>
                </div>
            </div>
            <div className="container-fluid text-center py-5">
                {/* <div className="container-fluid px-3">
                            <div className="d-flex justify-content-between my-3">
                                <div className="h2 ">Jobs</div>
                                <div className="mt-1">
                                    <button className="btn btn-outline-light btn-sm "> Admin - My Jobs</button>
                                </div>
                            </div>
                            <div className="border rounded  px-5 mb-3">
                                <div className="row rounded p-3">

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
                        </div> */}
                <div className='row'>
                    <section className='col-3'>
                        <Ads />
                    </section>
                    <section className='col-6'>
                        <div>
                            <iframe className='rounded' width="560" height="315" src="https://www.youtube.com/embed/7r-If5smQ_s?si=zd0NUcT7rsEV7a4k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                            <div className='fw-bold'>Experience New Zealand with a Working Holiday Visa</div>
                        </div>
                        <div className='mt-5'>
                            <iframe className='rounded' width="560" height="315" src="https://www.youtube.com/embed/P98SjgerM8g?si=x36wJ4kJRg86288m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            <div className='fw-bold'>Life in New Zealand on a Working Holiday Visa</div>
                        </div>
                    </section>
                    <section className='col-3'>
                        <Ads />
                    </section>
                </div>
            </div>
        </main >
        <Footer />
    </>
}

export default Home;
