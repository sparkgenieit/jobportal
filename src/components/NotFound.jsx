import { useEffect } from "react"

export default function NotFound() {

    useEffect(() => {
        document.title = "Page not found"
    }, [])

    return (
        <div className="container mt-5">
            <div className="flex justify-center items-center bg-white">
                <h1 className="text-center">Page not found</h1>
            </div>
        </div>
    )
}