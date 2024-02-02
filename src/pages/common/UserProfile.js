import Header from '../../layouts/company/Header';
import Footer from '../../layouts/company/Footer';
import Sidebar from '../../layouts/company/Sidebar';
import { useState } from 'react';
function UserProfile() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [personal, setPersonal] = useState("");
  const [show, setShow] = useState("");
  const [visa, setVisa] = useState("");

  const [firstnameError, setFirstnameError] = useState("Please Enter First Name");
 const[lastnameError,setLastnameError]= useState("please enter last name");
 const [emailError, setEmailError] = useState("Please enter email address");
 const [personalsummary, setPersonalsummary] = useState("Enter Personal Summary");
 const [showprofile, setShowprofile] = useState("Please enter show profile")
  


  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    personal: false,
    show: false,
    visa: false
  })


  const handleInput = (name, event) => {
    if (name == "firstname") {
      if (event.target.value == "") {
        setErrors({ ...errors, firstname: true })
      }
      else {
        setErrors({ ...errors, firstname: false })

      }
      setFirstName(event.target.value);

    }
    if (name == "lastname") {
      if (event.target.value == "") {
        setErrors({ ...errors, lastname: true })
      }
      else {
        setErrors({ ...errors, lastname: false })
      }
      setLastname(event.target.value)

    }
    if (name == 'email') {
      if (event.target.value == "") {
        setErrors({ ...errors, email: true })
      }
      else {
        setErrors({ ...errors, email: false })
      }
      setEmail(event.target.value)

    }
    if (name == 'personal') {
      if (event.target.value == "") {
        setErrors({ ...errors, personal: true })
      }
      else {
        setErrors({ ...errors, personal: false })
      }
      setPersonal(event.target.value)

    }
    if (name == 'show') {
      if (event.target.value == "") {
        setErrors({ ...errors, show: true })
      }
      else {
        setErrors({ ...errors, show: false })
      }
      setShow(event.target.value)

    }
    if (name == "visa") {
      if (event.target.value == "") {
        setErrors({ ...errors, visa: true })
      }

      else {
        setErrors({ ...errors, visa: false })
      }
      setVisa(event.target.value)

    }
  }



  const submitData = () => {
    let obj = {}

    if (firstname == "") {
      obj = { ...obj, firstname: true }
      setFirstnameError("Please Enter First Name")
    }
    else if (/^[a-z]{3,}$/gi.test(firstname) == false) {
      obj = { ...obj, firstname: true }
      setFirstnameError("Invalid First Name")
    }
    else {
      obj = { ...obj, firstname: false }
    }

    if (lastname == "") {
      obj = { ...obj, lastname: true }
      setLastnameError("please enter last name")
    }
    else if (/^[a-z]{3,}$/gi.test(lastname) == false) {
      obj = { ...obj, lastname: true }
      setLastnameError("Invalid Last Name")
    }
    else
     {
      obj = { ...obj, lastname: false }
    }
    if (email == "") {
      obj = { ...obj, email: true }
      setEmailError("Invalid Email")
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false) {
      obj = { ...obj, email: true }
      setEmailError("Invalid Email")
    }
    else {
      obj = { ...obj, email: false }
    }
    if (personal == "") {
      obj = { ...obj, personal: true }
      setPersonalsummary("Invalid Personal Data")

    }
    else if (/^[a-z]{3,}$/gi.test(personal) == false) {
      obj = { ...obj, personal: true }
      setPersonalsummary("Invalid Personal Data")
    }
    else {
      obj = { ...obj, personal: false }
    }
    if (show == "") {
      obj = { ...obj, show: true }
      setShowprofile("Please Select Profile");

    }
    else if (/^[a-z]{3,}$/gi.test(show) == false) {
      obj = { ...obj, show: true }
      setShowprofile("Please Select Profile");
    }
    else {
      obj = { ...obj, show: false }
    }
    if (visa == "") {
      obj = { ...obj, visa: true }
    }
    else {
      obj = { ...obj, visa: false }
    }
    setErrors(obj)
  }







  return (
    <>
      <div className="container-scroller">
        <Header />
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">User Profile </h4>
                <form className="form-sample">
                  <p className="card-description"></p>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label"> First Name *</label>
                        <div className="col-sm-9">

                          <input type="text" value={firstname} className="form-control" onChange={(event) => handleInput("firstname", event)} />
                          {errors && errors.firstname && <div className="error text-danger">{firstnameError}</div>}

                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Last Name*</label>
                        <div className="col-sm-9">

                          <input type="text" value={lastname} className="form-control" onChange={(event) => handleInput("lastname", event)} />
                          {errors && errors.lastname && <div className="error text-danger">{lastnameError}</div>}
                        </div>
                      </div>
                    </div>



                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email address*</label>
                          <div className="col-sm-9">
                            <input type="text" value={email} className="form-control" onChange={(event) => handleInput("email", event)} />
                            {errors && errors.email && <div className="error text-danger" >{emailError}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Personal summary*</label>
                          <div className="col-sm-9">
                            <input type="text" value={personal} className="form-control" onChange={(event) => handleInput("personal", event)} />
                            {errors && errors.personal && <div className="error text-danger" >{personalsummary}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Work history </label>
                          <div className="col-sm-9">
                            <input id="wh" onkeyup="ha4(event)" type="text" className="form-control" />
                            <div className="bgred" id="error5"></div>
                          </div>
                        </div>
                      </div>



                      <p className="card-description mt-3">Education Qualificaiton </p>
                      <div className="row">

                        <div className="col-md-3">
                          <input id="xx1" onkeyup="ha5(event)" type="text" placeholder="Qualification" className="form-control" />
                          <div className="bgred" id="error46"></div>
                        </div>

                        <div className="col-md-3">
                          <input id="e2" onkeyup="ha6(event)" type="text" placeholder="Institute" className="form-control" />
                          <div className="bgred" id="error12"></div>
                        </div>

                        <div className="col-md-3">
                          <input id="e3" onkeyup="ha7(event)" type="text" placeholder="Passout Year" className="form-control" />
                          <div className="bgred" id="error13"></div>
                        </div>

                        <div className="col-md-3">
                          <input id="e4" onkeyup="ha8(event)" type="text" placeholder="Percentage" className="form-control" />
                          <div className="bgred" id="error14"></div>
                        </div>
                      </div>

                      <p className="card-description"> Certificates  </p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Licence Name </label>
                            <div className="col-sm-9">
                              <input id="c1" onkeyup="ha13(event)" type="text" className="form-control" />
                              <div className="bgred" id="error-Licence Name "></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Issuing Authority </label>
                            <div className="col-sm-9">
                              <input id="c2" onkeyup="ha14(event)" type="text" className="form-control" />
                              <div className="bgred" id="error-Issuing Authority"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Issue Date</label>
                            <div className="col-sm-9">
                              <input id="cc3" onkeyup="ha15(event)" type="date" className="form-control" />
                              <div className="bgred" id="error-Issue Date"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">expiry Date</label>
                            <div className="col-sm-9">
                              <input id="c4" onkeyup="ha16(event)" type="date" className="form-control" />
                              <div className="bgred" id="error-expiry Date"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Discription </label>
                            <div className="col-sm-9">
                              <input id="d2" onkeyup="ha17(event)" type="text" className="form-control" />
                              <div className="bgred" id="error-Discription "></div>
                            </div>
                          </div>
                        </div>



                      </div>

                      <p className="card-description"> Skills  </p>
                      <div className="row">

                        <div className="col-md-3">
                          <select id="sk1" className="form-control">
                            <option></option>
                            <option>PHP</option>
                            <option>REACT</option>
                            <option>Angular</option>
                          </select>
                          <div className="bgred" id="error-skills"></div>
                        </div>

                        <div className="col-md-3">
                          <input id="sk2" type="text" placeholder="Latest version" className="form-control" />
                          <div className="bgred" id="error24"></div>
                        </div>

                        <div className="col-md-3">
                          <input id="sk3" type="text" placeholder="Last Used" className="form-control" />
                          <div className="bgred" id="error25"></div>
                        </div>

                        <div className="col-md-3">
                          <select id="sk4" className="form-control">
                            <option></option>
                            <option>Beginner</option>
                            <option>Intermedite</option>
                            <option>Expert</option>
                          </select>
                          <div className="bgred" id="error26"></div>
                        </div>
                      </div>



                      <p className="card-description mt-3"> Avalability </p>

                      <div className="row">
                        <div className="col-6">
                          <input id="ava" className="form-control" placeholder="Now" />
                          <div className="bgred" id="error28"></div>
                        </div>
                        <div className="col-6">
                          <input id="ava1" className="form-control" placeholder="Input box Weeks(s)" />
                          <div className="bgred" id="error29"></div>
                        </div>

                      </div>

                      <p className="card-description mt-3"> Prefered Information  </p>

                      <div className="row">


                        <div className="col-6">
                          <div className="form-group row">
                            <label className="col-form-label">preferred location </label>
                            <div className="col-sm-9">
                              <input id="p2" className="form-control" placeholder="text" />
                              <div className="bgred" id="error31"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="form-group row">
                            <label className="col-form-label">preferred job category </label>
                            <div className="col-sm-9">
                              <input id="p3" className="form-control" placeholder="text" />
                              <div className="bgred" id="error32"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Expected Rate per hour</label>
                            <div className="col-sm-9">
                              <input type="text" id="exp" className="form-control form-control form-control-lg" />
                              <div className="bgred" id="error33"></div>
                            </div>
                          </div>
                        </div>

                      </div>



                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Show Profile*</label>
                            <div className="col-sm-9">
                              <select value={show} className="form-control form-control form-control-lg" onChange={(event) => handleInput("show", event)}>
                                <option>yes</option>
                                <option>No</option>
                              </select>
                              {errors && errors.show && <div className="error text-danger">{showprofile}</div>}

                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-form-label">Visa Type</label>
                            <select id="visa" className="form-control col-5">
                              <option> </option>
                              <option>Working holiday visa</option>
                              <option>Work visa</option>
                              <option>Student visa</option>
                              <option>Permanet Resident</option>
                              <option>NZ citizen</option>
                              <option>Others </option>

                            </select>
                            <div className="bgred"></div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-form-label">Experiy Date *</label>
                            <div className="col-sm-9">
                              <input className="form-control" type="date" value={visa} onChange={(event) => handleInput("visa", event)} />
                              {errors && errors.visa && <div className="error text-danger">Please enter experiy date</div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-9 mt-3 row">
                        <div className="col-md-6">
                        </div>
                        <div className="col-md-6">

                          <button type="button" onClick={() => submitData()} className="btn btn-gradient-primary me-2">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <Footer />
            </div>
          </div>
        </div>

      </div>
    </>)

}

export default UserProfile;