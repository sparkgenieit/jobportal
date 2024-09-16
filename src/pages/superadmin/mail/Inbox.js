import { useEffect, useState } from "react"

import http from "../../../helpers/http"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"


export default function Inbox() {
    const [mails, setMails] = useState([])
    const message = useShowMessage()

    const fetchMails = async () => {
        try {
            const res = await http.get("/mails/all")
            setMails(res.data)
        } catch (error) {
            message({ status: "Error", error })
        }
    }

    useEffect(() => {
        fetchMails()
    }, [])

    return (
        <div className="content-wrapper bg-white">
            <div>
                {mails.length > 0 && mails.map(mail => (
                    <div>{mail.subject}</div>
                ))}
            </div>
        </div>
    )
}