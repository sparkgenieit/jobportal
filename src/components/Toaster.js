import "./toaster.css"
import { useState } from "react";

export default function Toaster({ show }) {
    const [ToastClass, setToastClass] = useState(show === false ? "toaster" : "toaster-show")
    return <div className={`${ToastClass} border rounded`}>
        Success
    </div>
}