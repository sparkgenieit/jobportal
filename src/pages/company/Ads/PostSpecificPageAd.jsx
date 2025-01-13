import { useState } from 'react'
import NavBarInfo from '../../../layouts/common/navbarItems'
import MdxEditor from './../../../components/MdxEditor'
import useShowMessage from '../../../helpers/Hooks/useShowMessage'
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser'
import { adService } from '../../../services/company/Ads.service'
import { tryCatch } from '../../../helpers/functions'
import { CitiesList } from '../../../helpers/constants'
import ImageResizer from '../CompanyProfile/ImageResizer'

const Categories = { ...NavBarInfo }
const keysToRemove = ["places", "regions", "info", "b2B"]

keysToRemove.forEach(key => {
    delete Categories[key];
});


export default function PostSpecificPageAd() {
    const [category, setCategory] = useState(Object.keys(Categories)[0])
    const [page, setPage] = useState(Categories[category][0].title)
    const [location, setLocation] = useState("")
    const message = useShowMessage()
    const user = useCurrentUser()
    const [imageUrl, setImageUrl] = useState(null)
    const [adImage, setAdImage] = useState(null)

    const getValue = (path) => path.split("/").at(-1) // get the value with the path

    const onFormValid = async (data) => {
        if (!category || !page) return message({ status: "Error", error: { message: "Please select category and page" } })

        if (!location) return message({ status: "Error", error: { message: "Please enter location" } })

        data.ad_type = "specific_page"
        data.specific_page_ad = page
        data.posted_by = user._id
        data.company_id = user._id
        data.location = location

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

    const handleImage = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setAdImage(e.target.files[0])
    }

    return (
        <div className='mt-4 container'>
            <h3 className='text-center w-full font-bold'>Post Specific Page Ad</h3>

            <form className=' flex flex-col gap-3'>


                <div className='self-end flex items-center gap-3'>
                    <label>Date</label>
                    <input type='text' className='border  border-slate-600 rounded-md w-full px-3 py-2' />
                </div>

                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='title' className='text-nowrap'  >Ad Title</label>
                    <input type='text' id='title' className='border lg:col-span-3  border-slate-600 rounded-md w-full px-3 py-2' placeholder='Ad Title' />
                </div>


                <div className='grid lg:grid-cols-4'>
                    <label htmlFor='description' className=''>Ad Description</label>
                    <div className='col-span-3'>
                        <MdxEditor />
                    </div>
                </div>



                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='location' className='text-nowrap' >Location</label>
                    <select className='border border-slate-600 rounded-md px-3 py-2'>
                        {CitiesList.map((city, index) => <option key={index}>{city}</option>)}
                    </select>
                </div>




                <div className='grid lg:grid-cols-4'>
                    <label htmlFor='location' className='text-nowrap' >Number of months</label>
                    <div className='lg:col-span-3 flex gap-3'>
                        <select className='border w-1/3 border-slate-600  rounded-md px-3 py-2'>
                            {new Array(12).fill(0).map((_, index) => <option key={index}>{index + 1}</option>)}
                        </select>

                        <div className='flex gap-2 items-center'>
                            <label className='text-nowrap'>Start Date</label>
                            <input type='text' className='border  border-slate-600 rounded-md  px-3 py-2' />
                            <label className='text-nowrap'>End Date</label>
                            <input type='text' className='border  border-slate-600 rounded-md  px-3 py-2' />
                        </div>

                    </div>
                </div>


                <div className='grid lg:grid-cols-4'>
                    <label>Select Page</label>
                    <div className='lg:col-span-3 flex gap-3'>
                        <select className='border capitalize border-slate-600 rounded-md px-3 py-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                            {Object.keys(Categories).map((title, index) => <option className='capitalize' key={index}>{title}</option>)}
                        </select>
                        <select value={page} onChange={(e) => setPage(e.target.value)} className='border border-slate-600 rounded-md px-3 py-2'>
                            {Categories[category].map((page, index) => <option key={index} value={getValue(page.path)}>{page.title}</option>)}
                        </select>
                    </div>
                </div>






                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='google_link' className='text-nowrap' >Google Trace Link</label>
                    <input type='text' id='google_link' className='border border-slate-600 rounded-md px-3 py-2' />
                </div>

                <div className=''>
                    <label htmlFor='ad_image' className='text-nowrap bg-slate-800 p-2 text-white rounded-md' >Upload Image</label>
                    <input type='file' onChange={handleImage} hidden id='ad_image' className='border border-slate-600 rounded-md px-3 py-2' />

                    {imageUrl && <ImageResizer width={200} height={200} setImg={setAdImage} imgSrc={imageUrl} />}
                </div>


            </form>


        </div>
    )
}
