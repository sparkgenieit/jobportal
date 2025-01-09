import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { RxDoubleArrowRight } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

import { timeAgoMinutes } from "../helpers/functions";
import http from "../helpers/http"
import MdxEditor from "./MdxEditor";
import { markdownToPlainText, markdownToText } from "../helpers/functions/textFunctions";
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
            const reply = { ...addMessage }
            if (query.participants?.includes("Visitor")) {
                reply.message = markdownToPlainText(reply.message)
            }
            try {
                const response = await http.put(`/mails/employer/reply/${query._id}`, reply)
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
        document.title = "Inbox"
        const queryId = params.id
        fetchQuery(queryId)
    }, [])

    return (
        <div className="mt-3 container">
            <button onClick={() => message({ path: -1 })} type="button" className=" bg-gray-600 active:bg-gray-300 text-white font-semibold p-2 rounded-full ">
                <IoMdArrowBack fontSize={16} />
            </button>

            <div className=" mt-3 flex flex-col md:flex-row gap-3 items-center">
                <h2 className=" grow font-bold text-xl ">
                    {query?.subject}
                </h2>

                <span className="self-end">
                    <button onClick={() => sendMessage()} disabled={toggleState.showMessageBox} className="bg-blue-500 rounded-lg px-3 py-2 active:bg-blue-300 text-white" type="button">Send Message</button>
                </span>

            </div>

            <div className=" mt-3 ">
                {toggleState.showMessageBox &&
                    <div >
                        <p className={`font-bold text-lg ${addMessage.by === "admin" ? "text-blue-600" : "text-black"}`}>{addMessage.from}</p>
                        <p>{getDate(addMessage?.date)}</p>
                        <div className="flex flex-wrap">
                            <div className="grow">
                                <MdxEditor value={addMessage.message} setValue={handleMessage} />
                            </div>
                            <button type="button" disabled={toggleState.sendingReply} onClick={postReply} className="bg-emerald-400  active:bg-emerald-200 text-white  self-end rounded-lg p-2">
                                <RxDoubleArrowRight fontSize={20} />
                            </button>
                        </div>
                        {toggleState.errorInPostingReply && <small className="text-red-600">{toggleState.errorInPostingReply}</small>}
                    </div>
                }

                {query?.chat &&
                    reverseArray(query?.chat)?.map((msg, i) => {
                        return <div className=" border-b p-3" key={i} >
                            <p className={`fw-bold text-lg ${msg.by === "admin" ? "text-blue-600" : "text-black"}`}>{msg.from}</p>
                            <p>{getDate(msg?.date)} ({timeAgoMinutes(new Date(msg?.date).toISOString())})</p>
                            <div className="text-wrap">{markdownToText(msg.message)}</div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}