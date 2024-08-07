import { useEffect, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";

import http from "../../helpers/http";
import QueryDetails from './QueryDetails';

export default function Queries() {
    const [queries, setQueries] = useState(null)
    const [modal, setModal] = useState({})
    const [filterBy, setFilterBy] = useState(null)
    useEffect(() => {
        fetchQueries()
    }, [])
    const fetchQueries = async () => {
        const { data } = await http.get('/contact/all-queries')
        setQueries(data)
    }
    return (
        <div className=" mt-3 container-fluid">
            <h2 className="text-center">
                Queries
            </h2>

            <form>
                <div className='d-flex my-3 align-items-center row'>
                    <div className='col-4'>
                        <input type='search' className='form-control' placeholder='Search by name or oraganisation' />
                    </div>
                    <div className='col-6  d-flex align-items-center gap-3'>
                        <span className='fs-6 text-nowrap'>Filter By:</span>
                        <select
                            onChange={(e) => { setFilterBy(e.target.value) }}
                            value={filterBy}
                            className='form-select form-select-sm'
                        >
                            <option value={null}>All</option>
                            <option value="reply-status">Reply status</option>
                            <option value="inquiry-type">Inquiry type</option>
                        </select>

                        <select className='form-select form-select-sm '>
                            {filterBy === 'reply-status' &&
                                <>

                                    <option value={"Pending"}>Pending</option>
                                    <option value={"Replied"}>Replied</option>
                                </>
                            }

                            {filterBy === "inquiry-type" &&
                                <>
                                    <option value={"Employer"}>Employer</option>
                                    <option value={"Job-inquiry"}>Job-inquiry</option>
                                    <option value={"Visitor"}>Visitor</option>
                                </>
                            }
                        </select>

                    </div>
                    <div className='col-2'>
                        <button type='button' className='btn btn-outline-dark rounded-pill' >Apply</button>
                    </div>
                </div>
            </form >
            <div className='container'>
                <table className='table text-center'>
                    <thead>
                        <tr >
                            <th>Inquiry type</th>
                            <th>Organisation</th>
                            <th >Subject</th>
                            <th >Reply</th>
                            <th >View</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            queries?.map((query, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {query.enquirer}
                                        </td>
                                        <td>{query.organisation}</td>
                                        <td className='text-start'>{query.subject.length > 80 ? `${query.subject.slice(0, 80)}...` : query.subject}</td>
                                        <td >
                                            {query.reply ?
                                                <span className='badge text-bg-success py-2 rounded-pill'>Replied</span>
                                                :
                                                <span className='badge text-bg-warning py-2 rounded-pill'>Pending</span>
                                            }
                                        </td>
                                        <td >
                                            <span onClick={() => setModal({ show: true, clickedQuery: query })}>
                                                <IoEyeSharp fontSize={20} />
                                            </span>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
            <QueryDetails modal={modal} setModal={setModal} fetchQueries={fetchQueries} />
        </div >
    )
}