import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/common/user.service';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';


import { Hourglass } from "react-loader-spinner";



function UserProfile() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [userData, setUserData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const [firstName, setfirstName] = useState((userData && userData.first_name) || "");
  const [mobile, setMobile] = useState(userData && userData.phone || "");
  const [skills, setSkills] = useState("");
  const [preferredLocations, setPreferredLocations] = useState("");
  const [preferredJobCategory, setPreferredJobCategory] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("");
  const [availability, setAvailability] = useState(false);
  const [noticePeriod, setNoticePeriod] = useState("");
  const [preferredJobTypes, setPreferredJobTypes] = useState({
    fullTime: false,
    partTime: false,
    casual: false,
    contract: false,
    freelance: false,
    temporary: false
  });

  const [lastName, setlastName] = useState(userData && userData.last_name || "");
  const [email, setEmail] = useState(userData && userData.email || "");
  const [personal, setPersonal] = useState(userData && userData.profile_summary || "");
  const [show, setShow] = useState("");
  const [visa, setVisa] = useState("");
  const [cv, setCv] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const [loader, setLoader] = useState(false);
  const [workDate, setWorkDate] = useState(true)
  const [certificateDate, setCertificateDate] = useState(true)
  const [licenceDate, setLicenceDate] = useState(true)
  const [works, setWorks] = useState([{ jobTitle: '', employer: '', location: '', fromDate: '', toDate: '', description: '' }]);
  const [education, setEducation] = useState([{ educationProvider: '', qualification: '', yearCompleted: '', validInNZ: '', description: '' }]);
  const [licences, setLicences] = useState([{ licenseName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }]);
  const [certificates, setCertificates] = useState([{ certificateName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }]);

  const [firstNameError, setfirstNameError] = useState("Please Enter First Name");
  const [lastNameError, setlastNameError] = useState("Please Enter Last Name");
  const [emailError, setEmailError] = useState("Please Enter Email");
  const [personalsummaryError, setPersonalsummaryError] = useState("Enter Personal Summary");
  const [showprofileError, setShowprofileError] = useState("Please Select Show Profile")
  const [visaError, setVisaError] = useState("Please Select Visa")
  const [cvError, setCvError] = useState("Please Upload CV")
  const [coverLetterError, setCoverLetterError] = useState("Please Upload Cover Letter")

  const [isCvUploaded, setisCvUploaded] = useState(false)
  const [isCoverUploaded, setisCoverUploaded] = useState(false)

  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    personal: false,
    show: false,
    visa: false,
    cv: false,
    coverLetter: false,
    fromDate: false,
    toDate: false,
  })


  const navigate = useNavigate();

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



  useEffect(() => {

    userService.get(userId)
      .then(response => {
        console.log(response.data);

        setfirstName(response.data.first_name);
        setlastName(response.data.last_name);
        setEmail(response.data.email);
        setPersonal(response.data.profile_summary);
        setUserData(response.data);
        if (response.data && response.data.work_history && response.data.work_history.length > 0) {
          setWorks(response.data.work_history);
        }
        if (response.data && response.data.licences && response.data.licences.length > 0) {
          setLicences(response.data.licences);
        }

        if (response.data && response.data.work_history && response.data.work_history.length > 0) {
          setEducation(response.data.education)
        }

        if (response.data && response.data.certification && response.data.certification.length > 0) {
          setCertificates(response.data.certification)
        }

        setSkills(response.data.skills);
        setVisa(response.data.visaType);
        setMobile(response.data.phone);
        if (response.data.visaExpiryDate) {
          setVisaExpiry(response.data.visaExpiryDate.slice(0, 10))
        }
        setExpectedRate(response.data.expectedRatePerHour)
        setPreferredLocations(response.data.preferredJobLocations[0])
        setPreferredJobCategory(response.data.preferredJobCategories[0])
        setPreferredJobTypes(response.data.preferredJobTypes[0])
        if ((response.data.cv).length > 0) {
          setisCvUploaded(true)
          setCv(response.data.cv)
        }
        if ((response.data.coverLetter).length > 0) {
          setisCoverUploaded(true)
          setCoverLetter(response.data.coverLetter)
        }

      })
      .catch(e => {
        console.log(e);
      })
  }, [userId])



  // On file select (from the pop up)
  const onFileChange = (event) => {
    const name = event.target.id;
    console.log(event.target.files[0])
    if (name == 'cv') {
      setCv(event.target.files[0]);
    }

    if (name == 'cover') {
      setCoverLetter(event.target.files[0]);
    }
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    //axios.post("api/uploadfile", formData);
  };


  const chnageOut = (name, event) => {
    if (name == "firstName") {
      if (event.target.value == "") {
        setErrors({ ...errors, firstName: true })
      }
      else {
        setErrors({ ...errors, firstName: false })

      }
      setfirstName(event.target.value);

    }

    if (name == "lastName") {
      if (event.target.value == "") {
        setErrors({ ...errors, lastName: true })
      }
      else {
        setErrors({ ...errors, lastName: false })
      }
      setlastName(event.target.value)

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

    if (name == "mobile") {
      setMobile(event.target.value)
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

    if (name == "skills") {
      setSkills(event.target.value)
    }

    if (name == "noticePeriod") {
      setNoticePeriod(event.target.value)
    }


    if (name == "preferredLocations") {
      setPreferredLocations(event.target.value)
    }
    if (name == "expectedRate") {
      setExpectedRate(event.target.value)
    }
    if (name == "preferredJobCategory") {
      setPreferredJobCategory(event.target.value)
    }
    if (name == "availability") {
      setAvailability(!availability)
    }
    if (name == "visaExpiry") {
      setVisaExpiry(event.target.value)
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

  const validatedate = (fromDate, toDate) => {

    const fromDateTimestamp = new Date(fromDate).getTime();
    const toDateTimestamp = new Date(toDate).getTime();
    if (fromDateTimestamp > toDateTimestamp) {
      return false
    } else {
      return true
    }
  }

  const handleWorks = (key, value, work, index) => {
    const wrks = works;
    work[key] = value;

    wrks[index] = work;
    setWorks([...wrks]);
    setWorkDate(validatedate(work.fromDate, work.toDate));

  }

  const handleEducation = (key, value, edu, index) => {
    const educa = education;
    edu[key] = value;

    educa[index] = edu;
    setEducation([...educa]);


  }

  const handleLicenses = (key, value, licence, index) => {
    const lice = licences;
    licence[key] = value;

    lice[index] = licence;

    setLicences([...lice]);
    setLicenceDate(validatedate(licence.issueDate, licence.expiryDate))

  }

  const handleCertificates = (key, value, certificate, index) => {
    const certi = certificates;
    certificate[key] = value;

    certi[index] = certificate;

    setCertificates([...certi]);
    setCertificateDate(validatedate(certificate.issueDate, certificate.expiryDate))

  }


  const preferredjobstypes = (name, event) => {
    if (name == "fullTime") {
      setPreferredJobTypes({ ...preferredJobTypes, fullTime: !(preferredJobTypes.fullTime) })
    }
    if (name == "partTime") {
      setPreferredJobTypes({ ...preferredJobTypes, partTime: !(preferredJobTypes.partTime) })
    }
    if (name == "casual") {
      setPreferredJobTypes({ ...preferredJobTypes, casual: !(preferredJobTypes.casual) })
    }
    if (name == "freelance") {
      setPreferredJobTypes({ ...preferredJobTypes, freelance: !(preferredJobTypes.freelance) })
    }
    if (name == "contract") {
      setPreferredJobTypes({ ...preferredJobTypes, contract: !(preferredJobTypes.contract) })
    }
    if (name == "temporary") {
      setPreferredJobTypes({ ...preferredJobTypes, temporary: !(preferredJobTypes.temporary) })
    }

  }

  const SubmitData = () => {
    console.log(cv)
    let obj = {};

    let isValid = true;

    console.log("firstName", firstName)

    if (!firstName || firstName == "") {
      obj = { ...obj, firstName: true }
      isValid = false;
    } else {
      obj = { ...obj, firstName: false }
      isValid = true;
    }

    if (!firstName || lastName == "") {
      obj = { ...obj, lastName: true }
      isValid = false;
    } else {
      obj = { ...obj, lastName: false }
      isValid = true;
    }

    if (email == "") {
      obj = { ...obj, email: true }
      isValid = false;
    }
    else if (!validateEmailAddress(email)) {
      obj = { ...obj, email: true }
      isValid = false;
    }
    else {
      obj = { ...obj, email: false }
      isValid = true;
    }


    if (personal == "") {
      obj = { ...obj, personal: true }
      isValid = false;
    }
    else {
      obj = { ...obj, personal: false }
      isValid = true;
    }



    if (show == "") {
      obj = { ...obj, show: true }
      isValid = false;

    }
    else {
      obj = { ...obj, show: false }
      isValid = true;
    }

    if (visa == "") {
      obj = { ...obj, visa: true }
      isValid = false;
    }
    else {
      obj = { ...obj, visa: false }
      isValid = true;
    }


    if (cv == null) {
      obj = { ...obj, cv: true }
      isValid = false;
    }
    else {
      obj = { ...obj, cv: false }
      isValid = true;
    }

    if (coverLetter == null) {
      obj = { ...obj, coverLetter: true }
      isValid = false;
    }
    else {
      obj = { ...obj, coverLetter: false }
      isValid = true;
    }


    setErrors(obj);

    console.log(isValid);


    if (isValid) {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: mobile,
        profile_summary: personal,
        work_history: works.map((x) => {
          return ({
            jobTitle: x.jobTitle,
            employer: x.employer,
            location: x.location,
            fromDate: x.fromDate,
            toDate: x.toDate,
            description: x.description
          })
        }),
        education: education.map((x) => {
          return ({
            educationProvider: x.educationProvider,
            qualification: x.qualification,
            yearCompleted: x.yearCompleted,
            validInNZ: x.validInNZ,
            description: x.description
          })
        }),
        licences: licences.map((x) => {
          return ({
            licenseName: x.licenseName,
            issuingAuthority: x.issuingAuthority,
            issueDate: x.issueDate,
            expiryDate: x.expiryDate,
            validInNZ: x.validInNZ,
            description: x.description
          })
        }),
        certification: certificates.map((x) => {
          return ({
            certificateName: x.certificateName,
            issuingAuthority: x.issuingAuthority,
            issueDate: x.issueDate,
            expiryDate: x.expiryDate,
            validInNZ: x.validInNZ,
            description: x.description
          })
        }),
        skills: skills,
        preferredJobCategories: preferredJobCategory,
        preferredJobLocations: preferredLocations,
        expectedRatePerHour: expectedRate,
        showProfile: show,
        visaType: visa,
        visaExpiryDate: visaExpiry,
        availability: availability,
        noticePeriod: noticePeriod,
        preferredJobTypes: preferredJobTypes
      };


      const fd = new FormData();
      fd.append('file', cv);

      const fd1 = new FormData();
      fd1.append('file', coverLetter)
      userService.uploadCV(fd).then((res) => {
        console.log(res);
        userData.cv = res.data.filename;
        userService.uploadCoverLetter(fd1).then((res) => {
          console.log(res);
          userData.coverLetter = res.data.filename;
          userService.update(userId, userData)
            .then(response => {
              console.log(response.data);
              window.scrollTo({ top: 10, behavior: "smooth" });
              setIsUpdated(true);
              setTimeout(() => {
                // Inside the handleLogin function
                navigate('/viewprofile', { replace: true }); // Redirect to the dashboard after login
              }, 1500);

            })
            .catch(e => {
              console.log(e);

              if (e && e.code) {
                if (e.response && e.response.data) {
                  if (e.response.data.email) {
                    setErrors({ updateError: e.response.data.email });
                  }

                  if (e.response.data.message) {
                    setErrors({ updateError: e.response.data.message });
                  }
                } else {
                  setErrors({ updateError: e.message });
                }
              }
              setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)


            });
        });
      })
        .catch((e) => console.log(e))
    } else {
    }

  }


  const addWork = () => { setWorks([...works, { jobTitle: '', employer: '', location: '', fromDate: '', toDate: '', description: '' }]) }
  const deleteWork = (i) => {
    const wrks = works;
    wrks.splice(i, 1);

    setWorks([...wrks])
  }
  const addEdu = () => { setEducation([...education, { educationProvider: '', qualification: '', yearCompleted: '', validInNZ: '', description: '' }]) }
  const deleteEdu = (i) => {

    const educa = education;
    educa.splice(i, 1);

    setEducation([...educa])

  }
  const addLic = () => setLicences([...licences, { licenseName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }])
  const deleteLic = (i) => {
    const lice = licences;
    lice.splice(i, 1);

    setLicences([...lice])

  }
  const addcer = () => setCertificates([...certificates, { certificateName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }])
  const deleteCer = (i) => {
    const certi = certificates;
    certi.splice(i, 1);

    setCertificates([...certi])
  }




  return <>
    <Header />
    {/* <main id="main"> */}

    {/* <section class="inner-page" data-aos="fade-up"> */}
    {/* <div class="container-fluid homeBg"> */}
    <div class="container-fluid page-body-wrapper">
      <Sidebar />

      <div class="main-panel bg-light">
        {errors && errors.updateError && <div class="alert alert-danger" role="alert">
          {errors && errors.updateError}</div>}
        {isUpdated && <div class="alert alert-success" role="alert">
          User Profile Updated successfully!
        </div>}

        {!isUpdated && <div className="content-wrapper pb-0">
          <div className="page-header">
            <h3 className="page-title"> User Profile </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">User</a></li>
                <li className="breadcrumb-item active" aria-current="page">My Profile</li>
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
                          <input type="text" className="form-control" value={firstName} onChange={(event) => chnageOut("firstName", event)} />

                          {errors && errors.firstName && <div className="error text-danger"> {firstNameError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Last Name <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={lastName} onChange={(event) => chnageOut("lastName", event)} />

                          {errors && errors.lastName && <div className="error text-danger"> {lastNameError}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <input type="email" className="form-control" value={email} onChange={(event) => chnageOut("email", event)} />

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
                          <input type="number" class="form-control" value={mobile} onChange={(event) => chnageOut("mobile", event)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label ">Personal Summary<span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-12">
                          <textarea type="text" className="form-control" value={personal} onChange={(event) => chnageOut("personal", event)}></textarea>

                          {errors && errors.personal && <div className="error text-danger"> {personalsummaryError}</div>}

                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label">Personal Summary<span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-12">
                          <textarea type="text" className="form-control" value={personal} onChange={(event) => chnageOut("personal", event)}></textarea>
                          {errors && errors.personal && <div className="error text-danger"> {personalsummaryError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="card-description mt-3"><strong>Work History</strong></p>
                  <div className="row">
                    <div className="col-md-12">

                      {
                        works.map((work, index) => {
                          return (
                            <div className="form-group row">
                              <div key={index} className="col-md-12">
                                <div className="form-group row">
                                  <div className="col-md-2">
                                    <label className="col-sm-1 col-form-label">JobTitle</label>
                                    <input type="text" className="form-control" value={work.jobTitle} onChange={(event) => handleWorks("jobTitle", event.target.value, work, index)} />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-sm-2 col-form-label">Employer</label>
                                    <input type="text" className="form-control" value={work.employer} onChange={(event) => handleWorks("employer", event.target.value, work, index)} />
                                  </div>
                                  <div className="col-md-2">
                                    <label className="col-sm-2 col-form-label">Location</label>
                                    <input type="text" class="form-control" value={work.location} onChange={(event) => handleWorks("location", event.target.value, work, index)} />
                                  </div>
                                  <div className="col-md-3">
                                    <label className="col-sm-3 col-form-label">From</label>
                                    <input type="date" class="form-control" value={work.fromDate} onChange={(event) => handleWorks("fromDate", event.target.value, work, index)} />
                                  </div>
                                  <div className="col-md-3">
                                    <label className="col-sm-3 col-form-label">To</label>
                                    <input type="date" className="form-control" value={work.toDate} onChange={(event) => handleWorks("toDate", event.target.value, work, index)} />
                                  </div>


                                  <div className="col-md-9">
                                    <div className="form-group row">
                                      <label className="col-sm-3 col-form-label">Description</label>
                                      <div className="col-sm-12">
                                        <textarea type="text" className="form-control" value={work.description} onChange={(event) => handleWorks("description", event.target.value, work, index)} ></textarea>

                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className='mt-2'></div>
                                    {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addWork(index)} >+</button>}
                                    {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteWork(index)} >-</button>}
                                  </div>

                                </div>
                              </div>
                            </div>)
                        })
                      }
                      {!workDate && <div className='text-danger px-4 pb-3'>From date cannot be after To date </div>}



                    </div>
                  </div>
                  <p className="card-description mt-3"><strong>Education</strong></p>
                  <div className="row">
                    <div className="col-md-12">
                      {

                        education.map((edu, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label "><small>Education Provider</small></label>
                                  <input type="text" className="form-control" value={edu.educationProvider} onChange={(event) => handleEducation("educationProvider", event.target.value, edu, index)} />
                                </div>

                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label "><small>Qualification</small></label>
                                  <input type="text" className="form-control " value={edu.qualification} onChange={(event) => handleEducation("qualification", event.target.value, edu, index)} />
                                  <div className="bgred" id="error12"></div>
                                </div>

                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label "><small>Year Completed</small></label>
                                  <input type="number" className="form-control" value={edu.yearCompleted} onChange={(event) => handleEducation("yearCompleted", event.target.value, edu, index)} />
                                </div>

                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label"><small>Valid in NZ?</small></label>
                                  <input type="text" className="form-control" value={edu.validInNZ} onChange={(event) => handleEducation("validInNZ", event.target.value, edu, index)} />
                                </div>
                                <div className="row">
                                  <div className="col-md-9">
                                    <div className="form-group row">
                                      <label className="col-sm-3 col-form-label">Description</label>
                                      <div className="col-sm-12">
                                        <textarea type="text" className="form-control" value={edu.description} onChange={(event) => handleEducation("description", event.target.value, edu, index)}  ></textarea>

                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addEdu(index)} >+</button>}
                                    {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteEdu(index)} >-</button>}


                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }






                    </div>
                  </div>


                  <p className="card-description mt-3"><strong>Licences</strong></p>
                  <div className="row">
                    <div className="col-md-12">


                      {
                        licences.map((licence, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label"><small>Licence Name</small></label>

                                  <input type="text" className="form-control" value={licence.licenseName} onChange={(event) => handleLicenses("licenseName", event.target.value, licence, index)} />
                                </div>

                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label"><small>Issuing Authority</small></label>
                                  <input type="text" class="form-control" value={licence.issuingAuthority} onChange={(event) => handleLicenses("issuingAuthority", event.target.value, licence, index)} />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-12 col-form-label"><small>Issue Date</small></label>
                                  <input type="date" className="form-control" value={licence.issueDate} onChange={(event) => handleLicenses("issueDate", event.target.value, licence, index)} />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-12 col-form-label"><small>Expiry Date</small></label>
                                  <input type="date" className="form-control" value={licence.expiryDate} onChange={(event) => handleLicenses("expiryDate", event.target.value, licence, index)} />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-12 col-form-label"><small>Valid in NZ?</small></label>

                                  <input type="text" className="form-control" value={licence.validInNZ} onChange={(event) => handleLicenses("validInNZ", event.target.value, licence, index)} />
                                </div>
                                <div className="row">
                                  <div className="col-md-9">
                                    <div className="form-group row">
                                      <label className="col-sm-3 col-form-label">Description</label>
                                      <div className="col-sm-12">
                                        <textarea type="text" className="form-control" value={licence.description} onChange={(event) => handleLicenses("description", event.target.value, licence, index)} ></textarea>

                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addLic(index)} >+</button>}
                                    {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteLic(index)} >-</button>}
                                  </div>
                                </div>
                              </div>
                            </div>

                          )
                        })

                      }
                      {!licenceDate && <div className='text-danger px-4 pb-3'>From date cannot be after To date </div>}






                    </div>
                  </div>
                  <p className="card-description mt-3"><strong>Certifications</strong></p>
                  <div className="row">
                    <div className="col-md-12">


                      {
                        certificates.map((certificate, index) => {
                          return (
                            <div key={index} className="col-md-12">
                              <div className="form-group row">
                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label"><small>Certificate Name</small></label>

                                  <input type="text" className="form-control" value={certificate.certificateName} onChange={(event) => handleCertificates("certificateName", event.target.value, certificate, index)} />
                                </div>

                                <div className="col-md-3">
                                  <label className="col-sm-12 col-form-label"><small>Issuing Authority</small></label>

                                  <input type="text" className="form-control" value={certificate.issuingAuthority} onChange={(event) => handleCertificates("issuingAuthority", event.target.value, certificate, index)} />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-12 col-form-label"><small>Issue Date</small></label>

                                  <input type="date" className="form-control" value={certificate.issueDate} onChange={(event) => handleCertificates("issueDate", event.target.value, certificate, index)} />
                                </div>

                                <div className="col-md-2">
                                  <label className="col-sm-12 col-form-label"><small>Expiry Date</small></label>

                                  <input type="date" className="form-control" value={certificate.expiryDate} onChange={(event) => handleCertificates("expiryDate", event.target.value, certificate, index)} />
                                </div>
                                <div className="col-md-2">
                                  <label className="col-sm-12 col-form-label"><small>Valid in NZ?</small></label>

                                  <input type="text" className="form-control" value={certificate.validInNZ} onChange={(event) => handleCertificates("validInNZ", event.target.value, certificate, index)} />
                                </div>
                                <div className="row">
                                  <div className="col-md-9">
                                    <div className="form-group row">
                                      <label className="col-sm-3 col-form-label">Description</label>
                                      <div className="col-sm-12">
                                        <textarea type="text" className="form-control" value={certificate.description} onChange={(event) => handleCertificates("description", event.target.value, certificate, index)}  ></textarea>

                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-md-2">
                                    {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addcer(index)} >+</button>}
                                    {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteCer(index)} >-</button>}



                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                      {!certificateDate && <div className='text-danger px-4 pb-3'>From date cannot be after To date </div>}




                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Skills</label>
                        <div className="col-sm-12">
                          <input type="text" className="form-control" value={skills} onChange={(event) => chnageOut("skills", event)} />
                        </div>
                      </div>
                    </div>
                  </div>




                  <label className="card-description my-3"> Availability </label>

                  <div className="row">
                    <div className="col-12">
                      <div className="form-group row">
                        <div className="col-6 px-2">
                          <input type="radio" class="mx-2" value={availability} onChange={(event) => chnageOut("availability", event)} />
                          Immediately

                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-7 col-form-label">Enter number of weeks notice period </label>
                            <div className="col-sm-5">
                              <input type="text" className="form-control" value={noticePeriod} onChange={(event) => chnageOut("noticePeriod", event)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="card-description mt-3">Preferred Job Types</p>
                  <div className="row">
                    <div className="col-md-12">
                      {preferredJobTypes && <div className="form-group row">
                        <div className="col-md-4">
                          <input type="checkbox" class="col-sm-12 form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" checked={preferredJobTypes.fullTime} onChange={(event) => preferredjobstypes("fullTime", event)} /> Full Time

                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" class="col-sm-11 form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" checked={preferredJobTypes.partTime} onChange={(event) => preferredjobstypes("partTime", event)} /> Part Time

                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" class="col-sm-11 form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" checked={preferredJobTypes.casual} onChange={(event) => preferredjobstypes("casual", event)} /> Casual

                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" class="col-sm-11 form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" checked={preferredJobTypes.contract} onChange={(event) => preferredjobstypes("contract", event)} /> Contract

                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" class="col-sm-11 form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" checked={preferredJobTypes.freelance} onChange={(event) => preferredjobstypes("freelance", event)} /> Freelance

                        </div>
                        <div className="col-md-4">
                          <input type="checkbox" class="col-sm-12 form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="option2" checked={preferredJobTypes.temporary} onChange={(event) => preferredjobstypes("temporary", event)} /> Temporary

                        </div>


                      </div>}
                    </div>
                  </div>




                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label">Preferred Locations</label>
                        <div className="col-sm-12">
                          <input type="text" className="form-control" value={preferredLocations} onChange={(event) => chnageOut("preferredLocations", event)} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Preferred Job Category</label>
                        <div className="col-sm-7">
                          <input type="text" className="form-control" value={preferredJobCategory} onChange={(event) => chnageOut("preferredJobCategory", event)} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Expected Rate Per Hour </label>
                        <div className="col-sm-7">
                          <input type="number" className="form-control form-control form-control-lg" value={expectedRate} onChange={(event) => chnageOut("expectedRate", event)} />

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">

                        <label className="col-sm-3 col-form-label">Show Profile <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-9">
                          <select type="dropdown" className=" form-select form-control" value={show} onChange={(event) => chnageOut("show", event)}>
                            <option>---Select---</option>
                            <option value="Yes"> yes</option>
                            <option value="No">No</option>
                          </select>

                          {errors && errors.show && <div className="error text-danger"> {showprofileError}</div>}

                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="row">
                    <div className="col-md-6">
                      <div class="form-group row">
                        <label className="col-sm-6 col-form-label">Visa Type <span style={{ color: "red" }}>*</span></label>
                        <div className="col-sm-12">
                          <select type="dropdown" className="form-select form-control" value={visa} onChange={(event) => chnageOut("visa", event)}>
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
                          <input className="form-control" type="date" value={visaExpiry} onChange={(event) => chnageOut("visaExpiry", event)} />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">

                        <label className="col-sm-5 col-form-label">Upload CV  <span style={{ color: "red" }}>*</span></label>


                        <div className="col-sm-7">
                          {isCvUploaded === false ? <input type="file" id="cv" className="form-control" onChange={onFileChange} />
                            : <p>{cv}</p>}

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
                        <label className="col-sm-5 col-form-label">Upload Cover Letter <span style={{ color: "red" }}>*</span></label>

                        <div className="col-sm-7">
                          {isCoverUploaded === false ? <input type="file" id="cover" className="form-control" onChange={onFileChange} />
                            : <p>{coverLetter}</p>}
                          {errors && errors.coverLetter && <div className="error text-danger"> {coverLetterError}</div>}

                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mt-3 row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-12 d-flex justify-content-end">

                      <button type="button" onClick={() => SubmitData()} className="btn btn-gradient-primary me-2">SAVE</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>}
        {/* </div> */}

      </div>

    </div>
    {/* </div> */}
    {/* </section> */}

    {/* </main> */}
    <Footer />
    <Hourglass
      visible={loader}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{ position: 'absolute', top: '80%', left: '50%' }}
      wrapperClass=""
      colors={['#0ea2bd', '#72a1ed']}
    />
  </>
}


export default UserProfile;
