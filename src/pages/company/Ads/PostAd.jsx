// Updated PostAd Component (AdForm)
import { useRef, useState, useEffect } from "react";
import NavBarInfo from "../../../layouts/common/navbarItems";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";
import { adService } from "../../../services/company/Ads.service";
import { tryCatch } from "../../../helpers/functions";
import { CitiesList } from "../../../helpers/constants";
import ImageResizer from "../CompanyProfile/ImageResizer";
import { getValue, validateAdForm } from "./adsFunctions";

const formatDate = (date) => date.toISOString().split("T")[0];

const getEndDate = (monthsToAdd) => {
    const currentDateObj = new Date();
    currentDateObj.setMonth(currentDateObj.getMonth() + monthsToAdd);
    return formatDate(currentDateObj);
};

export default function AdForm({ pageType, existingAd = null, onSuccess }) {
    const adFormRef = useRef(null); // FIX: Define the ref properly
    const Categories = { ...NavBarInfo };
    let pageCategories;

    if (pageType === "b2b") {
        const transformData = (data) =>
            data.reduce((acc, item) => {
                acc[item.heading] = [...item.links];
                return acc;
            }, {});
        pageCategories = transformData(Categories["b2B"]);
    } else {
        ["places", "regions", "info", "b2B"].forEach((key) => delete Categories[key]);
        pageCategories = Categories;
    }

    const [category, setCategory] = useState(existingAd?.category || Object.keys(pageCategories)[0]);
    const [page, setPage] = useState(existingAd?.show_on_pages || getValue(pageCategories[category]?.[0]?.path));
    const [noOfMonths, setNoOfMonths] = useState(existingAd ? Math.round((new Date(existingAd.end_date) - new Date()) / (30 * 24 * 60 * 60 * 1000)) : 1);
    const [endDate, setEndDate] = useState(existingAd?.end_date || getEndDate(noOfMonths));

    const [adData, setAdData] = useState({
        location: existingAd?.location || CitiesList[0],
        description: existingAd?.description || "",
        title: existingAd?.title || "",
        redirect_url: existingAd?.redirect_url || "",
        type: existingAd?.type || "",
        image: existingAd?.image || null
    });

    useEffect(() => {
        if (existingAd) {
            setEndDate(existingAd.end_date || getEndDate(noOfMonths));
        }
    }, [existingAd, noOfMonths]);

    const handleForm = (e) => setAdData({ ...adData, [e.target.id]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!category || !page) return message({ status: "Error", error: { message: "Please select category and page" } });
        
        const [isValid, errorMessage] = validateAdForm(adData);
        if (!isValid) return message({ status: "Error", error: { message: errorMessage } });
        
        const formData = new FormData();
        formData.append("company_id", user._id);
        formData.append("show_on_pages", page);
        formData.append("created_by", user._id);
        formData.append("end_date", endDate);
        if (adData.image) formData.append("image", adData.image);
        
        const serviceCall = existingAd ? adService.updateAd : adService.postAd;
        const { error } = await tryCatch(() => serviceCall(formData));
        
        if (error) return message({ status: "Error", error });
        
        message({
            status: "Success",
            message: existingAd ? "Ad Updated Successfully" : "Ad Posted Successfully",
            path: "/company/ads"
        });

        if (onSuccess) onSuccess();
    };

    return (
        <div className="container flex flex-col gap-3 p-4">
            <h3 className="text-center w-full font-bold">{existingAd ? "Edit Ad" : "Post Ad"}</h3>
            <form ref={adFormRef} onSubmit={onSubmit} className="flex flex-col gap-3">
                <label>Title</label>
                <input type="text" id="title" value={adData.title} onChange={handleForm} />

                <label>Description</label>
                <textarea id="description" value={adData.description} onChange={handleForm} />

                <label>Redirect URL</label>
                <input type="text" id="redirect_url" value={adData.redirect_url} onChange={handleForm} />

                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {Object.keys(pageCategories).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <label>Upload Image</label>
                <input type="file" accept="image/*" onChange={(e) => setAdData({ ...adData, image: e.target.files[0] })} />
                {adData.image && <ImageResizer width={250} height={100} setImg={(img) => setAdData({ ...adData, image: img })} imgSrc={adData.image} />}

                <button type="submit">{existingAd ? "Update" : "Submit"}</button>
            </form>
        </div>
    );
}
