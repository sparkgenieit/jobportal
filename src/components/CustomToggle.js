import { useAccordionButton } from 'react-bootstrap/AccordionButton';


export default function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

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