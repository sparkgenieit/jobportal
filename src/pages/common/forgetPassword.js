
import { useState } from 'react';
import './forgetPassword.css';
import http from '../../helpers/http';

function ForgetPassword() {

    const [emailError, setEmailError] = useState("")
    const [email, setEmail] = useState("")

    const validateEmailAddress = (emailAddress) => {
        var atSymbol = emailAddress.indexOf("@");
        var dotSymbol = emailAddress.lastIndexOf(".");
        var spaceSymbol = emailAddress.indexOf(" ");

        if ((atSymbol != -1) &&
            (atSymbol != 0) &&
            (dotSymbol != -1) &&
            (dotSymbol != 0) &&
            (dotSymbol > atSymbol + 1) &&
            (emailAddress.length > dotSymbol + 1) &&
            (spaceSymbol == -1)) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = () => {
        if (email === "") {
            setEmailError("Please type your Email")
        } else if (!validateEmailAddress(email)) {
            setEmailError("Not an Email")
        } else {
            const data = { email: email }
            http.post("/users/forgot-password", data)
                .then((res) => {
                    console.log(res.data.url)
                })
                .catch(err => setEmailError(err.response.data.message))
        }
    }

    return (
        <>
            <div className="container-fluid">


                <div style={{ height: "80vh" }} class=" p-5 bg-light d-flex flex-column align-items-center justify-content-center">
                    <div class="page-header">
                        <h3 class="page-title"> Forgot Password </h3>
                        {/* <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"></a></li>
                                <li class="breadcrumb-item active" aria-current="page"></li>
                            </ol>
                            </nav> */}
                    </div>

                    <div class="input-group row">
                        <label class="col-sm-4 text-center col-form-label">Type your Email Id</label>
                        <div className='col-sm-8'>
                            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError("") }} class="form-control shadow-md" />
                            <div className='text-danger'>{emailError}</div>
                        </div>

                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12 text-center">
                            <button type="button" onClick={handleSubmit} class="btn btn-gradient-primary">Reset Password</button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default ForgetPassword;
