import './profile.css'

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hourglass } from "react-loader-spinner";
import { BASE_API_URL } from '../../helpers/constants';
import Toaster from '../../components/Toaster';
import Header from '../../layouts/company/Header';
import Footer from '../../layouts/company/Footer';
import Sidebar from '../../layouts/company/Sidebar';
import companyService from '../../services/common/company.service';
import httpUpload from '../../helpers/httpUpload';
import { FaYoutube } from 'react-icons/fa6';
import { getYoutubeVideoId } from '../../helpers/functions';
import MdxEditor from '../../components/MdxEditor';

function CompanyProfile() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState({});
  const [loader, setLoader] = useState(false);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyLogo, setCompanyLogo] = useState()
  const [companyBanner, setCompanyBanner] = useState()
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState("")

  const youtubeRef = useRef(null)
  const bannerRef = useRef(null)
  const logoRef = useRef(null)

  const navigate = useNavigate();

  useEffect(() => {
    companyService.get(userId)
      .then(response => {
        setUserData(response.data);
        response.data.info ? setInfo(response.data.info) : setInfo("")
        if (response.data.logo.length > 0) {
          setCompanyLogo(`${BASE_API_URL}/uploads/logos/${response.data.logo}`)
        }
        if (response.data.banner.length > 0) {
          setCompanyBanner(`${BASE_API_URL}/uploads/banners/${response.data.banner}`)
        }
      })
      .catch(e => {
        console.log(e);
      })
  }, [userId])

  const onFileChange = (event) => {
    const name = event.target.id;
    if (name == 'logo') {
      setCompanyLogo(URL.createObjectURL(event.target.files[0]))
      setLogo(event.target.files[0]);
    }
    if (name == "banner") {
      setCompanyBanner(URL.createObjectURL(event.target.files[0]))
      setBanner(event.target.files[0]);
    }
  };

  const submit = async () => {
    let eObj = {};
    let valid = true

    if (userData.name == '') {
      valid = false
      eObj = { ...eObj, name: "Please Enter Company Name" };
    } else if (/^[\w ]{2,}$/gi.test(userData.name.trim()) == false) {
      valid = false
      eObj = { ...eObj, name: 'Not a Correct Company Name' };
    }
    else {
      eObj = { ...eObj, name: null };
    }

    if (userData.postalCode == '') {
      valid = false
      eObj = { ...eObj, postalCode: "Please Enter Post Code" };
    } else if (/^[0-9]{2,}$/gi.test(userData.postalCode) == false) {
      valid = false
      eObj = { ...eObj, postalCode: 'Not a Postal Code' };
    }
    else {
      eObj = { ...eObj, postalCode: null };
    }

    if (userData.website == '') {
      valid = false
      eObj = { ...eObj, website: 'Please Enter Website' };
    }
    else {
      eObj = { ...eObj, website: null };
    }

    if (userData.address1 == '') {
      valid = false
      eObj = { ...eObj, address1: 'Please Enter Address 1' };
    } else if (/^[\w ]{2,}$/gi.test(userData.address1) == false) {
      valid = false
      eObj = { ...eObj, address1: 'Not proper Address' };
    }
    else {
      eObj = { ...eObj, address1: null };
    }

    if (userData.address2 == '') {
      valid = false
      eObj = { ...eObj, address2: 'Please Enter Address 2' };
    } else if (/^[\w ]{2,}$/gi.test(userData.address2) == false) {
      valid = false
      eObj = { ...eObj, address2: 'Not proper Address' };
    }
    else {
      eObj = { ...eObj, address2: null };
    }


    if (userData.address3 == '') {
      valid = false
      eObj = { ...eObj, address3: 'Please Enter Address 3' };
    } else if (/^[\w ]{2,}$/gi.test(userData.address3) == false) {
      valid = false
      eObj = { ...eObj, address3: 'Not proper Address' };
    }
    else {
      eObj = { ...eObj, address3: null };
    }

    if (userData.city == '') {
      valid = false
      eObj = { ...eObj, city: "Please Enter City" };
    }
    else if (/^[\w ]{2,}$/gi.test(userData.city) == false) {
      valid = false
      eObj = { ...eObj, city: 'Not a City' };
    }
    else {
      eObj = { ...eObj, city: null };
    }

    if (userData.phone == '') {
      valid = false
      eObj = { ...eObj, phone: 'Please Enter Phone' };
    }
    else if (/^[0-9]{2,}$/gi.test(userData.phone) == false) {
      valid = false
      eObj = { ...eObj, phone: 'Not a  Phone Number' };
    }
    else {
      eObj = { ...eObj, phone: null };
    }

    if (userData.email == '') {
      valid = false
      eObj = { ...eObj, email: 'Please Enter Email' };
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(userData.email) == false) {
      valid = false
      eObj = { ...eObj, email: 'Not an Email' };
    }
    else {
      eObj = { ...eObj, email: null };
    }

    if (userData.contact == '') {
      valid = false
      eObj = { ...eObj, contact: 'Please Enter Contact' };
    }
    else if (/^[a-z ]{2,}$/gi.test(userData.contact.trim()) == false) {
      valid = false
      eObj = { ...eObj, contact: 'Not a proper Name' };
    }
    else {
      eObj = { ...eObj, contact: null };
    }

    setErrors(eObj);

    if (valid) {
      let obj1 = {}
      obj1 = { ...obj1, name: userData.name.trim() }
      obj1 = { ...obj1, website: userData.website }
      obj1 = { ...obj1, address1: userData.address1 }
      obj1 = { ...obj1, address2: userData.address2 }
      obj1 = { ...obj1, address3: userData.address3 }
      obj1 = { ...obj1, postalCode: userData.postalCode }
      obj1 = { ...obj1, city: userData.city }
      obj1 = { ...obj1, phone: userData.phone }
      obj1 = { ...obj1, contact: userData.contact.trim() }
      obj1 = { ...obj1, email: userData.email }
      obj1 = { ...obj1, youtubeUrl: userData.youtubeUrl }
      obj1 = { ...obj1, info: info }


      try {
        if (logo) {
          const fd = new FormData();
          fd.append('file', logo);
          const { data } = await companyService.uploadLogo(fd)
          obj1 = { ...obj1, logo: data.filename }
        }
        if (banner) {
          const fd = new FormData();
          fd.append('file', banner);
          const { data } = await httpUpload.post("/upload/banners?path=banners", fd)
          obj1 = { ...obj1, banner: data.filename }
        }
        const response = await companyService.update(userId, obj1)
        setMessage({
          show: true,
          type: "success",
          text: "Updated Successfully"
        })
        setTimeout(() => {
          // Inside the handleLogin function
          window.scrollTo({ top: 10, behavior: "smooth" });
          navigate('/company'); // Redirect to the dashboard after login
        }, 1500);

      } catch (e) {
        console.log(e)
        setMessage({
          show: true,
          type: "error",
          text: e.response.data.email || e.response.data.message || e.message
        })
        setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)
      }
    }
  }

  const handleInput = (e) => {
    let name = e.target.name;
    setUserData({ ...userData, [name]: e.target.value });
    if (e.target.value == '') {
      setErrors({ ...errors, [name]: `Please Enter ${name}` })
    }
    else {
      setErrors({ ...errors, [name]: null })
    }
  }

  return (
    <>
      <div className="container-scroller">

        <Header />
        <div class="container-fluid page-body-wrapper">
          <Sidebar />
          <div class="container-fluid">

            {/* <div className="page-header">
                <h3 className="page-title"> Employer Profile </h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Employer</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                  </ol>
                </nav>
              </div> */}
            <Toaster message={message} setMessage={setMessage} />


            <div className="col-12 bg-white">
              {/* <div className="card"> */}
              <div className="card-body container ">

                {/* <h4 className="card-title">Employer Profile </h4> */}

                {companyBanner && companyBanner.length > 0 &&
                  <div className='border mb-4' style={{ width: "1000px", height: "250px" }}>
                    <img className='rounded ' style={{ width: "1000px", height: "250px" }} src={companyBanner} alt='banner_photo' />
                  </div>
                }
                <div className='d-flex justify-content-between'>

                  <div className='d-flex gap-3'>
                    {companyLogo && companyLogo.length > 0 &&
                      <div>
                        <img className='rounded' style={{ width: "120px", height: "75px" }} src={companyLogo} />
                      </div>
                    }
                    <div>
                      <button type='button' style={{ backgroundColor: "blue" }} className='my-button text-white' onClick={() => { logoRef.current.click() }}>
                        <small>
                          Change Logo <br />
                          75 px height <br />
                          120px width
                        </small>
                      </button>
                    </div>
                  </div>
                  <div>

                    {userData.youtubeUrl && <div className='position-relative'  >
                      <iframe
                        ref={youtubeRef}
                        className='rounded no-scrollbar'
                        width="150px"
                        height="80px"
                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(userData.youtubeUrl)}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                      <span role='button' onClick={() => { youtubeRef.current.requestFullscreen() }} style={{ right: "40px", top: "5px" }} className='position-absolute'>
                        <FaYoutube fontSize={70} fill="#FF3D00" />
                      </span>
                    </div>}

                  </div>

                  <div>
                    <button type='button' style={{ backgroundColor: "#04045b" }} className='my-button text-white' onClick={() => { bannerRef.current.click() }} >
                      <small>
                        Change Banner
                        <br />
                        250 px height <br />
                        1000px width

                      </small>
                    </button>
                  </div>
                </div>

                <div style={{ display: "none" }}>
                  <input ref={bannerRef} type="file" id="banner" onChange={onFileChange} />
                  <input ref={logoRef} type="file" id="logo" onChange={onFileChange} />
                </div>

                <form className="form-sample mt-3 p-4 ">
                  <div className="row">
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Company<span className='text-danger'>*</span></label>
                        <div className="col-sm-6">
                          <input type="text" name='name' className="form-control" value={userData.name} onChange={handleInput} />
                          {errors.name && <span className='text-danger'>{errors.name}</span>}
                        </div>
                      </div>

                    </div>

                    <div className="row">

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Address1<span className='text-danger'>*</span></label>
                        <div className="col-sm-6">
                          <input type="text" name='address1' className="form-control" value={userData.address1} onChange={handleInput} />
                          {errors.address1 && <span className='text-danger'>{errors.address1}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="row">

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Address2<span className='text-danger'>*</span></label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name='address2' value={userData.address2} onChange={handleInput} />
                          {errors.address2 && <span className='text-danger'>{errors.address2}</span>}
                        </div>

                      </div>

                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Address3<span className='text-danger'>*</span></label>
                        <div className="col-sm-6">
                          <input type="text" name='address3' className="form-control" value={userData.address3} onChange={handleInput} />
                          {errors.address3 && <span className='text-danger'>{errors.address3}</span>}

                        </div>
                      </div>


                    </div>

                    <div className="row">

                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">City<span className='text-danger'>*&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></label>
                        <div className="col-sm-6">
                          <input type="text" name='city' className="form-control" value={userData.city} onChange={handleInput} />
                          {errors.city && <span className='text-danger'>{errors.city}</span>}
                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">PostCode<span className='text-danger'>*</span></label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name='postalCode' value={userData.postalCode} onChange={handleInput} />
                          {errors.postalCode && <span className='text-danger'>{errors.postalCode}</span>}

                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Phone<span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                        <div className="col-sm-6">
                          <input type="text" name='phone' className="form-control" value={userData.phone} onChange={handleInput} />
                          {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Email<span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name='email' disabled value={userData.email} onChange={handleInput} />

                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Contact Person<span className='text-danger'>*&nbsp; &nbsp;</span></label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name='contact' value={userData.contact} onChange={handleInput} />
                          {errors.contact && <span className='text-danger'>{errors.contact}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">WebSite<span className='text-danger'>*&nbsp; &nbsp; </span></label>
                        <div className="col-sm-6">
                          <input type="text" name='website' className="form-control" value={userData.website} onChange={handleInput} />
                          {errors.website && <span className='text-danger'>{errors.website}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Youtube URL</label>
                        <div className="col-sm-6">
                          <input type="text" className="form-control" name='youtubeUrl' value={userData.youtubeUrl} onChange={handleInput} />
                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="form-group row">
                        <label className="col-form-label">Info (Describe your company business in less than 250 words)</label>

                        <div >
                          <MdxEditor value={info} setValue={setInfo} />
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