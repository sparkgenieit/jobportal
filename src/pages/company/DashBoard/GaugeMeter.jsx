import ReactSpeedometer from "react-d3-speedometer";

export default function GuageMeter({ value, name }) {




    return (
        <div>
            <h3 className="fs-5 fw-bold text-center">
                {name}
            </h3>

            <ReactSpeedometer
                minValue={0}
                maxValue={value > 200 ? value : 200}
                value={value}
                width={200}
                height={150}
                needleColor="black"
            />
        </div>
    )
}