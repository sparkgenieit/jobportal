import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CitiesList } from '../../../helpers/constants';
import MdxEditor from '../../../components/MdxEditor';
import Toaster from '../../../components/Toaster';
import { editJob, fetchCategories, fetchCompanyInfo, fetchJobForEditing, postJob } from './postAndEditJob.service';
import { getCloseDate, getCredits } from '../../../helpers/functions';
import { GeneralContext } from '../../../helpers/Context';

const initialValues = {
  company: "",
  jobtype: "",
  jobTitle: "",
  closedate: getCloseDate(new Date().toString()),
  jobCategory: "",
  subCategory: "",
  numberofvacancies: "",
  location: "",
  description: "",
  duration: "",
  creationdate: new Date(),
  employjobreference: "",
  rateperhour: "",
  weeklyperhour: ""
}

function Postajob({ name }) {
  const [jobData, setJobData] = useState(initialValues)
  const [error, setError] = useState({});
  const user_id = localStorage.getItem('user_id')
  const [employerquestions, setEmployerQuestions] = useState([{ value: "" }])
  const [categoriesList, setCategoriesList] = useState();
  const [parent, setParent] = useState();
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();
  const formRef = useRef(null)
  const params = useParams()
  const [searchParams] = useSearchParams()
  const { currentJob, setCurrentJob, isSidebarOpen } = useContext(GeneralContext)
  const cloneJobId = searchParams.get("c")

  const [training, setTraining] = useState({
    status: false,
    text: ""
  });

  const [benefits, setBenefits] = useState({
    Accommodation: false,
    Food: false,
    Transport: false,
    Others: false,
    OthersText: ""
  })

  const handleDescription = (value) => {
    setJobData({ ...jobData, description: value })
    setError({ ...error, description: value?.trim() === "" ? 'Please enter description' : "" })
  }

  const handleQuestionsInput = (index, event) => {
    const values = [...employerquestions];
    values[index].value = event.target.value;
    setEmployerQuestions(values);
  };

  const handleAddFields = () => {
    setEmployerQuestions([...employerquestions, { value: '' }]);
  }


  const handleRemoveFields = (index) => {
    const values = [...employerquestions];
    values.splice(index, 1);
    setEmployerQuestions(values);
  };

  useEffect(() => {
    fetchCategories(setCategoriesList, setParent)
  }, [])

  useEffect(() => {

    setError({})
    // If it is a regular post a job
    if (name === "Post a Job" && !cloneJobId) {
      fetchCompanyInfo(user_id, setJobData, setBenefits, setTraining, setEmployerQuestions, initialValues)
    }

    // When the request is to clone a existing job
    if (name === 'Post a Job' && cloneJobId && cloneJobId === currentJob._id) {
      setJobData({ ...currentJob, creationdate: new Date(), closedate: getCloseDate(new Date().toString()) })
    }

    // If it is to edit a job
    if (name === "Edit Job") {
      fetchJobForEditing(params.id, setJobData, setBenefits, setTraining, setEmployerQuestions, searchParams.get("repost") === "true" ? true : false)
    }

  }, [name])


  const handleForm = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value })
    setError({ ...error, [e.target.name]: e.target.value?.trim() === "" ? `Please enter ${e.target.name}` : null })
  }

  const invalidInput = (name) => {
    formRef.current.querySelector(`[name="${name}"]`).scrollIntoView({ behaviour: 'smooth', block: 'center' })
  }

  const handleClone = () => {
    setCurrentJob({ ...jobData })
    navigate(`/company/postajob?c=${jobData._id}`)
    window.scrollTo({ top: 20, behavior: "smooth" })
  }

  const discardForm = async () => {
    window.history.replaceState(null, null, '/company/postajob')
    await fetchCompanyInfo(user_id, setJobData, setBenefits, setTraining, setEmployerQuestions, initialValues)
    window.scrollTo({ top: 20, behavior: "smooth" })
  }


  const submitJob = async () => {

    let isFormValid = true;

    let theFieldToBeValidated = ["company", "jobtype", "location", "numberofvacancies", "jobTitle", "jobCategory", "subCategory", "duration"]

    // validating the close date
    if (jobData.closedate) {
      if (jobData.creationdate.toISOString() > jobData.closedate) {
        setError({ ...error, closedate: "close date cannot be before creation date" })
        isFormValid = false
        invalidInput('closedate')
        return
      }

      if (jobData.creationdate.toISOString() < jobData.closedate && getCloseDate(jobData.creationdate) < jobData.closedate) {
        setError({ ...error, closedate: "close date cannot be more than one month from the creation date" })
        isFormValid = false
        invalidInput('closedate')
        return
      }
    }

    // Validating the text fields
    for (const fieldName of theFieldToBeValidated) {
      if (!jobData[fieldName] || jobData[fieldName]?.toString().trim() === "") {
        setError({ ...error, [fieldName]: `Please enter ${fieldName}` })
        isFormValid = false
        invalidInput(fieldName)
        break;
      }
    }

    if (!isFormValid) return

    // validating the description field
    if (!jobData.description || jobData?.description?.trim() === "") {
      setError({ ...error, description: 'Please enter descripton' })
      isFormValid = false
      return
    }

    if (isFormValid) {
      const { company, closedate, creationdate, jobtype, location, employjobreference, numberofvacancies, jobTitle, rateperhour, duration, jobCategory, subCategory, weeklyperhour, description, companyLogo } = jobData

      let data = {
        company, closedate, creationdate, jobtype, location, employjobreference, numberofvacancies, jobTitle, rateperhour, duration, jobCategory, subCategory, weeklyperhour, description, companyLogo,
        benifits: JSON.stringify(benefits),
        training: JSON.stringify(training),
        employerquestions: JSON.stringify(employerquestions),
        employer: company,
        companyId: user_id,
      }
      if (name === "Post a Job") {
        await postJob(data, setMsg)
      }

      if (name === "Edit Job") {
        await editJob(jobData._id, data, setMsg)
      }
      await getCredits() //To Update Credits
      localStorage.setItem("usedFreeCredit", "true")

      setTimeout(() => {
        navigate(`/company/jobs`)
      }, 1500);

      window.scrollTo({ top: 40, behavior: "smooth" })
    }
  }

  function handleCheckboxes(name, value) {
    if (name === "benefits") {
      setBenefits({ ...benefits, [value]: !benefits[value] })
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
      <div className="container-fluid">
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title"> {name} </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Employer</a></li>
                <li className="breadcrumb-item active" aria-current="page">{name}</li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-12">
              <Toaster setMessage={setMsg} message={msg} />
              <div className="card-body bg-white p-5">
                <h4 className="card-title">{name} </h4>
                <form ref={formRef}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label" >Company Name <span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" name='company' value={jobData?.company} disabled />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Close Date</label>
                        <div className="col-sm-8">
                          <input type="date" className="form-control" name='closedate' onChange={handleForm} value={jobData?.closedate} />
                          <span className='text-danger small'>{error.closedate && error.closedate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Creation Date<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" name='creationdate' value={jobData?.creationdate?.toLocaleDateString('en-GB')} disabled />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Job Type<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <select className='form-select' name='jobtype' value={jobData.jobtype} onChange={handleForm}>
                            <option value={" "}></option>
                            <option value={"FullTime"}>FullTime</option>
                            <option value={"PartTime"}>PartTime</option>
                            <option value={"Freelance"}>Freelance</option>
                            <option value={"Casual"}>Casual</option>
                            <option value={"Contract"}>Contract</option>
                            <option value={"Temporary"}>Temporary</option>
                          </select>
                        </div>
                        <span className='text-danger small'>{error.jobtype && error.jobtype}</span>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Location<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <select className="form-select border col-6 " name='location' value={jobData?.location} onChange={handleForm} >
                            <option value={" "}></option>
                            {CitiesList.map((city, index) => {
                              return <option key={index} value={city}>{city}</option>
                            })}
                          </select>
                          <span className='text-danger small'>{error.location && error.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Emp job reference</label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" name='employjobreference' value={jobData?.employjobreference} onChange={handleForm} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Number of vacancies<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <input type="number" className="form-control" name='numberofvacancies' value={jobData?.numberofvacancies} onChange={handleForm} />
                        </div>
                        <span className='text-danger small'>{error.numberofvacancies && error.numberofvacancies}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label"> JobTitle<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" name='jobTitle' value={jobData?.jobTitle} onChange={handleForm} />
                        </div>
                        <span className='text-danger small'>{error.jobTitle && error.jobTitle}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">RatePerHour</label>
                        <div className="col-sm-8">
                          <input type="number" className="form-control" name='rateperhour' value={jobData?.rateperhour} onChange={handleForm} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">JobCategory<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <select name='jobCategory' value={jobData?.jobCategory} onChange={handleForm} className="form-select border col-6 " >
                            <option value={" "}></option>
                            {parent && parent.map((p, index) => <option className="fw-bold" value={p} >{p}</option>)}
                          </select>
                        </div>
                        <span className='text-danger small'>{error.jobCategory && error.jobCategory}</span>

                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Duration<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <select className="form-select border col-6" name='duration' value={jobData?.duration} onChange={handleForm} >
                            <option value={" "}></option>
                            <option className="fw-bold" value="1 Month">1 Month</option>
                            <option className="fw-bold" value="2 Months">2 Months</option>
                            <option className="fw-bold" value="3 Months">3 Months</option>
                            <option className="fw-bold" value="4 Months">4 Months</option>
                            <option className="fw-bold" value="5 Months">5 Months</option>
                            <option className="fw-bold" value="6 Months" >6 Months</option>
                            <option className="fw-bold" value="6+ Months">6+ Months</option>
                            <option className="fw-bold" value="Permanent">Permanent</option>
                          </select>
                        </div>
                        <span className='text-danger small'>{error.duration && error.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Sub-category<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <select className="form-select border" name='subCategory' value={jobData?.subCategory} onChange={handleForm}>
                            <option value={" "}></option>
                            {categoriesList && categoriesList.map((category, index) => {
                              if (category.parent_id === jobData.jobCategory) {
                                return <option key={index} value={category.name}>{category.name}</option>
                              }
                            })
                            }
                          </select>
                          <span className='text-danger small'>{error.subCategory && error.subCategory}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Weekly work hours</label>
                        <div className="col-sm-8">
                          <input type="number" className="form-control" name="weeklyperhour" value={jobData?.weeklyperhour} onChange={handleForm} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="form-group row">
                      <div>
                        <label className="col-sm-1 col-form-label">Benefits</label>
                      </div>
                      <div className=" row ">
                        <div className="col-3">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" value="Accomdation" checked={benefits.Accommodation} onChange={() => handleCheckboxes('benefits', "Accommodation")} />
                            Accommodation
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" value="Food" checked={benefits.Food} onChange={() => handleCheckboxes('benefits', "Food")} />
                            Food
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" value="Transport" checked={benefits.Transport} onChange={() => handleCheckboxes('benefits', "Transport")} />
                            Transport
                          </div>
                        </div>
                        <div className="col-4 ">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" value="" checked={benefits.Others} onChange={() => handleCheckboxes('benefits', "Others")} />
                            Others
                            {benefits.Others && <input type='text' value={benefits.OthersText} onChange={(e) => setBenefits({ ...benefits, OthersText: e.target.value })} className='form-control col-5' />}
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
                          <input type="radio" className="form-check-input" value="No" onChange={() => handleCheckboxes('training', "No")} checked={!training.status} />No
                        </div>
                        <div className=" col-2 form-check mx-3">
                          <input type="radio" className="form-check-input" value="Yes" onChange={() => { handleCheckboxes('training', "Yes") }} checked={training.status} />Yes
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
                        <MdxEditor value={jobData.description} setValue={handleDescription} />
                        <span className='text-danger small'>{error.description && error.description}</span>
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
                    <div className='d-flex justify-content-between py-2 px-5'>
                      <div>
                        {name === "Post a Job" && cloneJobId &&
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={discardForm}
                          >
                            Discard
                          </button>
                        }
                        {name === "Edit Job" &&
                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={handleClone}
                          >
                            Duplicate Job
                          </button>
                        }
                      </div>
                      <button className="btn btn-primary" type="button" onClick={submitJob}>
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default Postajob;