import { useAccordionButton } from 'react-bootstrap/AccordionButton';


export default function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
        <div onClick={decoratedOnClick}>
            {children}
        </div>
    );
}