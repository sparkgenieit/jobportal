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
            {tooltip && <div className='text-nowrap z-3 position-absolute bg-secondary mt-2 py-1 px-2 rounded text-white'>{tooltipText}</div>}
        </div>


    )
}