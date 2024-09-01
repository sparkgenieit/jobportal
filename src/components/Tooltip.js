import { useState } from "react"


export default function Tooltip({ tooltipText, children }) {
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
            {tooltip && <div style={{ zIndex: 1000 }} className='text-nowrap  position-absolute bg-secondary mt-1 py-1 px-2 rounded text-white'>{tooltipText}</div>}
        </div>


    )
}