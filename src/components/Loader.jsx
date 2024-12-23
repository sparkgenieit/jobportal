import { RotatingLines } from 'react-loader-spinner';

function Loader({ height = 96, width = 96, color = "green" }) {
    return (
        <div className="d-flex w-full justify-content-center align-items-center">
            <RotatingLines
                visible={true}
                height={height}
                width={width}
                strokeColor={color}
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

