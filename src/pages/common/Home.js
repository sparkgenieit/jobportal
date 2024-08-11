import './Home.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

import http from '../../helpers/http';
import Ads from './ads';
import Suggestions from '../../components/Suggestions';
import NZMap from '../../components/NZMap';

function Home() {
    const [searchBox, setSearchBox] = useState({
        jobTitle: "",
        location: ""
    })
    const [searchButton, setSearchButton] = useState("")
    const [locationSuggestions, setLocationSuggestions] = useState(null)
    const [jobSuggestions, setJobSuggestions] = useState(null)
    const navigate = useNavigate();
    const [focus, setFocus] = useState(-1)

    const handleInput = async (name, event) => {
        setFocus(-1)
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
                setSearchBox({ ...searchBox, [e.target.name]: Suggestions[focus]?.value })
                clearSuggestions()
            }
        }
    }

    const clearSuggestions = () => {
        setJobSuggestions(null);
        setLocationSuggestions(null);
        setFocus(-1)
    }

    const handleSearch = () => {
        // checking if the user has enter any one of the fields and trim is used because the user can enter a space and the condition will satisfy
        if (searchBox.location.trim() === "" && searchBox.jobTitle.trim() === "") {
            setSearchButton("border border-2 border-danger")
        } else {
            navigate(`/common/Jobs?location=${searchBox.location}&keyword=${searchBox.jobTitle}`)
        }
    }

    return <>


        <main id="main">
            <div className="container-fluid homeBg">
                <form autoComplete='off'>
                    <div style={{ height: "50vh", width: "100%" }} className="banner">
                        <div className='d-flex flex-column align-items-center my-3'>
                            <h2>Kia ora!</h2>
                            <h2>Welcome to New Zealand</h2>
                        </div>
                        <div className='d-flex align-items-center justify-content-center gap-2'>
                            <div className='position-relative'>
                                <input type="text" style={{ width: "25vw" }} className={`transparent border-white p-1 rounded text-white ${searchButton}`} value={searchBox.jobTitle} placeholder="Job Title" name='jobTitle' onKeyDown={(e) => { handleKeyDown(jobSuggestions, e) }} onChange={(e) => handleInput("jobTitle", e)} />
                                <Suggestions SuggestionsList={jobSuggestions} focus={focus} clearSuggestions={clearSuggestions} name="jobTitle" setValue={setSearchBox} value={searchBox} />
                            </div>


                            <div className='position-relative'>
                                <input type="text" style={{ width: "25vw" }} className={`transparent border-white p-1 rounded text-white  ${searchButton}`} value={searchBox.location} name='location' onChange={(e) => handleInput("location", e)} onKeyDown={(e) => { handleKeyDown(locationSuggestions, e) }} placeholder="Location" />
                                <Suggestions SuggestionsList={locationSuggestions} focus={focus} clearSuggestions={clearSuggestions} name="location" setValue={setSearchBox} value={searchBox} />
                            </div>

                            <div>
                                <button type="button" onClick={handleSearch} className='transparent hover btn text-white'>
                                    <IoSearch size="24px" />
                                </button>
                            </div>
                            <div>
                                <Link type="button" to="/common/jobs" className="transparent hover btn border border-white text-white" >View All Jobs</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container-fluid text-center py-5">
                <div>
                    <NZMap />
                </div>
                <div className='row'>
                    <section className='col-2'>
                        <Ads />
                    </section>
                    <section className='col-8'>
                        <div>
                            <iframe className='rounded' width="800" height="400" src="https://www.youtube.com/embed/7r-If5smQ_s?si=zd0NUcT7rsEV7a4k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                            <div className='fw-bold'>Experience New Zealand with a Working Holiday Visa</div>
                        </div>
                        <div className='mt-5'>
                            <iframe className='rounded' width="800" height="400" src="https://www.youtube.com/embed/P98SjgerM8g?si=x36wJ4kJRg86288m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            <div className='fw-bold'>Life in New Zealand on a Working Holiday Visa</div>
                        </div>
                    </section>
                    <section className='col-2'>
                        <Ads />
                    </section>
                </div>
            </div>
        </main >
    </>
}

export default Home;
