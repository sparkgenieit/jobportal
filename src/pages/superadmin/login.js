
import { useState } from "react";
 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [emailError, setEmailError] = useState("Please enter email ");
  const [passwordError, setPasswordError] = useState("Please enter password ");
  const [errors, setErrors] = useState({
 
    email: false,
    password: false,
  }
  )
  const handleInput = (name, event) => {
 
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
  const SubmitData = () => {
    let eObj = {};
    let valid = true;
 
 
    if (email == '') {
      eObj = { ...eObj, email: true }
      valid = false;
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false) {
      eObj = { ...eObj, email: true }
      setEmailError("Invalid Email")
    }
    else {
      eObj = { ...eObj, email: false }
      valid = true;
    }
 
 
 
    if (password == '') {
      eObj = { ...eObj, password: true }
      valid = false;
    }
    else if (/^[a-z]{4}[A-Z]{1}#{1}\d[2]$/.test(password) == false) {
      eObj = { ...eObj, lastname: true }
      setPasswordError("Invalid password")
    }
    else {
      eObj = { ...eObj, password: false }
      valid = true;
    }
    if (!valid) {
      setErrors(eObj)
    }
    else {
      let data = {
        password: password,
        email: email,
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
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label"> Email</label>
                          <div class="col-sm-9">
                            <input type="text" value={email} onChange={(event) => handleInput('email', event)} className="form-control" />
 
                            {errors && errors.email && <div className="error">Please Enter Email
 
                            </div>}
                          </div>
                        </div>
                      </div>
 
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Password</label>
                          <div className="col-sm-9">
                            <input type="password" value={password} onChange={(event) => handleInput('password', event)} className="form-control" />
                            {errors && errors.password && <div className="error">Please Enter Password
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
 
export default Login;
