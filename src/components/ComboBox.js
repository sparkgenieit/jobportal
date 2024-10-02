import './combo-box.css'
import { useEffect, useRef, useState } from "react"


export default function ComboBox({ suggestions, setSuggestions, label, suggestionValue, onEnter, ...inputProps }) {
    const [current, setCurrent] = useState(-1)
    const comboBoxRef = useRef(null)

    useEffect(() => {
        if (suggestions.length === 0) {
            setCurrent(-1)
        }

        const handleClickOutside = (event) => {
            if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
                setSuggestions([])
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }

    }, [suggestions])

    const handleKeyDown = (e) => {
        if (e.keyCode === 40) {  // down arrow
            e.preventDefault()
            if (suggestions.length - 1 > current) {
                setCurrent((pre) => pre + 1)
            }
        }
        if (e.keyCode === 38) { //up arrows
            e.preventDefault()
            if (current !== -1) {
                setCurrent((pre) => pre - 1)
            }
        }
        if (e.keyCode == 13) { //enter 
            e.preventDefault()
            if (current > -1 && current < suggestions.length) {
                onEnter(suggestions[current])
            }
        }
    }
    return (
        <div ref={comboBoxRef} className="position-relative">
            <input onKeyDown={handleKeyDown} {...inputProps} />
            <ul className="suggestions position-absolute w-100 list-unstyled">
                {suggestions?.length > 0 && suggestions.map((suggestion, i) => (
                    <li
                        key={suggestionValue ? suggestion[suggestionValue] : suggestion}
                        role='button'
                        onClick={() => onEnter(suggestion)}
                        className={` rounded-2 px-1 py-2 ${current === i ? " bg-primary text-white" : "bg-light"} `}
                    >
                        {label ? suggestion[label] : suggestion}
                    </li>
                ))}
            </ul>
        </div>
    )
}