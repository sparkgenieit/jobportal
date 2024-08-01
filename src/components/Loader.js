import { RotatingLines } from 'react-loader-spinner';

function Loader() {
    return (
        <div style={{ height: "60vh" }} className="d-flex w-full justify-content-center align-items-center">
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )

}

export default Loader;

