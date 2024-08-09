import './jobList.css';

import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { marked } from 'marked';
import parse from 'html-react-parser';
import { Modal } from 'react-bootstrap'

import http from '../../helpers/http';
import { BASE_API_URL, itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Ads from './ads';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import Toaster from '../../components/Toaster';
import { JobsContext } from '../../helpers/Context';
import LocationPopup from '../../components/LocationPopup';
import Loader from '../../components/Loader';

function Jobs() {
    const [jobs, setJobs] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [refresh, setRefresh] = useState(true)
    const [loading, setLoading] = useState(false)
    const { setInfo, message, setMessage, setLocationPopup, info, locationPopup } = useContext(JobsContext)
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
    const ref = useRef(null)

    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
    const company = searchParams.get("company")

    useEffect(() => {
        fetchJobs(pgNumber)
    }, [refresh])

    const fetchJobs = async (page) => {
        setLoading(true)
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
        const skip = (page - 1) * itemsPerPage

        try {
            const response = await http.post(`/jobs/filtered-jobs?limit=${itemsPerPage}&skip=${skip}`, currentFilters)
            setLoading(false)
            setTotalItems(response.data.total);
            setJobs(response.data.jobs)
            ref.current.scrollTo({ top: "0px", behavior: "smooth" })
        }
        catch (error) {
            setLoading(false)
            setTotalItems(0)
            setJobs([])
            ref.current.scrollTo({ top: "0px", behavior: "smooth" })
        }
    }

    const handleSort = (e) => {
        let filters = { ...filterFields }
        filters.sort = e.target.value;
        setFilterFields(filters);
        sessionStorage.setItem("filter", JSON.stringify(filters))
        setRefresh(!refresh)
    }


    return <>

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
                                <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} fetchItems={fetchJobs} pageNumberToShow={2}>

                                    <div className="mb-3">
                                        {/* {loading && <Loader />} */}
                                        {/* {!loading && <> */}
                                        {jobs && jobs.length == 0 && <h2 className='m-2 text-center'>No Jobs Found</h2>}
                                        {jobs && jobs.length > 0 &&
                                            jobs.map((job, index) => {
                                                return (
                                                    <div style={{ marginBottom: "15px" }}>
                                                        <Card key={index} job={job} />
                                                    </div>
                                                )
                                            })}
                                        {/* </>
                                        } */}
                                    </div>

                                </Pagination>
                            </div>
                            <div className='col-4 px-0 ps-2'>
                                <Ads />
                            </div>
                        </div >
                    </div>
                </div >
            </div >
            <Toaster message={message} setMessage={setMessage} />
            <LocationPopup show={locationPopup.show} handleClose={() => { setLocationPopup({ show: false }) }} city={locationPopup.city} />

        </div >


        <Modal size='lg' show={info.show} onHide={() => { setInfo({ show: false }) }} centered>
            <Modal.Body>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h3>{info.job?.company}</h3>
                    {info.job?.companyLogo.length > 0 && <img style={{ width: "9vw", height: "12vh" }} className="rounded border" src={`${BASE_API_URL}/uploads/logos/${info.job?.companyLogo}`} alt={info.job?.company} />}
                </div>
                {info.info && <p>{parse(marked(info.info))}</p>}
            </Modal.Body>
        </Modal>
    </>
}

export default Jobs;
