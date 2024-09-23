import { useContext } from "react"
import { Modal } from "react-bootstrap"
import { JobsContext } from "../helpers/Context"
import { marked } from "marked"
import parse from 'html-react-parser'
import { BASE_API_URL } from "../helpers/constants"

export default function InfoPopup() {
    const { info, setInfo } = useContext(JobsContext)
    return (

        <Modal size='lg' show={info.show} onHide={() => { setInfo({ show: false }) }} centered>
            <Modal.Body>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <h3>{info.job?.company}</h3>
                    {info.job?.companyLogo.length > 0 && <img style={{ width: "9vw", height: "12vh" }} className="rounded border" src={`${BASE_API_URL}/uploads/logos/${info.job?.companyLogo}`} alt={info.job?.company} />}
                </div>
                {info.info && <p>{parse(marked(info.info))}</p>}
            </Modal.Body>
        </Modal>
    )
}