import { useNavigate } from "react-router-dom";
import { adTypes } from "../../../services/company/Ads.service";
import { companyUrls } from "../../../services/common/urls/companyUrls.service";


const AdType = ({ type, navigate }) => {
    return (
        <div className="col">
            <button
                type="button"
                onClick={() => navigate(companyUrls.goTopostAd(type.slugName))}
                className="p-4 bg-blue-600 text-white rounded-xl w-60 hover:bg-blue-700">
                {type.name}
            </button>
        </div >
    )
}

export default function SelectAdType() {
    const navigate = useNavigate()
    return (
        <div className="mt-4 lg:mx-auto flex flex-col gap-3">
            <h3 className="font-bold text-2xl text-center">Select Ad type</h3>
            <div className="grid grid-cols-3 gap-3">
                {adTypes.map((type, index) => <AdType key={index} type={type} navigate={navigate} />)}
            </div>
        </div>
    );
}

