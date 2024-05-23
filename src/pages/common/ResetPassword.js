
import { useState } from 'react';

import http from '../../helpers/http';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const params = useParams()

    const [PasswordError, setPasswordError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handleSubmit = () => {
        if (password === "") {
            setPasswordError("Please type your Email")

        } else {
            http.post(`/users/reset-password/${params.email}`, { password: password })
                .then((res) => console.log(res))
                .catch(err => console.log(err))
        }
    }

    return (
        <>

            <div style={{ background: "#f2edf3", height: "80vh" }} class=" p-5 d-flex flex-column align-items-center justify-content-center">
                <div class="page-header">
                    <h3 class="page-title"> Reset Password  </h3>
                    {/* <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"></a></li>
                                <li class="breadcrumb-item active" aria-current="page"></li>
                            </ol>
                        </nav> */}
                </div>

                <div class="input-group my-2 row">
                    <label class="col-sm-4 text-center col-form-label">Type your Email Id</label>
                    <div className='col-sm-8'>
                        <input type="email" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError("") }} class="form-control" />

                    </div>

                </div>
                <div class="input-group my-2 row">
                    <label class="col-sm-4 text-center col-form-label">Type your Email Id</label>
                    <div className='col-sm-8'>
                        <input type="email" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError("") }} class="form-control" />
                        <div className='text-danger'>{PasswordError}</div>
                    </div>

                </div>
                <div class="row mt-3">
                    <div class="col-md-12 text-center">
                        <button type="button" onClick={handleSubmit} class="btn btn-gradient-primary">Submit</button>
                    </div>
                </div>
            </div>


        </>
    );
}

export default ResetPassword;
