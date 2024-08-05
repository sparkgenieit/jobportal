import './jobList.css';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { marked } from 'marked';
import parse from 'html-react-parser';
import { Modal } from 'react-bootstrap'

import http from '../../helpers/http';
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Ads from './ads';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import Toaster from '../../components/Toaster';
import { JobsContext } from '../../helpers/Context';
import LocationPopup from '../../components/LocationPopup';

function Jobs() {
    const [jobs, setJobs] = useState(null)
    const [info, setInfo] = useState({})
    const [message, setMessage] = useState({})
    const [locationPopup, setLocationPopup] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [refresh, setRefresh] = useState(true)
    const filter = JSON.parse(sessionStorage.getItem("filter"))
    const [filterFields, setFilterFields] = useState(filter || {
        company: null,
        jobTitle: null,
        location: null,
        jobtype: null,
        jobCategory: null,
        subCategory: null,
        salary: null,
        duration: null,
        date: null,
        weeklyperhour: null,
        sort: "creationdate"
    })
    const navigate = useNavigate();
    const ref = useRef(null)

    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
    const company = searchParams.get("company")


    useEffect(() => {
        let currentFilters = { ...filter }
        if (location && location.trim() != "") {
            currentFilters.location = location;
        }
        if (company && company.trim() != "") {
            currentFilters.company = company;
        }
        if (keyword && keyword.trim() != "") {
            currentFilters.jobTitle = keyword;
        }
        setFilterFields(currentFilters)
        // To load to appropriate page regarding the filters and page Number
        const skip = (pgNumber - 1) * itemsPerPage
        http.post(`/jobs/filtered-jobs?limit=${itemsPerPage}&skip=${skip}`, currentFilters)
            .then((res) => {
                setTotalItems(res.data.total);
                setJobs(res.data.jobs)
                ref.current.scrollTo({ top: "0px", behavior: "smooth" })
            })
            .catch(err => {
                setTotalItems([])
                ref.current.scrollTo({ top: "0px", behavior: "smooth" })
            })
    }, [refresh])


    useEffect(() => {
        fetchCompaniesInfo()
    }, [])

    const fetchCompaniesInfo = async () => {

        if (sessionStorage.getItem("JobsData")) return

        const res = await http.get('jobs/job-count/info-details')
        sessionStorage.setItem("JobsData", JSON.stringify(res.data))
    }

    const handleSort = (e) => {
        let filters = { ...filterFields }
        filters.sort = e.target.value;
        setFilterFields(filters);
        sessionStorage.setItem("filter", JSON.stringify(filters))
        setRefresh(!refresh)
    }
    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        navigate(`/common/jobs?page=${pageNumber}`)
        setRefresh(!refresh)
    }

    return <>
        <JobsContext.Provider value={{ info, setInfo, setMessage, setLocationPopup }}>
            <div className="container-fluid">

                <div className='row'>
                    <div className='col-5'></div>
                    <div className='col-5 mb-2 ps-5 d-flex justify-content-center align-items-end'>
                        <label style={{ paddingBottom: "1px" }} className='small px-2'>Sort by:</label>
                        <select className='rounded border-0 px-2' value={filterFields.sort} onChange={(e) => { handleSort(e) }}>
                            <option value="creationdate">Date posted</option>
                            <option value="rateperhour">Rate per hour</option>
                            <option value="weeklyperhour">Weekly hours</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <div style={{ width: "97vw" }}>
                        <div className='row'>
                            <div className='col-3 w-full d-flex justify-content-end '>
                                <Filter filterFields={filterFields} setFilterFields={setFilterFields} setRefresh={setRefresh} />
                            </div>
                            <div style={{ paddingLeft: "15px" }} ref={ref} className="col-9  row container-fluid scrollbar  hide-scrollbar ">
                                <div className="col-8 w-full d-flex">
                                    <div className="mb-3">
                                        {jobs && jobs.length == 0 && <h2 className='m-2 text-center'>No Jobs Found</h2>}
                                        {jobs && jobs.length > 0 &&
                                            jobs.map((job, index) => {
                                                return (
                                                    <div style={{ marginBottom: "15px" }}>
                                                        <Card key={index} job={job} />
                                                    </div>
                                                )
                                            })}
                                        <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                                    </div>
                                </div>
                                <div className='col-4 px-0 ps-2'>
                                    <Ads />
                                </div>
                            </div >
                        </div>
                    </div >
                </div>
                <Toaster message={message} setMessage={setMessage} />
                <LocationPopup show={locationPopup.show} handleClose={() => { setLocationPopup({ show: false }) }} city={locationPopup.city} />

            </div>
        </JobsContext.Provider>

        <Modal size="md" show={info.show} onHide={() => { setInfo({ show: false }) }} centered>
            <Modal.Body>
                <h3>{info.name}</h3>
                {info.info && <p>{parse(marked(info.info))}</p>}
            </Modal.Body>
        </Modal>
    </>
}

export default Jobs;
