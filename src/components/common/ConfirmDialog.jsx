import { Modal } from "react-bootstrap";

export default function ConfirmDialog({ showModal, onHideModal, confirmText, buttonAttributes, confirmTextClasses }) {
    return (
        <Modal show={showModal} onHide={onHideModal} centered>
            <Modal.Body className="bg-white">
                <div className={confirmTextClasses}>
                    {confirmText}
                </div>
                <div className="flex justify-center gap-3" >
                    {
                        buttonAttributes?.map(({ text, onClick, ...rest }, i) => (
                            <button key={i} type="button" onClick={onClick} {...rest}>{text}</button>
                        ))
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}