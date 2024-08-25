import { useAccordionButton } from 'react-bootstrap/AccordionButton';


export default function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <button
            type="button"
            className='btn'
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}