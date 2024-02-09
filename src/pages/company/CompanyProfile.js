import Header from '../../layouts/company/Header';
import Footer from '../../layouts/company/Footer';
import Sidebar from '../../layouts/company/Sidebar';
import { useState } from 'react';
import Head from '../../layouts/company/Head';

function CompanyProfile() {
  const [companyName, setCompanyName] = useState("");


  const [webSite, setWebSite] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [Phone, setPhone] = useState("");
  const [person, setPerson] = useState("");
  const [email, setEmail] = useState("");
 
 


  const [errors, setErrors] = useState({
    CompanyErrors: false,
    webSiteErrors: false,
    addressErrors: false,
    address2Errors: false,
    postcodeErrors: false,
    address3Errors: false,
    cityErrors: false,
    PhoneErrors: false,
    personErrors: false,
    emailErrors: false,
    workErrors: false,


  })



  const companyButton = () => {
    let eObj = {};
    if (companyName == '') {
      eObj = { ...eObj, CompanyErrors: true };
    }
    else {
      eObj = { ...eObj, CompanyErrors: false };


    }
    if (postcode == '') {
      eObj = { ...eObj, postcodeErrors: true };
    }
    else {
      eObj = { ...eObj, postcodeErrors: false };


    }
    if (webSite == '') {
      eObj = { ...eObj, webSiteErrors: true };
    }
    else {
      eObj = { ...eObj, webSiteErrors: false };


    }
    if (address == '') {
      eObj = { ...eObj, addressErrors: true };
    }
    else {
      eObj = { ...eObj, addressErrors: false };


    }
    if (address2 == '') {
      eObj = { ...eObj, address2Errors: true };
    }
    else {
      eObj = { ...eObj, address2Errors: false };


    }
   

    if (address3 == '') {
      eObj = { ...eObj, address3Errors: true };
    }
    else {
      eObj = { ...eObj, address3Errors: false };


    }

    if (city == '') {
      eObj = { ...eObj, cityErrors: true };
    }
    else {
      eObj = { ...eObj, cityErrors: false };


    }
   
    if (Phone == '') {
      eObj = { ...eObj, PhoneErrors: true };
    }
    else {
      eObj = { ...eObj, PhoneErrors: false };


    }
    if (email == '') {
      eObj = { ...eObj, emailErrors: true };
    }
    else {
      eObj = { ...eObj, emailErrors: false };


    }
    if (person == '') {
      eObj = { ...eObj, personErrors: true };
    }
    else {
      eObj = { ...eObj, personErrors: false };


    }
    

    setErrors(eObj);

  }
  const handleInput = (name, event) => {
    if (name == 'companyName') {
      setCompanyName(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, CompanyErrors: true })

      }
      else {
        setErrors({ ...errors, CompanyErrors: false })
      }

    }
    if (name == 'postcode') {
      setPostcode(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, postcodeErrors: true })

      }
      else {
        setErrors({ ...errors, postcodeErrors: false })
      }

    }
    if (name == 'webSite') {
      setWebSite(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, webSiteErrors: true })

      }
      else {
        setErrors({ ...errors, webSiteErrors: false })
      }

    }
    if (name == 'address') {
      setAddress(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, addressErrors: true })

      }
      else {
        setErrors({ ...errors, addressErrors: false })
      }

    }
    if (name == 'address2') {
      setAddress2(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, address2Errors: true })

      }
      else {
        setErrors({ ...errors, address2Errors: false })
      }

    }
    if (name == 'address3') {
      setAddress3(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, address3Errors: true })

      }
      else {
        setErrors({ ...errors, address3Errors: false })
      }

    }
    if (name == 'postCode') {
      setPostcode(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, postCodeErrors: true })

      }
      else {
        setErrors({ ...errors, postCodeErrors: false })
      }

    }

    if (name == 'city') {
      setCity(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, cityErrors: true })

      }
      else {
        setErrors({ ...errors, cityErrors: false })
      }

    }
    if (name == 'phone') {
      setPhone(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, PhoneErrors: true })

      }
      else {
        setErrors({ ...errors, PhoneErrors: false })
      }

    }

    if (name == 'email') {
      setEmail(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, emailErrors: true })

      }
      else {
        setErrors({ ...errors, emailErrors: false })
      }

    }

    if (name == 'person') {
      setPerson(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, personErrors: true })

      }
      else {
        setErrors({ ...errors, personErrors: false })
      }

    }

   
    
  }
  return (
    <>
      <div className="container-scroller">

        <Header />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title"> Employer Profile </h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Employer</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                  </ol>
                </nav>
              </div>


              <div className="col-12 bg-white">
                {/* <div className="card"> */}
                <div className="card-body p-3">
                  <h4 className="card-title">Employer Profile </h4>
                  <form className="form-sample">


                    <div className="row">
                      <div className="row mt-3">


                        <div className="row">

                          <div className="col-auto">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Company<span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" value={companyName} onChange={(event) => handleInput('companyName', event)} />
                                {errors.CompanyErrors && <span className='text-danger'>Please Enter Country</span>}
                                <div className="bgcol" id="error1"></div>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="row">








                          <div className="col-auto">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Address1<span className='text-danger'>*</span></label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" value={address} onChange={(event) => handleInput('address', event)} />
                                {errors.addressErrors && <span className='text-danger'>Please Enter Address 1</span>}

                              </div>
                            </div>
                          </div>




                        </div>





                      </div>


                      <div className="row">

                        <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Address2<span className='text-danger'>*</span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={address2} onChange={(event) => handleInput('address2', event)} />
                              {errors.address2Errors && <span className='text-danger'>Please Enter Address 2</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="row">

                        <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Address3<span className='text-danger'>*</span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={address3} onChange={(event) => handleInput('address3', event)} />
                              {errors.address3Errors && <span className='text-danger'>Please Enter Address 3</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">
                         <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">City<span className='text-danger'>*&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={city} onChange={(event) => handleInput('city', event)} />
                              {errors.cityErrors && <span className='text-danger'>Please Enter City</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>










                      </div>


                      <div className="row">

                        <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">PostCode<span className='text-danger'>*</span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={postcode} onChange={(event) => handleInput('postcode', event)} />
                              {errors.postcodeErrors && <span className='text-danger'>Please Enter Post Code</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">








                        <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Phone<span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={Phone} onChange={(event) => handleInput('phone', event)} />
                              {errors.PhoneErrors && <span className='text-danger'>Please Enter Number</span>}

                            </div>
                          </div>
                        </div>




                      </div>


                      <div className="row">

                        <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Email  <span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={email} onChange={(event) => handleInput('email', event)} />
                              {errors.emailErrors && <span className='text-danger'>Please Enter Email</span>}
                              <div className="bgcol" id="error1"></div>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="row">








                        <div className="col-auto">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Contact<span className='text-danger'>*&nbsp; &nbsp;</span></label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" value={person} onChange={(event) => handleInput('person', event)} />
                              {errors.personErrors && <span className='text-danger'>Please Enter Contact person</span>}

                            </div>
                          </div>
                        </div>


                        <div className="row">

                          <div className="col-auto">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">WebSite<span className='text-danger'>*&nbsp; &nbsp; </span></label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" value={webSite} onChange={(event) => handleInput('webSite', event)} />
                                {errors.webSiteErrors && <span className='text-danger'>Please Enter Website</span>}
                                <div className="bgcol" id="error1"></div>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="row">

                        </div>

                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group row">
                            <label class="col-sm-3 col-form-label">Logo</label>
                            <div class="col-sm-9">
                              <input class="form-control" type="file" />

                              <div class="bgcol" id="error5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button type="button" onClick={() => companyButton()} className="btn btn-gradient-primary float-end">Save</button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
              {/* </div> */}


            </div>
          </div>

        </div>
        <Footer />


      </div>


    </>
  )
}
export default CompanyProfile;