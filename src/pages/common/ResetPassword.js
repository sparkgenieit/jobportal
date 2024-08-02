
import { useState } from 'react';

import http from '../../helpers/http';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const [searchParams, setSearchParams] = useSearchParams()
    const email = searchParams.get("email")
    const token = searchParams.get("token")
    const [message, setMessage] = useState({
        show: false,
        class: "",
        text: ""
    })
    const navigate = useNavigate()

    const [PasswordError, setPasswordError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handleSubmit = () => {
        if (password === "" || confirmPassword === "") {
            setPasswordError("Please type your Password")

        } else if (password !== confirmPassword) {
            setPasswordError("Password do not Match")

        } else {
            const data = { password: password }
            http.patch(`/users/reset-password?email=${email}&token=${token}`, data)
                .then((res) => {
                    setMessage({
                        show: true,
                        class: "alert alert-success",
                        text: "Password Changed Successfully"
                    })
                    setTimeout(() => {
                        navigate('/')
                    }, 1200);

                })
                .catch(err => {
                    console.log(err)
                    setMessage({
                        show: true,
                        class: "alert alert-danger",
                        text: err.response ? err.response.statusText : err.message
                    })
                    setTimeout(() => {
                        setMessage({ ...message, show: false })
                    }, 3000);
                })
        }
    }

    return (
        <>
            <div className="container-fluid">

                <div style={{ height: "80vh" }} class=" bg-light p-5 d-flex flex-column align-items-center justify-content-center">
                    <div class="page-header">
                        <h3 class="page-title"> Reset Password  </h3>
                        {/* <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"></a></li>
                                <li class="breadcrumb-item active" aria-current="page"></li>
                                </ol>
                                </nav> */}
                    </div>
                    {message.show && <div className={message.class}>{message.text}</div>

                    }

                    <div class="input-group my-2 row">
                        <label class="col-sm-4 text-center col-form-label">Password</label>
                        <div className='col-sm-8'>
                            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError("") }} class="form-control" />

                        </div>

                    </div>
                    <div class="input-group my-2 row">
                        <label class="col-sm-4 text-center col-form-label">Confirm Password</label>
                        <div className='col-sm-8'>
                            <input type="text" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError("") }} class="form-control" />
                            <div className='text-danger'>{PasswordError}</div>
                        </div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12 text-center">
                            <button type="button" onClick={handleSubmit} class="btn btn-gradient-primary">Submit</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default ResetPassword;
