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
    let valid=true
    if (companyName == '') {
      valid=false
      eObj = { ...eObj, CompanyErrors: true };
      setCompanyNamemsg('Please Enter Company Name');
    }else if (/^[a-z]{2,}$/gi.test(companyName) == false) {
      valid=false
      eObj = { ...eObj, CompanyErrors: true };
      setCompanyNamemsg('Not A proper Name');

    }
    else {
      valid=true
      eObj = { ...eObj, CompanyErrors: false };


    }
    if (postcode == '') {
     valid=false
      eObj = { ...eObj, postcodeErrors: true };
      setPostcodemsg('Please Enter Post Code');
    }else if (/^[a-z]{2,}$/gi.test(postcode) == false) {
      valid=false
      eObj = { ...eObj, postCodeErrors: true };
      setPostcodemsg('Not A proper Name');
    }

    else {
      valid=true
      eObj = { ...eObj, postcodeErrors: false };


    }
    if (webSite == '') {
      valid=false
      eObj = { ...eObj, webSiteErrors: true };
      setWebSitemsg('Please Enter Website');
    }else if (/^[a-z]{2,}$/gi.test(webSite) == false) {
      valid=false
      eObj = { ...eObj, webSiteErrors: true };
      setWebSitemsg('Not A proper Name');
    }
    else {
      valid=true
      eObj = { ...eObj, webSiteErrors: false };


    }
    if (address == '') {
      valid=false
      eObj = { ...eObj, addressErrors: true };
      setAddressmsg('Please Enter Address 1');
    }else if (/^\w $/gi.test(address) == false) {
      valid=false
      eObj = { ...eObj, CompanyErrors: true };
      setAddressmsg('Not A proper Name');
    }
    else {
      valid=true
      eObj = { ...eObj, addressErrors: false };


    }
    if (address2 == '') {
      valid=false
      eObj = { ...eObj, address2Errors: true };
      setAddress2msg('Please Enter Address 2');
    }else if (/^\w $/gi.test(address2) == false) {
      valid=false
      eObj = { ...eObj, CompanyErrors: true };
      setAddress2msg('Not A proper Name');
    }
    else {
      valid=false
      eObj = { ...eObj, address2Errors: false };


    }
   

    if (address3 == '') {
      valid=false
      eObj = { ...eObj, address3Errors: true };
      setAddress3msg('Please Enter Address 3');
    }else if (/^\w $/gi.test(address3) == false) {
      valid=false
      eObj = { ...eObj, address3Errors: true };
      setAddress3msg('Not A proper Name');
    }
    else {
      valid=true
      eObj = { ...eObj, address3Errors: false };


    }

    if (city == '') {
      valid=false
      eObj = { ...eObj, cityErrors: true };
     
    }
    else if (/^[a-z]{2,}$/gi.test(city) == false) {
      valid=false
      eObj = { ...eObj, cityErrors: true };
     setCitymsg('Not A proper Name');

    }
   
    else {
      valid=true
      eObj = { ...eObj, cityErrors: false };


    }
   
    if (Phone == '') {
      valid=false
      eObj = { ...eObj, PhoneErrors: true };
      setPhonemsg('Please Enter Phone');
    }
    else if (/^[0-9]{2,}$/gi.test(Phone) == false) {
      valid=false
      eObj = { ...eObj, PhoneErrors: true };
      setPhonemsg('Not A proper Name');

    }
    else {
      valid=true
      eObj = { ...eObj, PhoneErrors: false };


    }
    if (email == '') {
      valid=false
      eObj = { ...eObj, emailErrors: true };
      setEmailmsg('Please Enter Email');
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false)
    {
      valid=false
      eObj = { ...eObj, emailErrors: true };
     setEmailmsg('Not A proper Name');

    }

    else {
      valid=true
      eObj = { ...eObj, emailErrors: false };


    }
    if (person == '') {
      valid=false
      eObj = { ...eObj, personErrors: true };
      setPersonmsg('Please Enter Person');
    }
    else if (/^[a-z]{2,}$/gi.test(person) == false) {
      valid=false
      eObj = { ...eObj, personErrors: true };
     setPersonmsg('Not A proper Name');

    }
   
    else {
      valid=true
      eObj = { ...eObj, personErrors: false };


    }
    

    setErrors(eObj);
    let obj1={}
    if(!valid){
      
			obj1={...obj1,Company : companyName}
			obj1={...obj1,website : webSite}
			obj1={...obj1,Address1 : address}	
			obj1={...obj1,Address2 : address2}
			obj1={...obj1,Address3 : address3}
			obj1={...obj1,postcode : postcode}
			obj1={...obj1,city : city}
			obj1={...obj1,phone : Phone}
			obj1={...obj1,person : person}
			obj1={...obj1,Email : email}
      console.log(obj1)
			

    }else{

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
                                {errors.CompanyErrors && <span className='text-danger'>{companyNamemsg}</span>}
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
                                {errors.addressErrors && <span className='text-danger'>{addressmsg}</span>}

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
                              {errors.address2Errors && <span className='text-danger'>{address2msg}</span>}
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
                              {errors.address3Errors && <span className='text-danger'>{address3msg}</span>}
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
                              {errors.cityErrors && <span className='text-danger'>{citymsg}</span>}
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
                              {errors.postcodeErrors && <span className='text-danger'>{postcodemsg}</span>}
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
                              {errors.PhoneErrors && <span className='text-danger'>{Phonemsg}</span>}

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
                              {errors.emailErrors && <span className='text-danger'>{emailmsg}</span>}
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
                              {errors.personErrors && <span className='text-danger'>{personmsg}</span>}

                            </div>
                          </div>
                        </div>


                        <div className="row">

                          <div className="col-auto">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">WebSite<span className='text-danger'>*&nbsp; &nbsp; </span></label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" value={webSite} onChange={(event) => handleInput('webSite', event)} />
                                {errors.webSiteErrors && <span className='text-danger'>{webSitemsg}</span>}
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