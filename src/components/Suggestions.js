export default function Suggestions({ SuggestionsList, focus, clearSuggestions, name, setValue, value }) {

    return <>
        {SuggestionsList && SuggestionsList.length > 0 && <ul className='z-3 list-unstyled border rounded w-100 position-absolute bg-light  '>
            {SuggestionsList.map((suggestion, i) => {
                return <li key={i} role="button" onClick={() => { setValue({ ...value, [name]: suggestion.value }); clearSuggestions() }} className={`  px-2 py-1 text-dark  ${focus === i ? "border border-dark rounded" : ""}`}>{suggestion.value}</li>
            })
            }
        </ul >}
    </>
}