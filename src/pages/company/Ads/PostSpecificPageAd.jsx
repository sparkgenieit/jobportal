import React, { useState } from 'react'
import NavBarInfo from '../../../layouts/common/navbarItems'
import AdsForm from '../../../components/company/AdsForm'
import { initialAdFormValues } from '../../../services/company/Ads.service'


export default function PostSpecificPageAd() {
    const [category, setCategory] = useState(Object.keys(NavBarInfo)[0].toString())
    const [page, setPage] = useState(NavBarInfo[category][0].title)

    return (
        <div className='mt-4 container'>
            <h3 className='text-center w-full font-bold'>Post Specific Page Ad</h3>

            <div className='flex my-3 flex-col gap-3'>

                <div className='grid md:grid-cols-3'>
                    <label>Select Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='p-2 w-full md:col-span-2 capitalize border border-slate-200 rounded-md'>
                        {Object.keys(NavBarInfo).map((item, index) => <option className='capitalize' key={index} value={item}>{item}</option>)}
                    </select>
                </div>

                <div className='grid md:grid-cols-3'>
                    <label>Select Page</label>
                    <select onChange={(e) => setPage(e.target.value)} value={page} className='p-2 w-full md:col-span-2  border border-slate-200 rounded-md'>
                        {NavBarInfo[category].map((item, index) => <option key={index} value={item.title}>{item.title}</option>)}
                    </select>
                </div>

                <AdsForm initialValues={initialAdFormValues} />

            </div>
        </div>
    )
}
