

import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';
import { useState } from 'react';


function ViewProfile() {


  const [user, SetUserData] = useState({
    firstname: "Rohit",
    lastname: "Sharma",
    email: "shRohit@gmail.com",
    mobile: "7889855332",
    personalSummary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exerci culpa nesciunt nihil aut nostrum explicabo reprehenderit",
    workhistory: [
      {
        jobTitle: "Trainee",
        employer: "Google",
        location: "India",
        from: 2020,
        to: 2021,
        workDescription: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exerc culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      },
      {
        jobTitle: "Trainee",
        employer: "Google",
        location: "India",
        from: 2020,
        to: 2021,
        workDescription: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      }
    ],

    education: [
      {
        educationProvider: "Harvard",
        qualification: "Graduate",
        yearCompleted: 2020,
        validinNZ: "yes",
        eduDescription: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      },
      {
        educationProvider: "Harvard",
        qualification: "Graduate",
        yearCompleted: 2020,
        validinNZ: "yes",
        eduDescription: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      }
    ],
    license: [
      {
        name: "Automation",
        authority: "Google",
        issueDate: "12-12-2021",
        expiryDate: "18-4-2024",
        validinNZ: "yes",
        licenseDes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      },
      {
        name: "Automation",
        authority: "Google",
        issueDate: "12-12-2021",
        expiryDate: "18-4-2024",
        validinNZ: "yes",
        licenseDes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      }
    ],
    certificate: [
      {
        name: "Java",
        authority: "Harvard",
        issueDate: "30-4-2022",
        expiryDate: "30-4-2028",
        validinNZ: "yes",
        certificateDes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exerc culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      },
      {
        name: "Java",
        authority: "Harvard",
        issueDate: "30-4-2022",
        expiryDate: "30-4-2028",
        validinNZ: "yes",
        certificateDes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitat culpa nesciunt nihil aut nostrum explicabo reprehenderit?",

      }
    ],
    skills: ["HTML", "CSS"],
    availability: "Immediately",
    preferedJobtype: ["Full Time", "Part Time"],
    preferedLocation: ["New Zealand", "Austrailia"],
    preferedJobCategory: ["IT", "AI"],
    rate: "10$",
    showProfile: "Yes",
    visaType: "Student Visa",
    visaExpiryDate: "12-12-2022",
    uploadCV: "Resume.pdf",
    coverLetter: "Letter.pdf"
  })

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
            <h3 className="page-title"> Profile </h3>
          </div>
          <div className="row bg-white">
            <div className="col-12">
              {/* <div className="card"> */}
              <div className="card-body p-3" >
                <div className='row my-4'>
                  <h4 className="card-title col-9 ">User Profile </h4>
                
                  <div className='col-3 text-center'>
                  <button type="button" className="btn btn-gradient-primary col-3">Edit</button>
                  </div>


                  
                </div>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">First Name :</label>
                        <div className="col-sm-9">
                          <div className=' p-2'>{user.firstname}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Last Name :  </label>
                        <div className="col-sm-9">
                          <div className='p-2'>{user.lastname}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Email address :  </label>
                        <div className="col-sm-9">
                          <div className=' p-2'>{user.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Mobile :</label>
                        <div className="col-sm-9">
                          <div className='p-2'>{user.mobile}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label fw-bold">Personal Summary : </label>
                        <div className="col-sm-12">
                          <div className=' p-2'>{user.personalSummary}

                          </div>


                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="card-description fw-bold mt-3"><strong>Work History :</strong></p>
                  <div className="row">
                    <div className="col-md-11 small card">
                      <table class="table-sm ">
                        <thead>
                          <tr className='text-center' >
                            <th scope="col">Job Title</th>
                            <th scope="col">Employer</th>
                            <th scope="col">Location</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Description</th>

                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.workhistory.map((x, index) => {
                              return (
                                <>
                                  <tr key={index}>
                                    <td scope="row">{x.jobTitle}</td>
                                    <td>{x.employer}</td>
                                    <td>{x.location}</td>
                                    <td>{x.from}</td>
                                    <td>{x.to}</td>
                                    <td>{x.workDescription}</td>
                                  </tr>

                                </>

                              )
                            })
                          }


                        </tbody>
                      </table>






                    </div>
                  </div>
                  <p className="card-description mt-3 fw-bold"><strong>Education :</strong></p>
                  <div className="row">
                    <div className="col-md-11 small">
                      <table class="table-sm table-bordered ">
                        <thead>
                          <tr>
                            <th scope="col">Education Provider</th>
                            <th scope="col">Qualification</th>
                            <th scope="col">Year Completed</th>
                            <th scope="col">Valid in NZ?</th>
                            <th scope="col">Description</th>



                          </tr>
                        </thead>
                        <tbody>

                          {
                            user.education.map((x, index) => {
                              return (
                                <tr key={index}>
                                  <td scope="row">{x.educationProvider}</td>
                                  <td>{x.qualification}</td>
                                  <td>{x.yearCompleted}</td>
                                  <td>{x.validinNZ}</td>
                                  <td>{x.eduDescription}</td>


                                </tr>

                              )
                            })
                          }

                        </tbody>
                      </table>







                    </div>
                  </div>


                  <p className="card-description mt-3 fw-bold"><strong>Licences :</strong></p>
                  <div className="row">
                    <div className="col-md-11 small">
                      <table class="table-sm table-bordered ">

                        <thead>
                          <tr>
                            <th scope="col">Licence Name</th>
                            <th scope="col">Issuing Authority</th>
                            <th scope="col">Issue Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">validin NZ?</th>
                            <th scope="col">Description</th>




                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.license.map((x, index) => {
                              return (
                                <tr key={index}>
                                  <td scope="row">{x.name}</td>
                                  <td>{x.authority}</td>
                                  <td>{x.issueDate}</td>
                                  <td>{x.expiryDate}</td>
                                  <td>{x.validinNZ}</td>
                                  <td>{x.licenseDes}</td>



                                </tr>

                              )
                            })
                          }
                        </tbody>
                      </table>






                    </div>
                  </div>
                  <p className="card-description mt-3 fw-bold"><strong>Certifications :</strong></p>
                  <div className="row">
                    <div className="col-md-11 small">
                      <table class="table-sm table-bordered  ">
                        <thead>
                          <tr>
                            <th scope="col">Certificate Name</th>
                            <th scope="col">Issuing Authority</th>
                            <th scope="col">Issue Date</th>
                            <th scope="col">Expiry Date</th>
                            <th scope="col">validin NZ?</th>
                            <th scope="col">Description</th>




                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.certificate.map((x, index) => {
                              return (
                                <tr key={index}>
                                  <td scope="row">{x.name}</td>
                                  <td>{x.authority}</td>
                                  <td>{x.issueDate}</td>
                                  <td>{x.expiryDate}</td>
                                  <td>{x.validinNZ}</td>
                                  <td>{x.certificateDes}</td>



                                </tr>

                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold h3 mt-3">Skills :</label>
                        <div className="col-sm-12">
                          <ul>
                            {user.skills.map((x, index) => {
                              return <li>{x}</li>
                            }
                            )

                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Availability:</label>
                        <div className="col-sm-9">
                          {user.availability}
                        </div>
                      </div>
                    </div>
                  </div>





                  <p className="card-description mt-3 fw-bold">Preferred Job Types : </p>
                  <div className="row">
                    <div className="col-md-12">
                      <ul>
                        {user.preferedJobtype.map((x, index) => {
                          return <li key={index}>{x}</li>
                        }
                        )

                        }
                      </ul>

                    </div>
                  </div>




                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label fw-bold">Preferred Locations :</label>
                        <div className="col-sm-12">
                          <ul>
                            {user.preferedLocation.map((x, index) => {
                              return <li key={index}>{x}</li>
                            }
                            )

                            }
                          </ul>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Preferred Jobcategorys :</label>
                        <div className="col-sm-12">
                          <ul>
                            {user.preferedJobCategory.map((x, index) => {
                              return <li key={index}>{x}</li>
                            }
                            )

                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Expected rate Per hour : </label>
                        <div className="col-sm-9">
                          <div>{user.rate}</div>

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Profile is Visible to others:</label>
                        <div className="col-sm-9">
                          {user.showProfile}
                        </div>
                      </div>
                    </div>
                  </div>




                  <div className="col-md-9">
                    <div class="form-group row">
                      <label className="col-form-label col-3 fw-bold">Visa Type :</label>
                      <div className='col-3'>
                        {user.visaType}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="form-group row">
                      <label className="col-form-label col-3 fw-bold ">Visa Expiry Date:</label>
                      <div className="col-3">
                        {user.visaExpiryDate}


                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload CV :  </label>
                        <div className="col-sm-9">
                          {user.uploadCV}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload Cover Letter :  </label>
                        <div className="col-sm-9">
                          {user.coverLetter}
                        </div>
                      </div>
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

export default ViewProfile;
