import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../../helpers/http';
import Ads from './ads';
import { IoSearch } from "react-icons/io5";

function Home() {
    const [location, setLocation] = useState("")
    const [searchJob, setSearchJob] = useState("")
    const [searchButton, setSearchButton] = useState("")
    const [locationSuggestions, setLocationSuggestions] = useState(null)
    const [jobSuggestions, setJobSuggestions] = useState(null)
    const navigate = useNavigate();

    const handleInput = async (name, event) => {
        if (name === "location") {
            setLocation(event.target.value)
        }
        if (name === "jobTitle") {
            setSearchJob(event.target.value)
        }
        let { data } = await http.get(`/jobs/suggestions?searchTerm=${name}&searchValue=${event.target.value}`)
        name === "location" ? setLocationSuggestions(data) : setLocationSuggestions(null)
        name === "jobTitle" ? setJobSuggestions(data) : setJobSuggestions(null)
    }

    const clearSuggestions = () => {
        setJobSuggestions(null);
        setLocationSuggestions(null);
    }

    const handleSearch = () => {
        // checking if the user has enter any one of the fields and trim is used because the user can enter a space and the condition will satisfy
        if (location.trim() === "" && searchJob.trim() === "") {
            setSearchButton("border border-2 border-danger")
        } else {
            navigate(`/common/Jobs?location=${location}&keyword=${searchJob}`)
        }
    }

    return <>
        <Header />
        <main id="main">
            <div className="container-fluid homeBg">
                <form>
                    <div style={{ height: "50vh", width: "100%" }} className="banner">
                        <div className='d-flex align-items-center justify-content-center h-100 gap-2'>
                            <div className='position-relative'>
                                <input type="text" className={` transparent border-white p-1 rounded text-white fw-bold ${searchButton}`} value={searchJob} placeholder="Job Title" onChange={(e) => handleInput("jobTitle", e)} />
                                <ul className='list-unstyled w-100 position-absolute px-1 '>
                                    {jobSuggestions && jobSuggestions.length > 0 && jobSuggestions.map((suggestion, i) => {
                                        return <li role="button" onClick={() => { setSearchJob(suggestion.value); clearSuggestions() }} className=' rounded px-2 py-1 border bg-light text-dark'>{suggestion.value}</li>
                                    })
                                    }
                                </ul>
                            </div>


                            <div className='position-relative'>
                                <input type="text" className={`transparent border-white p-1 rounded text-white fw-bold ${searchButton}`} value={location} onChange={(e) => handleInput("location", e)} placeholder="Location" />
                                <ul className='list-unstyled w-100  px-1 position-absolute'>
                                    {locationSuggestions && locationSuggestions.length > 0 && locationSuggestions.map((suggestion, i) => {
                                        return <li role="button" onClick={() => { setLocation(suggestion.value); clearSuggestions() }} className=' rounded px-2 py-1 border bg-light text-dark'>{suggestion.value}</li>
                                    })
                                    }
                                </ul>
                            </div>

                            <div>
                                <button type="button" onClick={handleSearch} className='transparent hover btn text-white'>
                                    <IoSearch size="20px" />
                                </button>
                            </div>
                            <div>
                                <Link type="button" to="/common/jobs" className="transparent hover btn text-white" >View All Jobs</Link>
                            </div>
                        </div>
                    </div>
                </form>
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
