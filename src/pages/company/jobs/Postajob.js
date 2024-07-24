import Header from '../../../layouts/company/Header';
import Footer from '../../../layouts/company/Footer';
import Sidebar from '../../../layouts/company/Sidebar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import companyService from '../../../services/common/company.service';
import http from '../../../helpers/http';
import { CitiesList } from '../../../helpers/constants';
import MdxEditor from '../../../components/MdxEditor';


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
  const [creationDate, setCreationDate] = useState(new Date());
  const [training, setTraining] = useState({
    status: false,
    text: ""
  });
  const [company, setCompany] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  const [duration, setDuration] = useState('');
  const [empjobreference, setEmpJobReference] = useState('')
  const [numberofvacancies, setNumberOfVacancies] = useState('')
  const [rateperhour, setRatePerHour] = useState('')
  const [weeklyperhour, setWeeklyPerHour] = useState('')
  const [benifits, setBenifits] = useState({
    Accommodation: false,
    Food: false,
    Transport: false,
    Others: false,
    OthersText: ""
  })
  const [employerquestions, setEmployerQuestions] = useState([{ value: "" }])
  const [employer, setEmployer] = useState('')



  const [msg, setMsg] = useState('')
  const [plan, setPlan] = useState(false)
  const [mydata, setMydata] = useState(null)


  const [jobTitleMsg, setJobTitleMsg] = useState('Please enter Job Title');
  const [createdMsg, setCreatedMsg] = useState('Please enter Created date');
  const [locationMsg, setLocationMsg] = useState('Please enter Location');
  const [descriptionMsg, setDescriptionMsg] = useState('Please Enter Description');
  const [vacanciesMsg, setVacanciesMsg] = useState('Please Enter Number Of Vacancies');
  const [companyMsg, setCompanyMsg] = useState('Please Enter Company Nas');
  const [trainingMsg, setTrainingMsg] = useState('Please Specify Training');
  const [categoriesList, setCategoriesList] = useState();
  const [parent, setParent] = useState();
  const [jobtypMsg, setJobtypeMsg] = useState('Please select one')

  const [error, setError] = useState('');







  const handleQuestionsInput = (index, event) => {
    const values = [...employerquestions];
    values[index].value = event.target.value;
    setEmployerQuestions(values);
  };

  const handleAddFields = () => {
    setEmployerQuestions([...employerquestions, { value: '' }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...employerquestions];
    values.splice(index, 1);
    setEmployerQuestions(values);
  };




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


    http.get("/categories/all")
      .then((res) => {
        setCategoriesList(res.data)
        let p = [];
        (res.data).map((x, i) => {
          if (!p.includes(x.parent_id) && x.parent_id !== "None") {
            p.push(x.parent_id)
          }
        })

        setParent(p)

      })


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
    // if (!error) {
    //   // Here you would save the form data
    //   alert(`creationdate: ${creationDate}\nclosedate: ${closeDate}`);
    // }
    let eObj = {};
    let valid = true;
    if (description == '') {
      valid = false;
      eObj = { ...eObj, descriptionErrors: true };
      setDescriptionMsg('Please Enter Description');
    }
    // else if (/^\w{2,}$/gi.test(description) == false) {
    //   valid = false;
    //   eObj = { ...eObj, descriptionErrors: true };
    //   setDescriptionMsg('Not Proper Description');
    // }
    else {
      eObj = { ...eObj, descriptionErrors: false };
    }

    if (location == '') {
      valid = false;
      eObj = { ...eObj, locationErrors: true };
      setLocationMsg('Please Enter Location')
    }
    else if (/^[a-z ]{3,}$/gi.test(location) == false) {
      valid = false;
      eObj = { ...eObj, locationErrors: true };
      setLocationMsg('Not a Proper Location')
    }
    else {

      eObj = { ...eObj, locationErrors: false };
    }

    if (jobCategory == '') {
      valid = false;
      eObj = { ...eObj, jobCategoryErrors: true };
    }
    else {
      eObj = { ...eObj, jobCategoryErrors: false };
    }

    if (subCategory == '') {
      valid = false;
      eObj = { ...eObj, subCategoryErrors: true };
    }
    else {
      eObj = { ...eObj, subCategoryErrors: false };
    }

    if (jobTitle == '') {
      valid = false;
      eObj = { ...eObj, jobTitleErrors: true };
      setJobTitleMsg('Please enter Job Title')
    } else {
      eObj = { ...eObj, jobTitleErrors: false };
    }

    if (jobType == "") {
      valid = false;
      eObj = { ...eObj, jobTypeErrors: true };
    }
    else {

      eObj = { ...eObj, jobTypeErrors: false };
    }

    if (vacancies == '') {
      valid = false;
      eObj = { ...eObj, vacanciesErrors: true };
      setVacanciesMsg('Please Enter Number Of Vacancies');
    } else {
      eObj = { ...eObj, vacanciesErrors: false };
    }

    if (creationDate == '') {
      valid = false;
      eObj = { ...eObj, creationDateErrors: true };

    }
    else {

      eObj = { ...eObj, creationDateErrors: false };
    }

    if (training === "") {
      valid = false;
      eObj = { ...eObj, trainingErrors: true };
      setTrainingMsg('Please Specify Training')
    } else {

      eObj = { ...eObj, trainingErrors: false };
    }

    if (company == '') {
      valid = false;
      eObj = { ...eObj, companyErrors: true };
      setCompanyMsg('Please Enter Company Name')
    } else {

      eObj = { ...eObj, companyErrors: false };
    }

    if (duration == '') {
      valid = false;
      eObj = { ...eObj, duration: true };
    }
    else {

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
      obj1 = { ...obj1, numberofvacancies: vacancies }
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
        closedate: closeDate,
        creationdate: creationDate,
        jobtype: jobType,
        location: location,
        employjobreference: empjobreference,
        numberofvacancies: vacancies,
        jobTitle: jobTitle,
        rateperhour: rateperhour,
        duration: duration,
        jobCategory: jobCategory,
        subCategory: subCategory,
        weeklyperhour: weeklyperhour,
        benifits: JSON.stringify(benifits),
        training: JSON.stringify(training),
        description: description,
        employerquestions: JSON.stringify(employerquestions),
        employer: company,
        companyId: userId,
        companyLogo: companyLogo
      }

      setMydata(data)


      //As the Job Should only be posted if the plans is selected

      http.post('/jobs/create', data)
        .then(response => {
          setMsg({
            show: true,
            class: "alert alert-success",
            text: "Jobs Posted Successfully"
          });
          localStorage.setItem('credits', response.data.credits || 0);
          localStorage.setItem('usedFreeCredit', "true");
          setTimeout(() => {
            navigate(`/company/JobList`)
          }, 1500);


        })
        .catch(err => {
          setMsg({
            show: true,
            class: "alert alert-danger",
            text: err.response.data.error || err.response.data.message || err.message
          });
        })
    }
    window.scrollTo({ top: 40, behavior: "smooth" })
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
      const selectedDate = event.target.value;
      setCreationDate(selectedDate);
      if (selectedDate && closeDate) {
        validateDates(selectedDate, closeDate);
      }

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
      const selectedDate = event.target.value;
      setCloseDate(selectedDate);
      if (selectedDate && creationDate) {
        validateDates(creationDate, selectedDate);
      }
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
  const validateDates = (creationDate, closeDate) => {
    if (new Date(creationDate) > new Date(closeDate)) {
      setError('From date must be before the to date');
    } else {
      setError('');
    }
  };

  const isFormValid = !error && creationDate && closeDate;

  function handleCheckboxes(name, value) {
    if (name === "jobtype") {
      let current = jobType;
      if (jobType.includes(value)) {
        current = current.replace(value, "")
      } else {
        current += " " + value
      }
      setJobType(current.trim())
    }
    if (name === "benefits") {
      if (value === "Accommodation") {
        setBenifits({ ...benifits, Accommodation: !benifits.Accommodation })
      }
      if (value === "Food") {
        setBenifits({ ...benifits, Food: !benifits.Food })
      }
      if (value === "Transport") {
        setBenifits({ ...benifits, Transport: !benifits.Transport })
      }
      if (value === "Others") {
        setBenifits({ ...benifits, Others: !benifits.Others })
      }
      console.log(benifits)

    }
    if (name === "training") {
      if (value === "Yes") {
        setTraining({ ...training, status: true })
      }
      if (value === "No") {
        setTraining({ status: false, text: "" })
      }
    }

  }

  return (
    <>

      <div className="container-scroller">

        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="container-fluid ">
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
                  {msg.show && <div className={msg.class}>
                    {msg.text}
                  </div>}
                  <div className="card-body bg-white p-5">
                    <h4 className="card-title">Post a Job </h4>
                    <form className="form-sample">

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-4 col-form-label" >Company <span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <input type="text" className="form-control" value={company} disabled />
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
                              <input type="text" className="form-control" value={creationDate.toLocaleDateString('en-GB')} disabled />
                              {errors.creationDateErrors && <span className='text-danger'>Please select date</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                          {error && <div style={{ color: 'red' }}>{error}</div>}
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Job Type<span className='text-danger'>*</span></label>
                            <div className="col-sm-3">

                              <div class="col-sm-5">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="FullTime" onChange={() => handleCheckboxes('jobtype', "FullTime")} checked={jobType.includes("FullTime")} /> FullTime
                                </div>
                              </div>

                              <div class="col-sm-5">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="Casual" onChange={() => handleCheckboxes('jobtype', "Casual")} checked={jobType.includes("Casual")} /> Casual
                                </div>
                              </div>

                              <div class="col-sm-5">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="Freelance" onChange={() => handleCheckboxes('jobtype', "Freelance")} checked={jobType.includes("Freelance")} /> Freelance
                                </div>
                              </div>

                            </div>

                            <div className="col-md-6">

                              <div class="col-sm-5 mx-3">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="PartTime" onChange={() => handleCheckboxes('jobtype', "PartTime")} checked={jobType.includes("PartTime")} /> PartTime
                                </div>
                              </div>

                              <div class="col-sm-5 mx-3">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="Contract" onChange={() => handleCheckboxes('jobtype', "Contract")} checked={jobType.includes("Contract")} /> Contract
                                </div>
                              </div>

                              <div class="col-sm-5 mx-3">
                                <div class="form-check">

                                  <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value="Temporary" onClick={() => handleCheckboxes('jobtype', "Temporary")} checked={jobType.includes("Temporary")} /> Temporary
                                </div>
                              </div>


                            </div>
                            {errors && errors.jobTypeErrors && <div className='mx-auto col-6 text-danger'>please select one</div>}
                          </div>
                        </div>

                      </div>
                      <div className='row'>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Location<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <select className="form-select border col-6 " value={location} onChange={(event) => handleInput('location', event)} >
                                <option></option>
                                {CitiesList.map((city, index) => {
                                  return <option key={index} value={city}>{city}</option>
                                })}
                              </select>
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
                                {/* <option className="fw-bold" value="Agriculture" > Agriculture and Farming</option>
                                  <option className="fw-bold" value="Hospitality">Hospitality and Tourism </option>
                                  <option className="fw-bold" value="Retail">Retail and Sales</option>
                                  <option className="fw-bold" value="Construction">Construction and Manual Labour</option>
                                  <option className="fw-bold" value="Office">Office/Administration</option>
                                  <option className="fw-bold" value="Healthcare">Healthcare</option>
                                  <option className="fw-bold" value="Technology" >Technology and IT</option>
                                  <option className="fw-bold" value="Teaching">Teaching and Education</option>
                                  <option className="fw-bold" value="Creative">Creative and Media</option>
                                  <option className="fw-bold" value="Retail">Retail and Sales</option> */}


                                {parent && parent.map((p, index) => <option className="fw-bold" value={p} >{p}</option>)}




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
                                <option className="fw-bold" value="1 Month">1 Month</option>
                                <option className="fw-bold" value="2 Months">2 Months</option>
                                <option className="fw-bold" value="3 Months">3 Months</option>
                                <option className="fw-bold" value="4 Months">4 Months</option>
                                <option className="fw-bold" value="5 Months">5 Months</option>
                                <option className="fw-bold" value="6 Months" >6 Months</option>
                                <option className="fw-bold" value="6+ Months">6+ Months</option>
                                <option className="fw-bold" value="Permanent">Permanent</option>
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
                                <option></option>
                                {/* {jobCategory === 'Agriculture' && (
                                    <>
                                      <option value="Fruit picking">Fruit picking</option>
                                      <option value="Crop harvesting">Crop harvesting</option>
                                      <option value="Dairy farming">Dairy farming</option>
                                      <option value="Livestock handling">Livestock handling</option>
                                    </>
                                  )}
                                  {jobCategory === 'Hospitality' && (
                                    <>
                                      <option value="Hotel work">Hotel work</option>
                                      <option value="Restaurant and cafe jobs"> Restaurant and cafe jobs</option>
                                      <option value="Tourism-related positions">Tourism-related positions</option>
                                      <option value="Resort and ski resort jobs"> Resort and ski resort jobs</option>
                                    </>
                                  )}
                                  {jobCategory === 'Retail' && (
                                    <>
                                      <option value="Retail assistant">Retail assistant</option>
                                      <option value="Sales positions"> Sales positions</option>

                                    </>
                                  )}
                                  {jobCategory === 'Construction' && (
                                    <>
                                      <option value="Construction work">Construction work</option>
                                      <option value="Painting"> Painting</option>
                                      <option value="Landscaping">Landscaping</option>

                                    </>
                                  )}
                                  {jobCategory === 'Office' && (
                                    <>
                                      <option value="Office support roles">Office support roles</option>
                                      <option value="Administrative positions"> Administrative positions</option>

                                    </>
                                  )}
                                  {jobCategory === 'Healthcare' && (
                                    <>
                                      <option value="Healthcare assistant">Healthcare assistant</option>
                                      <option value="Support roles in healthcare"> Support roles in healthcare</option>

                                    </>
                                  )}
                                  {jobCategory === 'Technology' && (
                                    <>
                                      <option value="IT support roles">IT support roles</option>
                                      <option value="Software development internships"> Software development internships</option>

                                    </>
                                  )}
                                  {jobCategory === 'Teaching' && (
                                    <>
                                      <option value="Teaching assistant roles">Teaching assistant roles</option>
                                      <option value="Language teaching positions">Language teaching positions</option>

                                    </>
                                  )}
                                  {jobCategory === 'Creative' && (
                                    <>
                                      <option value="Graphic design">Graphic design</option>
                                      <option value="Writing and content creation">Writing and content creation</option>

                                    </>
                                  )} */}

                                {categoriesList && categoriesList.map((category, index) => {
                                  if (category.parent_id === jobCategory) {
                                    return <option key={index} value={category.name}>{category.name}</option>
                                  }
                                })

                                }
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
                                  id="workinghoursRadio1" value="Accomdation" checked={benifits.Accommodation} onChange={() => handleCheckboxes('benefits', "Accommodation")} />Accommodation
                              </div>

                            </div>
                            <div className="col-2">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="Food" checked={benifits.Food} onChange={() => handleCheckboxes('benefits', "Food")} />Food
                              </div>

                            </div>
                            <div className="col-3">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="Transport" checked={benifits.Transport} onChange={() => handleCheckboxes('benefits', "Transport")} />Transport
                              </div>
                            </div>
                            <div className="col-4 ">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="" checked={benifits.Others} onChange={() => handleCheckboxes('benefits', "Others")} />Others
                                {benifits.Others && <input type='text' value={benifits.OthersText} onChange={(e) => setBenifits({ ...benifits, OthersText: e.target.value })} className='form-control col-5' />}

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

                              <input type="radio" className="form-check-input" name="workinghoursRadio"
                                id="workinghoursRadio1" value="No" onChange={() => handleCheckboxes('training', "No")} checked={!training.status} />No

                            </div>
                            <div className=" col-2 form-check mx-3">

                              <input type="radio" className="form-check-input" name="workinghoursRadio"
                                id="workinghoursRadio1" value="Yes" onChange={() => { handleCheckboxes('training', "Yes") }} checked={training.status} />Yes


                            </div>
                            <div className='col-6'>

                              {training.status && <input type='text' value={training.text} onChange={(e) => setTraining({ ...training, text: e.target.value })} className='form-control col-5' />}

                            </div>

                          </div>
                        </div>
                      </div>
                      <div className='row'>

                        <div className="form-group row">
                          <div class="mb-3">
                            <label for="description" class="form-label">Description<span className='text-danger'>*</span></label>
                            <div className='border rounded'><MdxEditor value={description} setValue={setDescription} /></div>

                            {errors.descriptionErrors && <span className='text-danger'>{descriptionMsg}</span>}
                          </div>
                        </div>

                      </div>


                      <div className="col-md-12">
                        <div className="form-group row">

                          <label className="col-sm-3 col-form-label ">Employer questions</label>

                          <div>
                            {employerquestions.map((question, index) => (
                              <div className=" mt-3 row" key={index}>
                                <div className='col-10'>
                                  <input className="form-control" value={question.value} onChange={(event) => handleQuestionsInput(index, event)} type="text" placeholder="Questions" />
                                </div>
                                {index === 0 && <button className=' btn bg-secondary col-1' type="button" onClick={handleAddFields}>+</button>}
                                {index !== 0 && <button className=' btn bg-secondary col-1' type="button" onClick={() => handleRemoveFields(index)}>-</button>}

                              </div>
                            ))}
                          </div>



                        </div>

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