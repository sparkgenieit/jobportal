import Header from '../../layouts/company/Header';
import Footer from '../../layouts/company/Footer';
import Sidebar from '../../layouts/company/Sidebar';
import { useState, useEffect } from 'react';
import Head from '../../layouts/company/Head';
import companyService from '../../services/common/company.service';
import { useNavigate } from 'react-router-dom';


import { Hourglass } from "react-loader-spinner";



function CompanyProfile() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [userData, setUserData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

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
  const [loader, setLoader] = useState(false);
  const [logo, setLogo] = useState();


  const navigate = useNavigate();


  const [companyNamemsg, setCompanyNamemsg] = useState("Please Enter Company Name");
  const [webSitemsg, setWebSitemsg] = useState('Please Enter Website');
  const [addressmsg, setAddressmsg] = useState('Please Enter Address 1');
  const [address2msg, setAddress2msg] = useState('Please Enter Address 2');
  const [postcodemsg, setPostcodemsg] = useState('Please Enter Post Code');
  const [address3msg, setAddress3msg] = useState("Please Enter Address 3");
  const [citymsg, setCitymsg] = useState("Please Enter City");
  const [Phonemsg, setPhonemsg] = useState("Please Enter Phone Number");
  const [personmsg, setPersonmsg] = useState("Please Enter Contact Person");
  const [emailmsg, setEmailmsg] = useState("Please Enter Email");
  const [companyPhoto, setCompanyPhoto] = useState("")

  useEffect(() => {

    companyService.get(userId)
      .then(response => {

        setCompanyName(response.data.name);
        setAddress(response.data.address1);
        setAddress2(response.data.address2);
        setAddress3(response.data.address3);
        setPostcode(response.data.postalCode);
        setPhone(response.data.phone);
        setPerson(response.data.contact);
        setCity(response.data.city);
        setWebSite(response.data.website);
        setEmail(response.data.email);
        setLogo(response.data.logo);
        setUserData(response.data);
        setCompanyPhoto(`http://localhost:8080/uploads/logos/${response.data.logo}`)

      })
      .catch(e => {
        console.log(e);
      })
  }, [userId])


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
    logo: false
  })


  const onFileChange = (event) => {
    const name = event.target.id;

    if (name == 'logo') {
      setCompanyPhoto(URL.createObjectURL(event.target.files[0]))
      setLogo(event.target.files[0]);
    }
  };

  const submit = () => {
    let eObj = {};
    let valid = true

    if (companyName == '') {
      valid = false
      eObj = { ...eObj, CompanyErrors: true };
      setCompanyNamemsg('Please Enter Company Name');
    } else if (/^[a-z ]{2,}$/gi.test(companyName.trim()) == false) {
      valid = false
      eObj = { ...eObj, CompanyErrors: true };
      setCompanyNamemsg('Not a Correct Company Name');

    }
    else {
      valid = true
      eObj = { ...eObj, CompanyErrors: false };
    }

    if (postcode == '') {
      valid = false
      eObj = { ...eObj, postcodeErrors: true };
      setPostcodemsg('Please Enter Post Code');
    } else if (/^[0-9]{2,}$/gi.test(postcode) == false) {
      valid = false
      eObj = { ...eObj, postCodeErrors: true };
      setPostcodemsg('Not a Post Code');
    }
    else {
      valid = true
      eObj = { ...eObj, postcodeErrors: false };
    }

    if (webSite == '') {
      valid = false
      eObj = { ...eObj, webSiteErrors: true };
      setWebSitemsg('Please Enter Website');
    }
    else {
      valid = true
      eObj = { ...eObj, webSiteErrors: false };
    }

    if (address == '') {
      valid = false
      eObj = { ...eObj, addressErrors: true };
      setAddressmsg('Please Enter Address 1');
    } else if (/^\w{2,} $/gi.test(address) == false) {
      valid = false
      eObj = { ...eObj, CompanyErrors: true };
      setAddressmsg('Not proper Address');
    }
    else {
      valid = true
      eObj = { ...eObj, addressErrors: false };
    }

    if (address2 == '') {
      valid = false
      eObj = { ...eObj, address2Errors: true };
      setAddress2msg('Please Enter Address 2');
    } else if (/^\w{2,} $/gi.test(address2) == false) {
      valid = false
      eObj = { ...eObj, CompanyErrors: true };
      setAddress2msg('Not proper Address');
    }
    else {
      valid = false
      eObj = { ...eObj, address2Errors: false };
    }


    if (address3 == '') {
      valid = false
      eObj = { ...eObj, address3Errors: true };
      setAddress3msg('Please Enter Address 3');
    } else if (/^\w{2,}$/gi.test(address3) == false) {
      valid = false
      eObj = { ...eObj, address3Errors: true };
      setAddress3msg('Not proper Address');
    }
    else {
      valid = true
      eObj = { ...eObj, address3Errors: false };
    }

    if (city == '') {
      valid = false
      eObj = { ...eObj, cityErrors: true };
    }
    else if (/^\w{2,}$/gi.test(city) == false) {
      valid = false
      eObj = { ...eObj, cityErrors: true };
      setCitymsg('Not a City');
    }
    else {
      valid = true
      eObj = { ...eObj, cityErrors: false };
    }

    if (Phone == '') {
      valid = false
      eObj = { ...eObj, PhoneErrors: true };
      setPhonemsg('Please Enter Phone');
    }
    else if (/^[0-9]{2,}$/gi.test(Phone) == false) {
      valid = false
      eObj = { ...eObj, PhoneErrors: true };
      setPhonemsg('Not a Number');
    }
    else {
      valid = true
      eObj = { ...eObj, PhoneErrors: false };
    }

    if (email == '') {
      valid = false
      eObj = { ...eObj, emailErrors: true };
      setEmailmsg('Please Enter Email');
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false) {
      valid = false
      eObj = { ...eObj, emailErrors: true };
      setEmailmsg('Not an Email');
    }
    else {
      valid = true
      eObj = { ...eObj, emailErrors: false };
    }

    if (person == '') {
      valid = false
      eObj = { ...eObj, personErrors: true };
      setPersonmsg('Please Enter Person');
    }
    else if (/^[a-z ]{2,}$/gi.test(person.trim()) == false) {
      valid = false
      eObj = { ...eObj, personErrors: true };
      setPersonmsg('Not a proper Name');
    }
    else {
      valid = true
      eObj = { ...eObj, personErrors: false };
    }


    setErrors(eObj);
    let obj1 = {}
    if (valid) {

      obj1 = { ...obj1, name: companyName.trim() }
      obj1 = { ...obj1, website: webSite }
      obj1 = { ...obj1, address1: address }
      obj1 = { ...obj1, address2: address2 }
      obj1 = { ...obj1, address3: address3 }
      obj1 = { ...obj1, postalCode: postcode }
      obj1 = { ...obj1, city: city }
      obj1 = { ...obj1, phone: Phone }
      obj1 = { ...obj1, contact: person.trim() }
      obj1 = { ...obj1, email: email }


      if (logo) {
        const fd = new FormData();
        fd.append('file', logo);

        companyService.uploadLogo(fd)
          .then(response => {
            obj1 = { ...obj1, logo: response.data.filename }
            companyService.update(userId, obj1)
              .then(response => {
                console.log(response.data);
                window.scrollTo({ top: 10, behavior: "smooth" });
                setIsUpdated(true);
                setTimeout(() => {

                  // Inside the handleLogin function
                  navigate('/company'); // Redirect to the dashboard after login
                }, 1500);

              })
              .catch(e => {
                console.log(e);

                if (e && e.code) {
                  if (e.response && e.response.data) {
                    if (e.response.data.email) {
                      setErrors({ updateError: e.response.data.email });
                    }

                    if (e.response.data.message) {
                      setErrors({ updateError: e.response.data.message });
                    }
                  } else {
                    setErrors({ updateError: e.message });
                  }
                }
                setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)


              });
          });

      } else {

        companyService.update(userId, obj1)
          .then(response => {
            console.log(response.data);
            window.scrollTo({ top: 10, behavior: "smooth" });
            setIsUpdated(true);
            setTimeout(() => {
              // Inside the handleLogin function
              navigate('/company') // Redirect to the dashboard after login
            }, 1500);

          })
          .catch(e => {
            console.log(e);

            if (e && e.code) {
              if (e.response && e.response.data) {
                if (e.response.data.email) {
                  setErrors({ updateError: e.response.data.email });
                }

                if (e.response.data.message) {
                  setErrors({ updateError: e.response.data.message });
                }
              } else {
                setErrors({ updateError: e.message });
              }
            }
            setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)


          });
      }

    } else {

    }

  }
  const handleInput = (name, event) => {
    if (name == 'companyName') {
      setCompanyName(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, CompanyErrors: true })
        setCompanyNamemsg('Please Enter Company Name');

      }
      else {
        setErrors({ ...errors, CompanyErrors: false })
      }

    }
    if (name == 'postcode') {
      setPostcode(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, postcodeErrors: true })
        setPostcodemsg('Please Enter Post Code');


      }
      else {
        setErrors({ ...errors, postcodeErrors: false })
      }

    }
    if (name == 'webSite') {
      setWebSite(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, webSiteErrors: true })
        setWebSitemsg('Please Enter Website');


      }

      else {
        setErrors({ ...errors, webSiteErrors: false })
      }

    }
    if (name == 'address') {
      setAddress(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, addressErrors: true })
        setAddressmsg('Please Enter Address 1');


      }
      else {
        setErrors({ ...errors, addressErrors: false })
      }

    }
    if (name == 'address2') {
      setAddress2(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, address2Errors: true })
        setAddress2msg('Please Enter Address 2');


      }
      else {
        setErrors({ ...errors, address2Errors: false })
      }

    }
    if (name == 'address3') {
      setAddress3(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, address3Errors: true })
        setAddress3msg('Please Enter Address 3');

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
        setCitymsg('Please Enter City');

      }
      else {
        setErrors({ ...errors, cityErrors: false })
      }

    }
    if (name == 'phone') {
      setPhone(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, PhoneErrors: true })
        setPhonemsg('Please Enter Phone');
      }

      else {
        setErrors({ ...errors, PhoneErrors: false })
      }

    }

    if (name == 'email') {
      setEmail(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, emailErrors: true })
        setEmailmsg('Please Enter Email');

      }
      else {
        setErrors({ ...errors, emailErrors: false })
      }

    }

    if (name == 'person') {
      setPerson(event.target.value);
      if (event.target.value == '') {
        setErrors({ ...errors, personErrors: true })
        setPersonmsg('Please Enter Person');

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
          <div class="container-fluid">
            {errors && errors.updateError && <div class="alert alert-danger" role="alert">
              {errors && errors.updateError}</div>}
            {isUpdated && <div class="alert alert-success" role="alert">
              User Profile Updated successfully!
            </div>}

            {!isUpdated && <div className="content-wrapper">
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
                  <form className="form-sample p-4 ">


                    <div className="row">
                      <div className="row">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Company<span className='text-danger'>*</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={companyName} onChange={(event) => handleInput('companyName', event)} />
                            {errors.CompanyErrors && <span className='text-danger'>{companyNamemsg}</span>}
                            <div className="bgcol" id="error1"></div>
                          </div>
                        </div>


                      </div>

                      <div className="row">

                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Address1<span className='text-danger'>*</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={address} onChange={(event) => handleInput('address', event)} />
                            {errors.addressErrors && <span className='text-danger'>{addressmsg}</span>}


                          </div>
                        </div>

                      </div>
                      <div className="row">

                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Address2<span className='text-danger'>*</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={address2} onChange={(event) => handleInput('address2', event)} />
                            {errors.address2Errors && <span className='text-danger'>{address2msg}</span>}
                            <div className="bgcol" id="error1"></div>
                          </div>

                        </div>

                      </div>
                      <div className="row">


                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Address3<span className='text-danger'>*</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={address3} onChange={(event) => handleInput('address3', event)} />
                            {errors.address3Errors && <span className='text-danger'>{address3msg}</span>}
                            <div className="bgcol" id="error1"></div>
                          </div>
                        </div>


                      </div>

                      <div className="row">

                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">City<span className='text-danger'>*&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={city} onChange={(event) => handleInput('city', event)} />
                            {errors.cityErrors && <span className='text-danger'>{citymsg}</span>}
                            <div className="bgcol" id="error1"></div>
                          </div>

                        </div>


                      </div>


                      <div className="row">


                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">PostCode<span className='text-danger'>*</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={postcode} onChange={(event) => handleInput('postcode', event)} />
                            {errors.postcodeErrors && <span className='text-danger'>{postcodemsg}</span>}
                            <div className="bgcol" id="error1"></div>
                          </div>
                        </div>


                      </div>

                      <div className="row">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Phone<span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={Phone} onChange={(event) => handleInput('phone', event)} />
                            {errors.PhoneErrors && <span className='text-danger'>{Phonemsg}</span>}

                          </div>
                        </div>

                      </div>


                      <div className="row">

                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Email  <span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={email} onChange={(event) => handleInput('email', event)} />
                            {errors.emailErrors && <span className='text-danger'>{emailmsg}</span>}
                            <div className="bgcol" id="error1"></div>
                          </div>

                        </div>

                      </div>

                      <div className="row">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">Contact Person<span className='text-danger'>*&nbsp; &nbsp;</span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={person} onChange={(event) => handleInput('person', event)} />
                            {errors.personErrors && <span className='text-danger'>{personmsg}</span>}

                          </div>

                        </div>

                      </div>
                      <div className="row">


                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">WebSite<span className='text-danger'>*&nbsp; &nbsp; </span></label>
                          <div className="col-sm-6">
                            <input type="text" className="form-control" value={webSite} onChange={(event) => handleInput('webSite', event)} />
                            {errors.webSiteErrors && <span className='text-danger'>{webSitemsg}</span>}

                          </div>

                        </div>

                      </div>
                      <div class="row">

                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Logo</label>
                          <div class="col-sm-6">
                            <input type="file" id="logo" className="form-control" onChange={onFileChange} />

                            {errors && errors.logo && <div className="error text-danger"> {errors.logo}</div>}


                            <div class="bgcol" id="error5"></div>
                            {logo && <img width="200px" height="200px" src={companyPhoto} />}


                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button type="button" onClick={() => submit()} className="btn btn-gradient-primary float-end">Save</button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
              {/* </div> */}


            </div>}
          </div>

        </div>
        <Footer />


      </div>
      <Hourglass
        visible={loader}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{ position: 'absolute', top: '80%', left: '50%' }}
        wrapperClass=""
        colors={['#0ea2bd', '#72a1ed']}
      />

    </>
  )
}
export default CompanyProfile;