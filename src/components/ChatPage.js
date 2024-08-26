import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { RxDoubleArrowRight } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

import { timeAgoMinutes } from "../helpers/functions";
import http from "../helpers/http"
import MdxEditor from "./MdxEditor";
import { markdownToText } from "../helpers/functions/textFunctions";

export default function ChatPage({ name }) {
    const params = useParams()
    const [query, setQuery] = useState({})
    const [addMessage, setAddMessage] = useState({})
    const [toggleState, setToggleState] = useState({})
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const fetchQuery = async (id, queryType) => {
        try {
            const res = await http.get(`/contact/query/${id}?type=${queryType}`)
            setQuery(res.data)
        } catch (error) {
            setQuery({})
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
                const response = await http.patch(`/contact/query/reply/${query._id}`, addMessage)
                setToggleState({ showMessageBox: false, sendingReply: false, errorInPostingReply: null })
                setAddMessage({})
                fetchQuery(params.id)
            } catch (error) {
                setToggleState({ ...toggleState, sendingReply: false, errorInPostingReply: "Something went wrong! Please try again" })
            }
        } else {
            setToggleState({ ...toggleState, errorInPostingReply: 'Please enter message' })
        }
    }

    const sendMessage = () => {
        const messageData = {
            date: new Date(),
            by: name,
            message: "",
            from: name === "Enquirer" ? query.organisation : localStorage.getItem("fullname"),
        }
        setAddMessage(messageData)
        setToggleState({ ...toggleState, showMessageBox: true })
    }

    useEffect(() => {
        const queryId = params.id
        const queryType = searchParams.get("type")
        fetchQuery(queryId, queryType)
    }, [])

    return (
        <div className=" mt-3 container-fluid">
            <button onClick={() => navigate(-1)} type="button" className="btn p-1 btn-dark btn-xs rounded-circle ">
                <IoMdArrowBack fontSize={16} />
            </button>

            <div className=" mt-3 d-flex align-items-center">
                <h2 className=" flex-grow-1 fw-bold fs-3 ">
                    {query?.subject}
                </h2>

                <span className="">
                    {query?.enquirer === "Visitor" ? "Reply this query to email provided by the visitor" : <button onClick={() => sendMessage()} disabled={toggleState.showMessageBox} className="btn btn-info rounded-4" type="button">Send Message</button>}
                </span>

            </div>

            {query?.enquirer === "Visitor" ?
                <div className="mt-4 row w-50">

                    <div className="col-6 d-flex flex-column gap-4">
                        <div>Date:</div>
                        <div>Name:</div>
                        <div>Email:</div>
                        <div>Phone:</div>
                        <div>Organisation:</div>
                        <div>Message</div>
                    </div>

                    <div className="col-6 d-flex flex-column gap-4">
                        <div >{new Date(query?.createdAt).toLocaleDateString('en-GB')}</div>
                        <div >{query?.name}</div>
                        <div >{query?.email}</div>
                        <div >{query?.phone}</div>
                        <div >{query?.organisation}</div>
                        <div >{query.chat?.length > 0 && query?.chat[0]?.message}</div>
                    </div>
                </div>
                :
                <div className=" mt-3 ">
                    {toggleState.showMessageBox &&
                        <div className="border-bottom  p-3" >
                            <p className={`fw-bold fs-5 ${addMessage.by === "Enquirer" ? "text-dark" : "text-primary"}`}>{addMessage.from}</p>
                            <p>{new Date(addMessage?.date).toLocaleDateString('en-GB')}</p>
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
                            return <div className=" border-bottom  p-3" >
                                <p className={`fw-bold fs-5 ${msg.by === "Enquirer" ? "text-dark" : "text-primary"}`}>{msg.from}</p>
                                <p>{new Date(msg?.date).toLocaleDateString('en-GB')} ({timeAgoMinutes(new Date(msg?.date).toISOString())})</p>
                                <p className="text-wrap">
                                    {markdownToText(msg.message)}
                                </p>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}