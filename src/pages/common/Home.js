import './Home.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

import http from '../../helpers/http';
import Ads from './ads';
import NZMap from '../../components/NZMap';
import ComboBox from '../../components/ComboBox';

function Home() {
    const [searchBox, setSearchBox] = useState({
        jobTitle: "",
        location: ""
    })
    const [searchButton, setSearchButton] = useState("")
    const [locationSuggestions, setLocationSuggestions] = useState(null)
    const [jobSuggestions, setJobSuggestions] = useState(null)
    const navigate = useNavigate();

    const handleInput = async (name, event) => {
        setSearchBox({ ...searchBox, [name]: event.target.value })
        try {
            let { data } = await http.get(`/jobs/suggestions?searchTerm=${name}&searchValue=${event.target.value}`)
            name === "location" ? setLocationSuggestions(data) : setLocationSuggestions(null)
            name === "jobTitle" ? setJobSuggestions(data) : setJobSuggestions(null)
        }
        catch {
            clearSuggestions()
        }
    }

    useEffect(() => {
        document.title = "Working Holiday Jobs New Zealand"
    }, [])


    const clearSuggestions = () => {
        setJobSuggestions(null);
        setLocationSuggestions(null);
    }

    const handleSearch = () => {
        // checking if the user has enter any one of the fields and trim is used because the user can enter a space and the condition will satisfy
        if (searchBox.location.trim() === "" && searchBox.jobTitle.trim() === "") {
            setSearchButton("border border-2 border-danger")
        } else {
            navigate(`/jobs?location=${searchBox.location}&keyword=${searchBox.jobTitle}`)
        }
    }

    return <>
        <main className='container-fluid m-0  p-0' >
            <div className="banner d-flex justify-content-center  flex-column gap-2 ">
                <div className='d-flex flex-column  align-items-center justify-content-center fw-bold fs-4 '>
                    <span>Kia ora!</span>
                    <span>Welcome to New Zealand</span>
                </div>
                <form autoComplete='off' className='d-flex flex-md-row flex-column gap-3 search-bar'>
                    <div className='d-flex  flex-grow-1  gap-2'>
                        <div className='flex-grow-1'>
                            <ComboBox
                                suggestions={jobSuggestions}
                                setSuggestions={setJobSuggestions}
                                onEnter={(suggestion) => {
                                    setSearchBox({ ...searchBox, jobTitle: suggestion.value })
                                    clearSuggestions()
                                }}
                                label={"value"}
                                suggestionValue={"value"}
                                type="text"
                                className={`transparent w-100 border-white p-1 rounded text-white ${searchButton}`}
                                value={searchBox.jobTitle}
                                placeholder="Job Title"
                                name='jobTitle'
                                onChange={(e) => handleInput("jobTitle", e)}
                            />
                        </div>

                        <div className='flex-grow-1'>

                            <ComboBox
                                suggestions={locationSuggestions}
                                setSuggestions={setLocationSuggestions}
                                onEnter={(suggestion) => {
                                    setSearchBox({ ...searchBox, location: suggestion.value })
                                    clearSuggestions()
                                }}
                                label={"value"}
                                suggestionValue={"value"}
                                type="text"
                                className={`transparent w-100 border-white p-1 rounded text-white ${searchButton}`}
                                value={searchBox.location}
                                placeholder="Location"
                                name='location'
                                onChange={(e) => handleInput("location", e)}
                            />
                        </div>


                        <button type="button" onClick={handleSearch} className='transparent  hover btn text-white'>
                            <IoSearch size="24px" />
                        </button>


                    </div>

                    <Link type="button" to="/jobs" className="transparent hover btn border border-white text-white" >View All Jobs</Link>
                </form>
            </div>

            <div className="container-fluid text-center py-3">
                <div className='pb-4 pt-2 '>
                    <NZMap />
                </div>
                <div className='row'>
                    <section className='col-12 col-lg-2'>
                        <Ads />
                    </section>
                    <section className=' d-flex flex-column gap-5 col-12 col-lg-8'>
                        <div>
                            <iframe className='rounded youtube-video' src="https://www.youtube.com/embed/7r-If5smQ_s?si=zd0NUcT7rsEV7a4k" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                            </iframe>
                            <div className='fw-bold'>Experience New Zealand with a Working Holiday Visa</div>
                        </div>
                        <div className='mt-5'>
                            <iframe className='rounded youtube-video' src="https://www.youtube.com/embed/P98SjgerM8g?si=x36wJ4kJRg86288m" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            <div className='fw-bold'>Life in New Zealand on a Working Holiday Visa</div>
                        </div>
                    </section>
                    <section className='col-12 col-lg-2'>
                        <Ads />
                    </section>
                </div>
            </div>
        </main >
    </>
}

export default Home;
