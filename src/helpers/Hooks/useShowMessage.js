import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToasterContext } from "../Context";

export default function useShowMessage() {
    const navigate = useNavigate()

    const { setShowToaster } = useContext(ToasterContext)

    const handleMessage = ({ status, successMessage, path, error }) => {
        if (status.toLowerCase() === "success") {
            setShowToaster({
                show: true,
                type: "success",
                text: successMessage
            })
        }

        if (status.toLowerCase() === "error") {
            setShowToaster({
                show: true,
                type: "error",
                text: error.response?.data?.message || error.message
            })

            if (error.response.status === "401" || "403") path = '/'
        }

        if (path) {
            navigate(path)
        }
    }
    return handleMessage
} 