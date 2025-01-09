import { useState } from "react"

export default function ShowMore({ content }) {
    const [isReadMoreClicked, setIsReadMoreClicked] = useState(false)

    if (content?.length < 30) {
        return <span style={{ wordBreak: "break-all" }} className="text-wrap" >{content}</span>
    }

    if (isReadMoreClicked) {
        return (
            <span style={{ wordBreak: "break-all" }} className="text-wrap " >
                {content}<br />
                <span role="button" onClick={() => setIsReadMoreClicked(false)} className="text-blue-400">Show Less</span>
            </span>
        )
    }

    return (
        <span>
            {content?.slice(0, 30)}<br />
            <span role="button" onClick={() => setIsReadMoreClicked(true)} className="text-blue-400">Show More...</span>
        </span>
    )
}