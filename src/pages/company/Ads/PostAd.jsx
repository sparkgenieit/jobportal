import { useRef, useState, useEffect } from "react";
import NavBarInfo from "../../../layouts/common/navbarItems";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { adService } from "../../../services/company/Ads.service";
import { tryCatch } from "../../../helpers/functions";
import { CitiesList } from "../../../helpers/constants";
import ImageResizer from "../CompanyProfile/ImageResizer";
import { getValue, validateAdForm } from "./adsFunctions";
import DatePickerComponent from "../common/DatePickerComponent";
import { BASE_API_URL } from '../../../helpers/constants';

const formatDate = (date) => date.toISOString().split("T")[0];

const getEndDate = (monthsToAdd) => {
    const currentDateObj = new Date();
    currentDateObj.setMonth(currentDateObj.getMonth() + monthsToAdd);
    return formatDate(currentDateObj);
};

export default function AdForm({ pageType, existingAd = null, onSuccess }) {
    const adFormRef = useRef(null);
    const message = useShowMessage();
    const user = useCurrentUser();
    console.log('User',user);
    const Categories = { ...NavBarInfo };
    let pageCategories;

    if (pageType === "b2b") {
        const transformData = (data) =>
            (data || []).reduce((acc, item) => {
                acc[item.heading] = [...item.links];
                return acc;
            }, {});
        pageCategories = transformData(Categories["b2B"] || []);
    } else {
        ["places", "regions", "info", "b2B"].forEach((key) => delete Categories[key]);
        pageCategories = Categories;
    }

    const [category, setCategory] = useState(
        existingAd?.category || Object.keys(pageCategories)?.[0] || ""
    );
    const [page, setPage] = useState(
        existingAd?.show_on_pages ? JSON.parse(existingAd.show_on_pages) : getValue(pageCategories[category]?.[0]?.path)
    );
    const [noOfMonths, setNoOfMonths] = useState(
        existingAd ? Math.round((new Date(existingAd.end_date) - new Date()) / (30 * 24 * 60 * 60 * 1000)) : 1
    );
    //const [endDate, setEndDate] = useState(existingAd?.end_date || getEndDate(noOfMonths));
    const [selectSingleDay, setSelectSingleDay] = useState(false);
    const [userBookedDates, setUserBookedDates] = useState(
        existingAd?.booked_dates ? JSON.parse(existingAd.booked_dates) : []
    );
    
    const [blockedDates, setBlockedDates] = useState([]);

    const [adData, setAdData] = useState({
        location: existingAd?.location || category,
        description: existingAd?.description || "",
        title: existingAd?.title || "",
        redirect_url: existingAd?.redirect_url || "",
        type: existingAd?.type || pageType,
        image: existingAd?.image || null,
    });

    
    const handleForm = (e) => {
        const { id, value } = e.target;
        setAdData((prev) => ({ ...prev, [id]: value }));
    };

    const handleDateUpdate = (dates) => {
        setUserBookedDates(dates);    
    };
console.log('adData',adData);
console.log('userBookedDates',userBookedDates);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!category || !page) return message({ status: "Error", error: { message: "Please select category and page" } });

        const [isValid, errorMessage] = validateAdForm(adData);
        if (!isValid) return message({ status: "Error", error: { message: errorMessage } });

        const formData = new FormData();
        formData.append("company_id", user._id);
        formData.append("show_on_pages", JSON.stringify(page));
        formData.append("category", category);
        formData.append("created_by", user._id);
        formData.append("end_date", '');

                // ✅ Append missing fields
        formData.append("title", adData.title);
        formData.append("description", adData.description);
        formData.append("redirect_url", adData.redirect_url);
        formData.append("type", adData.type); // If this field is necessary
        formData.append('booked_dates',  JSON.stringify(userBookedDates));


        if (adData.image && typeof adData.image !== "string") formData.append("image", adData.image);

        const serviceCall = existingAd
        ? (formData) => adService.updateAd(existingAd._id, formData)  // Pass `existingAd._id` for updates
        : adService.postAd;  // No ID needed for new ads
        const { error } = await tryCatch(() => serviceCall(formData));

        if (error) return message({ status: "Error", error });

        message({
            status: "Success",
            message: existingAd ? "Ad Updated Successfully" : "Ad Posted Successfully",
            path: "/company/ads",
        });

        if (onSuccess) onSuccess();
    };


    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-3xl">
            <h3 className="text-center text-xl font-semibold mb-4">{existingAd ? "Edit Ad" : "Post Ad"}</h3>
            <form ref={adFormRef} onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex items-center gap-2">
                    <label className="w-1/3 text-gray-700 font-medium">Title</label>
                    <input type="hidden" name="type" value={pageType} />
                    <input
                        type="text"
                        id="title"
                        value={adData.title}
                        onChange={handleForm}
                        className="w-2/3 border p-2 rounded-md"
                    />
                </div>

                {/* Description */}
                <div className="flex items-center gap-2 col-span-2">
                    <label className="w-1/4 text-gray-700 font-medium">Description</label>
                    <textarea
                        id="description"
                        value={adData.description}
                        onChange={handleForm}
                        className="w-3/4 border p-2 rounded-md"
                    />
                </div>

                {/* Redirect URL */}
                <div className="flex items-center gap-2">
                    <label className="w-1/3 text-gray-700 font-medium">Redirect URL</label>
                    <input
                        type="text"
                        id="redirect_url"
                        value={adData.redirect_url}
                        onChange={handleForm}
                        className="w-2/3 border p-2 rounded-md"
                    />
                </div>

                {/* Category Selection */}
                <div className="flex items-center gap-2">
                    <label className="w-1/3 text-gray-700 font-medium">Category</label>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-2/3 border p-2 rounded-md bg-white"
                    >
                        {Object.keys(pageCategories).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                </div>

                
                {/* Category Selection */}
                <div className="flex items-center gap-2">
                    <label className="w-1/3 text-gray-700 font-medium">Select Dates</label>
                    <DatePickerComponent selectSingleDay={selectSingleDay} userBookedDates={userBookedDates} blockedDates={blockedDates} onDateUpdate={handleDateUpdate} noOfMonths={noOfMonths} />
                </div>

               {/* Upload Image */}
               <div className="flex flex-col gap-2 col-span-2">
                    <label className="text-gray-700 font-medium">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setAdData({ ...adData, image: file, imageUrl: URL.createObjectURL(file) });
                            }
                        }}
                        className="border p-2 rounded-md"
                    />
                    {adData.imageUrl && (
                        <ImageResizer
                            width={250}
                            height={100}
                            setImg={(img) => setAdData({ ...adData, image: img })}
                            imgSrc={adData.imageUrl}
                        />
                    )}
 {adData.image && !adData.imageUrl &&(
                            <>
                            <label className="text-gray-700 font-medium">Preview Image</label>
                            <img
                                style={{ maxWidth: "300px", maxHeight: "200px" }}
                                className="rounded border border-secondary me-md-3 mb-3 mb-md-0"
                                src={`${BASE_API_URL}/uploads/ads/${adData.image}`}
                                 
                                alt={adData.title}
                            />
                            </>
                        )}

                </div>

                {/* Submit Button */}
                <div className="col-span-2 text-center">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
                        {existingAd ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}
