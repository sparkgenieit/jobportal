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
        <div className="container-fluid">

            {!loading &&
                <div>
                    {message}
                    <div>
                        <a href="/" className="text-decoration-underline text-primary">Go to Home</a>
                    </div>
                </div>
            }
        </div>
    </>
}