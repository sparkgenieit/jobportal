import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { RxDoubleArrowRight } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

import { timeAgoMinutes } from "../helpers/functions";
import http from "../helpers/http"
import MdxEditor from "./MdxEditor";
import { markdownToText } from "../helpers/functions/textFunctions";
import { getDate } from "../helpers/functions/dateFunctions";
import useShowMessage from "../helpers/Hooks/useShowMessage";
import useCurrentUser from "../helpers/Hooks/useCurrentUser";

export default function ChatPage({ name }) {
    const params = useParams()
    const [query, setQuery] = useState({})
    const [addMessage, setAddMessage] = useState({})
    const [toggleState, setToggleState] = useState({})
    const message = useShowMessage()
    const user = useCurrentUser()


    const fetchQuery = async (id) => {
        try {
            const res = await http.get(`/mails/employer/details/${id}`)
            setQuery(res.data)
        } catch (error) {
            message({ status: 'error', error })
        }
    }

    const handleMessage = (value) => {
        setAddMessage({ ...addMessage, message: value })
        setToggleState({ ...toggleState, errorInPostingReply: value?.trim() === "" ? 'Please enter message' : null })
    }

    function reverseArray(arr) {
        const reverseArray = arr.toReversed()
        return reverseArray
    }

    const postReply = async () => {
        if (addMessage.message && addMessage.message?.trim() !== "") {
            setToggleState({ ...toggleState, sendingReply: true })
            try {
                const response = await http.put(`/mails/employer/reply/${query._id}`, addMessage)
                setToggleState({ showMessageBox: false, sendingReply: false, errorInPostingReply: null })
                setAddMessage({})
                fetchQuery(query._id)
            } catch (error) {
                setToggleState({ ...toggleState, sendingReply: false, errorInPostingReply: "Something went wrong! Please try again" })
            }
        } else {
            setToggleState({ ...toggleState, errorInPostingReply: 'Please enter message' })
        }
    }

    const sendMessage = () => {
        const name = user.role === "recruiter" ? `${user.name}(${user.companyId.first_name + " " + user.companyId.last_name})` : user.first_name + " " + user.last_name
        const messageData = {
            date: new Date(),
            by: user.role,
            message: "",
            from: name
        }
        setAddMessage(messageData)
        setToggleState({ ...toggleState, showMessageBox: true })
    }

    useEffect(() => {
        const queryId = params.id
        fetchQuery(queryId)
    }, [])

    return (
        <div className=" mt-3 container-fluid">
            <button onClick={() => message({ path: -1 })} type="button" className="btn p-1 btn-dark btn-xs rounded-circle ">
                <IoMdArrowBack fontSize={16} />
            </button>

            <div className=" mt-3 d-flex align-items-center">
                <h2 className=" flex-grow-1 fw-bold fs-3 ">
                    {query?.subject}
                </h2>

                <span className="">
                    <button onClick={() => sendMessage()} disabled={toggleState.showMessageBox} className="btn btn-info rounded-4" type="button">Send Message</button>
                </span>

            </div>

            <div className=" mt-3 ">
                {toggleState.showMessageBox &&
                    <div className="border-bottom  p-3" >
                        <p className={`fw-bold fs-5 ${addMessage.by === "admin" ? "text-primary" : "text-dark"}`}>{addMessage.from}</p>
                        <p>{getDate(addMessage?.date)}</p>
                        <div className=" w-100 d-flex">
                            <div className="flex-grow-1">
                                <MdxEditor value={addMessage.message} setValue={handleMessage} />
                            </div>
                            <button type="button" disabled={toggleState.sendingReply} onClick={postReply} className="btn btn-success align-self-end rounded p-2">
                                <RxDoubleArrowRight fontSize={20} />
                            </button>
                        </div>
                        {toggleState.errorInPostingReply && <small className="text-danger">{toggleState.errorInPostingReply}</small>}
                    </div>
                }

                {query?.chat &&
                    reverseArray(query?.chat)?.map((msg, i) => {
                        return <div className=" border-bottom  p-3" key={i} >
                            <p className={`fw-bold fs-5 ${msg.by === "admin" ? "text-primary" : "text-dark"}`}>{msg.from}</p>
                            <p>{getDate(msg?.date)} ({timeAgoMinutes(new Date(msg?.date).toISOString())})</p>
                            <div className="text-wrap">{markdownToText(msg.message)}</div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}