import Header from '../../../layouts/company/Header';
import Footer from '../../../layouts/company/Footer';
import Sidebar from '../../../layouts/company/Sidebar';
import { useState } from 'react';

function Postajob() {
  const [description, setDescription]=useState('');
  const [location, setLocation]=useState('');
  const [jobCategory, setJobCategory]=useState('');
  const [subCategory, setSubCategory]=useState('');
  const [jobTitle, setJobTitle]=useState('');
  const [jobType, setJobType]=useState('');
  const [vacancies, setVacancies]=useState('');
  const [creationDate, setCreationDate]=useState('');
  const [training, setTraining]=useState('');
  const [company, setCompany]=useState('');


  
const[jobTitleMsg,setJobTitleMsg] = useState('Please enter Job Title');
const[createdMsg,setCreatedMsg] = useState('Please enter Created date');
const[locationMsg,setLocationMsg] = useState('Please enter Location');
const[descriptionMsg,setDescriptionMsg] = useState('Please Enter Description');
const [vacanciesMsg,setVacanciesMsg] = useState('Please Enter Number Of Vacancies');
const [companyMsg,setCompanyMsg] = useState('Please Enter Company Name');
const [trainingMsg,setTrainingMsg] = useState('Please Specify Training');




  
  const [errors, setErrors]=useState({
    descriptionErrors:false,
    locationErrors:false,
    jobCategoryErrors:false,
    subCategoryErrors:false,
    jobTitleErrors : false,
    jobTypeErrors : false,
    vacanciesErrors : false,
    creationDateErrors : false,
    trainingErrors : false,
    companyErrors : false
  })

  
  const companyButton =() =>{
    let eObj ={};
    if(description ==''){
      eObj ={...eObj, descriptionErrors:true};
      setDescriptionMsg('Please Enter Description');

    } else if(/^\w{2,}$/gi.test(description)==false){
      eObj ={...eObj, descriptionErrors:true};
      setDescriptionMsg('Not Proper Description');

    }
    else{
      eObj ={...eObj, descriptionErrors:false};
  
  
    }
    if(location ==''){
      eObj ={...eObj, locationErrors:true};
      setLocationMsg('Enter Location')
    }
    else if (/^[a-z]{3,}$/gi.test(location) == false){
      eObj ={...eObj, locationErrors:true};
      setLocationMsg('Not a Proper Location')

    }
    else{
      eObj ={...eObj, locationErrors:false};
  
  
    }
    if(jobCategory ==''){
      eObj ={...eObj, jobCategoryErrors:true};
    }
    else{
      eObj ={...eObj, jobCategoryErrors:false};
  
  
    }
    if(subCategory ==''){
      eObj ={...eObj, subCategoryErrors:true};
    }
    else{
      eObj ={...eObj, subCategoryErrors:false};
  
  
    }
    if(jobTitle ==''){
      eObj ={...eObj, jobTitleErrors:true};
      setJobTitleMsg('Please enter Job Title')
    } else if(/^[a-z]{3,}$/gi.test(jobTitle)==false){
      eObj ={...eObj, jobTitleErrors:true};
      setJobTitleMsg('Invalid Job Title')
    }
    else{
      eObj ={...eObj, jobTitleErrors:false};
  
  
    }

    if(jobType ==''){
      eObj ={...eObj, jobTypeErrors:true};
    }
    else{
      eObj ={...eObj, jobTypeErrors:false};
  
  
    }
    if(vacancies ==''){
      eObj ={...eObj, vacanciesErrors:true};
      setVacanciesMsg('Please Enter Number Of Vacancies');
    }else if (/^[0-9]{1,}$/gi.test(vacancies) == false){
      eObj ={...eObj, vacanciesErrors:true};
      setVacanciesMsg('Input is Not a Number')

    }
    else{
      eObj ={...eObj, vacanciesErrors:false};
  
  
    }
    if(creationDate ==''){
      eObj ={...eObj, creationDateErrors:true};
      setCreatedMsg('Please enter Created date')

    } else if (/^(\d{1,2}-){2}\d{2}(\d{2})?$/gi.test(creationDate)==false) {
      eObj ={...eObj, creationDateErrors:true};
      setCreatedMsg('Not a Proper Date')
    }
    else{
      eObj ={...eObj, creationDateErrors:false};
  
  
    }

    if(training ==''){
      eObj ={...eObj, trainingErrors:true};
      setTrainingMsg('Please Specify Training')
    }
    else if(/^\w{3,}$/gi.test(training)== false){
      eObj ={...eObj, trainingErrors:true};
      setCompanyMsg('Not a Proper Input')
    }
    else{
      eObj ={...eObj, trainingErrors:false};
  
  
    }
    if(company ==''){
      eObj ={...eObj, companyErrors:true};
      setCompanyMsg('Please Enter Company Name')
    }
    else if(/^[a-z]{3,}$/gi.test(company)== false){
      eObj ={...eObj, companyErrors:true};
      setCompanyMsg('Not a Proper Company Name')
    }
    else{
      eObj ={...eObj, companyErrors:false};
  
  
    }
    setErrors(eObj);
  }

  const handleInput =(name , event)=>{
    if(name == 'description'){
      setDescription(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,descriptionErrors:true})
        
      }
      else{
        setErrors({...errors,descriptionErrors:false})
      }
      
    }
    
    if(name == 'location'){
      setLocation(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,locationErrors:true})
        
      }
      else{
        setErrors({...errors,locationErrors:false})
      }
      
    }
    if(name == 'jobcategory'){
      setJobCategory(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,jobCategoryErrors:true})
        
      }
      else{
        setErrors({...errors,jobCategoryErrors:false})
      }
      
    }
    if(name == 'subcategory'){
      setSubCategory(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,subCategoryErrors:true})
        
      }
      else{
        setErrors({...errors,subCategoryErrors:false})
      }
      
    }

    if(name == 'jobtitle'){
      setJobTitle(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,jobTitleErrors:true})
        
      }
      else{
        setErrors({...errors,jobTitleErrors:false})
      }
      
    }

    if(name == 'jobtype'){
      setJobType(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,jobTypeErrors:true})
        
      }
      else{
        setErrors({...errors,jobTypeErrors:false})
      }
      
    }

    if(name == 'vacancies'){
      setVacancies(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,vacanciesErrors:true})
        
      }
      
      else{
        setErrors({...errors,vacanciesErrors:false})
      }
      
    }

    if(name == 'creationdate'){
      setCreationDate(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,creationDateErrors:true})
        
      }
      else{
        setErrors({...errors,creationDateErrors:false})
      }
      
    }
    if(name == 'training'){
      setTraining(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,trainingErrors:true})
        
      } 
      else{
        setErrors({...errors,trainingErrors:false})
      }
      
    }
    if(name == 'company'){
      setCompany(event.target.value);
      if(event.target.value ==''){
        setErrors({...errors,companyErrors:true})
        
      }
      else{
        setErrors({...errors,companyErrors:false})
      }
      
    }
  }
  return (
     <>

      <div className="container-scroller">

        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
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
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Post a Job </h4>
                      <form className="form-sample">

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label" >Job Title*</label>
                              <div className="col-sm-9">
                              <input type="text" className="form-control" value={jobTitle} onChange={(event) =>handleInput('jobtitle' ,event) } />
                                  {errors.jobTitleErrors && <span className='text-danger'>{jobTitleMsg}</span>}
                              </div>
                            </div>
                          </div>


                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Job Description*</label>
                              <div className="col-sm-9">
                                <textarea type="text" className="form-control"   value={description} onChange={(event) =>handleInput('description' ,event) }></textarea>
                                {errors.descriptionErrors && <span className='text-danger'>{descriptionMsg}</span>}
                                <div className="bgcol" id="error1"></div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Job Type*</label>
                              <div className="col-sm-4">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="jobtypeCheckbox"
                                      value="option1" checked /> Full Time </label>

                                </div>
                              </div>
                              <div className="col-sm-5">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="jobtypeCheckbox"
                                      value="option2" /> Part Time </label>
                                </div>
                              </div>

                              <div className="col-sm-5">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="jobtypeCheckbox"
                                      id="jobtypeCheckbox2" value="option2" /> Casual </label>
                                </div>
                              </div>

                              <div className="col-sm-5">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="jobtypeCheckbox"
                                      id="jobtypeCheckbox2" value="option2" /> Contract </label>
                                </div>
                              </div>

                              <div className="col-sm-5">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="jobtypeCheckbox"
                                      id="jobtypeCheckbox2" value="option2" /> Freelance</label>
                                </div>
                              </div>

                              <div className="col-sm-5">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="jobtypeCheckbox"
                                      id="jobtypeCheckbox2" value="option2" /> Temporary </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Job Type*</label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" id="press4" />
                                <div className="bgcol" id="error4"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Emp job reference</label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" id="press6" />
                                <div className="bgcol" id="error6"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Number of vacancies*</label>
                              <div className="col-sm-9">
                              <input type="text" className="form-control" value={vacancies} onChange={(event) =>handleInput('vacancies' ,event) } />
                                  {errors.vacanciesErrors && <span className='text-danger'>{vacanciesMsg} </span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Creation date*</label>
                              <div className="col-sm-9">
                              <input type="text" className="form-control" value={creationDate} onChange={(event) =>handleInput('creationdate' ,event) } placeholder='DD - MM - YY'/>
                                  {errors.creationDateErrors && <span className='text-danger'>{createdMsg}</span>}
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Category*</label>
                              <div className="col-sm-9">
                                <select value={jobCategory} onChange={(event) =>handleInput('jobcategory' ,event) }  className="form-control col-6 " >
                                  <option></option>
                                  <option className="fw-bold" value="Agriculture"> Agriculture and Farming</option>
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
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Sub-category*</label>
                              <div className="col-sm-9">
                                <select className="form-control col-6" value={subCategory} onChange={(event) =>handleInput('subcategory' ,event) } >



                                </select>
                                {errors.subCategoryErrors && <span className='text-danger'>Please select Sub Category</span>}
                                <div className="bgcol" id="subCategoryError"></div>

                              </div>
                            </div>
                          </div>
                        </div>



                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Weekly work hours</label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" id="press18" />
                                <div className="bgcol" id="error18"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Rate per hour</label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" id="press12" />
                                <div className="bgcol" id="error12"></div>
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="col-md-9 mt-3">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Location*</label>
                            <div className="col-sm-9">
                            <input type="text" className="form-control" value={location} onChange={(event) =>handleInput('location' ,event) } />
                                  {errors.locationErrors && <span className='text-danger'>{locationMsg}</span>}
                              <div className="bgcol" id="error15"></div>
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Region</label>
                              <div className="col-sm-9">
                                <select id="parent" onclick="selection()" className="form-control col-6" >
                                  <option></option>
                                  <option value="North"> North Island Regions</option>
                                  <option value="South">South Island Regions </option>


                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Sub-Region</label>
                              <div className="col-sm-9">
                                <select id="child" className="form-control col-6" >



                                </select>
                              </div>
                            </div>
                          </div>
                        </div>



                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Deadline</label>
                            <div className="col-sm-9">
                              <input className="form-control" type="date" placeholder="dd/mm/yyyy" id="press16" />
                              <div className="bgcol" id="error16"></div>
                            </div>
                          </div>
                        </div>


                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Benifits</label>
                            <div className="col-sm-9 row">
                              <div className="col">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                      id="workinghoursRadio1" value="" checked /> Accomdation</label>
                                </div>

                              </div>

                              <div className="col">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                      id="workinghoursRadio1" value="" checked /> Food</label>
                                </div>

                              </div>

                              <div className="col">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                      id="workinghoursRadio1" value="" checked /> Transport </label>
                                </div>

                              </div>

                              <div className="col">
                                <div className="form-check">
                                  <label className="form-check-label">
                                    <input type="checkbox" className="form-check-input" name="workinghoursRadio"
                                      id="workinghoursRadio1" value="" checked /> Others</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-9">
                          <div className="form-group row">
                            <label className="col-sm-9 col-form-label">Employer questions</label>
                            <div className="col-sm-9 row">
                              <input className="form-control col" value="" type="text" placeholder="Notice Period?" id="press19" />
                              <div className="bgcol" id="error19"></div>

                              <div className="col-3"></div>
                            </div>
                            <div className="col-sm-9 mt-3 row">
                              <input className="form-control col" value="" type="text" placeholder="When you will be your Travel Date?" id="press20" />
                              <div className="bgcol" id="error20"></div>

                              <div className="col-3"></div>
                            </div>
                            <div className="col-sm-9 mt-3 row">
                              <input className="form-control col" value="" type="text" placeholder="Expected CTC?" />
                              <button className="col-3 button" type="button">+</button>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Company*</label>
                              <div className="col-sm-9">
                              <input type="text" className="form-control" value={company} onChange={(event) =>handleInput('company' ,event) } />
                                  {errors.companyErrors && <span className='text-danger'>{companyMsg} </span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Provide Training*</label>
                              <div className="col-sm-9">
                              <input type="text" className="form-control" value={training} onChange={(event) =>handleInput('training' ,event) } />
                                  {errors.trainingErrors && <span className='text-danger'>{trainingMsg}</span>}
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="col-md-9 row">
                          <div className="col-md-6">
                          </div>
                          <div className="col-md-6">
                            <button type="button" className="btn btn-gradient-primary me-2" onClick={()=> companyButton()}>Submit</button>
                          </div>
                        </div>
                      </form>

                    </div>
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
  export default Postajob