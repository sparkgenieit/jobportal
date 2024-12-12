import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CitiesList } from '../../../helpers/constants';
import MdxEditor from '../../../components/MdxEditor';
import { editJob, fetchCategories, fetchCompanyInfo, fetchJobForEditing, postJob } from './postAndEditJob.service';
import { getCloseDate } from '../../../helpers/functions';
import { fetchUser } from '../../../helpers/slices/userSlice';
import { BsInfoCircle } from 'react-icons/bs';
import MessagePopup from './MessagePopup';
import { salaryPerAnnum } from '../../../helpers/functions/textFunctions';
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser';
import useShowMessage from '../../../helpers/Hooks/useShowMessage';
import { setCurrentJob } from '../../../helpers/slices/generalSlice';

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
  weeklyperhour: "",
  benifits: "",
  salary_type: "per hour"
}

function Postajob({ name }) {
  const currentJob = useSelector((state) => state.general.currentJob)
  const [jobData, setJobData] = useState(initialValues)
  const [error, setError] = useState({});
  // const [employerquestions, setEmployerQuestions] = useState([{ value: "" }])
  const [categoriesList, setCategoriesList] = useState([]);
  const [parent, setParent] = useState([]);
  const [showModal, setShowModal] = useState({ show: false })
  const [showOthersBenefits, setShowOthersBenefits] = useState(false)


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

  // const handleQuestionsInput = (index, event) => {
  //   const values = [...employerquestions];
  //   values[index].value = event.target.value;
  //   setEmployerQuestions(values);
  // };

  // const handleAddFields = () => {
  //   setEmployerQuestions([...employerquestions, { value: '' }]);
  // }

  // const handleRemoveFields = (index) => {
  //   const values = [...employerquestions];
  //   values.splice(index, 1);
  //   setEmployerQuestions(values);
  // };

  useEffect(() => {
    fetchCategories(setCategoriesList, setParent)
  }, [])

  useEffect(() => {
    document.title = name
    setError({})
    // If it is a regular post a job
    if (name === "Post a Job" && !cloneJobId) {
      fetchCompanyInfo(company_id, setJobData, initialValues)
    }

    // When the request is to clone an existing job
    if (name === 'Post a Job' && cloneJobId && cloneJobId === currentJob._id) {
      setJobData({ ...currentJob, creationdate: new Date(), closedate: getCloseDate(new Date().toString()) })
      if (currentJob.other_benefits) setShowOthersBenefits(true)
    }

    // If it is to edit a job
    if (name === "Edit Job") {
      fetchJobForEditing(params.id, setJobData, searchParams.get("repost") === "true" ? true : false)
        .then(data => {
          if (data.other_benefits) setShowOthersBenefits(true)
        })
    }
  }, [name])


  const handleForm = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value })
    setError({ ...error, [e.target.name]: e.target.value?.trim() === "" ? "This field is required" : "" })
  }

  const invalidInput = (name) => {
    formRef.current.querySelector(`[name="${name}"]`).scrollIntoView({ behaviour: 'smooth', block: 'center' })
  }

  const handleClone = () => {
    dispatch(setCurrentJob({ ...jobData }))
    message({ path: `/company/postajob?c=${jobData._id}` })
    window.scrollTo({ top: 20, behavior: "smooth" })
  }

  const handleBenefits = (e) => {
    let { benifits } = jobData
    const value = e.target.value

    if (benifits?.includes(value)) {
      benifits = benifits.replace(value, "").trim()
    } else {
      benifits = benifits + " " + value
    }
    setJobData({ ...jobData, benifits: benifits })
  }

  const discardForm = async () => {
    window.history.replaceState(null, null, '/company/postajob')
    await fetchCompanyInfo(company_id, setJobData, initialValues)
    window.scrollTo({ top: 20, behavior: "smooth" })
    setShowOthersBenefits(false)
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
      let { company, closedate, creationdate, training, benifits, other_benefits, jobtype, location, employjobreference, numberofvacancies, jobTitle, rateperhour, duration, jobCategory, subCategory, weeklyperhour, description, companyLogo, salary_type } = jobData


      let data = {
        company, closedate, creationdate, jobtype, location, employjobreference, numberofvacancies, jobTitle, rateperhour, duration, jobCategory, subCategory, weeklyperhour, description, companyLogo,
        benifits,
        training,
        salary_type,
        other_benefits,
        employer: localStorage.getItem("fullname"),
        companyId: company_id,
        posted_by: user._id
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



  return (
    <>
      <div className="container-fluid">
        <div className="content-wrapper bg-white">
          <h3 className="fs-4 fw-bold text-center"> {name} </h3>
          <div className="row">
            <div className=" bg-white">
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
                    <div className='d-flex gap-1'>
                      Salary
                      <span role='button' onClick={() => setShowModal({ show: true })}>
                        <BsInfoCircle />
                      </span>
                    </div>
                    <div className='border border-secondary mb-3 px-3 py-1 rounded-2'>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Amount</label>
                        <div className="col-sm-8">
                          <input type="number" className="form-control" name='rateperhour' value={jobData?.rateperhour} onChange={handleForm} />
                        </div>
                      </div>

                      <div className="d-flex align-items-center row">
                        <label className="col-sm-3 small align-self-start  ">Show in jobs page</label>
                        <div className="col-sm-8 d-flex flex-wrap small gap-1  ">
                          <div className='d-flex flex-column align-items-center'>
                            <div className='d-flex gap-1 align-items-center'>
                              <input type="radio" className="form-check-input m-0" id='per hour' name='salary' checked={jobData?.salary_type === "per hour"} onChange={() => { setJobData({ ...jobData, salary_type: "per hour" }) }} />
                              <label className='m-0' htmlFor='per hour'>
                                Rate per hour
                              </label>
                            </div>
                            <p>{jobData?.rateperhour && "$" + jobData.rateperhour}</p>
                          </div>
                          <div className='d-flex flex-column  align-items-center'>
                            <div className='d-flex gap-1 align-items-center'>
                              <input type="radio" className="form-check-input m-0 " id='per annum' name='salary' checked={jobData?.salary_type === "per annum"} onChange={() => { { setJobData({ ...jobData, salary_type: "per annum" }) } }} />
                              <label className='m-0' htmlFor="per annum">
                                Salary per annum
                              </label>
                            </div>
                            <p>{jobData?.rateperhour && '$' + salaryPerAnnum(jobData?.rateperhour)}</p>
                          </div>
                          <div className='d-flex gap-1 align-items-start'>
                            <input type="radio" id='negotiable' className="form-check-input mt-1" name='salary' checked={jobData?.salary_type === "negotiable"} onChange={() => { setJobData({ ...jobData, salary_type: "negotiable" }) }} />
                            <label className='m-0' htmlFor="negotiable">
                              Negotiable
                            </label>
                          </div>
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
                <div className=" form-group">

                  <label className="">Benefits</label>

                  <div className="row">
                    <div className="col-md-3  col-12">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" value="Accommodation" checked={jobData?.benifits?.includes("Accommodation")} onChange={handleBenefits} />
                        Accommodation
                      </div>
                    </div>
                    <div className="col-md-2  col-12" >
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" value="Food" checked={jobData?.benifits?.includes("Food")} onChange={handleBenefits} />
                        Food
                      </div>
                    </div>
                    <div className="col-md-3  col-12">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" value="Transport" checked={jobData?.benifits?.includes("Transport")} onChange={handleBenefits} />
                        Transport
                      </div>
                    </div>
                    <div className="col-md-4  col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={showOthersBenefits}
                          onChange={() => {
                            setJobData({ ...jobData, other_benefits: "" })
                            setShowOthersBenefits(!showOthersBenefits)
                          }} />
                        Others
                        {showOthersBenefits &&
                          <input type='text' name='other_benefits' value={jobData.other_benefits} onChange={handleForm} className='form-control col-5' />}
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
                        <input type="radio" name='training' className="form-check-input" value="No" onChange={handleForm} checked={jobData.training === "No"} />No
                      </div>
                      <div className=" col-2 form-check mx-3">
                        <input type="radio" name='training' className="form-check-input" value="Yes" onChange={handleForm} checked={jobData.training === "Yes"} />Yes
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 w-100">
                  <label htmlFor="description" className="form-label">Description<span className='text-danger'>*</span></label>
                  <MdxEditor value={jobData.description} setValue={handleDescription} />
                  <span className='text-danger small'>{error.description && error.description}</span>
                </div>

                {/* <div className="col-md-12">
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
                  </div> */}

                <div className='d-flex justify-content-between  gap-2 flex-column flex-sm-row'>
                  <div>
                    {name === "Post a Job" && cloneJobId &&
                      <button
                        type='button'
                        className='btn btn-primary w-100'
                        onClick={discardForm}
                      >
                        Discard
                      </button>
                    }
                    {name === "Edit Job" &&
                      <button
                        type='button'
                        className='btn btn-primary w-100'
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
              </form>
            </div>
          </div>
        </div >
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