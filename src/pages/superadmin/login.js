
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SuperAdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate()

  const [errormsg, setErrorMsg] = useState(false);

  const [usernameError, setUsernameError] = useState("Please enter Username ");
  const [passwordError, setPasswordError] = useState("Please enter password ");
  const [errors, setErrors] = useState({

    username: false,
    password: false,
  }
  )
  const handleInput = (name, event) => {

    if (name == "username") {
      setUsername(event.target.value)
      if (event.target.value == '') {
        setErrors({ ...errors, username: true })
      }
      else {
        setErrors({ ...errors, username: false })

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
  const SubmitData = () => {
    let eObj = {};
    let valid = true;


    if (username == '') {
      eObj = { ...eObj, username: true }
      setUsernameError("Please Enter Username")

      valid = false;
    }
    else if (/^[a-z]{4,}$/gi.test(username) == false) {
      eObj = { ...eObj, username: true }
      setUsernameError("Invalid Username")
    }
    else {
      eObj = { ...eObj, username: false }
      valid = true;
    }



    if (password == '') {
      eObj = { ...eObj, password: true }
      setPasswordError("Please Enter Password")

      valid = false;
    }
    else if (/^\w{3,}@{1}\d{2,}$/gi.test(password) == false) {
      eObj = { ...eObj, password: true }
      setPasswordError("Invalid password")
    }
    else {
      eObj = { ...eObj, password: false }
      valid = true;
    }
    setErrors(eObj)

    if (valid) {

      if (username === "admin" && password === "admin@123") {
        setMsg(true)
        setErrorMsg(false)
        setTimeout(() => {
          navigate("/superadmin");
        }, 2000
        )
      }
      else {
        setErrorMsg(true)
        setMsg(false)
      }
    }
  }

  return (
    < >





      <div class="main-panel container-fluid">
        <div class="content-wrapper">

          <div class="row mt-5">
            <div className='col-3'></div>
            <div class="col-6">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title pb-4 fw-bold">Login </h3>
                  <form class="form-sample">


                    <div className="col-md-12">
                      {msg && <div class="alert alert-success" role="alert">
                        Login Successfull
                      </div>}
                      {errormsg && <div class="alert alert-danger" role="alert">
                        Invalid Credentials
                      </div>}

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label"> Username</label>
                        <div class="col-sm-9">
                          <input type="text" value={username} onChange={(event) => handleInput('username', event)} className="form-control" />

                          {errors && errors.username && <div className="text-danger">{usernameError}

                          </div>}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                          <input type="password" value={password} onChange={(event) => handleInput('password', event)} className="form-control" />
                          {errors && errors.password && <div className="text-danger">{passwordError}
                          </div>}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 ">

                      <button type="button" className="btn btn-gradient-primary float-end " onClick={() => SubmitData()} >Submit</button>
                    </div>





                  </form></div>

              </div>

            </div>


            <script src="assets/vendors/js/vendor.bundle.base.js"></script>

            <script src="assets/js/off-canvas.js"></script>
            <script src="assets/js/hoverable-collapse.js"></script>
            <script src="assets/js/misc.js"></script>

            <script src="assets/js/file-upload.js"></script>



          </div>
        </div>
      </div>



    </>
  )
}

export default SuperAdminLogin;
