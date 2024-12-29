

const AdType = ({ type }) => {
    return (
        <div className="col">
            <button type="button" className="d-flex btn w-100 bg-primary text-white text-nowrap text-center fw-bold rounded-4 p-4">
                {type}
            </button>
        </div >
    )
}

export default function SelectAdType() {
    const adTypes = ["Landing Page Popup", "Home Page Banner", "Home Page Pixel", "Home Page Map Left", "Home Page Map Right", "Specific Page", "B2B"];

    return (
        <div className="mt-4 container-md">
            <div className="fw-bold fs-4 text-center">Select ad type</div>
            <div className="row row-cols-md-3  g-4 my-4">
                {adTypes.map((type, index) => <AdType key={index} type={type} />)}
            </div>
        </div>
    );
}

