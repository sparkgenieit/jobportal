
import Header from '../../../layouts/superadmin/Header';
import Sidebar from '../../../layouts/superadmin/Sidebar';
import Footer from '../../../layouts/superadmin/Footer';
import { useState } from 'react';


function Create() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstnameError, setFirstnameError] = useState("please enter onlt letters")
  const [lastnameError, setLastnameError] = useState("Please enter last name")
  const [emailError, setEmailError] = useState("Please enter email name")
  const [passwordError, setPasswordError] = useState("Please enter password name")

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
    if (fname == "") {
      Obj = { ...Obj, fname: true }
      setFirstnameError("Please Enter First Name")

    }
    else if (/^[a-z]{3,}$/gi.test(fname) == false) {
      Obj = { ...Obj, fname: true }
      setFirstnameError("Invalid First Name")
    }
    else {
      Obj = { ...Obj, fname: false }
    }



    if (lname == "") {
      Obj = { ...Obj, lname: true }
      setLastnameError("please enter last name")
    }
    else if (/^[a-z]{3,}$/gi.test(lname) == false) {
      Obj = { ...Obj, lname: true }
      setLastnameError("Invalid Last Name")
    }
    else {
      Obj = { ...Obj, lname: false }
    }


    if (email == "") {
      Obj = { ...Obj, email: true }
      setEmailError("please enter emali")
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false) {
      Obj = { ...Obj, email: true }
      setEmailError("Invalid Email")
    }
    else {
      Obj = { ...Obj, email: false }
    }
    if (password == '') {
      Obj = { ...Obj, password: true }
      setEmailError("please enter password")
    }
    else {
      Obj = { ...Obj, password: false }
    }
    setErrors(Obj)


    //   if (!valid) {
    //     setErrors(Obj)
    //   } else {
    //     let data = {
    //       firstname: fname,
    //       email: email,
    //     }
    //   }
  }
  return (
    <>

      <div className="container-scroller">

        <Header />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="container-fluid">
            <div className="content-wrapper bg-white">
              <div className="page-header">
                <h3 className="page-title"> Create Admin </h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Super Admin</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Admin</li>
                  </ol>
                </nav>
              </div>

              <div className="row">
                <div className="col-12 bg-white">
                  {/* <div className="card"> */}
                  <div className="card-body">
                    <h4 className="card-title">Create Admin </h4>
                    <form class="form-sample">
                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">FirstName</label>
                            <div className="col-sm-8">

                              <input type="text" value={fname} onChange={(event) => handleInput('fname', event)} className="form-control" />

                              {errors && errors.fname && <div className=' text-danger'>Please Enter First Name</div>}
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

                              {errors && errors.lname && <div className="text-danger">Please Enter Last Name </div>}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                              <input type="text" value={email} onChange={(event) => handleInput('email', event)} className="form-control" />
                              {errors && errors.email && <div className="error text-danger">Please Enter EMAIL </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Passward</label>
                            <div className="col-sm-8">
                              <input type="text" value={password} onChange={(event) => handleInput('password', event)} className="form-control" />
                              {errors && errors.password && <div className="error text-danger">Please Enter Password</div>}
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
            <Footer />


          </div>
        </div>
      </div>

    </>
  )

}
export default Create;