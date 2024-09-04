import { useState } from "react"
import { validateEmailAddress } from "../../../helpers/functions/textFunctions"
import { Hourglass } from "react-loader-spinner"
import http from "../../../helpers/http"

export default function RecruiterLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false)


    const Login = (e) => {
        e.preventDefault();
        setLoader(true)
        if (!validateEmailAddress(email)) {
            setError({ ...error, email: "Invalid Email" })
            return
        }

        if (password === "") {
            setError({ ...error, password: "Password is required" })
            return
        }


        setTimeout(() => {
            setLoader(false)
        }, 5000);
    }



    return (
        <div className="container-fluid">
            {error.loginError && <div class="alert alert-danger" role="alert">
                {error.loginError}
            </div>}
            <form onSubmit={Login} className="form-group d-flex flex-column gap-4">
                <div className="d-flex flex-column form-outline" >
                    <label className="form-label">Email </label>
                    <input
                        className="form-control form-control-lg"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <span className="text-danger">{error.email}</span>
                </div>

                <div className="d-flex flex-column form-outline">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control form-control-lg"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="text-danger">{error.password}</span>
                </div>

                <button type="submit" className="btn btn-primary btn-lg">Login</button>

            </form>
            <Hourglass
                visible={loader}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{ position: 'absolute', top: '80%', left: '50%' }}
                wrapperClass=""
                colors={['#0ea2bd', '#72a1ed']}
            />
        </div>
    )
}