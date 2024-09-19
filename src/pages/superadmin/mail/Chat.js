import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { RxDoubleArrowRight } from "react-icons/rx"
import { IoMdArrowBack } from "react-icons/io"
import { useDispatch } from "react-redux"

import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import MdxEditor from "../../../components/MdxEditor"
import { getUserID, timeAgoMinutes } from "../../../helpers/functions"
import { markdownToText, validateIsNotEmpty } from "../../../helpers/functions/textFunctions"
import { getDate } from "../../../helpers/functions/dateFunctions"
import http from "../../../helpers/http"
import { decrementAdminUnreadCount } from "../../../helpers/slices/mailCountSlice"

export default function Chat() {
    const params = useParams()
    const [mail, setMail] = useState({})
    const [addMessage, setAddMessage] = useState({})
    const [toggleState, setToggleState] = useState({})
    const message = useShowMessage()
    const dispatch = useDispatch()

    function reverseArray(arr) {
        const reverseArray = arr.toReversed()
        return reverseArray
    }

    const fetchMail = async (id = params.id) => {
        try {
            const { data } = await http.get(`/mails/details/${id}`)
            setMail(data)
        } catch (error) {
            message({ status: "Error", error })
        }
    }

    const sendMessage = () => {
        const messageData = {
            date: new Date(),
            by: localStorage.getItem("role"),
            message: "",
            from: localStorage.getItem("fullname"),
        }
        setAddMessage(messageData)
        setToggleState({ ...toggleState, showMessageBox: true })
    }

    useEffect(() => {
        fetchMail()
    }, [])

    const postReply = async () => {
        if (!validateIsNotEmpty(addMessage.message)) {
            message({ message: "Please write your message!" })
            return
        }
        setToggleState({ ...toggleState, sendingReply: true })
        try {
            await http.put(`/mails/reply/${mail._id}`, addMessage)
            setToggleState({ showMessageBox: false, sendingReply: false })
            setAddMessage({})
            fetchMail(mail._id)
        } catch (error) {
            setToggleState({ ...toggleState, sendingReply: false })
            message({ status: "error", error })
        }
    }

    return (
        <div className="content-wrapper bg-white container-fluid">
            <button onClick={() => message({ path: -1 })} type="button" className="btn p-1 btn-dark btn-xs rounded-circle ">
                <IoMdArrowBack fontSize={16} />
            </button>

            <div className=" mt-3 d-flex align-items-center">
                <h2 className=" flex-grow-1 fw-bold fs-3 ">
                    {mail?.subject}
                </h2>

                <button onClick={sendMessage} disabled={toggleState.showMessageBox} className="btn btn-info rounded-4">Reply</button>
            </div>

            <div className=" mt-3 ">
                {toggleState.showMessageBox &&
                    <div className="border-bottom p-3" >
                        <p className={`fw-bold fs-5 text-primary`}>{addMessage.from}</p>
                        <p>{getDate(addMessage?.date)}</p>
                        <div className=" w-100 d-flex">
                            <div className="flex-grow-1">
                                <MdxEditor value={addMessage.message} setValue={(value) => setAddMessage({ ...addMessage, message: value })} />
                            </div>
                            <button type="button" disabled={toggleState.sendingReply} onClick={postReply} className="btn btn-success align-self-end rounded p-2">
                                <RxDoubleArrowRight fontSize={20} />
                            </button>
                        </div>
                    </div>
                }

                {mail?.chat &&
                    reverseArray(mail?.chat)?.map((msg, i) => {
                        return <div className=" border-bottom  p-3" >
                            <p className={`fw-bold fs-5 ${msg.from === localStorage.getItem("fullname") ? "text-primary" : "text-black"}`}>{msg.from}</p>
                            <p>{getDate(msg?.date)} ({timeAgoMinutes(new Date(msg?.date).toISOString())})</p>
                            <p className="text-wrap">
                                {markdownToText(msg.message)}
                            </p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}