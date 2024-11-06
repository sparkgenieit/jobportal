import './profile.css'

import { useState, useEffect, useRef } from 'react';
import { validateIsNotEmpty } from '../../../helpers/functions/textFunctions';
import companyService from '../../../services/common/company.service';
import useShowMessage from '../../../helpers/Hooks/useShowMessage';
import { BASE_API_URL } from '../../../helpers/constants';
import httpUpload from '../../../helpers/httpUpload';
import http from '../../../helpers/http';
import { BsInfoCircle } from 'react-icons/bs';
import { getYoutubeVideoId } from '../../../helpers/functions';
import MdxEditor from '../../../components/MdxEditor';
import ConfirmDialog from '../../../components/ConfirmDialog';
import ImageResizer from './ImageResizer';
import { Modal } from 'react-bootstrap';
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser';

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
    const { _id: userId } = useCurrentUser()
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
    const [showModal, setShowModal] = useState({
        show: false,
    })
    const [showConfirm, setShowConfirm] = useState(false)

    const fetchUser = async () => {
        companyService.get(userId)
            .then(response => {
                setUserData(response.data);

                if (response.data.status === "rejected") {
                    message({ message: "Your request for the changes in profile is rejected" })
                }

                if (response.data.status === "approved") {
                    message({ status: "success", message: "Your request for the changes in profile is approved" })
                }

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
    }

    useEffect(() => {
        fetchUser()
        document.title = "Company Profile"
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

        let eObj = {};
        let valid = true

        const inputToBeValidated = ["name", "contact", "address1", "address2", "address3", "email", "phone", "city", "website", "postalCode"]

        for (const inputField of inputToBeValidated) {
            if (!validateIsNotEmpty(userData[inputField])) {
                valid = false
                eObj = { ...eObj, [inputField]: `Please enter ${inputField}` }
            }
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
            obj1 = { ...obj1, youtubeUrl: userData.youtubeUrl }
            obj1 = { ...obj1, info: info }


            try {
                if (logo) {
                    const fd = new FormData();
                    fd.append('file', logo, "file.jpeg");
                    const { data } = await companyService.uploadLogo(fd)
                    obj1 = { ...obj1, logo: data.filename }
                }
                if (banner) {
                    const fd = new FormData();
                    fd.append('file', banner, "file.jpeg");
                    const { data } = await httpUpload.post("/upload/banners?path=banners", fd)
                    obj1 = { ...obj1, banner: data.filename }
                }
                const response = await companyService.update(userId, obj1)

                message({
                    status: "Success",
                    message: "Changes sent for approval",
                    path: "/company"
                })

            } catch (e) {
                message({
                    status: "error",
                    error: e
                })
            }
            setTimeout(() => { window.scrollTo({ top: 10, behavior: "smooth" }); }, 1200)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.status === "pending") {
            setShowConfirm(true)
        } else {
            submit()
        }
    }

    const revertChanges = async () => {
        try {
            await http.put('/companies/revert-changes')
            message({
                status: "success",
                message: "Changes Reverted"
            })
            fetchUser()
        } catch (error) {
            message({
                status: "Error",
                error
            })
        }
    }


    const statusMessage = (status) => {
        switch (status) {
            case "pending":
                return (
                    <div className='d-flex flex-column gap-2'>
                        <small className='text-danger'>
                            The changes you have made previously is pending for approval
                        </small>
                        <button type='button' onClick={revertChanges} className='btn align-self-end btn-primary'>Revert Changes</button>
                    </div>
                )
            default:
                return null
        }
    }


    const handleInput = (e) => {
        let name = e.target.name;
        setUserData({ ...userData, [name]: e.target.value });
        setErrors({ ...errors, [name]: e.target.value === "" ? `Please Enter ${name}` : null })
    }

    return (
        <>
            <div class="container-fluid px-0 mt-4 bg-white">
                <div className='container'>

                    <h3 className='fs-4 text-center fw-bold '>Company Profile</h3>

                    {companyBanner && companyBanner.length > 0 &&
                        <ImageResizer width={1000} height={250} setImg={setBanner} imgSrc={companyBanner} />
                    }

                    <div style={{ maxWidth: "1000px" }} className='d-flex flex-wrap-reverse  justify-content-between w-100'>
                        <div className='d-flex flex-column'>
                            <div className='d-flex  align-items-center'>
                                <label htmlFor='logo' type='button' className=' border-0 bg-white align-self-start mt-1 text-primary text-decoration-underline'>
                                    Change Logo
                                </label>

                                <span role='button' onClick={() => setShowModal({ show: true, type: "logo" })}>
                                    <BsInfoCircle />
                                </span>
                            </div>
                            {companyLogo && companyLogo.length > 0 &&
                                <ImageResizer width={125} height={75} setImg={setLogo} imgSrc={companyLogo} />
                            }
                        </div>
                        <div className='d-flex flex-column align-items-end gap-4'>
                            <div className='d-flex  align-items-center'>
                                <label htmlFor='banner' type='button' className=' border-0 bg-white align-self-start mt-1  text-primary text-decoration-underline'>
                                    Change Banner
                                </label>
                                <span role='button' onClick={() => setShowModal({ show: true, type: "banner" })}>
                                    <BsInfoCircle />
                                </span>
                            </div>
                            {statusMessage(userData.status)}
                        </div>
                    </div>

                    <div>
                        <input hidden type="file" id="banner" accept='.jpg ,.png ,.jpeg' onChange={onFileChange} />
                        <input hidden type="file" id="logo" accept='.jpg ,.png, .jpeg' onChange={onFileChange} />
                    </div>

                    <form onSubmit={handleSubmit} className="form-sample mt-3 p-4 ">
                        <div className="row">

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Company Name<span className='text-danger'>*</span></label>
                                <div className=" col-12 col-sm-6">
                                    <input type="text" name='name' className="form-control" value={userData.name} onChange={handleInput} />
                                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address1<span className='text-danger'>*</span></label>
                                <div className=" col-12 col-sm-6">
                                    <input type="text" name='address1' className="form-control" value={userData.address1} onChange={handleInput} />
                                    {errors.address1 && <span className='text-danger'>{errors.address1}</span>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address2<span className='text-danger'>*</span></label>
                                <div className=" col-12 col-sm-6">
                                    <input type="text" className="form-control" name='address2' value={userData.address2} onChange={handleInput} />
                                    {errors.address2 && <span className='text-danger'>{errors.address2}</span>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Address3<span className='text-danger'>*</span></label>
                                <div className=" col-12 col-sm-6">
                                    <input type="text" name='address3' className="form-control" value={userData.address3} onChange={handleInput} />
                                    {errors.address3 && <span className='text-danger'>{errors.address3}</span>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">City<span className='text-danger'>*&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span></label>
                                <div className="col-sm-6">
                                    <input type="text" name='city' className="form-control" value={userData.city} onChange={handleInput} />
                                    {errors.city && <span className='text-danger'>{errors.city}</span>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">PostCode<span className='text-danger'>*</span></label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name='postalCode' value={userData.postalCode} onChange={handleInput} />
                                    {errors.postalCode && <span className='text-danger'>{errors.postalCode}</span>}
                                </div>
                            </div>


                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Phone<span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                                <div className="col-sm-6">
                                    <input type="text" name='phone' className="form-control" value={userData.phone} onChange={handleInput} />
                                    {errors.phone && <span className='text-danger'>{errors.phone}</span>}
                                </div>

                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Email<span className='text-danger'>*&nbsp; &nbsp; &nbsp;</span></label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name='email' disabled value={userData.email} onChange={handleInput} />
                                </div>

                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Contact Person<span className='text-danger'>*&nbsp; &nbsp;</span></label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name='contact' value={userData.contact} onChange={handleInput} />
                                    {errors.contact && <span className='text-danger'>{errors.contact}</span>}

                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">WebSite<span className='text-danger'>*&nbsp; &nbsp; </span></label>
                                <div className="col-sm-6">
                                    <input type="text" name='website' className="form-control" value={userData.website} onChange={handleInput} />
                                    {errors.website && <span className='text-danger'>{errors.website}</span>}
                                </div>

                            </div>

                            <div className="form-group row d-flex align-items-center">
                                <label className="col-sm-3 col-form-label ">Youtube URL</label>
                                <div className="col-sm-6 d-flex flex-column flex-md-row gap-2  align-items-center " >
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

                                <div className=" w-100 p-0">
                                    <label className="col-form-label ">Info <small>(Describe your company business in less than 250 words)</small></label>
                                    <div>
                                        <MdxEditor value={info} setValue={setInfo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-gradient-primary">Save</button>
                        </div>
                    </form>
                </div >
            </div >


            <ConfirmDialog
                showModal={showConfirm}
                onHideModal={() => setShowConfirm(false)}
                confirmText={
                    <>
                        <div className='mb-3'>You have made changes to the profile previously those changes will overwrite these changes.</div>
                        <div className='small'>Are you sure you want to overwrite those changes ?</div>
                    </>
                }
                confirmTextClasses={"mb-4"}
                buttonAttributes={
                    [
                        {
                            onClick: () => { submit(); setShowConfirm(false) },
                            text: "Yes",
                            className: " btn btn-info"
                        },
                        {
                            onClick: () => setShowConfirm(false),
                            text: "No",
                            className: "btn btn-outline-dark"
                        }
                    ]
                }
            />


            <Modal size={"sm"} show={showModal.show} onHide={() => setShowModal({ show: false })} centered>
                <Modal.Body>

                    {
                        showModal.type === "logo" &&
                        <div>
                            <p className='fw-bold'>The logo size should be : </p>
                            <p>Height:  75px</p>
                            <div>Width: 125px </div>
                        </div>
                    }

                    {
                        showModal.type === "banner" &&
                        <div>
                            <p className='fw-bold'>The banner size should be : </p>
                            <p>Height:  1000px</p>
                            <div>Width: 250px </div>
                        </div>
                    }

                </Modal.Body>
            </Modal>

        </>
    )
}
export default CompanyProfile;