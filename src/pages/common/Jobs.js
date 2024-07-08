import './jobList.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import http from '../../helpers/http';
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Ads from './ads';
import Card from '../../components/Card';
import Filter from '../../components/Filter';

function Jobs() {
    const [jobs, setJobs] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
    const company = searchParams.get("company")
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [refresh, setRefresh] = useState(true)
    const filter = JSON.parse(localStorage.getItem("filter"))
    const [filterFields, setFilterFields] = useState({
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

    const handleSort = (e) => {
        let filters = { ...filterFields }
        filters.sort = e.target.value;
        setFilterFields(filters);
        localStorage.setItem("filter", JSON.stringify(filters))
        setRefresh(!refresh)
    }
    const itemsToShow = (pageNumber) => {
        setPgNumber(pageNumber)
        navigate(`/common/jobs?page=${pageNumber}`)
        setRefresh(!refresh)
    }

    return <>
        <div>
            <Header />
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 mb-2 px-5 d-flex justify-content-end'>
                    <label className='small px-2'>Sort By:</label>
                    <select className='rounded px-1' value={filterFields.sort} onChange={(e) => { handleSort(e) }}>
                        <option value="creationdate">Creation Date</option>
                        <option value="rateperhour">Rate per Hour</option>
                        <option value="weeklyperhour">Weekly Hours</option>
                    </select>
                </div>

            </div>

            <main className='row'>
                <section style={{ paddingLeft: "45px" }} className='col-3'>
                    <Filter filterFields={filterFields} setFilterFields={setFilterFields} setRefresh={setRefresh} />
                </section>

                <section ref={ref} className="col-9 row d-flex scrollbar hide-scrollbar px-0">
                    <div className="col-8 px-0 container-fluid ">

                        <div className="container px-3 rounded mb-3">
                            {jobs && jobs.length == 0 && <h2 className='m-2 text-center'>No Jobs Found</h2>}
                            {jobs && jobs.length > 0 &&
                                jobs.map((job, index) => {
                                    return (
                                        <Card key={index} job={job} />
                                    )
                                })}
                            <Pagination totalCount={totalItems} onPageClick={itemsToShow} currentPage={+pgNumber} pageNumberToShow={2} />
                        </div>
                    </div>
                    <div className='col-4 pe-0'>
                        <Ads />
                    </div>
                </section >

            </main >
            <Footer />
        </div>
    </>
}

export default Jobs;
