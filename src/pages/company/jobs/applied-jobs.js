
<div class="main-panel">
  <div class="content-wrapper">
    <div class="page-header">
      <h3 class="page-title"> Post a Job </h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Employer</a></li>
          <li class="breadcrumb-item active" aria-current="page">Post a Job</li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Post a Job </h4>
            <form class="form-sample">

              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label" >Job Title*</label>
                    <div class="col-sm-9">
                      <input id="press" onkeyup="removeing(event)" type="text" class="form-control"/>
                      <div class="bgcol" id="error"></div>
                    </div>
                  </div>
                </div>


                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Job Description*</label>
                    <div class="col-sm-9">
                      <textarea type="text" class="form-control" id="press1"></textarea>
                      <div class="bgcol"  id="error1"></div>
                    </div>
                  </div>
                </div>

                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Job Type*</label>
                    <div class="col-sm-4">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox"
                            id="jobtypeCheckbox1" value="" checked > Full Time </label>
                            
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox"
                            id="jobtypeCheckbox2" value="option2"> Part Time </label>
                      </div>
                    </div>

                    <div class="col-sm-5">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox"
                            id="jobtypeCheckbox2" value="option2"> Casual </label>
                      </div>
                    </div>

                    <div class="col-sm-5">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox"
                            id="jobtypeCheckbox2" value="option2"> Contract </label>
                      </div>
                    </div>

                    <div class="col-sm-5">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox"
                            id="jobtypeCheckbox2" value="option2"> Freelance</label>
                      </div>
                    </div>
                  
                    <div class="col-sm-5">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="jobtypeCheckbox"
                            id="jobtypeCheckbox2" value="option2"> Temporary </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Job Type*</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="press4"/>
                      <div class="bgcol" id="error4"></div> 
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Emp job reference</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="press6"/>
                      <div class="bgcol" id="error6"></div> 
                    </div>
                  </div>
                </div>
              </div>

                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Number of vacancies*</label>
                      <div class="col-sm-9">
                        <input type="number" class="form-control" id="press10"/>
                        <div class="bgcol" id="error10"></div> 
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Creation date*</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" id="press11"/>
                        <div class="bgcol" id="error11"></div> 
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Category*</label>
                      <div class="col-sm-9">
                        <select id="jobCategory" onclick="subCate()" class="form-control col-6 " >
                          <option></option>
                          <option class="fw-bold" value="Agriculture"> Agriculture and Farming</option>
                          <option class="fw-bold" value="Hospitality">Hospitality and Tourism </option>
                          <option class="fw-bold" value="Retail">Retail and Sales</option>
                          <option class="fw-bold" value="Construction">Construction and Manual Labour</option>
                          <option class="fw-bold" value="Office">Office/Administration</option>
                          <option class="fw-bold" value="Healthcare">Healthcare</option>
                          <option class="fw-bold" value="Technology" >Technology and IT</option>
                          <option class="fw-bold" value="Teaching">Teaching and Education</option>
                          <option class="fw-bold" value="Creative">Creative and Media</option>
                          
                        </select>

                        <div class="bgcol" id="jobCategoryError"></div> 

                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Sub-category*</label>
                      <div class="col-sm-9">
                        <select class="form-control col-6" id="subCategory" >
                         
                                              
                                                                
                        </select>
                        <div class="bgcol" id="subCategoryError"></div> 

                      </div>
                    </div>
                  </div>
                </div>


                
                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Weekly work hours</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" id="press18"/>
                        <div class="bgcol" id="error18"></div> 
                      </div>
                    </div>
                  </div>
                </div>
                                    
                <div class="row">
                  <div class="col-md-9">
                    <div class="form-group row">
                      <label class="col-sm-3 col-form-label">Rate per hour</label>
                      <div class="col-sm-9">
                        <input type="text" class="form-control" id="press12"/>
                        <div class="bgcol" id="error12"></div> 
                      </div>
                    </div>
                  </div>
                </div>


                <div class="col-md-9 mt-3">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Location*</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="press15" />
                      <div  class="bgcol" id="error15"></div>
                    </div>
                  </div>
                </div>

                                    
              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Region</label>
                    <div class="col-sm-9">
                      <select id="parent" onclick="selection()" class="form-control col-6" >
                        <option></option>
                       <option value="North"> North Island Regions</option>
                        <option value="South">South Island Regions </option>
                       
                        
                      </select>
                    </div>
                  </div>
                </div>
               </div>
              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Sub-Region</label>
                    <div class="col-sm-9">
                      <select id="child" class="form-control col-6" >
                  
                       
                        
                      </select>
                    </div>
                  </div>
                </div>
              </div>



                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Deadline</label>
                    <div class="col-sm-9">
                      <input class="form-control" type="date" placeholder="dd/mm/yyyy" id="press16"  />
                      <div  class="bgcol" id="error16"></div>
                    </div>
                  </div>
                </div>


              <div class="col-md-9">
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Benifits</label>
                  <div class="col-sm-9 row">
                    <div class="col">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="workinghoursRadio"
                            id="workinghoursRadio1" value="" checked> Accomdation</label>
                      </div>

                    </div>

                    <div class="col">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="workinghoursRadio"
                            id="workinghoursRadio1" value="" checked> Food</label>
                      </div>

                    </div>

                    <div class="col">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="workinghoursRadio"
                            id="workinghoursRadio1" value="" checked> Transport </label>
                      </div>

                    </div>

                    <div class="col">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input type="checkbox" class="form-check-input" name="workinghoursRadio"
                            id="workinghoursRadio1" value="" checked> Others</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-9">
                <div class="form-group row">
                  <label class="col-sm-9 col-form-label">Employer questions</label>
                  <div class="col-sm-9 row">
                    <input class="form-control col" value="" type="text" placeholder="Notice Period?" id="press19"/>
                    <div  class="bgcol" id="error19"></div>

                    <div class="col-3"></div>
                  </div>
                  <div class="col-sm-9 mt-3 row">
                    <input class="form-control col" value="" type="text" placeholder="When you will be your Travel Date?" id="press20"/>
                    <div  class="bgcol" id="error20"></div>

                    <div class="col-3"></div>
                  </div>
                  <div class="col-sm-9 mt-3 row">
                    <input class="form-control col" value="" type="text" placeholder="Expected CTC?" />
                    <button class="col-3 button" type="button">+</button>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Company*</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="press21"/>
                      <div class="bgcol" id="error21"></div> 
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-9">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Provide Training*</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" id="press25"/>
                      <div class="bgcol" id="error25"></div> 
                    </div>
                  </div>
                </div>
              </div>

          
                <div class="col-md-9 row">
                  <div class="col-md-6">
                  </div>
                    <div class="col-md-6">
                      <button type="button" class="btn btn-gradient-primary me-2" onclick="prav()">Submit</button>
                    </div>
                </div>
              </form>

          </div>
        </div>
      </div>
      
      