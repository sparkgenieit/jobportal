import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';
import { useEffect, useState } from 'react';
import userService from '../../services/common/user.service';


function ViewProfile() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');

  const [user, SetUserData] = useState({});

  useEffect(() => {

    userService.get(userId)
    .then(response => {
      console.log(response.data);
      SetUserData(response.data)
      // localStorage.setItem('token', response.data.token);
      // const token = response.data.token;

      // // Store the token securely (e.g., in localStorage or HTTP-only cookies)
      // localStorage.setItem('token', token);

      // localStorage.setItem('role', response.data.role)
      // setTimeout(() => {
      //   // Inside the handleLogin function
      //   navigate('/viewprofile'); // Redirect to the dashboard after login
      // }, 1500);

    })
    .catch(e => {
      console.log(e);
    })
  }, [userId])

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
                  <button type="button" className="btn btn-gradient-primary"><a href='/profile'>Edit</a></button>
                  </div>


                  
                </div>
                <form className="form-sample">
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">First Name :</label>
                        <div className="col-sm-9">
                          <div className=' p-2'>
                            {/* {user.firstname} */}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Last Name :  </label>
                        <div className="col-sm-9">
                          <div className='p-2'>
                            {/* {user.lastname} */}
                            </div>
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
                          <div className='p-2'>
                            {/* {user.mobile} */}
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-6 col-form-label fw-bold">Personal Summary : </label>
                        <div className="col-sm-12">
                          <div className=' p-2'>
                            {/* {user.personalSummary} */}

                          </div>


                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="card-description fw-bold mt-3"><strong>Work History :</strong></p>
                  <div className="row">
                    <div className="col-md-11 small card table-responsive-sm">
                      <table class="table-sm ">
                        <thead>
                          <tr className=' border-bottom' >
                            <th className='px-3'>Job Title</th>
                            <th className='px-3' >Employer</th>
                            <th className='px-3' >Location</th>
                            <th className='px-3' >From</th>
                            <th className='px-3'>To</th>
                            <th className='px-3'>Description</th>

                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.work_history &&  user.work_history.length > 0 && user.work_history.map((x, index) => {
                              return (
                                <>
                                  <tr className='border-bottom' key={index}>
                                    <td className='px-3'>{x.jobTitle}</td>
                                    <td className='px-3'>{x.employer}</td>
                                    <td className='px-3'>{x.location}</td>
                                    <td className='px-3'>{x.from}</td>
                                    <td className='px-3'>{x.to}</td>
                                    <td className='px-3'>{x.workDescription}</td>
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
                    <div className="col-md-11 small card table-responsive-sm">
                      <table class="table-sm">
                        <thead>
                          <tr className=' border-bottom'>
                            <th className='px-3' >Education Provider</th>
                            <th className='px-3'  >Qualification</th>
                            <th className='px-3' >Year Completed</th>
                            <th className='px-3' >Valid in NZ?</th>
                            <th className='px-3' >Description</th>



                          </tr>
                        </thead>
                        <tbody>

                          {
                            user.education && user.education.length > 0 && user.education.map((x, index) => {
                              return (
                                <tr  className='border-bottom' key={index}>
                                  <td className='px-3' >{x.educationProvider}</td>
                                   <td className='px-3' >{x.qualification}</td>
                                   <td className='px-3' >{x.yearCompleted}</td>
                                   <td className='px-3' >{x.validinNZ}</td>
                                   <td className='px-3' >{x.eduDescription}</td>


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
                    <div className="col-md-11 small card table-responsive-sm">
                      <table class="table-sm  ">

                        <thead>
                          <tr className=' border-bottom'>
                            <th className='px-3' >Licence Name</th>
                            <th className='px-3' >Issuing Authority</th>
                            <th className='px-3' >Issue Date</th>
                            <th className='px-3' >Expiry Date</th>
                            <th className='px-3' >Valid in NZ?</th>
                            <th className='px-3' >Description</th>




                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.licences && user.licences.length > 0 && user.licences.map((x, index) => {
                              return (
                                <tr  className='border-bottom' key={index}>
                                  <td className='px-3' >{x.name}</td>
                                   <td className='px-3' >{x.authority}</td>
                                   <td className='px-3' >{x.issueDate}</td>
                                   <td className='px-3' >{x.expiryDate}</td>
                                   <td className='px-3' >{x.validinNZ}</td>
                                   <td className='px-3' >{x.licenseDes}</td>



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
                    <div className="col-md-11 small card table-responsive-sm">
                      <table class="table-sm">
                        <thead>
                          <tr className=' border-bottom'>
                            <th className='px-3' >Certificate Name</th>
                            <th className='px-3' >Issuing Authority</th>
                            <th className='px-3' >Issue Date</th>
                            <th className='px-3' >Expiry Date</th>
                            <th className='px-3' >Valid in NZ?</th>
                            <th className='px-3' >Description</th>




                          </tr>
                        </thead>
                        <tbody>
                          {
                            user.certification && user.certification.length > 0 && user.certification.map((x, index) => {
                              return (
                                <tr  className='border-bottom' key={index}>
                                  <td td className='px-3'  >{x.name}</td>
                                   <td className='px-3' >{x.authority}</td>
                                   <td className='px-3' >{x.issueDate}</td>
                                   <td className='px-3' >{x.expiryDate}</td>
                                   <td className='px-3' >{x.validinNZ}</td>
                                   <td className='px-3' >{x.certificateDes}</td>



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
                            {user.skills && user.skills.length > 0 && user.skills.map((x, index) => {
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
                        <label className="col-sm-3 col-form-label fw-bold">Availability:</label>
                        <div className="col-sm-9">
                          {/* {user.availability} */}
                        </div>
                      </div>
                    </div>
                  </div>





                  <p className="card-description mt-3 fw-bold">Preferred Job Types : </p>
                  <div className="row">
                    <div className="col-md-12">
                      <ul>
                        {user.preferredJobTypes && user.preferredJobTypes.length > 0 && user.preferredJobTypes.map((x, index) => {
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
                          {user.preferredJobLocations && user.preferredJobLocations.length > 0 && 
                          user.preferredJobLocations.map((x, index) => {
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
                            {user.preferredJobCategories && user.preferredJobCategories.length > 0 && user.preferredJobCategories.map((x, index) => {
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
                          {/* <div>{user.rate}</div> */}

                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Profile is Visible to others:</label>
                        <div className="col-sm-9">
                          {/* {user.showProfile} */}
                        </div>
                      </div>
                    </div>
                  </div>




                  <div className="col-md-9">
                    <div class="form-group row">
                      <label className="col-form-label col-3 fw-bold">Visa Type :</label>
                      <div className='col-3'>
                        {/* {user.visaType} */}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="form-group row">
                      <label className="col-form-label col-3 fw-bold ">Visa Expiry Date:</label>
                      <div className="col-3">
                        {/* {user.visaExpiryDate} */}


                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload CV :  </label>
                        <div className="col-sm-9">
                          {/* {user.uploadCV} */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload Cover Letter :  </label>
                        <div className="col-sm-9">
                          {/* {user.coverLetter} */}
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
