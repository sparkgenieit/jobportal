import ReactSpeedometer from "react-d3-speedometer";

export default function GuageMeter({ value, name }) {


    const maxValue = value > 200 ? value : 200

    return (
        <div>
            <h3 className="text-lg font-bold text-center">
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
        </div>
    )
}