import './profile.css'

import { useState, useEffect, useRef } from 'react';
import { Hourglass } from "react-loader-spinner";

import { BASE_API_URL } from '../../helpers/constants';
import companyService from '../../services/common/company.service';
import httpUpload from '../../helpers/httpUpload';
import { getYoutubeVideoId } from '../../helpers/functions';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import MdxEditor from '../../components/MdxEditor';
import ImageResizer from '../../components/ImageResizer';
import { validateEmailAddress, validateIsNotEmpty } from '../../helpers/functions/textFunctions';

const formInitialValues = {
  name: "",
  postalCode: "",
  city: "",
  address1: "",
  address2: "",
  address3: "",
  phone: "",
  email: "",
  website: "",
  contact: ""
}

function CompanyProfile() {
  const [userId, setUserId] = useState(localStorage.getItem('user_id') || '');
  const [userData, setUserData] = useState(formInitialValues);
  const [loader, setLoader] = useState(false);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyLogo, setCompanyLogo] = useState()
  const [companyBanner, setCompanyBanner] = useState()
  const [errors, setErrors] = useState({})
  const [info, setInfo] = useState("")
  const message = useShowMessage()
  const youtubeRef = useRef(null)
  const bannerRef = useRef(null)
  const logoRef = useRef(null)

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
        message({ status: "error", error: e })
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

  const submit = async (e) => {
    e.preventDefault();
    let eObj = {};
    let valid = true

    const inputToBeValidated = ["name", "contact", "address1", "address2", "address3", "email", "phone", "city", "website", "postalCode"]

    for (const inputField of inputToBeValidated) {
      if (!validateIsNotEmpty(userData[inputField])) {
        valid = false
        eObj = { ...eObj, [inputField]: `Please enter ${inputField}` }
      }
    }

    if (!validateEmailAddress(userData.email)) {
      valid = false
      eObj = { ...eObj, email: `Invalid Email` }
    }

    if (!valid) setErrors(eObj)

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

        message({
          status: "Success",
          message: "Updated Successfully",
          path: "/company"
        })

      } catch (e) {
        message({
          status: "error",
          error: e
        })
        setTimeout(() => { setLoader(false); window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)
      }
    }
  }

  const handleInput = (e) => {
    let name = e.target.name;
    setUserData({ ...userData, [name]: e.target.value });
    setErrors({ ...errors, [name]: e.target.value === "" ? `Please Enter ${name}` : null })
  }

  return (
    <>
      <div class="container-fluid">
        <div className="col-12 bg-white">
          <div className="card-body container ">

            <div className='mb-4'>
              {companyBanner && companyBanner.length > 0 &&
                <ImageResizer width={1000} height={250} setImage={setBanner} defaultImg={companyBanner} />
              }
            </div>
            <div style={{ width: "1000px" }} className='d-flex justify-content-between'>

              <div className='d-flex'>

                {companyLogo && companyLogo.length > 0 &&
                  <ImageResizer width={120} height={75} setImage={setLogo} defaultImg={companyLogo} />
                }

                <button type='button' style={{ backgroundColor: "blue" }} className='my-button align-self-center text-white' onClick={() => { logoRef.current.click() }}>
                  <small>
                    Change Logo <br />
                    75 px height <br />
                    120px width
                  </small>
                </button>

              </div>

              <div>
                <button type='button' style={{ backgroundColor: "#04045b" }} className='my-button px-2 text-white' onClick={() => { bannerRef.current.click() }} >
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

            <form onSubmit={submit} className="form-sample mt-3 p-4 ">
              <div className="row">
                <div className="row">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Company Name<span className='text-danger'>*</span></label>
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
                <div className="row ">
                  <div className="form-group row d-flex align-items-center">
                    <label className="col-sm-3 col-form-label ">Youtube URL</label>
                    <div className="col-sm-6 d-flex gap-2  align-items-center " >
                      <div className='w-100'>
                        <input type="text" className="form-control" name='youtubeUrl' value={userData.youtubeUrl} onChange={handleInput} />
                      </div>
                      {userData.youtubeUrl && <div className='position-relative'  >
                        <iframe
                          ref={youtubeRef}
                          className='rounded no-scrollbar'
                          width="150px"
                          height="80px"
                          src={`https://www.youtube.com/embed/${getYoutubeVideoId(userData.youtubeUrl)}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        {/* <span role='button' onClick={() => { youtubeRef.current.requestFullscreen() }} style={{ right: "40px", top: "5px" }} className='position-absolute'>
                              <FaYoutube fontSize={70} fill="#FF3D00" />
                            </span> */}
                      </div>}

                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="form-group row">
                    <label className="col-form-label">Info (Describe your company business in less than 250 words)</label>

                    <div>
                      <MdxEditor value={info} setValue={setInfo} />
                    </div>


                  </div>
                </div>




              </div>

              <div className="row">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-gradient-primary float-end">Save</button>
                </div>
              </div>

            </form>
          </div>
        </div>
        {/* </div> */}



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