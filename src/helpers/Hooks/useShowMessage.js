import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToasterContext } from "../Context";

export default function useShowMessage() {
    const navigate = useNavigate()

    const { setShowToaster } = useContext(ToasterContext)

    const handleMessage = ({ status, message, path, error }) => {
        if (status && status?.toLowerCase() === "success") {
            setShowToaster({
                show: true,
                type: "success",
                text: message
            })
        }

        else if (status && status?.toLowerCase() === "error") {
            setShowToaster({
                show: true,
                type: "error",
                text: error.response?.data?.message || error.message
            })
        }

        else if (message) {
            setShowToaster({
                show: true,
                type: "",
                text: message
            })
        }

        if (path) {
            navigate(path)
        }
    }
    return handleMessage
} 