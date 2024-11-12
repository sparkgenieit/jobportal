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
                <div className="d-flex justify-content-end d-lg-none rounded float-end border border-1 p-1"><RxCross1 onClick={() => setInfo({ show: false })} /></div>
                <div className='d-flex align-items-center  flex-wrap justify-content-between mb-4'>
                    <h3>{info.job?.company}</h3>
                    {info.job?.companyLogo.length > 0 && <img className="company-logo rounded border" src={`${BASE_API_URL}/uploads/logos/${info.job?.companyLogo}`} alt={info.job?.company} />}
                </div>
                {info.info && <p>{parse(marked(info.info))}</p>}
            </Modal.Body>
        </Modal>
    )
}