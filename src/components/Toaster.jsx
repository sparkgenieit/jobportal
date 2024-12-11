import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { setToaster } from "../helpers/slices/generalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Toaster() {
    const toaster = useSelector((state) => state.general.toaster)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setToaster({ show: false }))
    }

    const buttonType = `btn ${toaster.type === "success" ? " btn-success" : toaster.type === "error" ? "btn-danger" : "btn-info"}`

    return <>
        <Modal size="sm" show={toaster.show} onHide={handleClose} centered>
            <Modal.Body className="bg-white p-2 responsive-font rounded">
                <div className=" d-flex align-items-center  gap-3">
                    <div>
                        {toaster.type === "success" &&
                            <div>
                                <IoIosCheckmarkCircle color="green" size={30} />
                            </div>
                        }
                        {toaster.type === "error" &&
                            <div>
                                <MdOutlineCancel color="red" size={30} />
                            </div>
                        }
                    </div>
                    <div className="fw-bold flex-grow-1">
                        {toaster.text}
                    </div>
                </div>
                <div className="d-flex justify-content-center pt-3">
                    <button type="button" className={`${buttonType} btn-responsive`} onClick={handleClose}>
                        Ok
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}