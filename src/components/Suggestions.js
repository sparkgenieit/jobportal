import { useEffect, useRef } from "react";

export default function Suggestions({ SuggestionsList, focus, clearSuggestions, name, setValue, value }) {

    const suggestionRef = useRef(null)

    const handleClickOutside = (event) => {
        if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
            clearSuggestions()
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    const handleInput = (suggestion) => {
        setValue({ ...value, [name]: suggestion });
        clearSuggestions();
    }

    return (
        <ul ref={suggestionRef} className='z-3 list-unstyled border rounded w-100 position-absolute bg-light'>
            {SuggestionsList && SuggestionsList.length > 0 && SuggestionsList.map((suggestion, i) => {
                return <li key={i} role="button" onClick={() => { handleInput(suggestion.value) }} className={`px-2 py-1 text-dark  ${focus === i ? "border border-dark rounded" : ""}`}>{suggestion.value}</li>
            })
            }
        </ul >
    )
}