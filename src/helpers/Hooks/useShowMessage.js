import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToaster } from "../slices/generalSlice";

export default function useShowMessage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let toaster = {}

    const handleMessage = ({ status, message, path, error }) => {
        if (status && status?.toLowerCase() === "success") {
            toaster = {
                show: true,
                type: "success",
                text: message
            }
        }

        else if (status && status?.toLowerCase() === "error") {
            toaster = {
                show: true,
                type: "error",
                text: Array.isArray(error?.response?.data?.message) ? error?.response?.data?.message[0] : error?.response?.data?.message || error.message
            }
        }

        else if (message) {
            toaster = {
                show: true,
                type: "",
                text: message
            }
        }

        dispatch(setToaster(toaster))

        if (path) {
            navigate(path)
        }
    }
    return handleMessage
} 