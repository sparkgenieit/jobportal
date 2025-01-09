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

    const buttonType = `px-3 py-2 text-white rounded-lg ${toaster.type === "success" ? " bg-green-700" : toaster.type === "error" ? "bg-red-600" : "bg-blue-400"}`

    return <>
        <Modal size="sm" show={toaster.show} onHide={handleClose} centered>
            <Modal.Body className="bg-white p-2 text-sm lg:text-base rounded-lg">
                <div className=" flex items-center  gap-3">
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
                    <div className="font-bold grow">
                        {toaster.text}
                    </div>
                </div>
                <div className="flex justify-center pt-3">
                    <button type="button" className={buttonType} onClick={handleClose}>
                        Ok
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}