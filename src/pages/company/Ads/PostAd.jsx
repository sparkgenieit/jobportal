import { useRef, useState, useEffect } from "react";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import { useSearchParams } from 'react-router-dom';
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { adService } from "../../../services/company/Ads.service";
import { tryCatch } from "../../../helpers/functions";
import DatePickerComponent from "../common/DatePickerComponent";
import ImageResizer from "../CompanyProfile/ImageResizer";
import { validateAdForm } from "./adsFunctions";
import { BASE_API_URL } from '../../../helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../helpers/slices/userSlice';

// Helper to map pageType to a human-friendly Ad label
const getAdLabel = (pageType) => {
  switch (pageType) {
    case "landing-page-popup":
      return "Landing Page Ad";
    case "home-page-map-left":
      return "Home Page Map Left Ad";
    case "home-page-map-right":
      return "Home Page Map Right Ad";
    case "home-page-banner":
      return "Home Page Banner Ad";
    case "home-page-pixel":
      return "Home Page Pixel Ad";
    default:
      return "Ad";
  }
};

export default function AdForm({ pageType, existingAd = null, onSuccess }) {
  const adFormRef = useRef(null);
  const [searchParams] = useSearchParams();
  const message = useShowMessage();
  const user = useCurrentUser();

  const noOfMonths = 1;
  const selectSingleDay = false;
  const [userBookedDates, setUserBookedDates] = useState(
    existingAd?.booked_dates ? JSON.parse(existingAd.booked_dates) : []
  );
  const [blockedDates, setBlockedDates] = useState([]);
  const cloneAdId = searchParams.get("c");

  const adLabel = getAdLabel(pageType);
   const dispatch = useDispatch()

  useEffect(() => {
    // Dynamically set document title based on action and ad type
    document.title = existingAd ? `Edit ${adLabel}` : `Post ${adLabel}`;

    // Fetch blocked dates
    async function fetchBlocked() {
      try {
        const result = await adService.getBlockedDates(pageType, existingAd?._id);
        const dates = [...new Set(result.data.flatMap(d => JSON.parse(d)))]
          .map(d => new Date(d));
        setBlockedDates(dates);
      } catch {
        // ignore errors
      }
    }
    fetchBlocked();
  }, [existingAd, pageType, adLabel]);

  const [adData, setAdData] = useState({
    title: existingAd?.title || "",
    description: existingAd?.description || "",
    redirect_url: existingAd?.redirect_url || "",
    image: existingAd?.image || null,
    imageUrl: existingAd?.image ? `${BASE_API_URL}/uploads/ads/${existingAd.image}` : null,
  });

  const handleForm = (e) => {
    const { id, value } = e.target;
    setAdData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateUpdate = (dates) => {
    setUserBookedDates(dates);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const [isValid, err] = validateAdForm(adData);
    if (!isValid) return message({ status: 'Error', error: { message: err } });

    const formatted = userBookedDates.map(d => new Date(d).toISOString().split('T')[0]);
    const formData = new FormData();
    formData.append('company_id', user._id);
    formData.append('created_by', user._id);
    formData.append('booked_dates', JSON.stringify(formatted));
    formData.append('title', adData.title);
    formData.append('description', adData.description);
    formData.append('redirect_url', adData.redirect_url);
    formData.append('type', pageType);
    if (cloneAdId || (adData.image && typeof adData.image !== 'string')) {
      formData.append('image', adData.image);
    }

    const serviceCall = existingAd
      ? () => adService.updateAd(existingAd._id, formData)
      : () => adService.postAd(formData);
    const { error } = await tryCatch(serviceCall);
    if (error) return message({ status: 'Error', error });
    dispatch(fetchUser()) //To Update Credits
    message({ status: 'Success', message: existingAd ? `${adLabel} Updated Successfully` : `${adLabel} Posted Successfully`, path: '/company/ads' });
    if (onSuccess) onSuccess();
  };

  return (
    <div className="my-4 container">
      {/* Page title based on action and ad type */}
      <h3 className="text-center w-full font-bold">
        {existingAd ? `Edit ${adLabel}` : `Post ${adLabel}`}
      </h3>
      <form encType="multipart/form-data" ref={adFormRef} onSubmit={onSubmit} className="flex flex-col gap-3">

        {/* Title */}
        <div className="grid lg:grid-cols-4 items-center">
          <label htmlFor="title" className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={adData.title}
            onChange={handleForm}
            className="col-span-3 border border-slate-600 rounded-md w-full px-3 py-2"
            placeholder="Ad Title"
          />
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-4 items-start">
          <label htmlFor="description" className="text-gray-700 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={adData.description}
            onChange={handleForm}
            rows={5}
            className="col-span-3 border border-slate-600 rounded-md w-full px-3 py-2"
            placeholder="Ad Description"
          />
        </div>

        {/* Select Dates */}
        <div className="grid lg:grid-cols-4 items-start">
          <label htmlFor="dates" className="text-gray-700 font-medium">Select Dates</label>
          <div className="col-span-3">
            <DatePickerComponent
              selectSingleDay={selectSingleDay}
              userBookedDates={userBookedDates}
              blockedDates={blockedDates}
              onDateUpdate={handleDateUpdate}
              noOfMonths={noOfMonths}
            />
          </div>
        </div>

        {/* Redirect URL */}
        <div className="grid lg:grid-cols-4 items-center">
          <label htmlFor="redirect_url" className="text-gray-700 font-medium">Redirect URL</label>
          <input
            type="text"
            id="redirect_url"
            name="redirect_url"
            value={adData.redirect_url}
            onChange={handleForm}
            className="col-span-3 border border-slate-600 rounded-md w-full px-3 py-2"
            placeholder="https://example.com"
          />
        </div>

        {/* Upload + Preview */}
        <div className="flex justify-between py-3 w-full">
          <div>
            <label htmlFor="image" className="text-nowrap mb-2 bg-slate-800 p-2 text-white rounded-md">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              onChange={e => {
                const file = e.target.files[0];
                if (file) setAdData(prev => ({ ...prev, image: file, imageUrl: URL.createObjectURL(file) }));
              }}
            />
          </div>
          {adData.imageUrl && (
            <div>
              <p className="font-bold m-0 mb-2">Preview</p>
              <ImageResizer width={625} height={250} setImg={blob => setAdData(prev => ({ ...prev, image: blob }))} imgSrc={adData.imageUrl} />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="self-end">
            <button type="submit" className="bg-slate-800 px-4 py-2 text-white rounded-md">{existingAd ? 'Update' : 'Submit'}</button>
        </div>

      </form>
    </div>
  );
}
