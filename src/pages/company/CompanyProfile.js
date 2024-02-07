import Header from '../../layouts/company/Header';
import Footer from '../../layouts/company/Footer';
import Sidebar from '../../layouts/company/Sidebar';
import { useState } from 'react';
import Head from '../../layouts/company/Head';

function CompanyProfile() {
  const [companyName, setCompanyName] = useState("");

  const [category, setCategory] = useState('');
  const [webSite, setWebSite] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [mission, setMission] = useState("");
  const [work, setWork] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkdin, setLinkdin] = useState("");





  const [errors, setErrors] = useState({
    CompanyErrors: false,
    categoryErrors: false,
    webSiteErrors: false,
    addressErrors: false,
    address2Errors: false,
    stateErrors: false,
    postalCodeErrors: false,
    cityErrors: false,
    countryErrors: false,
    aboutCompanyErrors: false,
    missionErrors: false,
    workErrors: false,
    facebookErrors: false,
    instagramErrors: false,
    linkdinErrors: false



  })



  const companyButton = () => {
    let eObj = {};
    if (companyName == '') {
      eObj = { ...eObj, CompanyErrors: true };
    }
    else {
      eObj = { ...eObj, CompanyErrors: false };


    }
    if (category == '') {
      eObj = { ...eObj, categoryErrors: true };
    }
    else {
      eObj = { ...eObj, categoryErrors: false };


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
    if (state == '') {
      eObj = { ...eObj, stateErrors: true };
    }
    else {
      eObj = { ...eObj, stateErrors: false };


    }

    if (postalCode == '') {
      eObj = { ...eObj, postalCodeErrors: true };
    }
    else {
      eObj = { ...eObj, postalCodeErrors: false };


    }

    if (city == '') {
      eObj = { ...eObj, cityErrors: true };
    }
    else {
      eObj = { ...eObj, cityErrors: false };


    }
    if (country == '') {
      eObj = { ...eObj, countryErrors: true };
    }
    else {
      eObj = { ...eObj, countryErrors: false };


    }

    if (aboutCompany == '') {
      eObj = { ...eObj, aboutCompanyErrors: true };
    }
    else {
      eObj = { ...eObj, aboutCompanyErrors: false };


    }
    if (mission == '') {
      eObj = { ...eObj, missionErrors: true };
    }
    else {
      eObj = { ...eObj, missionErrors: false };


    }
    if (work == '') {
      eObj = { ...eObj, workErrors: true };
    }
    else {
      eObj = { ...eObj, workErrors: false };


    }
    if (facebook == '') {
      eObj = { ...eObj, facebookErrors: true };
    }
    else {
      eObj = { ...eObj, facebookErrors: false };


    }
    if (instagram == '') {
      eObj = { ...eObj, instagramErrors: true };
    }
    else {
      eObj = { ...eObj, instagramErrors: false };


    }
    if (linkdin == '') {
      eObj = { ...eObj, linkdinErrors: true };
    }
    else {
      eObj = { ...eObj, linkdinErrors: false };


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
    if (name == 'category') {
      setCategory(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, categoryErrors: true })

      }
      else {
        setErrors({ ...errors, categoryErrors: false })
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
    if (name == 'state') {
      setState(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, stateErrors: true })

      }
      else {
        setErrors({ ...errors, stateErrors: false })
      }

    }
    if (name == 'postalCode') {
      setPostalCode(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, postalCodeErrors: true })

      }
      else {
        setErrors({ ...errors, postalCodeErrors: false })
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
    if (name == 'country') {
      setCountry(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, countryErrors: true })

      }
      else {
        setErrors({ ...errors, countryErrors: false })
      }

    }

    if (name == 'aboutCompany') {
      setAboutCompany(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, aboutCompanyErrors: true })

      }
      else {
        setErrors({ ...errors, aboutCompanyErrors: false })
      }

    }

    if (name == 'mission') {
      setMission(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, missionErrors: true })

      }
      else {
        setErrors({ ...errors, missionErrors: false })
      }

    }

    if (name == 'work') {
      setWork(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, workErrors: true })

      }
      else {
        setErrors({ ...errors, workErrors: false })
      }

    }
    if (name == 'facebook') {
      setFacebook(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, facebookErrors: true })

      }
      else {
        setErrors({ ...errors, facebookErrors: false })
      }

    }
    if (name == 'instagram') {
      setInstagram(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, instagramErrors: true })

      }
      else {
        setErrors({ ...errors, instagramErrors: false })
      }

    }
    if (name == 'linkdin') {
      setLinkdin(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, linkdinErrors: true })

      }
      else {
        setErrors({ ...errors, linkdinErrors: false })
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

      <div className="row">
        <div className="col-12 bg-white">
          {/* <div className="card"> */}
          <div className="card-body p-3">
            <h4 className="card-title">Employer Profile </h4>
            <form className="form-sample">


              <div className="row">
                <div className="row">


                  <div className="col-md-6">

                    <div className="row mt-3">
                      <label className="col-3 col-form-label mb-3">Company<span className='text-danger'>*</span></label>
                      <div className="col-9">
                        <input type="text" className="form-control" value={companyName} onChange={(event) => handleInput('companyName', event)} />
                        {errors.CompanyErrors && <span className='text-danger'>Please enter Company Name</span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Category<span className='text-danger'>*</span></label>
                      <div className="col-sm-9">
                        <select className="form-control " value={category} onChange={(event) => handleInput('category', event)}  >
                          <option >IT</option>
                          <option>Non-IT</option>

                        </select>
                        {errors.categoryErrors && <span className='text-danger'>Please select category</span>}

                      </div>
                    </div>
                    <div className="row">
                      <label className="col-3 col-form-label mb-3">WebSite<span className='text-danger'>*</span></label>
                      <div className="col-9">
                        <input type="text" className="form-control" value={webSite} onChange={(event) => handleInput('webSite', event)} />
                        {errors.webSiteErrors && <span className='text-danger'>Please enter webSite URL</span>}
                      </div>

                    </div>

                  </div>

                  <p className="Location h4 my-4"> Location </p>

                  <div className="row">

                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Address1<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" class="form-control" value={address} onChange={(event) => handleInput('address', event)} />
                          {errors.addressErrors && <span className='text-danger'>Please enter Address1</span>}
                          <div className="bgcol" id="error"></div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Address2<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <input type="text" class="form-control" value={address2} onChange={(event) => handleInput('address2', event)} />
                          {errors.address2Errors && <span className='text-danger'>Please enter Address2</span>}
                          <div className="bgcol" id="error2"></div>
                        </div>
                      </div>
                    </div>


                  </div>

                  <div className="row">

                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">State<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={state} onChange={(event) => handleInput('state', event)} />
                          {errors.stateErrors && <span className='text-danger'>Please enter state</span>}
                          <div className="bgcol" id="error1"></div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Postalcode<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <input type="text" className="form-control" value={postalCode} onChange={(event) => handleInput('postalCode', event)} />
                          {errors.postalCodeErrors && <span className='text-danger'>Please enter Postalcode</span>}

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">City<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={city} onChange={(event) => handleInput('city', event)} />
                          {errors.cityErrors && <span className='text-danger'>Please enter City</span>}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Country<span className='text-danger'>*</span></label>
                        <div className="col-sm-8">
                          <select className="form-control mt-3" value={country} onChange={(event) => handleInput('country', event)}>
                            <option>India</option>
                            <option>Italy</option>
                            <option>Russia</option>
                            <option>Britain</option>
                          </select>
                          {errors.countryErrors && <span className='text-danger'>Please select country</span>}
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Logo</label>
                          <div class="col-sm-9">
                            <input class="form-control" type="file"  />

                            <div class="bgcol" id="error5"></div>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">About<span className='text-danger'>*</span></label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" value={aboutCompany} onChange={(event) => handleInput('aboutCompany', event)} />
                            {errors.aboutCompanyErrors && <span className='text-danger'>Please enter About</span>}

                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 ">
                        <div className="form-group row ">
                          <label className="col-sm-3 col-form-label ">Mission<span className='text-danger'>*</span></label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control " value={mission} onChange={(event) => handleInput('mission', event)} />
                            {errors.missionErrors && <span className='text-danger'>Please enter Mission</span>}

                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Cluture<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={work} onChange={(event) => handleInput('work', event)} />
                          {errors.workErrors && <span className='text-danger'>Please enter Work</span>}

                        </div>
                      </div>
                    </div>
                    <p className="Social Links h4"> Social Links</p>
                    <div className="row">
                      <div className="col-md-7">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Facebook<span className='text-danger'>*</span></label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" value={facebook} onChange={(event) => handleInput('facebook', event)} />
                            {errors.facebookErrors && <span className='text-danger'>Please enter facebook ID</span>}
                            <div className="bgcol" id="error8"></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-7">
                        <div className="form-group row">
                          <label class="col-sm-3 col-form-label">Instagram<span className='text-danger'>*</span></label>
                          <div className="col-sm-9">
                            <input type="text" className="form-control" value={instagram} onChange={(event) => handleInput('instagram', event)} />
                            {errors.instagramErrors && <span className='text-danger'>Please enter instagram ID</span>}
                            <div className="bgcol" id="error9"></div>
                          </div>
                        </div>
                      </div>
                   

                    <div className="col-md-7">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Linkedin<span className='text-danger'>*</span></label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" value={linkdin} onChange={(event) => handleInput('linkdin', event)} />
                          {errors.linkdinErrors && <span className='text-danger'>Please enter linkdin ID</span>}
                          <div className="bgcol" id="error10"></div>
                        </div>
                      </div>
                    </div>
                    </div>
                   

                    
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <button type="button" onClick={() => companyButton()} className="btn btn-gradient-primary me-2">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* </div> */}
        </div>


      </div>
    </div>
    <Footer />


  </div>
</div>
</div>
    </>
  )
}
export default CompanyProfile;