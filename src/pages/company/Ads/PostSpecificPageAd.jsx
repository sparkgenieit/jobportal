import { useState } from 'react'
import NavBarInfo from '../../../layouts/common/navbarItems'
import AdsForm from '../../../components/company/AdsForm'
import useShowMessage from '../../../helpers/Hooks/useShowMessage'
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser'
import { adService, initialAdFormValues } from '../../../services/company/Ads.service'
import { tryCatch } from '../../../helpers/functions'


export default function PostSpecificPageAd() {
    const [category, setCategory] = useState(Object.keys(NavBarInfo)[0])
    const [page, setPage] = useState(NavBarInfo[category][0].title)
    const message = useShowMessage()
    const user = useCurrentUser()

    const getValue = (path) => path.split("/").at(-1) // get the value with the path

    const onFormValid = async (data) => {
        if (!category || !page) return message({ status: "Error", error: { message: "Please select category and page" } })

        data.specific_page_ad = page
        data.posted_by = user._id
        data.company_id = user._id

        const { error } = await tryCatch(() => adService.postAd(data))

        if (error) {
            return message({
                status: "error",
                error
            })

        }

        message({
            status: "Success",
            message: "Ad Posted Successfully",
            path: "/company/ads"
        })
    }

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
                        {NavBarInfo[category].map((item, index) => <option key={index} value={getValue(item.path)}>{item.title}</option>)}
                    </select>
                </div>

                <AdsForm initialValues={initialAdFormValues} onFormValid={onFormValid} />

            </div>
        </div>
    )
}
