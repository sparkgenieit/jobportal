import { useEffect, useState } from 'react';

import { IoEyeSharp } from "react-icons/io5";

import http from "../../helpers/http";


export default function Queries() {
    const [queries, setQueries] = useState(null)
    useEffect(() => {
        fetchQueries()
    }, [])
    const fetchQueries = async () => {
        const { data } = await http.get('/contact/all-queries')
        console.log(data)
        setQueries(data)
    }
    return (
        <div className=" mt-3 container-fluid">
            <h2 className="text-center">
                Queries
            </h2>
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr >
                            <th>Inquiry type</th>
                            <th className='text-center'>Subject</th>
                            <th className='text-center'>View</th>
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
                                        <td>{query.subject.length > 120 ? `${query.subject.slice(0, 120)}...` : query.subject}</td>
                                        <td className='text-center'><IoEyeSharp fontSize={20} /></td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}