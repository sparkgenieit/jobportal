import { useEffect, useState } from "react";

//import MdxEditor from "../../../components/MdxEditor"
import http from "../../../helpers/http"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function SendMailToAllEmployer() {

    const [message, setMessage] = useState("")
    const [subject, setSubject] = useState("")
    const [sendingMessage, setSendingMessage] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        document.title = "Mail all the employers"
    }, [])

    const messageHook = useShowMessage()

    const sendMessage = () => {

        if (!subject || subject.trim() === "") {
            setError("Subject  can't be empty")
            return;
        } else if (!message || message.trim() === "") {
            setError("Message can't be empty")
            return
        } else {
            setError("")
        }
        try {
            setSendingMessage(true)
            const data = { subject, message }
            http.post("/mails/mail-all-employers", data)
            messageHook({
                status: "success",
                message: "Messages Sent"
            })
            setMessage("")
            setSubject("")
        } catch (e) {
            messageHook({
                status: "Error",
                error: e
            })
        } finally {
            setSendingMessage(false)
        }
    }

    return (
        <div className="mt-3 container-fluid">

            <h3 className="text-center fw-bold fs-4">Mail all the employers</h3>

            <div className="d-flex mt-5 flex-column gap-4">

                <div className="row">
                    <div className="col-lg-3">
                        <label className="form-label">Subject:</label>
                    </div>
                    <div className="col-lg-9">
                        <input
                            name="subject"
                            className="form-control"
                            type="text"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value)
                            }}
                            placeholder="Subject"
                        />
                    </div>
                </div>

                <div className="d-flex flex-column gap-2">
                    <label className="form-label">Message:</label>
                    <ReactQuill theme="snow" value={message} onChange={setMessage} />
                    
                </div>

                <div className="fs-6 fw-bold text-center text-danger" >
                    {error && error}
                </div>

                <div className="align-self-end">
                    <button
                        type="button"
                        disabled={sendingMessage}
                        onClick={sendMessage}
                        className="btn btn-primary rounded-4"
                    >
                        {sendingMessage ? "Sending..." : "Send"}
                    </button>
                </div>

            </div>

        </div>
    )
}