import { useRef, useState, useEffect } from 'react';
import NavBarInfo from '../../../layouts/common/navbarItems';
import useShowMessage from '../../../helpers/Hooks/useShowMessage';
import { useSearchParams } from 'react-router-dom';

import useCurrentUser from '../../../helpers/Hooks/useCurrentUser';
import { adService } from '../../../services/company/Ads.service';
import { tryCatch } from '../../../helpers/functions';
import { CitiesList } from '../../../helpers/constants';
import ImageResizer from '../CompanyProfile/ImageResizer';
import { getCloseDate } from '../../../helpers/functions';

import { SpecificPageAd } from '../../common/NavbarItemPages/CategorySpecifyAd';
import { getValue, validateAdForm } from './adsFunctions';
import DatePickerComponent from "../common/DatePickerComponent"; // Adjust the path accordingly
import { useDispatch, useSelector } from 'react-redux';


const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function getEndDate(MonthNumber) {
  const currentDateObj = new Date();
  currentDateObj.setMonth(currentDateObj.getMonth() + MonthNumber);
  return formatDate(currentDateObj);
}
    
const safeParse = (data) => {
  try {
      return JSON.parse(data);
  } catch {
      return [];
  }
};

export default function PostSpecificPageAd({ pageType, existingAd }) {
    console.log('PostSpecificPageAd',existingAd);
      const [searchParams] = useSearchParams()
    
    const currentAd = useSelector((state) => state.general.currentAd)
    const dispatch = useDispatch()

    const Categories = { ...NavBarInfo };
    let pageCategories;
  
    if (pageType === 'b2b') {
      const transformData = (data) => {
        return data.reduce((acc, item) => {
          acc[item.heading] = [...item.links];
          return acc;
        }, {});
      };
      pageCategories = transformData(Categories['b2B']);
    } else {
      const keysToRemove = ['places', 'regions', 'info', 'b2B'];
      keysToRemove.forEach((key) => {
        delete Categories[key];
      });
      pageCategories = Categories;
    }

    console.log('pageCategories',pageCategories);
  
    const [currentDate, setCurrentDate] = useState(formatDate(new Date()));
    const [category, setCategory] = useState('Select Category');
    const [page, setPage] = useState('Select Page');
    const [selectedPages, setSelectedPages] = useState({});
    const pageTitle = pageType ? 'Post B2B Ad' : 'Post Specific Page Ad';
    const [noOfMonths, setNoOfMonths] = useState(1);
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(getEndDate(noOfMonths));
    const [userBookedDates, setUserBookedDates] = useState([]);
    const [selectSingleDay, setSelectSingleDay] = useState(true);

    const [blockedDates, setBlockedDates] = useState([]);
    const cloneAdId = searchParams.get("c")

    
console.log(cloneAdId);

    const [adData, setAdData] = useState({
      location: CitiesList[0],
      description: '',
      title: '',
      redirect_url: '',
      type: '',
      image: ''
    });
    const message = useShowMessage();
    const user = useCurrentUser();
    const [imageUrl, setImageUrl] = useState(null);
    const [adImage, setAdImage] = useState(null);
    const adFormRef = useRef(null);
  
    useEffect(() => {
      document.title = "Post a Ad"
      // When the request is to clone an existing job
      if (cloneAdId) {
        setAdData({ ...currentAd, creationdate: new Date(), closedate: getCloseDate(new Date().toString()) })
        setAdImage(currentAd.image);
        if (currentAd.show_on_pages) {
          try {
            setSelectedPages(JSON.parse(currentAd.show_on_pages));
          } catch (e) {
            console.error('Failed to parse show_on_pages:', e);
          }
        }
        setUserBookedDates(safeParse(currentAd.booked_dates).map(date => new Date(date)));
      } 
    }, [])

    useEffect(() => {
      async function fetchBlockedDates() {
        

    try{
      
      const result = await adService.getBlockedDates(existingAd?._id);
      console.log('result.data', result.data);
      
      const blocked_dates = [
        ...new Set(result.data.flatMap(date => safeParse(date)))
      ];
      
      console.log('Blocked Dates:', blocked_dates);
      
      setBlockedDates(blocked_dates.map(date => new Date(date)));
    } catch (err) {
        console.log("Error fetching bloked ads:", err);
        setError("Failed to fetch ad details.");
    }                
      }
  
      fetchBlockedDates();

      if (existingAd) {
        setAdData({
          location: existingAd.location,
          description: existingAd.description,
          title: existingAd.title,
          redirect_url: existingAd.redirect_url,
          type: existingAd.type,
          image: existingAd.image,
        });
        setImageUrl(existingAd.image);
        setAdImage(existingAd.image);
        setNoOfMonths(existingAd.noOfMonths || 1);
        setStartDate(existingAd.start_date || 1);
        setEndDate(existingAd.end_date || 1);
        if (existingAd.show_on_pages) {
            try {
              setSelectedPages(JSON.parse(existingAd.show_on_pages));
            } catch (e) {
              console.error('Failed to parse show_on_pages:', e);
            }
          }
          setUserBookedDates(safeParse(existingAd.booked_dates).map(date => new Date(date)));

      }
    }, [existingAd]);
    
  
    const addSelectedPage = (e) => {
        const selectedPage = e.target.value;
        if(selectedPage == 'Select Page' || category == 'Select Category')
            return;
        setSelectedPages((prev) => {
          const newPages = { ...prev };
          if (!newPages[category]) {
            newPages[category] = [];
          }
          if (!newPages[category].includes(selectedPage)) {
            newPages[category] = [selectedPage, ...newPages[category]];            
          }
          return newPages;
        });
      };

      const removeSelectedPage = (cat, page) => {
        setSelectedPages((prev) => {
          const newPages = { ...prev };
          newPages[cat] = newPages[cat].filter((p) => p !== page);
          if (newPages[cat].length === 0) {
            delete newPages[cat];
          }
          return newPages;
        });
      };

    console.log('page begore',page);
    const onSubmit = async (e) => {
        console.log('page after',page);
      e.preventDefault();
  console.log('existingAd',typeof existingAd);
  console.log('adImage',  adImage);
      if (!category || !page) return message({ status: 'Error', error: { message: 'Please select category and page' } });
  
      const [isValid, errorMessage] = validateAdForm(adData);
  
      if (!isValid) return message({ status: 'Error', error: { message: errorMessage } });
  
      if (!existingAd && !adImage ) return message({ status: 'Error', error: { message: 'Please upload an image' } });
  
      const formData = new FormData(adFormRef.current);
      formData.append('company_id', user._id);
      formData.append('show_on_pages', JSON.stringify(selectedPages));
      formData.append('noOfMonths', noOfMonths);
      formData.append('booked_dates',  JSON.stringify(userBookedDates));
      formData.append('name', 'kiran');
      
      formData.append('created_by', user._id);
      formData.append('start_date', startDate);
      formData.append('end_date', endDate);
      formData.append('image', adImage);
      formData.delete('page');
      
      const isCloned = !!cloneAdId;
      formData.append("isCloned", isCloned.toString());

      const request = existingAd ? adService.updateAd(existingAd._id, formData) : adService.postAd(formData);
      const { error } = await tryCatch(() => request);
  
      if (error) return message({ status: 'Error', error });
  
      message({ status: 'Success', message: `Ad ${existingAd ? 'Updated' : 'Posted'} Successfully`, path: '/company/ads' });
    };
  
  
    const handleForm = (e) => {
      const { id, value } = e.target;
      setAdData({ ...adData, [id]: value });
    };
  
    const handleDateUpdate = (dates) => {
      setUserBookedDates(dates);
  
      if (selectSingleDay && dates.length > 0) {
        const selectedDate = dates[0];
        if (noOfMonths > 0) {
          const calculatedEndDate = selectedDate && noOfMonths > 0 
          ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() + noOfMonths, selectedDate.getDate() - 1) 
          : null;
          setStartDate(new Date(selectedDate));
          setEndDate(calculatedEndDate);
        } else {
          setStartDate(null);
          setEndDate(null);
        }
      } else {
        setStartDate(null);
        setEndDate(null);
      }
    };
  
  
    const onImageResize = (blob) => {
      setAdData({ ...adData, image: URL.createObjectURL(blob) });
      setAdImage(blob);
    };
  
    const onMonthsChange = (e) => {
      const monthsToAdd = Number(e.target.value);
      setNoOfMonths(monthsToAdd);
      setEndDate(getEndDate(monthsToAdd));
    };
  
    const onUploadImage = (e) => {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setAdImage(e.target.files[0]);
    };

    
  console.log('selectedPages',selectedPages);
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

                {/* No. of Months, Start Date, and End Date in a Single Row */}
      <div className='grid lg:grid-cols-4 items-center gap-3'>
        <label htmlFor='noOfMonths' className='text-nowrap'>NO of Months</label>
        <select id='noOfMonths' value={noOfMonths} onChange={onMonthsChange} className='border border-slate-600 rounded-md px-3 py-2'>
          {[...Array(12)].map((_, index) => (
            <option key={index} value={index + 1}>{index + 1} Month{index === 0 ? '' : 's'}</option>
          ))}
        </select>
        <DatePickerComponent
          selectSingleDay={selectSingleDay}
          userBookedDates={userBookedDates}
          blockedDates={[]}
          onDateUpdate={handleDateUpdate}
          noOfMonths={noOfMonths}
        />
        <input type='hidden' name='endDate' disabled value={endDate} className='border border-slate-600 rounded-md px-3 py-2' />
      </div>

                 <div className='grid lg:grid-cols-4'>
          <label>Select Page</label>
          <div className='lg:col-span-3 flex gap-3'>
          <select className='border capitalize border-slate-600 rounded-md px-3 py-2' value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value='Select Category'>Select Category</option>
              {Object.keys(pageCategories).map((title, index) => <option className='capitalize' key={index}>{title}</option>)}
            </select>
            <select value={page} name='page' onChange={(e) => { setPage(e.target.value); addSelectedPage(e); }} className='border border-slate-600 rounded-md px-3 py-2'>
              <option  value='Select Page'>Select Page</option>
              {pageCategories[category]?.map((page, index) => <option key={index} value={getValue(page.path)}>{page.title}</option>)}
            </select>
          </div>
        </div>
        <div className='selected-pages grid grid-cols-4 gap-4'>
        {Object.keys(selectedPages).map((cat) => (
          <div key={cat} className='border p-2 rounded-md'>
            <div className='font-bold mb-2'>{cat}</div>
            <div className='grid gap-2'>
              {selectedPages[cat].map((pg, index) => (
                <div key={index} className='border p-2 rounded-md flex justify-between items-center'>
                  <span>{pg}</span>
                  <a
                    className='text-red-500 cursor-pointer no-underline'
                    onClick={() => removeSelectedPage(cat, pg)}
                  >
                    ✖
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
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
                        <SpecificPageAd imageUrl = {imageUrl} ad={adData} mode='livead' />
                    </div>
                </div>

                <div className='self-end'>
                    <button type='submit' className='bg-slate-800 px-4  py-2 text-white rounded-md'>Submit</button>
                </div>
            </form>
        </div>
    )
}
