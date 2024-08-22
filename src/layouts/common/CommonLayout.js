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
        fetchSavedJobsByUser()
    }, [])

    const fetchSavedJobsByUser = async () => {
        if (sessionStorage.getItem('savedJobIds')) return
        const role = localStorage.getItem('role')
        if (role === "user") {
            const user_id = localStorage.getItem("user_id")
            try {
                const res = await http.get(`/users/get-saved-jobs/${user_id}`)
                let savedJobsIds = []
                res.data?.map(item => savedJobsIds.push(item.jobId))
                sessionStorage.setItem("savedJobIds", JSON.stringify(savedJobsIds))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const fetchCompaniesInfo = async () => {
        if (sessionStorage.getItem("JobsData")) return
        try {
            const res = await http.get('jobs/job-count/info-details')
            sessionStorage.setItem("JobsData", JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
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