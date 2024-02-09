import Header from '../../../layouts/company/Header';
import Footer from '../../../layouts/company/Footer';
import Sidebar from '../../../layouts/company/Sidebar';
import { useState } from 'react';


function Postajob() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobType, setJobType] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [training, setTraining] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');





  const [jobTitleMsg, setJobTitleMsg] = useState('Please enter Job Title');
  const [createdMsg, setCreatedMsg] = useState('Please enter Created date');
  const [locationMsg, setLocationMsg] = useState('Please enter Location');
  const [descriptionMsg, setDescriptionMsg] = useState('Please Enter Description');
  const [vacanciesMsg, setVacanciesMsg] = useState('Please Enter Number Of Vacancies');
  const [companyMsg, setCompanyMsg] = useState('Please Enter Company Name');
  const [trainingMsg, setTrainingMsg] = useState('Please Specify Training');



  const [subdropdown, setSubDropDown] = useState(false);
  const [hospitality, setHospitality] = useState(false);
  const [retail, setRetail] = useState(false);
  const [construction, setConstruction] = useState(false);
  const [office, setOffice] = useState(false);
  const [healthcare, setHealthCare] = useState(false);
  const [technology, setTechnology] = useState(false);
  const [teaching, setTeaching] = useState(false);
  const [creative, setCreative] = useState(false);


  const dropdownclick = () => {
    setSubDropDown(true)
  }











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


  const companyButton = () => {
    let eObj = {};
    if (description == '') {
      eObj = { ...eObj, descriptionErrors: true };
      setDescriptionMsg('Please Enter Description');

    } else if (/^\w{2,}$/gi.test(description) == false) {
      eObj = { ...eObj, descriptionErrors: true };
      setDescriptionMsg('Not Proper Description');

    }
    else {
      eObj = { ...eObj, descriptionErrors: false };


    }
    if (location == '') {
      eObj = { ...eObj, locationErrors: true };
      setLocationMsg('Please Enter Location')
    }
    else if (/^[a-z]{3,}$/gi.test(location) == false) {
      eObj = { ...eObj, locationErrors: true };
      setLocationMsg('Not a Proper Location')

    }
    else {
      eObj = { ...eObj, locationErrors: false };


    }
    if (jobCategory == '') {
      eObj = { ...eObj, jobCategoryErrors: true };
    }
    else {
      eObj = { ...eObj, jobCategoryErrors: false };


    }
    if (subCategory == '') {
      eObj = { ...eObj, subCategoryErrors: true };
    }
    else {
      eObj = { ...eObj, subCategoryErrors: false };


    }
    if (jobTitle == '') {
      eObj = { ...eObj, jobTitleErrors: true };
      setJobTitleMsg('Please enter Job Title')
    } else if (/^[a-z]{3,}$/gi.test(jobTitle) == false) {
      eObj = { ...eObj, jobTitleErrors: true };
      setJobTitleMsg('Invalid Job Title')
    }
    else {
      eObj = { ...eObj, jobTitleErrors: false };


    }

    if (jobType == '') {
      eObj = { ...eObj, jobTypeErrors: true };
    }
    else {
      eObj = { ...eObj, jobTypeErrors: false };


    }
    if (vacancies == '') {
      eObj = { ...eObj, vacanciesErrors: true };
      setVacanciesMsg('Please Enter Number Of Vacancies');
    } else if (/^[0-9]{1,}$/gi.test(vacancies) == false) {
      eObj = { ...eObj, vacanciesErrors: true };
      setVacanciesMsg('Input is Not a Number')

    }
    else {
      eObj = { ...eObj, vacanciesErrors: false };


    }
    if (creationDate == '') {
      eObj = { ...eObj, creationDateErrors: true };

    }
    else {
      eObj = { ...eObj, creationDateErrors: false };


    }

    if (training == '') {
      eObj = { ...eObj, trainingErrors: true };
      setTrainingMsg('Please Specify Training')
    }
    else if (/^\w{3,}$/gi.test(training) == false) {
      eObj = { ...eObj, trainingErrors: true };
      setCompanyMsg('Not a Proper Input')
    }
    else {
      eObj = { ...eObj, trainingErrors: false };


    }
    if (company == '') {
      eObj = { ...eObj, companyErrors: true };
      setCompanyMsg('Please Enter Company Name')
    }
    else if (/^[a-z]{3,}$/gi.test(company) == false) {
      eObj = { ...eObj, companyErrors: true };
      setCompanyMsg('Not a Proper Company Name')
    }
    else {
      eObj = { ...eObj, companyErrors: false };


    }
    if (duration == '') {
      eObj = { ...eObj, duration: true };
    }
    else {
      eObj = { ...eObj, duration: false };
    }


    setErrors(eObj);
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
      if (event.target.value == '') {
        setErrors({ ...errors, jobCategoryErrors: true })

      }
      else {
        setErrors({ ...errors, jobCategoryErrors: false })
      }

    }
    if (name == 'subcategory') {
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
                              <input type="date" className="form-control" />

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

                            <div className="col-sm-4">
                              <div className="form-check">
                                <div class="col-sm-5">
                                  <div class="form-check">

                                    <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> PartTime
                                  </div>
                                </div>

                                <div class="col-sm-5">
                                  <div class="form-check">

                                    <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onChange={(event) => handleInput('jobtype', event)} /> Contract
                                  </div>
                                </div>

                                <div class="col-sm-5">
                                  <div class="form-check">

                                    <input type="checkbox" class="form-check-input" name="jobtypeCheckbox" id="jobtypeCheckbox2" value={jobType} onClick={(event) => handleInput('jobtype', event)} /> Temporary
                                  </div>
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
                              <input type="text" className="form-control" id="press6" />
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
                              <input type="text" className="form-control" />

                            </div>
                          </div>
                        </div>


                      </div>


                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">JobCategory<span className='text-danger'>*</span></label>
                            <div className="col-sm-8">
                              <select value={jobCategory} onChange={(event) => handleInput('jobcategory', event)} className="form-control col-6 " >
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
                              <select className="form-control  col-6 " value={duration} onChange={(event) => handleInput('duration', event)} >
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
                              <select className="form-control col-6" value={subCategory} onChange={(event) => handleInput('subcategory', event)} >
                                {subdropdown && <option>Fruit picking</option>}
                                {subdropdown && <option>Crop harvesting</option>}
                                {subdropdown && <option>Dairy farming</option>}
                                {subdropdown && <option>Livestock handling</option>}

                                {hospitality && <option>Hotel work</option>}
                                {hospitality && <option>Restaurant and cafe jobs</option>}
                                {hospitality && <option>Tourism-related positions</option>}
                                {hospitality && <option>Resort and ski resort jobs</option>}

                                {retail && <option>Retail assistant</option>}
                                {retail && <option>Sales positions</option>}

                                {construction && <option>Construction work</option>}
                                {construction && <option>Painting</option>}
                                {construction && <option>Landscaping</option>}

                                {office && <option>Office support roles</option>}
                                {office && <option>Administrative positions </option>}

                                {healthcare && <option>Healthcare assistant</option>}
                                {healthcare && <option>Support roles in healthcare</option>}

                                {technology && <option>IT support roles</option>}
                                {technology && <option>Software development internships</option>}

                                {teaching && <option>Teaching assistant roles</option>}
                                {teaching && <option>Language teaching positions</option>}

                                {creative && <option>Graphic design</option>}
                                {creative && <option>Writing and content creation</option>}


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
                              <input type="number" className="form-control" id="press18" />
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
                                  id="workinghoursRadio1" value="" />Accomdation
                              </div>

                            </div>
                            <div className="col-2">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="" />Food
                              </div>

                            </div>
                            <div className="col-3">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="" />Transport
                              </div>
                            </div>
                            <div className="col-4 ">
                              <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                  id="workinghoursRadio1" value="" />Others
                                  <input type='text' className='form-control col-5' />
                                   
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
                                id="workinghoursRadio1" value="" />No

                            </div>
                            <div className=" col-2 form-check mx-3">

                              <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                id="workinghoursRadio1" value="" />Yes


                            </div>
                            <div className='col-6'>

                              <input type='text' className='form-control col-5' />

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

                              <input className="form-control col" value="" type="text" placeholder="Questions" />&nbsp;&nbsp;
                              <button className='col-1 btn bg-secondary' type="button" onClick={addTextbox}>+</button>


                            </div>

                          </div>

                        </div>

                      </div>
                      <div>
                        {arr.map((x, index) => {
                          return (
                            <div key={index}className=" mt-3 row">
                            <input className="form-control col" value="" type="text" placeholder="Questions" />&nbsp;&nbsp;
                            <button className='col-1 btn bg-secondary' type="button" onClick={()=>delTextBox()}>-</button>
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
        </div>
      </div>

    </>
  )





}
export default Postajob;