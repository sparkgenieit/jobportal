import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import http from "../helpers/http"
import { useEffect, useState } from "react"
import { BASE_API_URL } from "../helpers/constants"
import { RxDoubleArrowRight } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";

const imgStyles = {
    width: "35%",
    height: "45px",
    objectFit: 'cover'
}

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
            console.log(res.data)
            setQuery(res.data)
        } catch (error) {
            setQuery({})
        }
    }

    function reverseArray(arr) {
        const reverseArray = arr.toReversed()
        return reverseArray
    }

    const postReply = async () => {
        setToggleState({ ...toggleState, sendingReply: true })
        try {
            const response = await http.patch(`/contact/query/reply/${query._id}`, addMessage)
            setToggleState({ showMessageBox: false, sendingReply: false, errorInPostingReply: false })
            setAddMessage({})
            fetchQuery(params.id)
        } catch (error) {
            setToggleState({ ...toggleState, sendingReply: false, errorInPostingReply: true })
        }
    }

    const sendMessage = () => {
        setAddMessage({
            date: new Date(),
            by: name,
            message: "",
            from: localStorage.getItem("fullname"),
        })

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
                        <div >{query?.message}</div>
                    </div>
                </div>
                :
                <div className=" mt-3 ">
                    {toggleState.showMessageBox &&
                        <div className="row d-flex align-items-center  border-bottom  p-3" >
                            <div className="col-2 ">
                                {<img className="rounded-circle p-0 img-fluid" style={imgStyles} src={addMessage.by === "Enquirer" ? `${BASE_API_URL}/uploads/logos/${query?.companyprofile?.logo}` : "/assets/images/logo-jp.png"} alt="logo" />}
                            </div>
                            <div className="col-2 ">{addMessage?.date?.toLocaleDateString('en-GB')}</div>
                            <div className="col-2 ">{addMessage?.from}</div>
                            <div className="col-6">
                                <form autoComplete="off" className="d-flex">
                                    <input
                                        type="text"
                                        value={addMessage.message}
                                        name="message"
                                        onChange={(e) => { setAddMessage({ ...addMessage, message: e.target.value }) }}
                                        className="rounded border p-2 border-dark flex-grow-1"
                                        placeholder="Type your message"
                                    />
                                    <button type="button" onClick={postReply} className="btn btn-success rounded p-2">
                                        <RxDoubleArrowRight fontSize={20} />
                                    </button>
                                </form>
                                {toggleState.errorInPostingReply && <small className="text-danger">Can't post the message! Please try again later</small>}
                            </div>
                        </div>
                    }

                    {query?.chat &&
                        reverseArray(query?.chat)?.map((msg, i) => {
                            return <div className="row d-flex align-items-center  border-bottom  p-3" >
                                <div className="col-2 ">
                                    {<img className="rounded-circle p-0 img-fluid" style={imgStyles} src={msg.by === "Enquirer" ? `${BASE_API_URL}/uploads/logos/${query?.companyprofile?.logo}` : "/assets/images/logo-jp.png"} alt="logo" />}
                                </div>
                                <div className="col-2 ">{new Date(msg?.date).toLocaleDateString('en-GB')}</div>
                                <div className="col-2 ">{msg.from}</div>
                                <div className="col-6 text-wrap">
                                    {msg.message}
                                </div>
                            </div>
                        })
                    }
                </div>
            }
        </div>
    )
}