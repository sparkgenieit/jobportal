import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { Modal } from "react-bootstrap";

export default function Toaster({ message, setMessage }) {
    const handleClose = () => {
        setMessage({ ...message, show: false })
    }
    const buttonType = `btn ${message.type === "success" ? " btn-success" : message.type === "error" ? "btn-danger" : "btn-info"}`

    return <>
        <Modal size="sm" show={message.show} onHide={handleClose} centered>
            <Modal.Body className="bg-white p-2">
                <div className=" d-flex align-items-center  gap-3">
                    <div>
                        {message.type === "success" &&
                            <div>
                                <IoIosCheckmarkCircle color="green" size={30} />
                            </div>
                        }
                        {message.type === "error" &&
                            <div>
                                <MdOutlineCancel color="red" size={30} />
                            </div>
                        }
                    </div>
                    <div className="fw-bold flex-grow-1">
                        {message.text}
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <button type="button" className={buttonType} onClick={handleClose}>
                        Ok
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}