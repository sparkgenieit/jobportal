import { useState } from "react"


export default function Tooltip({ tooltipText, size, rightAlign, children }) {
    const [tooltip, setTooltip] = useState()

    const handleTooltip = (value, name) => {
        setTooltip(value)
    }

    return (

        <div
            role="button"
            className="position-relative"
            onMouseOver={() => handleTooltip(true)}
            onMouseLeave={() => handleTooltip(false)}
        >
            {children}
            {tooltip && <div style={{ fontSize: size ? `${size}px` : "inherit", zIndex: 1000 }} className={`text-nowrap fw-normal  position-absolute ${rightAlign ? "end-0" : ""} bg-secondary mt-1 py-1 px-2 rounded text-white`}>{tooltipText}</div>}
        </div>


    )
}