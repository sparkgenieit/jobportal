import './Home.css';

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';

function UserProfile() {
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
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Last Name <span style={{ color: "red" }}>*</span></label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Email address <span style={{ color: "red" }}>*</span></label>
                              <div className="col-sm-9">
                                <input type="email" className="form-control" />
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
                              <label className="col-sm-6 col-form-label">Personal Summary<span style={{ color: "red" }}>*</span></label>
                              <div className="col-sm-12">
                              <textarea type="text" className="form-control" ></textarea>

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
                              <div className="col-md-3">
                                <label className="col-sm-3 col-form-label">From</label>
                                <input type="month" class="form-control" />
                              </div>
                              <div className="col-md-3">
                                <label className="col-sm-3 col-form-label">To</label>
                                <input type="month" className="form-control" />
                              </div>
                            </div>
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

                              <div className="col-md-3">
                                <label className="col-sm-3 col-form-label my-1"><small>year Completed</small></label>
                                <input type="text" className="form-control" />
                              </div>

                              <div className="col-md-3">
                                <label className="col-sm-3 col-form-label"><small>Validin NZ?</small></label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>


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
                            </div>


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
                            </div>
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
                                <input type="radio"class="mx-2" />Immediately
                                
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
                                <select type="dropdown" className="form-control form-control form-control-lg">
                                  <option>---Select---</option>
                                  <option>yes</option>
                                  <option>No</option>
                                </select>

                              </div>
                            </div>
                          </div>
                        </div>



                        <div className="row">
                          <div className="col-md-6">
                            <div class="form-group row">
                              <label className="col-form-label col-6">Visa Type</label>
                              <select id="visa" onkeyup="ha29(event)" className="form-control col-6">
                                <option>----Select----</option>
                                <option>Working holiday visa</option>
                                <option>Work visa</option>
                                <option>Student visa</option>
                                <option>Permanet Resident</option>
                                <option>NZ citizen</option>
                                <option>Others </option>

                              </select>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-form-label">Visa Expiry Date <span style={{ color: "red" }}>*</span></label>
                              <div className="col-sm-12">
                                <input className="form-control" type="date" />
                                <div className="bgred" id="error36"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Upload CV <span style={{ color: "red" }}>*</span></label>
                              <div className="col-sm-9">
                                <input type="file" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-9">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Upload Cover Letter <span style={{ color: "red" }}>*</span></label>
                              <div className="col-sm-9">
                                <input type="file" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-6 form-check form-check-flat form-check-primary">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" /> Remember me </label>
                          </div>
                        </div>



                        <div className="col-md-9 mt-3 row">
                          <div className="col-md-6">
                          </div>
                          <div className="col-md-6">

                            <button type="button" className="btn btn-gradient-primary me-2">Submit</button>
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
