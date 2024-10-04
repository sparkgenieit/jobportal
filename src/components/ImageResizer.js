import "./ImageResizer.css"

import { useRef } from "react";

export default function Input({ width, height, setImage, defaultImg }) {
    const imgRef = useRef(null);

    const handleSliders = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const valueToBeChanged = name === "width" ? width : height;
        const percentage = value / 100;
        const toBeAdded = valueToBeChanged * percentage;
        imgRef.current.style[name] = valueToBeChanged + +toBeAdded + "px";
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                <div
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        overflow: "hidden",
                    }}
                    className="flex-grow-1 rounded"
                >
                    <img className="rounded" ref={imgRef} src={defaultImg ? defaultImg : null} />
                </div>
                <input
                    type="range"
                    name="height"
                    onChange={handleSliders}
                    defaultValue={0}
                    min={-50}
                    max={50}
                    className="height-range"
                />
            </div>
            <input
                type="range"
                name="width"
                onChange={handleSliders}
                defaultValue={0}
                min={-50}
                max={50}
                style={{ width: `${width}px` }}
            />

        </div>
    );
}
