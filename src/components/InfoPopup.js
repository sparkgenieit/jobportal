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
                <div className="d-flex justify-content-end d-lg-none mb-2">
                    <RxCross1 onClick={handleClose} fontSize={25} className="p-1 rounded border border-1" />
                </div>
                <div className='row align-items-lg-center  mb-4 responsive-font'>
                    <h3 className="col-lg-9 col-12">{info.job?.company}</h3>
                    <div className="col-lg-3 col-12">
                        {info.job?.companyLogo.length > 0 && <img style={{ width: "10rem" }} className="rounded border" src={`${BASE_API_URL}/uploads/logos/${info.job?.companyLogo}`} alt={info.job?.company} />}
                    </div>
                </div>
                {info.info && <p className="responsive-font">{parse(marked(info.info))}</p>}
            </Modal.Body>
        </Modal>
    )
}