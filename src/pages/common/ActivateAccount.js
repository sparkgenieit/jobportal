import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import http from '../../helpers/http';
import Loader from "../../components/Loader";

export default function ActivateAccount() {

    const [searchParams] = useSearchParams()
    const email = searchParams.get("email")
    const token = searchParams.get("token")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    useEffect(() => {
        http.post(`/users/activate-account?email=${email}&token=${token}`)
            .then((res) => {
                setLoading(false)
                setMessage("Your account have been activated")
            })
            .catch(err => {
                setLoading(false);
                setMessage(err.response ? err.response.data.message : err.message)
            })
    }, [])


    return <>
        {!loading &&
            <div>
                {message}
                <a href="/">Go to Home</a>
            </div>
        }
    </>
}