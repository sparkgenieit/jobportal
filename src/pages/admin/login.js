import { useState } from "react";

function Login() {

  const[email,setEmail]= useState("")
  const[password,setPassword]=useState("")

  const [errors, setErrors] = useState({

    email: false,
    password: false
  });


const[emailerror,setEmailError]=useState("plese enter email")

  const handleInput = (name, event) => {

    if (name == "email")
     {
      setEmail(event.target.value)
      if(event.target.value == "")
      {
        setErrors({...errors,email:true})
      }
      else
      {
        setErrors({...errors,email:false})
      }
     
    }
    if (name == "password")
     {
      setPassword(event.target.value)
      if(event.target.value == "")
      {
        setErrors({...errors,password:true})
      }
      else
      {
        setErrors({...errors,password:false})
      }
    }
  }

  const submitData = () => {
    let Obj = {};
    if (email == "") 
    {
      Obj = { ...Obj, email: true }
      setEmailError("Invalid Email")
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false)
    {
      Obj = { ...Obj, email: true }
      setEmailError("Invalid Email")
    }
    else
     {
      Obj = { ...Obj, email: false }
    }
    if (password == "") 
    {
      Obj = { ...Obj, password: true }
    }
    else
     {
      Obj = { ...Obj, password: false }
    }
    setErrors(Obj)
  }


  return (
    <>

      <div className="container-scroller">
        <div class="container-fluid page-body-wrapper">
          <div class="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-12 bg-white">
                  <div className="card-body">
                    <h4 className="card-title"> Admin Login </h4>
                    <form class="form-sample">

                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={email} onChange={(event) => handleInput('email', event)} />
                              {errors && errors.email && <div className="error text-danger">Please Enter Email </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Password</label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control"  value={password} onChange={(event) => handleInput('password', event)}/>
                              {errors && errors.password && <div className="error text-danger">Please Enter passworrd </div>}
                            
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