import { useRef, useState } from 'react'
import NavBarInfo from '../../../layouts/common/navbarItems'
import useShowMessage from '../../../helpers/Hooks/useShowMessage'
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser'
import { adService } from '../../../services/company/Ads.service'
import { tryCatch } from '../../../helpers/functions'
import { CitiesList } from '../../../helpers/constants'
import ImageResizer from '../CompanyProfile/ImageResizer'
import { SpecificPageAd } from '../../common/NavbarItemPages/CategorySpecifyAd'
import { getValue, validateAdForm } from './adsFunctions'

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  function getEndDate(MonthNumber) {
    const currentDateObj = new Date();
    console.log('getMonth',currentDateObj.toString());
    console.log('numberOfMonths KKKK',MonthNumber);
    currentDateObj.setMonth(currentDateObj.getMonth() + MonthNumber);
    
    return formatDate(currentDateObj);
    
}


export default function PostSpecificPageAd({pageType}) {
    const Categories = { ...NavBarInfo }
    let pageCategories;

    if(pageType == 'b2b' ){
        
        const transformData = (data) => {
            console.log('ffffff',data);
            return data.reduce((acc, item) => {
                acc[item.heading] = [...item.links];
              return acc;
            }, {});
          };
          pageCategories =transformData(Categories['b2B']);
       
        }
        else{
            const keysToRemove = ["places", "regions", "info", "b2B"]

            keysToRemove.forEach(key => {
                delete Categories[key];
            });
            pageCategories = Categories;
        }
    console.log(pageType);
    const [currentDate, setCurrentDate] = useState(formatDate(new Date()))
    
    const [category, setCategory] = useState(Object.keys(pageCategories)[0])
    const [page, setPage] = useState(getValue(pageCategories[category][0].path))
    const pageTitle = (pageType)?'Post B2B Ad':'Post Specific Page Ad';
    const [noOfMonths, setNoOfMonths] = useState(1)
    const [endDate, setEndDate] = useState(getEndDate(new Date().getMonth()));

    
    const [adData, setAdData] = useState({
        location: CitiesList[0],
        description: "",
        title: "",
        redirect_url: "",
        type:""
      
    })
    const message = useShowMessage()
    const user = useCurrentUser()
    const [imageUrl, setImageUrl] = useState(null)
    const [adImage, setAdImage] = useState(null)
    const adFormRef = useRef(null)





  
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

        const formData = new FormData(adFormRef.current)

        formData.append("company_id", user._id)
        
        
        formData.append("show_on_pages", page)
        formData.append("created_by", user._id)
        formData.append("end_date", endDate)
        formData.append("image", adImage)
        formData.delete("page")

        const { error } = await tryCatch(() => adService.postAd(formData))


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
        const monthsToAdd = Number(e.target.value);
        console.log("MONTH NUMBER",e.target.value );
        setNoOfMonths(monthsToAdd)
        setEndDate(getEndDate(monthsToAdd));
        
    }

    const onUploadImage = (e) => {
        setAdData({ ...adData, image: URL.createObjectURL(e.target.files[0]) })
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setAdImage(e.target.files[0])
    }

    return (
        <div className='my-4 container'>
            <h3 className='text-center w-full font-bold'>{pageTitle}</h3>

            <form encType='multipart/form-data' ref={adFormRef} onSubmit={onSubmit} className=' flex flex-col gap-3'>

                <div className='self-end flex items-center gap-3'>
                    <label>Date</label>
                    <input type="hidden" name="type" value={pageType} />
                    <input type='date' name='date' value={currentDate} disabled className='border  border-slate-600 rounded-md w-full px-3 py-2' />
                </div>

                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='title' className='text-nowrap'  >Ad Title</label>
                    <input type='text' id='title' name='title' value={adData.title} onChange={handleForm} className='border lg:col-span-3  border-slate-600 rounded-md w-full px-3 py-2' placeholder='Ad Title' />
                </div>


                <div className='grid lg:grid-cols-4'>
                    <label htmlFor='description'>Ad Description</label>
                    <textarea id='description' name='description' value={adData.description} onChange={handleForm} className='col-span-3 border border-slate-600 rounded-md px-3 py-2' rows={5} />
                </div>

                {pageType === 'b2b' &&    
                <input type="hidden" name="location" value='b2b location' />
                }
{pageType !== 'b2b' && 
                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='location' className='text-nowrap' >Location</label>
                    <select id='location' name='location' value={adData.location} onChange={handleForm} className='border border-slate-600 rounded-md px-3 py-2'>
                        {CitiesList.map((city, index) => <option key={index}>{city}</option>)}
                    </select>
                </div>
}

                <div className='grid lg:grid-cols-4'>
                    <label htmlFor='noOfMonths' className='text-nowrap' >Number of months</label>
                    <div className='lg:col-span-3 flex gap-3'>
                        <select id='noOfMonths' value={noOfMonths} onChange={onMonthsChange} className='border w-1/3 border-slate-600  rounded-md px-3 py-2'>
                        {[...Array(12)].map((_, index) => (
            <option key={index} value={index+1}>
              {index + 1} Month{index === 0 ? '' : 's'}
            </option>
          ))}
                          
                        </select>

                        <div className='flex gap-2 items-center'>
                            <label className='text-nowrap'>Start Date</label>
                            <input type='date' value={currentDate} disabled className='border  border-slate-600 rounded-md  px-3 py-2' />
                            <label className='text-nowrap'>End Date</label>
                            <input type='date' name="endDate" disabled value={endDate} className='border  border-slate-600 rounded-md  px-3 py-2' />
                        </div>
                    </div>
                </div>


                <div className='grid lg:grid-cols-4'>
                <label>Select Page</label>
                    <div className='lg:col-span-3 flex gap-3'>
                        <select className='border capitalize border-slate-600 rounded-md px-3 py-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                            {Object.keys(pageCategories).map((title, index) => <option className='capitalize' key={index}>{title}</option>)}
                        </select>
                        <select value={page} name='page' onChange={(e) => setPage(e.target.value)} className='border border-slate-600 rounded-md px-3 py-2'>
                            {pageCategories[category].map((page, index) => <option key={index} value={getValue(page.path)}>{page.title}</option>)}
                        </select>
                    </div>                  
                </div>

                <div className='grid lg:grid-cols-4 items-center'>
                    <label htmlFor='redirect_url' className='text-nowrap' >Google Trace Link</label>
                    <input type='url' id='redirect_url' name='redirect_url' value={adData.redirect_url} onChange={handleForm} className='border border-slate-600 rounded-md px-3 py-2' />
                </div>

                <div className='flex justify-between  py-3 w-full'>
                    <div>
                        <label htmlFor='image' className='text-nowrap mb-3 bg-slate-800 p-2 text-white rounded-md' >Upload Image</label>
                        <input type='file' accept="image/*" onChange={onUploadImage} hidden id='image' className='border border-slate-600 rounded-md px-3 py-2' />
                        {imageUrl && <ImageResizer width={250} height={100} setImg={onImageResize} imgSrc={imageUrl} />}
                    </div>

                    <div className='self-end -z-10'>
                        <p className='font-bold m-0 mb-3'>Preview</p>
                        <SpecificPageAd ad={adData} mode='preview' />
                    </div>
                </div>

                <div className='self-end'>
                    <button type='submit' className='bg-slate-800 px-4  py-2 text-white rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    )
}
