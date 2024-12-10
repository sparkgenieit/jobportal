import ReactSpeedometer from "react-d3-speedometer";

export default function GuageMeter({ value, name }) {


    const maxValue = value > 200 ? value : 200

    return (
        <div>
            <h3 className="fs-5 fw-bold text-center">
                {name}
            </h3>

            <ReactSpeedometer
                forceRender={true}
                maxSegmentLabels={1}
                needleColor={'#fffff'}
                minValue={0}
                startColor="red"
                endColor="green"
                segments={500}
                maxValue={maxValue}
                width={200}
                height={150}
                value={value ? value : 0}
                needleHeightRatio={0.8}
            />

            {/* <ReactSpeedometer
                forceRender={true}
                minValue={0}
                maxValue={value > 200 ? value : 200}
                value={value}
                width={250}
                height={180}
                customSegmentStops={[0, value]}
                maxSegmentLabels={1}
                segments={5555}
                textColor={"black"}
                needleColor="black"
            /> */}
        </div>
    )
}