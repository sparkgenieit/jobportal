import { useContext } from "react"
import { Modal } from "react-bootstrap"
import { JobsContext } from "../helpers/Context"
import { marked } from "marked"
import parse from 'html-react-parser'
import { BASE_API_URL } from "../helpers/constants"
import { RxCross1 } from "react-icons/rx"

export default function InfoPopup() {
    const { info, setInfo } = useContext(JobsContext)
    return (

        <Modal size='lg' show={info.show} onHide={() => { setInfo({ show: false }) }} centered>
            <Modal.Body>
                <div className="d-flex justify-content-end d-lg-none mb-2">
                    <RxCross1 onClick={() => setInfo({ show: false })} fontSize={25} className="p-1 rounded border border-1" />
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