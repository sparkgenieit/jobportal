import Header from '../../../layouts/company/Header';
import Footer from '../../../layouts/company/Footer';
import Sidebar from '../../../layouts/company/Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import companyService from '../../../services/common/company.service';


function Postajob() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [closeDate, setCloseDate] = useState('')
  const [location, setLocation] = useState('');
  // const [jobCategory, setJobCategory] = useState('');
  // const [subCategory, setSubCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [training, setTraining] = useState('');
  const [company, setCompany] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  const [duration, setDuration] = useState('');
  const [empjobreference, setEmpJobReference] = useState('')
  const [numberofvacancies, setNumberOfVacancies] = useState('')
  const [rateperhour, setRatePerHour] = useState('')
  const [weeklyperhour, setWeeklyPerHour] = useState('')
  const [benifits, setBenifits] = useState('')
  const [employerquestions, setEmployerQuestions] = useState('')
  const [employer, setEmployer] = useState('')


  const [msg, setMsg] = useState('')


  const [jobTitleMsg, setJobTitleMsg] = useState('Please enter Job Title');
  const [createdMsg, setCreatedMsg] = useState('Please enter Created date');
  const [locationMsg, setLocationMsg] = useState('Please enter Location');
  const [descriptionMsg, setDescriptionMsg] = useState('Please Enter Description');
  const [vacanciesMsg, setVacanciesMsg] = useState('Please Enter Number Of Vacancies');
  const [companyMsg, setCompanyMsg] = useState('Please Enter Company Name');
  const [trainingMsg, setTrainingMsg] = useState('Please Specify Training');







  const [showCheck, setShowCheck] = useState(false);
  const toggleCheck = () => {
    setShowCheck(!showCheck);
  }


  const [showInput, setShowInput] = useState(false);
  const toggleInput = () => {
    setShowInput(!showInput);
  }



  // const [mainSelection, setMainSelection] = useState('');
  // const [subSelection, setSubSelection] = useState('')

  const [jobCategory, setJobCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const [count, setCount] = useState(0);

  const addTextbox = () => {
    setCount(count + 1);
  };

  const delTextBox = () => {
    setCount(count - 1);
  };

  let arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(1);



  }


  const [errors, setErrors] = useState({
    descriptionErrors: false,
    locationErrors: false,
    jobCategoryErrors: false,
    subCategoryErrors: false,
    jobTitleErrors: false,
    jobTypeErrors: false,
    vacanciesErrors: false,
    creationDateErrors: false,
    trainingErrors: false,
    companyErrors: false,
    duration: false,

  })

  useEffect(() => {
    
    companyService.get(userId)
      .then(response => {
        setCompany(response.data.name);
        setCompanyLogo(response.data.logo);

      })
      .catch(e => {
        console.log(e);
      })
  }, [userId])



  const companyButton = () => {
    let eObj = {};
    let valid = true;
    if (description == '') {
      valid = false;
      eObj = { ...eObj, descriptionErrors: true };
      setDescriptionMsg('Please Enter Description');
    } else if (/^\w{2,}$/gi.test(description) == false) {
      valid = false;
      eObj = { ...eObj, descriptionErrors: true };
      setDescriptionMsg('Not Proper Description');
    }
    else {
      valid = true;
      eObj = { ...eObj, descriptionErrors: false };
    }

    if (location == '') {
      valid = false;
      eObj = { ...eObj, locationErrors: true };
      setLocationMsg('Please Enter Location')
    }
    else if (/^[a-z]{3,}$/gi.test(location) == false) {
      valid = false;
      eObj = { ...eObj, locationErrors: true };
      setLocationMsg('Not a Proper Location')
    }
    else {
      valid = true;
      eObj = { ...eObj, locationErrors: false };
    }

    if (jobCategory == '') {
      valid = false;
      eObj = { ...eObj, jobCategoryErrors: true };
    }
    else {
      valid = true;
      eObj = { ...eObj, jobCategoryErrors: false };
    }

    if (subCategory == '') {
      valid = false;
      eObj = { ...eObj, subCategoryErrors: true };
    }
    else {
      valid = true;
      eObj = { ...eObj, subCategoryErrors: false };
    }

    if (jobTitle == '') {
      valid = false;
      eObj = { ...eObj, jobTitleErrors: true };
      setJobTitleMsg('Please enter Job Title')
    } else {
      valid = true;
      eObj = { ...eObj, jobTitleErrors: false };
    }

    if (jobType == '') {
      valid = false;
      eObj = { ...eObj, jobTypeErrors: true };
    }
    else {
      valid = true;
      eObj = { ...eObj, jobTypeErrors: false };
    }

    if (vacancies == '') {
      valid = false;
      eObj = { ...eObj, vacanciesErrors: true };
      setVacanciesMsg('Please Enter Number Of Vacancies');
    } else {
      valid = true;
      eObj = { ...eObj, vacanciesErrors: false };
    }

    if (creationDate == '') {
      valid = false;
      eObj = { ...eObj, creationDateErrors: true };

    }
    else {
      valid = true;
      eObj = { ...eObj, creationDateErrors: false };
    }

    if (training == '') {
      valid = false;
      eObj = { ...eObj, trainingErrors: true };
      setTrainingMsg('Please Specify Training')
    } else {
      valid = true;
      eObj = { ...eObj, trainingErrors: false };
    }

    if (company == '') {
      valid = false;
      eObj = { ...eObj, companyErrors: true };
      setCompanyMsg('Please Enter Company Name')
    } else {
      valid = true;
      eObj = { ...eObj, companyErrors: false };
    }

    if (duration == '') {
      valid = false;
      eObj = { ...eObj, duration: true };
    }
    else {
      valid = true;
      eObj = { ...eObj, duration: false };
    }

    console.log(valid);
    setErrors(eObj);
    let obj1 = {}
    if (!valid) {
      obj1 = { ...obj1, company: company }
      obj1 = { ...obj1, closeDate: closeDate }
      obj1 = { ...obj1, creationDate: creationDate }
      obj1 = { ...obj1, jobType: jobType }
      obj1 = { ...obj1, location: location }
      obj1 = { ...obj1, Empjobreference: empjobreference }
      obj1 = { ...obj1, numberofvacancies: numberofvacancies }
      obj1 = { ...obj1, jobTitle: jobTitle }
      obj1 = { ...obj1, rateperhour: rateperhour }
      obj1 = { ...obj1, duration: duration }
      obj1 = { ...obj1, jobCategory: jobCategory }
      obj1 = { ...obj1, subCategory: subCategory }
      obj1 = { ...obj1, weeklyperhour: weeklyperhour }
      obj1 = { ...obj1, benifits: benifits }
      obj1 = { ...obj1, training: training }
      obj1 = { ...obj1, description: description }
      obj1 = { ...obj1, employerquestions: employerquestions }
      obj1 = { ...obj1, employer: employer }
      console.log(obj1)
    } else {

      let data = {
        company: company,
        closeDate: closeDate,
        creationDate: creationDate,
        jobType: jobType,
        location: location,
        Empjobreference: empjobreference,
        numberofvacancies: numberofvacancies,
        jobTitle: jobTitle,
        rateperhour: rateperhour,
        duration: duration,
        jobCategory: jobCategory,
        subCategory: subCategory,
        weeklyperhour: weeklyperhour,
        benifits: benifits,
        training: training,
        description: description,
        employerquestions: employerquestions,
        employer: employer,
        companyId: userId,
        companyLogo:companyLogo
      }
      axios.post('http://localhost:8080/jobs/create', data)
        .then(response => {
          if (response && response.status) {
            setMsg('Jobs added successfully');

            setTimeout(() => {
              navigate('/company/JobList', { replace: true }); 
            }, 2000)

          }
        })


    }
  }

  const handleInput = (name, event) => {
    if (name == 'description') {
      setDescription(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, descriptionErrors: true })

      }
      else {
        setErrors({ ...errors, descriptionErrors: false })
      }

    }

    if (name == 'location') {
      setLocation(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, locationErrors: true })

      }
      else {
        setErrors({ ...errors, locationErrors: false })
      }

    }
    if (name == 'jobcategory') {
      setJobCategory(event.target.value);
      const selectedOption = event.target.value;
      setJobCategory(selectedOption);
      setSubCategory('')
      if (event.target.value == '') {
        setErrors({ ...errors, jobCategoryErrors: true })

      }
      else {
        setErrors({ ...errors, jobCategoryErrors: false })
      }

    }
    if (name == 'subcategory') {
      const selectedOption = event.target.value;
      setSubCategory(selectedOption);
      setSubCategory(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, subCategoryErrors: true })

      }
      else {
        setErrors({ ...errors, subCategoryErrors: false })
      }

    }

    if (name == 'jobtitle') {
      setJobTitle(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, jobTitleErrors: true })

      }
      else {
        setErrors({ ...errors, jobTitleErrors: false })
      }

    }

    if (name == 'jobtype') {
      setJobType(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, jobTypeErrors: true })

      }
      else {
        setErrors({ ...errors, jobTypeErrors: false })
      }

    }

    if (name == 'vacancies') {
      setVacancies(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, vacanciesErrors: true })

      }

      else {
        setErrors({ ...errors, vacanciesErrors: false })
      }

    }

    if (name == 'creationdate') {
      setCreationDate(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, creationDateErrors: true })

      }
      else {
        setErrors({ ...errors, creationDateErrors: false })
      }

    }
    if (name == 'training') {
      setTraining(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, trainingErrors: true })

      }
      else {
        setErrors({ ...errors, trainingErrors: false })
      }

    }
    if (name == 'company') {
      setCompany(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, companyErrors: true })

      }
      else {
        setErrors({ ...errors, companyErrors: false })
      }

    }
    if (name == 'duration') {
      setDuration(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, duration: true })

      }
      else {
        setErrors({ ...errors, duration: false })
      }

    }
    if (name == 'closeDate') {
      setCloseDate(event.target.value)
    }
    if (name == 'empjobreference') {
      setEmpJobReference(event.target.value)
    }
    if (name == "rateperhour") {
      setRatePerHour(event.target.value)
    }
    if (name == 'benifits') {
      setBenifits(event.target.value)
    }
    if (name == 'weeklyperhour') {
      setWeeklyPerHour(event.target.value)
    }
    if (name == 'employerquestions') {
      setEmployerQuestions(event.target.value)
    }
    if (name == 'employer') {
      setEmployer(event.target.value)
    }





  }
  return (
    <>

      <div className="container-scroller">

        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel ">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title"> Post a Job </h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Employer</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Post a Job</li>
                  </ol>
                </nav>
              </div>


              <div className="row">
                <div className="col-12">

                  <div className="card-body bg-white p-5">
                    <h4 className="card-title">Post a Job </h4>
                    <form className="form-sample">

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label" >Company <span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={company} onChange={(event) => handleInput('company', event)} />
                              {errors.companyErrors && <span className='text-danger'>{companyMsg}</span>}
                            </div>
                          </div>
                        </div>


                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">CloseDate</label>
                            <div className="col-sm-8">
                              <input type="date" className="form-control" value={closeDate} onChange={(event) => handleInput('closeDate', event)} />

                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label">CreationDate<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <input type="date" className="form-control" value={creationDate} onChange={(event) => handleInput('creationdate', event)} />
                              {errors.creationDateErrors && <span className='text-danger'>Please select date</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Job Type<span className='text-danger'>*</span></label>
                            <div className="col-sm-3">

                              <div class="col-sm-5">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> FullTime
                                </div>
                              </div>

                              <div class="col-sm-5">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> Casual
                                </div>
                              </div>

                              <div class="col-sm-5">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> Freelance
                                </div>
                              </div>

                            </div>

                            <div className="col-md-6">

                              <div class="col-sm-5 mx-3">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> PartTime
                                </div>
                              </div>

                              <div class="col-sm-5 mx-3">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> Contract
                                </div>
                              </div>

                              <div class="col-sm-5 mx-3">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onClick={(event) => handleInput('jobtype', event)} /> Temporary
                                </div>
                              </div>


                            </div>
                            {/* { errors&& errors.jobTypeErrors &&<div className='mx-auto col-6 text-danger'>please select one</div>} */}
                          </div>
                        </div>


                      </div>
                      <div className='row'>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Location<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={location} onChange={(event) => handleInput('location', event)} />
                              {errors.locationErrors && <span className='text-danger'>{locationMsg}</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Emp job reference</label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" id="press6" value={empjobreference} onChange={(event) => handleInput('empjobreference', event)} />
                              <div className="bgcol" id="error6"></div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Number of vacancies<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <input type="number" className="form-control" value={vacancies} onChange={(event) => handleInput('vacancies', event)} />
                              {errors.vacanciesErrors && <span className='text-danger'>{vacanciesMsg} </span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label"> JobTitle<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={jobTitle} onChange={(event) => handleInput('jobtitle', event)} />
                              {errors.jobTitleErrors && <span className='text-danger'>{jobTitleMsg}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">RatePerHour</label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={rateperhour} onChange={(event) => handleInput('rateperhour', event)} />

                            </div>
                          </div>
                        </div>


                      </div>


                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">JobCategory<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <select value={jobCategory} onChange={(event) => handleInput('jobcategory', event)} className="form-select border col-6 " >
                                <option></option>
                                <option className="fw-bold" value="Agriculture" > Agriculture and Farming</option>
                                <option className="fw-bold" value="Hospitality">Hospitality and Tourism </option>
                                <option className="fw-bold" value="Retail">Retail and Sales</option>
                                <option className="fw-bold" value="Construction">Construction and Manual Labour</option>
                                <option className="fw-bold" value="Office">Office/Administration</option>
                                <option className="fw-bold" value="Healthcare">Healthcare</option>
                                <option className="fw-bold" value="Technology" >Technology and IT</option>
                                <option className="fw-bold" value="Teaching">Teaching and Education</option>
                                <option className="fw-bold" value="Creative">Creative and Media</option>

                              </select>
                              {errors.jobCategoryErrors && <span className='text-danger'>Please select Job Category</span>}

                              <div className="bgcol" id="jobCategoryError"></div>

                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Duration<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <select className="form-select border col-6 " value={duration} onChange={(event) => handleInput('duration', event)} >
                                <option></option>
                                <option className="fw-bold" value="Agriculture"> Less than a month</option>
                                <option className="fw-bold" value="Hospitality">1 Month</option>
                                <option className="fw-bold" value="Retail">2 Month</option>
                                <option className="fw-bold" value="Construction">3 Month</option>
                                <option className="fw-bold" value="Office">4 Month</option>
                                <option className="fw-bold" value="Healthcare">5 Month</option>
                                <option className="fw-bold" value="Technology" >6 Month</option>
                                <option className="fw-bold" value="Teaching">More than 6 months</option>


                              </select>
                              {errors && errors.duration && <div className='text-danger'>Please select one</div>}


                              <div className="bgcol" id="jobCategoryError"></div>

                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Sub-category<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">


                              <select className="form-select border" value={subCategory} onChange={(event) => handleInput('subcategory', event)}>

                                {jobCategory === 'Agriculture' && (
                                  <>
                                    <option value="subOption1">Fruit picking</option>
                                    <option value="subOpotion2">Crop harvesting</option>
                                    <option value="subOpotion2">Dairy farming</option>
                                    <option value="subOpotion2">Livestock handling</option>
                                  </>
                                )}
                                {jobCategory === 'Hospitality' && (
                                  <>
                                    <option value="subOption3">Hotel work</option>
                                    <option value="subOption4"> Restaurant and cafe jobs</option>
                                    <option value="subOption4">Tourism-related positions</option>
                                    <option value="subOption4"> Resort and ski resort jobs</option>
                                  </>
                                )}
                                {jobCategory === 'Retail' && (
                                  <>
                                    <option value="subOption3">Retail assistant</option>
                                    <option value="subOption4"> Sales positions</option>

                                  </>
                                )}
                                {jobCategory === 'Construction' && (
                                  <>
                                    <option value="subOption3">Construction work</option>
                                    <option value="subOption4"> Painting</option>
                                    <option value="subOption4">Landscaping</option>

                                  </>
                                )}
                                {jobCategory === 'Office' && (
                                  <>
                                    <option value="subOption3">Office support roles</option>
                                    <option value="subOption4"> Administrative positions</option>

                                  </>
                                )}
                                {jobCategory === 'Healthcare' && (
                                  <>
                                    <option value="subOption3">Healthcare assistant</option>
                                    <option value="subOption4"> Support roles in healthcare</option>

                                  </>
                                )}
                                {jobCategory === 'Technology' && (
                                  <>
                                    <option value="subOption3">IT support roles</option>
                                    <option value="subOption4"> Software development internships</option>

                                  </>
                                )}
                                {jobCategory === 'Teaching' && (
                                  <>
                                    <option value="subOption3">Teaching assistant roles</option>
                                    <option value="subOption4">Language teaching positions</option>

                                  </>
                                )}
                                {jobCategory === 'Creative' && (
                                  <>
                                    <option value="subOption3">Graphic design</option>
                                    <option value="subOption4">Writing and content creation</option>

                                  </>
                                )}
                              </select>


                              {errors.subCategoryErrors && <span className='text-danger'>Please select Sub Category</span>}
                              <div className="bgcol" id="subCategoryError"></div>

                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Weekly work hours</label>
                            <div className="col-sm-8">
                              <input type="number" className="form-control" id="press18" value={weeklyperhour} onChange={(event) => handleInput('weeklyperhour', event)} />
                              <div className="bgcol" id="error18"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="col-md-9">
                        <div className="form-group row">
                          <div>
                            <label className="col-sm-1 col-form-label">Benifits</label>
                          </div>
                          <div className=" row ">
                            <div className="col-3">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input " name="workinghoursRadio"
                                  id="workinghoursRadio1" value="Accomdation"onChange={(event) => handleInput('benifits', event)} />Accomdation
                              </div>

                            </div>
                            <div className="col-2">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="Food"onChange={(event)=>handleInput('benifits',event)} />Food
                              </div>

                            </div>
                            <div className="col-3">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="Transport"onChange={(event)=>handleInput('benifits',event)} />Transport
                              </div>
                            </div>
                            <div className="col-4 ">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="Others" onChange={(event)=>{handleInput('benifits',event);toggleInput()}} checked={showInput} />Others
                                {showInput && <input type='text' className='form-control col-5' />}

                              </div>

                            </div>

                          </div>

                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-9">
                          <div className="form-group row">
                            <div>
                              <label className="col-sm-3 col-form-label">Provide Training<span className='text-danger'>*</span></label>
                            </div>

                            <div className=" col-2 form-check mx-3">

                              <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                id="workinghoursRadio1" value="No" onChange={(event)=>handleInput('training',event)} />No

                            </div>
                            <div className=" col-2 form-check mx-3">

                              <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                id="workinghoursRadio1" value="Yes" onChange={(event)=>{handleInput('training',event); toggleCheck()} }checked={showCheck} />Yes


                            </div>
                            <div className='col-6'>

                              {showCheck && <input type='text' className='form-control col-5' />}

                            </div>

                          </div>

                        </div>
                      </div>
                      <div className='row'>

                        <div className="form-group row">
                          <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description<span className='text-danger'>*</span></label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(event) => handleInput('description', event)}></textarea>
                            {errors.descriptionErrors && <span className='text-danger'>{descriptionMsg}</span>}
                          </div>
                        </div>

                      </div>


                      <div className="col-md-12">
                        <div className="form-group row">

                          <label className="col-sm-3 col-form-labe ">Employer questions</label>

                          <div>
                            <div className=" mt-3 row">

                              <input className="form-control col" value={employerquestions} onChange={(event) => handleInput('employerquestions', event)} type="text" placeholder="Questions" />&nbsp;&nbsp;
                              <button className='col-1 btn bg-secondary' type="button" onClick={addTextbox}>+</button>


                            </div>

                          </div>

                        </div>

                      </div>
                      <div>
                        {arr.map((x, index) => {
                          return (
                            <div key={index} className=" mt-3 row">
                              <input className="form-control col" value={employer} onChange={(event) => handleInput('employer', event)} type="text" placeholder="Questions" />&nbsp;&nbsp;
                              <button className='col-1 btn bg-secondary' type="button" onClick={() => delTextBox()}>-</button>
                            </div>
                          )
                        }
                        )
                        }

                      </div>

                      <div class="form-group">
                        <div className='col-11 p-3'>
                          <button className="btn btn-primary  float-end" type="button" onClick={() => companyButton()}>
                            Save
                          </button>
                        </div>

                      </div>




                    </form>

                  </div>



                  <Footer />

                </div>
              </div>
            </div>
          </div>
        </div >
      </div >

    </>
  )





}
export default Postajob;