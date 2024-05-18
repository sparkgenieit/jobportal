import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';
import { useEffect, useState } from 'react';
import userService from '../../services/common/user.service';


function ViewProfile() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');

  const [user, SetUserData] = useState({});
  const [JobTypes, setJobtypes] = useState([])

  // let JobTypes = []
  useEffect(() => {

    userService.get(userId)
      .then(response => {
        SetUserData(response.data)

        // To display the keys of jobtypes which is true
        let jobtype = response.data.preferredJobTypes[0]
        let jobs = []
        for (const key in jobtype) {
          const element = jobtype[key];
          if (element === true) {
            jobs.push(key)
          }
        }
        setJobtypes(jobs)


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

  const handleDownload = (event,path, file) => {
    event.preventDefault();
    fetch("http://localhost:8080/upload/file/?path="+path +"&file="+file,{
      responseType: "blob",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        //link.setAttribute("download", file);
        link.download = file;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

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
                            {user.first_name}
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
                            {user.last_name}
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
                            {user.phone}
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
                            {user.profile_summary}

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
                            user.work_history && user.work_history.length > 0 && user.work_history.map((x, index) => {
                              return (
                                <>
                                  <tr className='border-bottom' key={index}>
                                    <td className='px-3'>{x.jobTitle}</td>
                                    <td className='px-3'>{x.employer}</td>
                                    <td className='px-3'>{x.location}</td>
                                    <td className='px-3'>{new Date(x.fromDate).toLocaleDateString('en-GB')}</td>
                                    <td className='px-3'>{new Date(x.toDate).toLocaleDateString('en-GB')}</td>
                                    <td className='px-3'>{x.description}</td>
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
                                <tr className='border-bottom' key={index}>
                                  <td className='px-3' >{x.educationProvider}</td>
                                  <td className='px-3' >{x.qualification}</td>
                                  <td className='px-3' >{x.yearCompleted}</td>
                                  <td className='px-3' >{x.validInNZ}</td>
                                  <td className='px-3' >{x.description}</td>


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
                                <tr className='border-bottom' key={index}>
                                  <td className='px-3' >{x.licenseName}</td>
                                  <td className='px-3' >{x.issuingAuthority}</td>
                                  <td className='px-3' >{new Date(x.issueDate).toLocaleDateString('en-GB')}</td>
                                  <td className='px-3' >{new Date(x.expiryDate).toLocaleDateString('en-GB')}</td>
                                  <td className='px-3' >{x.validInNZ}</td>
                                  <td className='px-3' >{x.description}</td>



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
                                <tr className='border-bottom' key={index}>
                                  <td td className='px-3'  >{x.certificateName}</td>
                                  <td className='px-3' >{x.issuingAuthority}</td>
                                  <td className='px-3' >{new Date(x.issueDate).toLocaleDateString('en-GB')}</td>
                                  <td className='px-3' >{new Date(x.expiryDate).toLocaleDateString('en-GB')}</td>
                                  <td className='px-3' >{x.validInNZ}</td>
                                  <td td className='px-3'  >{x.description}</td>
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
                          {user.availability == "true" ? 'Yes' : "No"}
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Notice Period:</label>
                        <div className="col-sm-9">
                          {user.noticePeriod}
                        </div>
                      </div>
                    </div>
                  </div>


                  <p className="card-description mt-3 fw-bold">Preferred Job Types : </p>
                  <div className="row">
                    <div className="col-md-12">
                      <ul>
                        {user.preferredJobTypes && user.preferredJobTypes.length > 0 && JobTypes.map((job, index) => {
                          return <li key={index}>{job}</li>
                        })

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
                        <label className="col-sm-6  col-form-label fw-bold">Preferred Jobcategorys :</label>
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
                          <div>{user.expectedRatePerHour}</div>

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
                        {user.visaType}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="form-group row">
                      <label className="col-form-label col-3 fw-bold ">Visa Expiry Date:</label>
                      <div className="col-3">
                        {user.visaExpiryDate && new Date(user.visaExpiryDate.slice(0, 10)).toLocaleDateString('en-GB')}


                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-9">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label fw-bold">Upload CV :  </label>
                        <div className="col-sm-9">
                          {user.cv && <a style={{ "textDecoration": "underline" }} href="/" onClick={(event) => handleDownload(event, 'cvs',user.cv)}>{user.cv}</a>}
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
                        {user.coverLetter && <a style={{ "textDecoration": "underline" }} href="/" onClick={(event) => handleDownload(event, 'coverletters',user.coverLetter)}>{user.coverLetter}</a>}
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
