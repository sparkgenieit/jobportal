import { useEffect, useState } from "react";
import MdxEditor from "../../../components/MdxEditor";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import http from "../../../helpers/http";
import { validateIsNotEmpty } from "../../../helpers/functions/textFunctions";
import { getUserID } from "../../../helpers/functions";
import { IoMdArrowBack } from "react-icons/io";

let limit = 100

export default function MailAdmin() {
    const [msg, setMsg] = useState("")
    const [admins, setAdmins] = useState([])
    const [selectedAdmin, setSelectedAdmin] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [subject, setSubject] = useState("")
    const message = useShowMessage()
    const [role] = useState(localStorage.getItem("role"))

    const fetchAdmins = async () => {
        try {
            const res = await http.get(`/users/admins/all?limit=${limit}&skip=0`)
            const Admins = res.data.admins.filter(admin => admin._id !== getUserID())
            setAdmins(Admins)
            setSelectedAdmin(Admins.length > 0 ? Admins[0] : {})
            if (res.data.total > limit) {
                limit = res.data.total
                fetchAdmins()
            }
        } catch (error) {
            message({ status: "error", error })
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [])


    const send = async () => {
        if (!selectedAdmin?._id) {
            message({ message: "Please select an admin to mail" })
            return
        }

        if (!validateIsNotEmpty(subject)) {
            message({ message: "Please provide subject for your mail" })
            return
        }

        if (!validateIsNotEmpty(msg)) {
            message({ message: "Please provide message for your mail" })
            return
        }

        setSubmitting(true)
        message({ message: "Sending the mail..." })
        try {
            const data = {
                subject,
                participants: [selectedAdmin._id],
                chat: [
                    {
                        date: new Date(),
                        from: localStorage.getItem("fullname"),
                        message: msg,
                        by: localStorage.getItem("role")
                    }
                ]
            }
            await http.post("/mails/create", data)
            setMsg("")
            setSubject("")
            message({ status: "success", message: "Mail sent", path: `/${role}/admin-inbox` })
        } catch (error) {
            message({ status: "error", error })
        } finally {
            setSubmitting(false)
        }
    }

    const handleSelectAdmin = (e) => {
        const selected = admins.find(admin => admin._id === e.target.value)
        setSelectedAdmin(selected)
    }

    return (
        <div className="content-wrapper bg-white" >
            <button onClick={() => message({ path: -1 })} type="button" className="btn p-1 btn-dark btn-xs rounded-circle ">
                <IoMdArrowBack fontSize={16} />
            </button>

            <h2 className="fw-bold flex-grow-1 fs-4 text-center">Mail an Admin</h2>

            <div className="d-flex flex-column gap-5">

                <div className="d-flex align-items-center gap-3 mt-2">
                    <label className="form-label flex-grow-1 w-25 text-nowrap"> Select an admin to message</label>
                    <select
                        onChange={handleSelectAdmin}
                        value={selectedAdmin?._id}
                        disabled={submitting}
                        className="form-select flex-grow-1"
                    >
                        {admins.length > 0 && admins.map(admin => (
                            <option key={admin._id} value={admin._id}>{admin.first_name + " " + admin.last_name}</option>
                        ))}
                    </select>
                </div>

                <div className="d-flex align-items-center gap-3 ">
                    <label className="form-label flex-grow-1 w-25"> Subject</label>
                    <input
                        type="text"
                        className="form-control flex-grow-1"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        disabled={submitting}
                        placeholder="Subject"
                    />
                </div>

                <div className=" ">
                    <label className="form-label "> Message</label>
                    <div className="">
                        <MdxEditor value={msg} setValue={setMsg} />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn btn-info rounded-4"
                        disabled={submitting}
                        onClick={send}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div >
    )
}