import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { JobsContext } from '../../helpers/Context';
import http from '../../helpers/http';

export default function CommonLayout() {
    const [info, setInfo] = useState({})
    const [message, setMessage] = useState({})
    const [locationPopup, setLocationPopup] = useState({})

    useEffect(() => {
        fetchCompaniesInfo()
    }, [])

    const fetchCompaniesInfo = async () => {
        if (sessionStorage.getItem("JobsData")) return
        const res = await http.get('jobs/job-count/info-details')
        sessionStorage.setItem("JobsData", JSON.stringify(res.data))
    }

    return (
        <>
            <JobsContext.Provider value={{ info, setInfo, message, setMessage, locationPopup, setLocationPopup }}>


                <Header />


                <Outlet />

                <Footer />
            </JobsContext.Provider>

        </>
    )
}