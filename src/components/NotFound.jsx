import { useEffect } from "react"

export default function NotFound() {

    useEffect(() => {
        document.title = "Page not found"
    }, [])

    return (
        <div className="container-fluid">
            <div className="content-wrapper bg-white">
                <h1 className="text-center">Page not found</h1>
            </div>
        </div>
    )
}