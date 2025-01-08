import './jobList.css';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import http from '../../helpers/http';
import { itemsPerPage } from '../../helpers/constants';
import Pagination from '../../components/Pagination';
import Ads from './Ads/Ads';
import Filter from '../../components/Filter';
import JobCardList from '../../components/JobCardsList';
import Loader from '../../components/Loader';
import { BsFilter } from 'react-icons/bs';

const initialValues = {
    company: "",
    jobTitle: "",
    location: "",
    jobtype: "",
    jobCategory: "",
    subCategory: "",
    rateperhour: null,
    duration: null,
    weeklyperhour: null,
    date: null,
    sort: "creationdate",
    salaryType: "per hour"
}

let prevScrollpos = 0;

function Jobs() {
    const [jobs, setJobs] = useState(null)
    const [searchParams] = useSearchParams()
    const [totalItems, setTotalItems] = useState("")
    const [pgNumber, setPgNumber] = useState(searchParams.get("page") || 1)
    const [refresh, setRefresh] = useState(true)
    const [loading, setLoading] = useState(false)
    const filter = JSON.parse(sessionStorage.getItem("filter"))
    const [filterFields, setFilterFields] = useState(filter || initialValues)
    const [showFilter, setShowFilter] = useState(false)

    const location = searchParams.get("location")
    const keyword = searchParams.get("keyword")
    const company = searchParams.get("company")

    const sortRef = useRef(null)

    useEffect(() => {
        function handleScroll() {
            if (window.innerWidth > 992) return  // screen is big no need to do anything 

            let currentScrollPos = window.scrollY;

            if (currentScrollPos < 100) {
                sortRef.current.classList.remove("show-sort-menu")
                return
            }

            if (prevScrollpos > currentScrollPos) {
                sortRef.current.classList.add("show-sort-menu") // Scrolling Down
            } else {
                sortRef.current.classList.remove("show-sort-menu") // Scrolling Up
            }
            prevScrollpos = currentScrollPos;
        }

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }

    }, [])


    useEffect(() => {
        document.title = "Jobs"
        fetchJobs(pgNumber)
    }, [refresh])

    const fetchJobs = async (page) => {
        setLoading(true)
        let currentFilters = { ...filterFields }
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
            setTotalItems(response.data.total);
            setJobs(response.data.jobs)
            window.scrollTo({ top: "0px", behavior: "smooth" })
        }
        catch (error) {
            setTotalItems(0)
            setJobs([])
            window.scrollTo({ top: "0px", behavior: "smooth" })
        } finally {
            setLoading(false)
        }
    }

    const handleShowFilter = () => {
        setShowFilter(prev => !prev)
        window.scrollTo({ top: "0px", behavior: "smooth" })
    }

    const handleSort = (e) => {
        let filters = { ...filterFields }
        filters.sort = e.target.value;
        setFilterFields(filters);
        sessionStorage.setItem("filter", JSON.stringify(filters))
        setRefresh(!refresh)
        window.scrollTo({ top: "0px", behavior: "smooth" })
    }

    return (
        <main>
            <div className='grid  lg:grid-cols-4 m-0'>
                {/* Sort by  */}
                <div ref={sortRef} className='lg:col-span-3 w-full  mb-2 flex items-center'>
                    <BsFilter onClick={handleShowFilter} className='lg:hidden' fontSize={20} />

                    <div className='grow flex justify-end items-center text-sm lg:text-base'>
                        <label className='text-sm text-nowrap pb-[1px] px-2'>Sort by:</label>
                        <select className='rounded border-0 px-2' value={filterFields.sort} onChange={(e) => { handleSort(e) }}>
                            <option value="creationdate">Date posted</option>
                            <option value="rateperhour">Rate per hour</option>
                            <option value="weeklyperhour">Weekly hours</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-4'>
                <section className={`${showFilter ? "" : "filter-hide"}   lg:flex p-0 justify-end`}>
                    <Filter filterFields={filterFields} setFilterFields={setFilterFields} setRefresh={setRefresh} />
                </section>

                <section className="lg:col-span-3 grid lg:grid-cols-3 lg:gap-2  scrollbar  hide-scrollbar ">

                    <div className="lg:col-span-2 p-0">
                        <Pagination currentPage={pgNumber} setCurrentPage={setPgNumber} itemsPerPage={itemsPerPage} totalCount={totalItems} fetchItems={fetchJobs} pageNumberToShow={2}>
                            <div className="mb-3">
                                {loading && <Loader />}
                                {!loading &&
                                    <div className='jobs-list'>
                                        <JobCardList jobs={jobs} />
                                    </div>
                                }
                            </div>
                        </Pagination>
                    </div>
                    <div>
                        <Ads />
                    </div>
                </section >
            </div >
        </main >
    )
}

export default Jobs;
