import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  let isValid = false

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    loginError: false
  });


  const [emailerror, setEmailError] = useState("Please enter email")



  const handleInput = (name, event) => {

    if (name == "email") {
      setEmail(event.target.value)

      if (event.target.value == "") {
        setErrors({ ...errors, email: true })
      }
      else {
        setErrors({ ...errors, email: false })
      }

    }
    if (name == "password") {
      setPassword(event.target.value)
      if (event.target.value == "") {
        setErrors({ ...errors, password: true })
      }
      else {
        setErrors({ ...errors, password: false })
      }
    }
  }

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


  const submitData = () => {
    let Obj = {};
    if (email == "") {
      Obj = { ...Obj, email: true }
      setEmailError("Please Enter Email")
    }
    else if (!validateEmailAddress(email)) {
      Obj = { ...Obj, email: true }
      setEmailError("Invalid Email")
    }
    else {
      Obj = { ...Obj, email: false }
    }


    if (password == "") {
      Obj = { ...Obj, password: true }

    }
    else {
      Obj = { ...Obj, password: false }
    }




    setErrors(Obj);

    if (Obj.email == false && Obj.password == false) {
      isValid = true;
    }


    if (isValid) {


      const data = {
        email: email,
        password: password,
        role: 'admin'
      }

      axios.post("http://localhost:8080/users/login", data)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          const token = response.data.token;

          localStorage.setItem('user_id', response.data._id);
          // Store the token securely (e.g., in localStorage or HTTP-only cookies)
          localStorage.setItem('token', token);

          localStorage.setItem('role', response.data.role)
          setTimeout(() => {
            // Inside the handleLogin function
            navigate('/admin/Jobqueuelist'); // Redirect to the dashboard after login
          }, 1500);
        }
        )
        .catch((e) => {
          if (e && e.code) {
            if (e.response && e.response.data) {
              if (e.response.data.email) {
                setErrors({ loginError: e.response.data.email });
              }

              if (e.response.data.message) {
                setErrors({ loginError: e.response.data.message });
              }
            } else {
              setErrors({ loginError: e.message });
            }
          }
        })


    }
  }


  return (
    <>

      <div className="container-scroller">
        <div class="container-fluid content-wrapper page-body-wrapper">
          <div class="main-panel container">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-12 bg-white">
                  <div className="card-body">
                    <h4 className="card-title my-4"> Admin Login </h4>
                    <form class="form-sample">
                      {errors && errors.loginError && <div class="alert alert-danger" role="alert">
                        {errors && errors.loginError}</div>}
                      <div className='row mt-3'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={email} onChange={(event) => handleInput('email', event)} />
                              {errors && errors.email && <div className="error text-danger mt-1">{emailerror} </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Password</label>
                            <div className="col-sm-8">
                              <input type="password" className="form-control" value={password} onChange={(event) => handleInput('password', event)} />
                              {errors && errors.password && <div className="error text-danger">Please Enter password </div>}

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

                </div>


              </div>
            </div>


          </div>
        </div>
      </div>

    </>)
}

export default Login;