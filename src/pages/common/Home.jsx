import './Home.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";

import http from '../../helpers/http';
import Ads from './Ads/Ads';
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
            setSearchButton("border border-2")
        } else {
            navigate(`/jobs?location=${searchBox.location}&keyword=${searchBox.jobTitle}`)
        }
    }

    return (
        <main className='m-0  p-0 text-sm md:text-base mb-4' >
            <div className="banner flex justify-center  flex-col gap-2 ">
                <div className='flex flex-col  items-center justify-center font-bold text-xl '>
                    <span>Kia ora!</span>
                    <span>Welcome to New Zealand</span>
                </div>
                <form autoComplete='off' className='flex md:flex-row flex-col gap-3 search-bar'>
                    <div className='flex grow gap-2'>
                        <div className='grow'>
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
                                className={`bg-transparent border  border-white placeholder:text-white w-full p-2 rounded text-white ${searchButton}`}
                                value={searchBox.jobTitle}
                                placeholder="Job Title"
                                name='jobTitle'
                                onChange={(e) => handleInput("jobTitle", e)}
                            />
                        </div>

                        <div className='grow'>
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
                                className={`bg-transparent  w-full border placeholder:text-white border-white p-2 rounded text-white ${searchButton}`}
                                value={searchBox.location}
                                placeholder="Location"
                                name='location'
                                onChange={(e) => handleInput("location", e)}
                            />
                        </div>


                        <button type="button" onClick={handleSearch} className='bg-transparent p-2 focus:scale-110 hover:scale-110 text-white'>
                            <IoSearch size="24px" />
                        </button>
                    </div>

                    <Link type="button" to="/jobs" className="bg-transparent flex items-center justify-center p-2  no-underline rounded border border-white text-white" >View All Jobs</Link>
                </form>
            </div>


            <div className="2xl:container 2xl:mx-auto text-center py-3">
                <div className='grid  lg:grid-cols-4 mb-3 gap-3'>

                    <Ads />

                    <div className='lg:col-span-2'>
                        <NZMap />
                    </div>

                    <Ads />

                    <Ads />

                    <section className='flex flex-col gap-5 lg:col-span-2'>
                        <div className='flex flex-col'>
                            <iframe className='rounded youtube-video' src="https://www.youtube.com/embed/7r-If5smQ_s?si=zd0NUcT7rsEV7a4k" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                            </iframe>
                            <div className='font-bold'>Experience New Zealand with a Working Holiday Visa</div>
                        </div>
                        <div className='flex flex-col'>
                            <iframe className='rounded youtube-video' src="https://www.youtube.com/embed/P98SjgerM8g?si=x36wJ4kJRg86288m" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            <div className='font-bold'>Life in New Zealand on a Working Holiday Visa</div>
                        </div>
                    </section>

                    <Ads />
                </div>
            </div>
        </main >
    )
}

export default Home;
