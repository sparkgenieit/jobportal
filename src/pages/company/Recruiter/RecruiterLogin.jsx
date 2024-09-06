import { useState } from "react"
import { validateEmailAddress, validateIsNotEmpty } from "../../../helpers/functions/textFunctions"
import { Hourglass } from "react-loader-spinner"
import http from "../../../helpers/http"

export default function RecruiterLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(false)


    const Login = async (e) => {
        e.preventDefault();

        if (!validateEmailAddress(email)) {
            setError({ ...error, email: "Invalid Email" })
            return
        }

        if (!validateIsNotEmpty(password)) {
            setError({ ...error, password: "Password is required" })
            return
        }
        try {
            setLoader(true)
            let url = role === "recruiter" ? "/users/login/recruiter" : "/users/login"
            let data = { email, password }
            const user = await http.post(url, data)
        } catch (error) {
            setError({ ...error, loginError: e.response.data.message || e.message })
        } finally {
            setLoader(false)
        }
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
                <div className="d-flex align-items-center ">
                    <div className="flex-grow-1">
                        Role
                    </div>

                    <div className="d-flex gap-3">
                        <div className="d-flex  gap-2 align-items-center">
                            <input
                                type="radio"
                                name="role"
                                className="form-check-input"
                                value={"recruiter"}
                                checked={role === "recruiter"}
                                onChange={() => setRole("recruiter")}
                            />
                            <label className="p-0 m-0" >Recruiter</label>
                        </div>

                        <div className="d-flex  gap-2 align-items-center">
                            <input
                                type="radio"
                                name="role"
                                className="form-check-input"
                                value={"company"}
                                checked={role === "company"}
                                onChange={() => setRole("company")}
                            />
                            <label className="p-0 m-0" >Company</label>
                        </div>
                    </div>
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