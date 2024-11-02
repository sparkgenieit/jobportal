import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../../../helpers/http";


function AdminEdit({ currentAdmin }) {
    const [fname, setFname] = useState(currentAdmin.first_name);
    const [lname, setLname] = useState(currentAdmin.last_name);
    const [email, setEmail] = useState(currentAdmin.email);
    const [password, setPassword] = useState();
    const [firstnameError, setFirstnameError] = useState("Please Enter First Name")
    const [lastnameError, setLastnameError] = useState("Please Enter Last Name")
    const [emailError, setEmailError] = useState("Please Enter Email ")
    const [passwordError, setPasswordError] = useState("Please Enter Password")
    const [msg, setMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [CreateError, setCreateError] = useState('');

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        fname: false,
        lname: false,
        email: false,
        password: false,
    });
    const handleInput = (name, event) => {
        if (name == "fname") {
            setFname(event.target.value)
            if (event.target.value == '') {
                setErrors({ ...errors, fname: true })
            }
            else {
                setErrors({ ...errors, fname: false })
            }
        }
        if (name == "lname") {
            setLname(event.target.value)
            if (event.target.value == '') {
                setErrors({ ...errors, lname: true })
            }
            else {
                setErrors({ ...errors, lname: false })
            }
        }
        if (name == "email") {
            setEmail(event.target.value)
            if (event.target.value == '') {
                setErrors({ ...errors, email: true })
            }
            else {
                setErrors({ ...errors, email: false })
            }
        }
        if (name == "password") {
            setPassword(event.target.value)
            if (event.target.value == '') {
                setErrors({ ...errors, password: true })
            }
            else {
                setErrors({ ...errors, password: false })
            }
        }
    }
    const submitData = () => {
        let Obj = {};
        let isValid = true;
        if (fname == "") {
            Obj = { ...Obj, fname: true }
            setFirstnameError("Please Enter First Name")
            isValid = false;

        }
        else if (/^[a-z ]{3,}$/gi.test(fname.trim()) == false) {
            Obj = { ...Obj, fname: true }
            setFirstnameError("Invalid First Name")
            isValid = false;
        }
        else {
            Obj = { ...Obj, fname: false }
        }



        if (lname == "") {
            Obj = { ...Obj, lname: true }
            setLastnameError("Please Enter Last Name")
            isValid = false;
        }
        else if (/^[a-z ]{3,}$/gi.test(lname.trim()) == false) {
            Obj = { ...Obj, lname: true }
            setLastnameError("Invalid Last Name")
            isValid = false;
        }
        else {
            Obj = { ...Obj, lname: false }
        }


        if (email == "") {
            Obj = { ...Obj, email: true }
            setEmailError("Please Enter Emali")
            isValid = false;
        }
        else if (/^[a-z]{2,}[0-9]{0,}@{1}[a-z]{2,}.com$/.test(email) == false) {
            Obj = { ...Obj, email: true }
            setEmailError("Invalid Email")
            isValid = false;
        }
        else {
            Obj = { ...Obj, email: false }
        }
        if (password == '') {
            Obj = { ...Obj, password: true }
            setPasswordError("Please Enter Password")
            isValid = false
        }
        else {
            Obj = { ...Obj, password: false }
        }
        setErrors(Obj)

        if (isValid) {
            const userDto = {
                first_name: fname.trim(),
                last_name: lname.trim(),
                email: email,
                password: password,
                role: currentAdmin.role
            }

            http.put(`/users/admin/update/${currentAdmin._id}`, userDto)
                .then((response) => {
                    if (response && response.status) {
                        setErrorMsg(false)
                        setMsg(true)
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)

                    }
                })
                .catch((e) => {
                    setErrorMsg(true)
                    console.log(e);
                    setCreateError(e.response.data.message)
                }
                )
        }
    }
    return (
        <>


            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <h3 className="fs-4 text-center fw-bold">Edit Admin</h3>


                    <div className="row ">
                        <div className="col-12 bg-white my-2 ">
                            {/* <div className="card"> */}
                            <div className="card-body">
                                <h4 className="card-title">Edit Admin </h4>
                                <form class="form-sample">
                                    <div className='row'>
                                        <div className="col-md-12">
                                            {msg && <div class="alert alert-success" role="alert">
                                                Admin Edited SuccessFully
                                            </div>}
                                            {errorMsg && <div class="alert alert-danger" role="alert">
                                                {CreateError}
                                            </div>}
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">FirstName</label>
                                                <div className="col-sm-8">

                                                    <input type="text" value={fname} onChange={(event) => handleInput('fname', event)} className="form-control" />

                                                    {errors && errors.fname && <div className=' text-danger'>{firstnameError}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">LastName</label>
                                                <div class="col-sm-8">
                                                    <input type="text" value={lname} onChange={(event) => handleInput('lname', event)} className="form-control" />

                                                    {errors && errors.lname && <div className="text-danger">{lastnameError} </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Email</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={email} onChange={(event) => handleInput('email', event)} className="form-control" disabled />
                                                    {errors && errors.email && <div className="error text-danger">{emailError}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col-md-12">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label"> Reset Password</label>
                                                <div className="col-sm-8">
                                                    <input type="password" value={password} onChange={(event) => handleInput('password', event)} className="form-control" />
                                                    {errors && errors.password && <div className="error text-danger">{passwordError}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9 mt-3 row">
                                        <div className="col-md-12  ">
                                            <button type="button" className="btn btn-gradient-primary me-2 float-end" onClick={() => submitData()} >Submit</button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            {/* </div> */}
                        </div>


                    </div>

                </div>
            </div>

        </>
    )

}
export default AdminEdit;