import { Modal } from "react-bootstrap"
import { marked } from "marked"
import parse from 'html-react-parser'
import { BASE_API_URL } from "../helpers/constants"
import { RxCross1 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { setInfo } from "../helpers/slices/generalSlice"

export default function InfoPopup() {

    const dispatch = useDispatch()
    const info = useSelector((state) => state.general.info)

    const handleClose = () => {
        dispatch(setInfo({ show: false }))
    }

    return (
        <Modal size='lg' show={info.show} onHide={handleClose} centered>
            <Modal.Body>
                <div className="flex justify-end lg:hidden mb-2">
                    <RxCross1 onClick={handleClose} fontSize={25} className="p-1 rounded-lg border border-slate-200" />
                </div>
                <div className='flex flex-col lg:flex-row lg:items-center  mb-4 text-sm lg:text-base'>
                    <h3 className="grow">{info.job?.company}</h3>
                    <div>
                        {info.job?.companyLogo.length > 0 && <img style={{ width: "10rem" }} className="rounded border border-slate-200" src={`${BASE_API_URL}/uploads/logos/${info.job?.companyLogo}`} alt={info.job?.company} />}
                    </div>
                </div>
                {info.info && <p className="text-sm lg:text-base">{parse(marked(info.info))}</p>}
            </Modal.Body>
        </Modal>
    )
}