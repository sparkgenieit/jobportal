import { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { CitiesList } from '../../../helpers/constants';
import MdxEditor from '../../../components/MdxEditor';
import { editJob, fetchCategories, fetchCompanyInfo, fetchJobForEditing, postJob } from './postAndEditJob.service';
import { getCloseDate } from '../../../helpers/functions';
import { GeneralContext } from '../../../helpers/Context';
import { fetchUser } from '../../../helpers/slices/userSlice';
import { useDispatch } from 'react-redux';
import { BsInfoCircle } from 'react-icons/bs';
import MessagePopup from './MessagePopup';
import { salaryPerAnnum } from '../../../helpers/functions/textFunctions';
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser';
import useShowMessage from '../../../helpers/Hooks/useShowMessage';

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
  const [employerquestions, setEmployerQuestions] = useState([{ value: "" }])
  const [categoriesList, setCategoriesList] = useState([]);
  const [parent, setParent] = useState([]);
  const [showModal, setShowModal] = useState({ show: false })
  const [amountType, setAmountType] = useState("perhour")
  const [training, setTraining] = useState("");
  const [benefits, setBenefits] = useState({
    Accommodation: false,
    Food: false,
    Transport: false,
    Others: false,
    OthersText: ""
  })

  const { currentJob, setCurrentJob } = useContext(GeneralContext)

  const formRef = useRef(null)

  const params = useParams()
  const [searchParams] = useSearchParams()

  const dispatch = useDispatch()

  const user = useCurrentUser()
  const message = useShowMessage()
  const company_id = user.role === "employer" ? user._id : user.companyId._id

  const cloneJobId = searchParams.get("c")


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
      fetchCompanyInfo(company_id, setJobData, setBenefits, setTraining, setEmployerQuestions, initialValues)
    }

    // When the request is to clone an existing job
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
    setError({ ...error, [e.target.name]: e.target.value?.trim() === "" ? `Please enter ${e.target.name}` : "" })
  }

  const invalidInput = (name) => {
    formRef.current.querySelector(`[name="${name}"]`).scrollIntoView({ behaviour: 'smooth', block: 'center' })
  }

  const handleClone = () => {
    setCurrentJob({ ...jobData })
    message({ path: `/company/postajob?c=${jobData._id}` })
    window.scrollTo({ top: 20, behavior: "smooth" })
  }

  const discardForm = async () => {
    window.history.replaceState(null, null, '/company/postajob')
    await fetchCompanyInfo(company_id, setJobData, setBenefits, setTraining, setEmployerQuestions, initialValues)
    window.scrollTo({ top: 20, behavior: "smooth" })
  }


  const submitJob = async () => {

    let isFormValid = true;

    let requiredFields = ["company", "jobtype", "location", "numberofvacancies", "jobTitle", "jobCategory", "subCategory", "duration"]

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
    for (const fieldName of requiredFields) {
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
      setError({})
      let { company, closedate, creationdate, jobtype, location, employjobreference, numberofvacancies, jobTitle, rateperhour, duration, jobCategory, subCategory, weeklyperhour, description, companyLogo } = jobData

      rateperhour = amountType === "peranuum" ? Math.round(+rateperhour / 2080) : +rateperhour

      let data = {
        company, closedate, creationdate, jobtype, location, employjobreference, numberofvacancies, jobTitle, rateperhour, duration, jobCategory, subCategory, weeklyperhour, description, companyLogo,
        benifits: JSON.stringify(benefits),
        training,
        employerquestions: JSON.stringify(employerquestions),
        employer: localStorage.getItem("fullname"),
        companyId: company_id,
      }
      if (name === "Post a Job") {
        await postJob(data, message)
      }

      if (name === "Edit Job") {
        await editJob(jobData._id, data, message)
      }

      dispatch(fetchUser()) //To Update Credits

      setTimeout(() => {
        message({
          path: `/company/jobs`
        })
      }, 1500);

      window.scrollTo({ top: 40, behavior: "smooth" })
    }
  }

  function handleCheckboxes(name, value) {
    if (name === "benefits") {
      setBenefits({ ...benefits, [value]: !benefits[value] })
    }

    if (name === "training") {
      setTraining(value)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="content-wrapper bg-white">
          <div className="page-header">
            <h3 className="page-title"> {name} </h3>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card-body bg-white">
                <form ref={formRef}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-nowrap" >Company Name <span className='text-danger'>*</span></label>
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
                            <option value={"Full time"}>Full time</option>
                            <option value={"Part time"}>Part time</option>
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

                  <div className='row'>
                    <div className='col-md-6'></div>
                    <div className='col-md-6 d-flex gap-1'>
                      Salary
                      <span role='button' onClick={() => setShowModal({ show: true })}>
                        <BsInfoCircle />
                      </span>
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
                        <label className="col-sm-3 col-form-label">Amount</label>
                        <div className="col-sm-8">
                          <input type="number" className="form-control" name='rateperhour' value={jobData?.rateperhour} onChange={handleForm} disabled={amountType === "negotiable"} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label"></label>
                        <div className="col-sm-8 d-flex small gap-1 ">
                          <div className='d-flex flex-column align-items-center'>
                            <div className='d-flex gap-1'>
                              <input type="radio" className="form-check-input m-0" id='perhour' name='salary' checked={amountType === "perhour"} onChange={() => { setAmountType("perhour") }} />
                              <label className='m-0' htmlFor='perhour'>
                                Rate per hour
                              </label>
                            </div>
                            <p>{jobData?.rateperhour && (amountType === 'perhour' ? `$${jobData.rateperhour}` : "$" + (jobData.rateperhour / 2080).toFixed(2))}</p>
                          </div>
                          <div className='d-flex flex-column  align-items-center'>
                            <div className='d-flex gap-1'>
                              <input type="radio" className="form-check-input m-0 " id='perannum' name='salary' checked={amountType === "perannum"} onChange={() => { setAmountType("perannum") }} />
                              <label className='m-0' htmlFor="perannum">
                                Salary per annum
                              </label>
                            </div>
                            <p>{jobData?.rateperhour && (amountType === "perhour" ? `$${salaryPerAnnum(jobData?.rateperhour)}` : "$" + jobData.rateperhour)}</p>
                          </div>
                          <div className='d-flex gap-1'>
                            <input type="radio" id='negotiable' className="form-check-input m-0" name='salary' checked={amountType === "negotiable"} onChange={() => { setAmountType("negotiable"); setJobData({ ...jobData, rateperhour: "" }) }} />
                            <label className='m-0' htmlFor="negotiable">
                              Negotiable
                            </label>
                          </div>
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
                            {parent && parent.map((p, index) => <option key={index} className="fw-bold" value={p} >{p}</option>)}
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
                          <label className="col-sm-3 col-form-label">Training Provided?<span className='text-danger'>*</span></label>
                        </div>
                        <div className=" col-2 form-check mx-3">
                          <input type="radio" name='training' className="form-check-input" value="No" onChange={() => handleCheckboxes('training', "No")} checked={training === "No"} />No
                        </div>
                        <div className=" col-2 form-check mx-3">
                          <input type="radio" name='training' className="form-check-input" value="Yes" onChange={() => { handleCheckboxes('training', "Yes") }} checked={training === "Yes"} />Yes
                        </div>
                        <span className='text-danger small'>{error.training && error.training}</span>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="form-group row">
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description<span className='text-danger'>*</span></label>
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
                  <div className="form-group">
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

      <MessagePopup modal={showModal} setModal={setShowModal}>
        <div className='small'>
          <p className='fw-bold'>Job Advertisement will be shown where the salary search is up to the "Amount" entered:</p>

          <ul>
            <li>If rate per hour is selected, the annual salary is calculated as the hourly rate multiplied by 2080.</li>
            <li>  If salary per annum is selected, the rate per hour is calculated as the annual salary divided by 2080.</li>
            <li>  If Negotiable is selected, the salary will not be displayed, but the job advertisement will still appear in search results.</li>
          </ul>

          <p className='text-danger fw-bold'>  If required, please mention the exact salary in the job description. On the advertisement cards, it will be displayed as an "approximate salary".</p>


        </div>
      </MessagePopup>
    </>
  )
}
export default Postajob;