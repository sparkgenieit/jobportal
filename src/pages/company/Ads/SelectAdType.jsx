import { useNavigate } from "react-router-dom";
import { adTypes } from "../../../services/company/Ads.service";
import { companyUrls } from "../../../services/common/urls/companyUrls.service";

const AdType = ({ type }) => {
    const navigate = useNavigate(); // Call inside component

    return (
        <div className="col">
            <button
                type="button"
                onClick={() => navigate(companyUrls.goTopostAd(type.slugName))}
                className="p-4 bg-blue-600 text-white rounded-xl w-60 hover:bg-blue-700">
                {type.name}
            </button>
        </div>
    );
};

export default function SelectAdType() {
    return (
        <div className="mt-4 lg:mx-auto flex flex-col gap-3">
            <h3 className="font-bold text-2xl text-center">Select Ad type</h3>
            <div className="grid grid-cols-3 gap-y-12 gap-x-3">
                {adTypes.map((type) => (
                    <AdType key={type.slugName || type.id} type={type} />
                ))}
            </div>
        </div>
    );
}
