import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';
import { useState } from 'react';

function UserProfile() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [personal, setPersonal] = useState("");
  const [show, setShow] = useState("");
  const [visa, setVisa] = useState("");
  const [cv, setCv] = useState("");
  const [coverLetter, setCoverLetter] = useState("");



  const [firstnameError, setFirstnameError] = useState("Please Enter First Name");
  const [lastnameError, setLastnameError] = useState("please Enter Last Name");
  const [emailError, setEmailError] = useState("Please Enter Email");
  const [personalsummaryError, setPersonalsummaryError] = useState("Enter Personal Summary");
  const [showprofileError, setShowprofileError] = useState("Please Select Show Profile")
  const [visaError, setVisaError] = useState("Please Select Visa")
  const [cvError, setCvError] = useState("Please Upload CV")
  const [coverLetterError, setCoverLetterError] = useState("Please Upload Cover Letter")





  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    personal: false,
    show: false,
    visa: false,
    cv: false,
    coverLetter: false,


  })


  const chnageOut = (name, event) => {
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
    if (name == "cv") {
      if (event.target.value == "") {
        setErrors({ ...errors, cv: true })
      }

      else {
        setErrors({ ...errors, cv: false })
      }
      setCv(event.target.value)

    }
    if (name == "coverLetter") {
      if (event.target.value == "") {
        setErrors({ ...errors, coverLetter: true })
      }

      else {
        setErrors({ ...errors, coverLetter: false })
      }
      setCoverLetter(event.target.value)

    }
  }



  const SubmitData = () => {
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
      setLastnameError("Please Enter Last Name")
    }
    else if (/^[a-z]{3,}$/gi.test(lastname) == false) {
      obj = { ...obj, lastname: true }
      setLastnameError("Invalid Last Name")
    }
    else {
      obj = { ...obj, lastname: false }
    }
    if (email == "") {
      obj = { ...obj, email: true }
      setEmailError("Please Enter Email")
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
      setPersonalsummaryError("Please Enter Personal Data")

    }
    else if (/^[a-z]{3,}$/gi.test(personal) == false) {
      obj = { ...obj, personal: true }
      setPersonalsummaryError("Invalid Personal Data")
    }
    else {
      obj = { ...obj, personal: false }
    }
    if (show == "") {
      obj = { ...obj, show: true }
      setShowprofileError("Please Select Profile");

    }
    else if (/^[a-z]{3,}$/gi.test(show) == false) {
      obj = { ...obj, show: true }
      setShowprofileError("Invalid Profile");
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

    if (cv == "") {
      obj = { ...obj, cv: true }
    }
    else {
      obj = { ...obj, cv: false }
    }

    if (coverLetter == "") {
      obj = { ...obj, coverLetter: true }
    }
    else {
      obj = { ...obj, coverLetter: false }
    }


    setErrors(obj)


  }


  const [work, setWork] = useState(0);
  const [education, setEducation] = useState(0);
  const [licence, setLicence] = useState(0);
  const [certificate, setCertificate] = useState(0);





  const addWork = () => { setWork(work + 1) }
  const deleteWork = () => setWork(work - 1)
  const addEdu = () => { setEducation(education + 1) }
  const deleteEdu = () => { setEducation(education - 1) }
  const addLic = () => setLicence(licence + 1)
  const deleteLic = () => setLicence(licence - 1)
  const deleteCer = () => setCertificate(certificate - 1)
  const addcer = () => setCertificate(certificate + 1)









  return <>
    <Header />
    {/* <main id="main"> */}

    {/* <section class="inner-page" data-aos="fade-up"> */}
    {/* <div class="container-fluid homeBg"> */}
    <div class="container-fluid page-body-wrapper">
      <Sidebar />

      <div class="main-panel bg-light">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title"> User Profile </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Employer</a></li>
                <li className="breadcrumb-item active" aria-current="page">Post a Job</li>
              </ol>
            </nav>
          </div>
          <div className="row bg-white">
            <div className="col-12">
              {/* <div className="card"> */}
              <div className="card-body p-3" >
                <h4 className="card-title py-3">User Profile </h4>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">First Name <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={firstname} onChange={(event) => chnageOut("firstname", event)} />

                          {errors && errors.firstname && <div className="error text-danger"> {firstnameError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Last Name <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={lastname} onChange={(event) => chnageOut("lastname", event)} />

                          {errors && errors.lastname && <div className="error text-danger"> {lastnameError}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={email} onChange={(event) => chnageOut("email", event)} />

                          {errors && errors.email && <div className="error text-danger"> {emailError}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Mobile</label>
                        <div className="col-sm-9">
                          <input type="number" class="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Personal Summary<span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <textarea type="text" className="form-control" value={personal} onChange={(event) => chnageOut("personal", event)}></textarea>

                          {errors && errors.personal && <div className="error text-danger"> {personalsummaryError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="card-description mt-3"><strong>Work History</strong></p>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <div className="col-md-2">
                          <label className="col-sm-1 col-form-label">JobTitle</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <label className="col-sm-2 col-form-label">Employer</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <label className="col-sm-2 col-form-label">Location</label>
                          <input type="text" class="form-control" />
                        </div>
                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label">From</label>
                          <input type="month" class="form-control" />
                        </div>
                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label">To</label>
                          <input type="month" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <div className='mt-2'></div>
                          <button type='button' className='btn btn-outline-primary my-4' onClick={() => addWork()} >+</button>
                        </div>
                      </div>

                      {
                        [...Array(work)].map((x, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-2">
                                  <label className="col-sm-1 col-form-label">JobTitle</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-2 col-form-label">Employer</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-2 col-form-label">Location</label>
                                  <input type="text" class="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label">From</label>
                                  <input type="month" class="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label">To</label>
                                  <input type="month" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <div className='mt-2'></div>
                                  <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteWork()} >-</button>
                                </div>
                              </div>
                            </div>)
                        })
                      }

                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-12">
                              <textarea type="text" className="form-control" ></textarea>

                            </div>
                          </div>
                        </div>
                      </div>




                    </div>
                  </div>
                  <p className="card-description mt-3"><strong>Education</strong></p>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <div className="col-md-3">
                          <label className="col-sm-3 col-form-label my-1"><small>Education Provider</small></label>
                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-3">
                          <label className="col-sm-3 col-form-label "><small>Qualification</small></label>
                          <input type="text" className="form-control my-3" />
                          <div className="bgred" id="error12"></div>
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label my-1"><small>year Completed</small></label>
                          <input type="number" className="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Validin NZ?</small></label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <button type='button' className='btn btn-outline-primary mt-5' onClick={() => addEdu()}>+</button>
                        </div>
                      </div>
                      {
                        [...Array(education)].map((x, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-3">
                                  <label className="col-sm-3 col-form-label my-1"><small>Education Provider</small></label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                  <label className="col-sm-3 col-form-label "><small>Qualification</small></label>
                                  <input type="text" className="form-control my-3" />
                                  <div className="bgred" id="error12"></div>
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label my-1"><small>year Completed</small></label>
                                  <input type="number" className="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Validin NZ?</small></label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <button type='button' className='btn btn-outline-primary mt-5' onClick={() => deleteEdu()}>-</button>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }


                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-12">
                              <textarea type="text" className="form-control" ></textarea>

                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>


                  <p className="card-description mt-3"><strong>Licences</strong></p>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Licence Name</small></label>

                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Issuing Authority</small></label>
                          <input type="text" class="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Issue Date</small></label>
                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Expiry Date</small></label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>validin NZ?</small></label>

                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <button type='button' className='btn btn-outline-primary mt-5' onClick={() => addLic()}>+</button>

                        </div>
                      </div>

                      {
                        [...Array(licence)].map((x, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Licence Name</small></label>

                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Issuing Authority</small></label>
                                  <input type="text" class="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Issue Date</small></label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Expiry Date</small></label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>validin NZ?</small></label>

                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <button type='button' className='btn btn-outline-primary mt-5' onClick={() => deleteLic()}>-</button>

                                </div>
                              </div>
                            </div>

                          )
                        })

                      }


                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-12">
                              <textarea type="text" className="form-control" ></textarea>

                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <p className="card-description mt-3"><strong>Certifications</strong></p>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Certificate Name</small></label>

                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Issuing Authority</small></label>

                          <input type="text" className="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Issue Date</small></label>

                          <input type="date" className="form-control" />
                        </div>

                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>Expiry Date</small></label>

                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <label className="col-sm-3 col-form-label"><small>valid inNZ?</small></label>

                          <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-2">
                          <button type='button' className='btn btn-outline-primary mt-5' onClick={() => addcer()}>+</button>


                        </div>
                      </div>

                      {
                        [...Array(certificate)].map((x, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Certificate Name</small></label>

                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Issuing Authority</small></label>

                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Issue Date</small></label>

                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>Expiry Date</small></label>

                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-3 col-form-label"><small>valid inNZ?</small></label>

                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-2">
                                  <button type='button' className='btn btn-outline-primary mt-5' onClick={() => deleteCer()}>-</button>


                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-12">
                              <textarea type="text" className="form-control" ></textarea>

                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Skills</label>
                        <div className="col-sm-12">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>




                  <p className="card-description mt-3"> Availability </p>

                  <div className="row">
                    <div className="col-12">
                      <div className="form-group row">
                        <div className="col-6 px-2">
                          <input type="radio" class="mx-2" />Immediately

                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-6 col-form-label">Enter number of weeks notice period </label>
                            <div className="col-sm-6">
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="card-description mt-3">Preferred Job Types</p>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <div className="col-md-2">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" /> Full Time

                        </div>
                        <div className="col-md-2">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" /> Part Time

                        </div>
                        <div className="col-md-2">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" /> Casual

                        </div>
                        <div className="col-md-2">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" /> Contract

                        </div>
                        <div className="col-md-2">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" /> Freelance

                        </div>
                        <div className="col-md-2">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" /> Temporary

                        </div>


                      </div>
                    </div>
                  </div>




                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label">Preferred Locations</label>
                        <div className="col-sm-12">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Preferred Jobcategorys</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Expected rate Per hour </label>
                        <div className="col-sm-9">
                          <input type="time" className="form-control form-control form-control-lg" />

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">

                        <label className="col-sm-3 col-form-label">Show Profile <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <select type="dropdown" className="form-control" value={show} onChange={(event) => chnageOut("show", event)}>
                            <option>---Select---</option>
                            <option>yes</option>
                            <option>No</option>
                          </select>
                          {errors && errors.show && <div className="error text-danger"> {showprofileError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group row">


                        <label className="col-sm-3 col-form-label">Visa Type <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-12">
                          <select type="dropdown" className="form-control" value={visa} onChange={(event) => chnageOut("visa", event)}>
                            <option>---Select---</option>
                            <option>----Select----</option>
                            <option>Working holiday visa</option>
                            <option>Work visa</option>
                            <option>Student visa</option>
                            <option>Permanet Resident</option>
                            <option>NZ citizen</option>
                            <option>Others </option>
                          </select>
                          {errors && errors.visa && <div className="error text-danger"> {visaError}</div>}
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-form-label">Visa Expiry Date</label>
                        <div className="col-sm-9">
                          <input className="form-control" type="date" />
                          <div className="bgred" id="error36"></div>
                        </div>
                      </div>
                    </div> */}
                     {/* <div className="row"> */}
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label">Visa Expiry Date </label>
                        <div className="col-sm-12">
                        <input className="form-control" type="date" />
                        </div>
                      </div>
                    </div>
                  </div>
                  

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">

                        <label className="col-sm-3 col-form-label">Upload CV  <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="file" className="form-control" value={cv} onChange={(event) => chnageOut("cv", event)} />

                          {errors && errors.cv && <div className="error text-danger"> {cvError}</div>}


                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        {/* <label className="col-sm-3 col-form-label">Upload Cover Letter <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="file" className="form-control" /> */}
                        <label className="col-sm-3 col-form-label">Upload Cover Letter <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="file" className="form-control" value={coverLetter} onChange={(event) => chnageOut("coverLetter", event)} />

                          {errors && errors.coverLetter && <div className="error text-danger"> {coverLetterError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-9 mt-3 row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">

                      <button type="button" onClick={() => SubmitData()} className="btn btn-gradient-primary me-2">SAVE</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}






      </div>

    </div>
    {/* </div> */}
    {/* </section> */}

    {/* </main> */}
    <Footer />
  </>
}


export default UserProfile;
