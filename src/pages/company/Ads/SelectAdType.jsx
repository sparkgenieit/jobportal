import { useNavigate } from "react-router-dom";
import { adTypes } from "../../../services/company/Ads.service";


const AdType = ({ type }) => {
    const navigate = useNavigate()
    return (
        <div className="col">
            <button type="button" onClick={() => navigate(`/company/ads/post/${type.slugName}`)} className="d-flex btn w-100 bg-primary text-white text-nowrap text-center fw-bold rounded-4 p-4">
                {type.name}
            </button>
        </div >
    )
}

export default function SelectAdType() {

    return (
        <div className="mt-4 container-md">
            <div className="fw-bold fs-4 text-center">Select ad type</div>
            <div className="row row-cols-md-3  g-4 my-4">
                {adTypes.map((type, index) => <AdType key={index} type={type} />)}
            </div>
        </div>
    );
}

