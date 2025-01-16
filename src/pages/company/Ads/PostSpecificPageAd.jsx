import { useState } from 'react'
import NavBarInfo from '../../../layouts/common/navbarItems'
import useShowMessage from '../../../helpers/Hooks/useShowMessage'
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser'
import { adService } from '../../../services/company/Ads.service'
import { tryCatch } from '../../../helpers/functions'
import { CitiesList } from '../../../helpers/constants'
import ImageResizer from '../CompanyProfile/ImageResizer'
import { SpecificPageAd } from '../../common/NavbarItemPages/CategorySpecifyAd'
import { getValue, validateAdForm } from './adsFunctions'

const Categories = { ...NavBarInfo }
const keysToRemove = ["places", "regions", "info", "b2B"]

keysToRemove.forEach(key => {
    delete Categories[key];
});


function getEndDate(numberOfMonths = 1) {
    const today = new Date();
    today.setMonth(today.getMonth() + numberOfMonths);
    return today.toISOString().slice(0, 10);
}

export default function PostSpecificPageAd() {
    const [noOfMonths, setNoOfMonths] = useState(1)
    const [adData, setAdData] = useState({
        date: new Date().toISOString().slice(0, 10),
        location: CitiesList[0],
        description: "",
        title: "",
        image: "",
        redirect_url: "",
        end_date: getEndDate(noOfMonths),
    })
    const [category, setCategory] = useState(Object.keys(Categories)[0])
    const [page, setPage] = useState(Categories[category][0].title)
    const message = useShowMessage()
    const user = useCurrentUser()
    const [imageUrl, setImageUrl] = useState(null)
    const [adImage, setAdImage] = useState(null)

    const onFormValid = async (data) => {
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

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!category || !page) return message({ status: "Error", error: { message: "Please select category and page" } })

        const [isValid, errorMessage] = validateAdForm(adData)

        if (!isValid) return message({
            status: "Error",
            error: {
                message: errorMessage
            }
        })

        if (!adImage) return message({
            status: "Error",
            error: { message: "Please upload an image" }
        })

        const upload = new FormData()
        upload.append("file", adImage)

        const { data, error } = await tryCatch(() => adService.uploadAdPhoto(upload))

        if (error) {
            return message({ status: "Error", error: { message: "There was an error uploading the image" } })
        }

        const dataToSend = {
            title: adData.title,
            description: adData.description,
            location: adData.location,
            redirect_url: adData.redirect_url,
            end_date: adData.end_date,
            image: data.filename,
            type: "specific-page",
            show_on_pages: [page],
            created_by: user._id,
            company_id: user._id
        }

        onFormValid(dataToSend)
    }

    const handleForm = (e) => {
        const name = e.target.id
        const value = e.target.value
        setAdData({ ...adData, [name]: value })
    }

    const onImageResize = (blob) => {
        setAdData({ ...adData, image: URL.createObjectURL(blob) })
        setAdImage(blob)
    }

    const onMonthsChange = (e) => {
        setNoOfMonths(e.target.value)
        setAdData({ ...adData, end_date: getEndDate(e.target.value) })
    }

    const onUploadImage = (e) => {
        setAdData({ ...adData, image: URL.createObjectURL(e.target.files[0]) })
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setAdImage(e.target.files[0])
    }

    return (
        <div className='my-4 container'>
            <h3 className='text-center w-full font-bold'>Post Specific Page Ad</h3>

            <form onSubmit={onSubmit} className=' flex flex-col gap-3'>

                <div className='self-end flex items-center gap-3'>
                    <label>Date</label>
                    <input type='date' value={adData.date} disabled className='border  border-slate-600 rounded-md w-full px-3 py-2' />
                </div>

                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='title' className='text-nowrap'  >Ad Title</label>
                    <input type='text' id='title' value={adData.title} onChange={handleForm} className='border lg:col-span-3  border-slate-600 rounded-md w-full px-3 py-2' placeholder='Ad Title' />
                </div>


                <div className='grid lg:grid-cols-4'>
                    <label htmlFor='description'>Ad Description</label>
                    <textarea id='description' value={adData.description} onChange={handleForm} className='col-span-3 border border-slate-600 rounded-md px-3 py-2' rows={5} />
                </div>


                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='location' className='text-nowrap' >Location</label>
                    <select id='location' value={adData.location} onChange={handleForm} className='border border-slate-600 rounded-md px-3 py-2'>
                        {CitiesList.map((city, index) => <option key={index}>{city}</option>)}
                    </select>
                </div>


                <div className='grid lg:grid-cols-4'>
                    <label htmlFor='noOfMonths' className='text-nowrap' >Number of months</label>
                    <div className='lg:col-span-3 flex gap-3'>
                        <select id='noOfMonths' value={noOfMonths} onChange={onMonthsChange} className='border w-1/3 border-slate-600  rounded-md px-3 py-2'>
                            {new Array(12).fill(0).map((_, index) => <option key={index}>{index + 1}</option>)}
                        </select>

                        <div className='flex gap-2 items-center'>
                            <label className='text-nowrap'>Start Date</label>
                            <input type='date' value={adData.date} disabled className='border  border-slate-600 rounded-md  px-3 py-2' />
                            <label className='text-nowrap'>End Date</label>
                            <input type='date' disabled value={adData.end_date} className='border  border-slate-600 rounded-md  px-3 py-2' />
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
                    <label htmlFor='redirect_url' className='text-nowrap' >Google Trace Link</label>
                    <input type='text' id='redirect_url' value={adData.redirect_url} onChange={handleForm} className='border border-slate-600 rounded-md px-3 py-2' />
                </div>

                <div className='flex justify-between  py-3 w-full'>
                    <div>
                        <label htmlFor='ad_image' className='text-nowrap mb-3 bg-slate-800 p-2 text-white rounded-md' >Upload Image</label>
                        <input type='file' accept="image/*" onChange={onUploadImage} hidden id='ad_image' className='border border-slate-600 rounded-md px-3 py-2' />
                        {imageUrl && <ImageResizer width={250} height={100} setImg={onImageResize} imgSrc={imageUrl} />}
                    </div>

                    <div className='self-end -z-10'>
                        <p className='font-bold m-0 mb-3'>Preview</p>
                        <SpecificPageAd ad={adData} />
                    </div>
                </div>

                <div className='self-end'>
                    <button type='submit' className='bg-slate-800 px-4  py-2 text-white rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    )
}
