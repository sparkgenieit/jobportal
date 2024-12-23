import Sidebar from '../../../layouts/common/Sidebar';
import { useState, useEffect } from 'react';
import userService from '../../../services/common/user.service';
import ValidInNZBox from '../../../components/ValidInNZBox';
import DescriptionBox from '../../../components/DescriptionBox';
import useShowMessage from '../../../helpers/Hooks/useShowMessage';
import useCurrentUser from '../../../helpers/Hooks/useCurrentUser';
import { validateIsNotEmpty } from '../../../helpers/functions/textFunctions';


const Input = ({ error, ...props }) => {
    return <>
        <input  {...props} />
        {error && <span className='text-danger small'>{error}</span>}
    </>
}

function UserProfile() {
    const user = useCurrentUser()
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState(null)
    const [workDate, setWorkDate] = useState(true)
    const [certificateDate, setCertificateDate] = useState(true)
    const [licenceDate, setLicenceDate] = useState(true)
    const [works, setWorks] = useState([{ jobTitle: '', employer: '', location: '', fromDate: '', toDate: '', description: '' }]);
    const [education, setEducation] = useState([{ educationProvider: '', qualification: '', yearCompleted: '', validInNZ: '', description: '' }]);
    const [licences, setLicences] = useState([{ licenseName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }]);
    const [certificates, setCertificates] = useState([{ certificateName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }]);

    const message = useShowMessage()

    const [cv, setCv] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [isCvUploaded, setisCvUploaded] = useState(false)
    const [isCoverUploaded, setisCoverUploaded] = useState(false)


    useEffect(() => {

        document.title = "Edit Profile"

        userService.get(user._id)
            .then(response => {
                setUserData(response.data);

                if (response.data?.work_history?.length > 0) setWorks(response.data.work_history);

                if (response.data?.licences?.length > 0) setLicences(response.data.licences);

                if (response.data?.work_history?.length > 0) setEducation(response.data.education)

                if (response.data?.certification?.length > 0) setCertificates(response.data.certification)

                if (response.data.cv) {
                    setisCvUploaded(true)
                    setCv(response.data.cv)
                }

                if (response.data.coverLetter) {
                    setisCoverUploaded(true)
                    setCoverLetter(response.data.coverLetter)
                }

            })
            .catch(() => {
                setUserData(null)
            })
    }, [])



    // On file select (from the pop up)
    const onFileChange = (event) => {
        const name = event.target.id;

        const file = event.target.files[0]
        const fileExtension = file.name.split('.').pop().toLowerCase();

        const acceptedExtensions = ["pdf"]

        if (!acceptedExtensions.includes(fileExtension)) {
            message({ status: "error", error: { message: "Resume and cover letter should only be in pdf format" } })
            return
        }

        if (name === 'cv') {
            setisCvUploaded(true)
            setErrors({ ...errors, cv: null })
            setCv(file);
        }

        if (name === 'coverLetter') {
            setisCoverUploaded(true)
            setErrors({ ...errors, coverLetter: null })
            setCoverLetter(file);
        }

    };


    const validatedate = (fromDate, toDate) => {

        const fromDateTimestamp = new Date(fromDate).getTime();
        const toDateTimestamp = new Date(toDate).getTime();
        if (fromDateTimestamp > toDateTimestamp) {
            return false
        } else {
            return true
        }
    }

    const handleWorks = (key, value, work, index) => {
        const wrks = works;
        work[key] = value;

        wrks[index] = work;
        setWorks([...wrks]);
        setWorkDate(validatedate(work.fromDate, work.toDate));

    }

    const handleEducation = (key, value, edu, index) => {
        const educa = education;
        edu[key] = value;

        educa[index] = edu;
        setEducation([...educa]);


    }

    const handleLicenses = (key, value, licence, index) => {
        const lice = licences;
        licence[key] = value;
        lice[index] = licence;
        setLicences([...lice]);
        setLicenceDate(validatedate(licence.issueDate, licence.expiryDate))
    }

    const handleCertificates = (key, value, certificate, index) => {
        const certi = certificates;
        certificate[key] = value;
        certi[index] = certificate;
        setCertificates([...certi]);
        setCertificateDate(validatedate(certificate.issueDate, certificate.expiryDate))
    }

    const preferredjobstypes = event => {
        const value = event.target.value
        let jobTypes = userData.preferredJobTypes

        if (jobTypes?.includes(value)) {
            jobTypes = jobTypes.replace(value, "").trim()
        } else {
            jobTypes = jobTypes + " " + value
        }
        setUserData({ ...userData, preferredJobTypes: jobTypes })
    }

    const SubmitData = async () => {

        let obj = {};

        let isValid = true;

        const validationFields = ["first_name", "last_name", "profile_summary", "visaType"]

        validationFields.forEach((field) => {
            const value = userData[field]
            if (!validateIsNotEmpty(value)) {
                isValid = false
                obj[field] = "This field is required"
            }
        })


        if (!isCvUploaded) {
            isValid = false
            obj.cv = "This field is required"
        }

        if (!isCoverUploaded) {
            isValid = false
            obj.coverLetter = "This field is required"
        }

        if (isValid) {
            const UserProfile = {
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone: userData.phone,
                profile_summary: userData.profile_summary,
                work_history: works,
                education: education,
                licences: licences,
                certification: certificates,
                skills: userData.skills,
                preferredJobCategories: userData.preferredJobCategories,
                preferredJobLocations: userData.preferredJobLocations,
                expectedRatePerHour: userData.expectedRatePerHour,
                visaType: userData.visaType,
                visaExpiryDate: userData.visaExpiryDate,
                availability: userData.availability,
                noticePeriod: userData.noticePeriod,
                preferredJobTypes: userData.preferredJobTypes
            };

            try {
                // IF CV IS UPLOADED
                if (cv) {
                    const cvFile = new FormData();
                    cvFile.append('file', cv);
                    const res = await userService.uploadCV(cvFile)
                    UserProfile.cv = res.data.filename;
                }

                // IF COVERLETTER IS UPLAODED
                if (coverLetter) {
                    const coverFile = new FormData();
                    coverFile.append('file', coverLetter)
                    const { data } = await userService.uploadCoverLetter(coverFile)
                    UserProfile.coverLetter = data.filename
                }

                await userService.update(user._id, UserProfile)

                message({
                    status: 'success',
                    message: 'User Profile Update Success',
                    path: "/viewprofile"
                })

            } catch (error) {
                message({
                    status: "error",
                    error
                })
            }
        } else {
            setErrors(obj)
        }
    }

    const addWork = () => setWorks([...works, { jobTitle: '', employer: '', location: '', fromDate: '', toDate: '', description: '' }])
    const deleteWork = (i) => {
        const wrks = works;
        wrks.splice(i, 1);
        setWorks([...wrks])
    }

    const addEdu = () => { setEducation([...education, { educationProvider: '', qualification: '', yearCompleted: '', validInNZ: '', description: '' }]) }
    const deleteEdu = (i) => {
        const educa = education;
        educa.splice(i, 1);
        setEducation([...educa])
    }
    const addLic = () => setLicences([...licences, { licenseName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }])
    const deleteLic = (i) => {
        const lice = licences;
        lice.splice(i, 1);
        setLicences([...lice])
    }

    const addcer = () => setCertificates([...certificates, { certificateName: '', issuingAuthority: '', issueDate: '', expiryDate: '', validInNZ: '', description: '' }])
    const deleteCer = (i) => {
        const certi = certificates;
        certi.splice(i, 1);
        setCertificates([...certi])
    }

    const getCheckedValue = value => {
        const jobTypes = userData?.preferredJobTypes
        if (jobTypes?.includes(value)) {
            return true
        } else {
            return false
        }
    }


    const handleChange = e => {
        const name = e.target.name
        const value = e.target.value
        setUserData({ ...userData, [name]: value })
        setErrors({ ...errors, [name]: value.trim() ? null : "This field is required" })
    }

    return <>
        <div className="page-body-wrapper">
            <Sidebar />
            <div className="container-fluid">

                <div className="content-wrapper bg-white ">
                    <h2 className='fw-bold fs-4 text-center mb-4'>User Profile</h2>
                    <div className="row bg-white">
                        <form className="form-sample">
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">First Name <span className='text-danger'>*</span></label>
                                        <div className="col-sm-9">
                                            <Input error={errors?.first_name} type="text" name="first_name" value={userData?.first_name} className="form-control" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Last Name <span className='text-danger'>*</span></label>
                                        <div className="col-sm-9">
                                            <Input error={errors?.last_name} type="text" name="last_name" value={userData?.last_name} className="form-control" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Email <span className='text-danger'>*</span></label>
                                        <div className="col-sm-9">
                                            <Input type="text" name="email" value={userData?.email} disabled className="form-control" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Mobile</label>
                                        <div className="col-sm-9">
                                            <Input type="number" name="phone" value={userData?.phone} className="form-control" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label">Personal Summary<span className='text-danger'>*</span></label>
                                        <div className="col-sm-12">
                                            <textarea className="form-control" value={userData?.profile_summary} name='profile_summary' onChange={handleChange} />
                                            {errors?.profile_summary && <div className="small text-danger"> {errors?.profile_summary}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="card-description mt-3"><strong>Work History</strong></p>
                            <div className="row">
                                <div className="col-md-12">
                                    {works.map((work, index) => {
                                        return (
                                            <div className="form-group row">
                                                <div key={index} className="col-md-12">
                                                    <div className="form-group row">
                                                        <div className="col-md-2">
                                                            <label className="col-sm-1 col-form-label">JobTitle</label>
                                                            <input type="text" className="form-control" value={work.jobTitle} onChange={(event) => handleWorks("jobTitle", event.target.value, work, index)} />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="col-sm-2 col-form-label">Employer</label>
                                                            <input type="text" className="form-control" value={work.employer} onChange={(event) => handleWorks("employer", event.target.value, work, index)} />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="col-sm-2 col-form-label">Location</label>
                                                            <input type="text" className="form-control" value={work.location} onChange={(event) => handleWorks("location", event.target.value, work, index)} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="col-sm-3 col-form-label">From</label>
                                                            <input type="date" className="form-control" value={work.fromDate} onChange={(event) => handleWorks("fromDate", event.target.value, work, index)} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="col-sm-3 col-form-label">To</label>
                                                            <input type="date" className="form-control" value={work.toDate} onChange={(event) => handleWorks("toDate", event.target.value, work, index)} />
                                                        </div>


                                                        <div className="col-md-9">
                                                            <div className="form-group row">
                                                                <DescriptionBox value={work.description} functionName={handleWorks} arrayName={work} index={index} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className='mt-2'></div>
                                                            {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addWork(index)} >+</button>}
                                                            {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteWork(index)} >-</button>}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>)
                                    })
                                    }
                                    {!workDate && <div className='text-danger px-4 pb-3'>From date cannot be after To date </div>}
                                </div>
                            </div>

                            <p className="card-description mt-3"><strong>Education</strong></p>
                            <div className="row">
                                <div className="col-md-12">
                                    {
                                        education.map((edu, index) => {
                                            return (
                                                <div key={index} className="col-md-12">
                                                    <div className="form-group row">
                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label "><small>Education Provider</small></label>
                                                            <input type="text" className="form-control" value={edu.educationProvider} onChange={(event) => handleEducation("educationProvider", event.target.value, edu, index)} />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label "><small>Qualification</small></label>
                                                            <input type="text" className="form-control " value={edu.qualification} onChange={(event) => handleEducation("qualification", event.target.value, edu, index)} />
                                                            <div className="bgred" id="error12"></div>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label "><small>Year Completed</small></label>
                                                            <input type="number" className="form-control" value={edu.yearCompleted} onChange={(event) => handleEducation("yearCompleted", event.target.value, edu, index)} />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <ValidInNZBox validInNZ={edu.validInNZ} functionName={handleEducation} arrayName={edu} index={index} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-9">
                                                                <div className="form-group row">
                                                                    <DescriptionBox value={edu.description} functionName={handleEducation} arrayName={edu} index={index} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-2">
                                                                {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addEdu(index)} >+</button>}
                                                                {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteEdu(index)} >-</button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <p className="card-description mt-3"><strong>Licences</strong></p>
                            <div className="row">
                                <div className="col-md-12">
                                    {
                                        licences.map((licence, index) => {
                                            return (
                                                <div key={index} className="col-md-12">
                                                    <div className="form-group row">
                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label"><small>Licence Name</small></label>
                                                            <input type="text" className="form-control" value={licence.licenseName} onChange={(event) => handleLicenses("licenseName", event.target.value, licence, index)} />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label"><small>Issuing Authority</small></label>
                                                            <input type="text" className="form-control" value={licence.issuingAuthority} onChange={(event) => handleLicenses("issuingAuthority", event.target.value, licence, index)} />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="col-sm-12 col-form-label"><small>Issue Date</small></label>
                                                            <input type="date" className="form-control" value={licence.issueDate} onChange={(event) => handleLicenses("issueDate", event.target.value, licence, index)} />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="col-sm-12 col-form-label"><small>Expiry Date</small></label>
                                                            <input type="date" className="form-control" value={licence.expiryDate} onChange={(event) => handleLicenses("expiryDate", event.target.value, licence, index)} />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <ValidInNZBox validInNZ={licence.validInNZ} functionName={handleLicenses} arrayName={licence} index={index} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-9">
                                                                <div className="form-group row">
                                                                    <DescriptionBox value={licence.description} functionName={handleLicenses} arrayName={licence} index={index} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-2">
                                                                {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addLic(index)} >+</button>}
                                                                {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteLic(index)} >-</button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {!licenceDate && <div className='text-danger px-4 pb-3'>From date cannot be after To date </div>}
                                </div>
                            </div>
                            <p className="card-description mt-3"><strong>Certifications</strong></p>
                            <div className="row">
                                <div className="col-md-12">
                                    {
                                        certificates.map((certificate, index) => {
                                            return (
                                                <div key={index} className="col-md-12">
                                                    <div className="form-group row">
                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label"><small>Certificate Name</small></label>

                                                            <input type="text" className="form-control" value={certificate.certificateName} onChange={(event) => handleCertificates("certificateName", event.target.value, certificate, index)} />
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="col-sm-12 col-form-label"><small>Issuing Authority</small></label>

                                                            <input type="text" className="form-control" value={certificate.issuingAuthority} onChange={(event) => handleCertificates("issuingAuthority", event.target.value, certificate, index)} />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="col-sm-12 col-form-label"><small>Issue Date</small></label>

                                                            <input type="date" className="form-control" value={certificate.issueDate} onChange={(event) => handleCertificates("issueDate", event.target.value, certificate, index)} />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="col-sm-12 col-form-label"><small>Expiry Date</small></label>

                                                            <input type="date" className="form-control" value={certificate.expiryDate} onChange={(event) => handleCertificates("expiryDate", event.target.value, certificate, index)} />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <ValidInNZBox validInNZ={certificate.validInNZ} functionName={handleCertificates} arrayName={certificate} index={index} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-9">
                                                                <div className="form-group row">
                                                                    <DescriptionBox value={certificate.description} functionName={handleCertificates} arrayName={certificate} index={index} />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-2">
                                                                {index == 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => addcer(index)} >+</button>}
                                                                {index > 0 && <button type='button' className='btn btn-outline-primary my-4' onClick={() => deleteCer(index)} >-</button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {!certificateDate && <div className='text-danger px-4 pb-3'>From date cannot be after To date </div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Skills</label>
                                        <div className="col-sm-12">
                                            <Input type="text" className="form-control" value={userData?.skills} name="skills" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="form-group row">
                                    <label> Availability </label>
                                    <div className="col-6 px-2 d-flex align-items-center">
                                        <input type="checkbox" className="mx-2" checked={userData?.availability} onChange={(e) => setUserData({ ...userData, availability: e.target.checked })} />
                                        Immediately
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="form-group row">
                                            <label className="col-sm-7 col-form-label">Enter number of weeks notice period </label>
                                            <div className="col-sm-5">
                                                <Input type="text" className="form-control" value={userData?.noticePeriod} name="noticePeriod" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="card-description mt-3">Preferred Job Types</p>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <input type="checkbox" className="col-sm-12 form-check-input" value="Full Time" checked={getCheckedValue("Full Time")} onChange={preferredjobstypes} /> Full Time
                                        </div>
                                        <div className="col-md-4">
                                            <input type="checkbox" className="col-sm-11 form-check-input" value="Part Time" checked={getCheckedValue("Part Time")} onChange={preferredjobstypes} /> Part Time
                                        </div>
                                        <div className="col-md-4">
                                            <input type="checkbox" className="col-sm-11 form-check-input" value="Casual" checked={getCheckedValue("Casual")} onChange={preferredjobstypes} /> Casual
                                        </div>
                                        <div className="col-md-4">
                                            <input type="checkbox" className="col-sm-11 form-check-input" value="Contract" checked={getCheckedValue("Contract")} onChange={preferredjobstypes} /> Contract
                                        </div>
                                        <div className="col-md-4">
                                            <input type="checkbox" className="col-sm-11 form-check-input" value="Freelance" checked={getCheckedValue("Freelance")} onChange={preferredjobstypes} /> Freelance
                                        </div>
                                        <div className="col-md-4">
                                            <input type="checkbox" className="col-sm-12 form-check-input" value="Temporary" checked={getCheckedValue("Temporary")} onChange={preferredjobstypes} /> Temporary
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label">Preferred Locations</label>
                                        <div className="col-sm-12">
                                            <Input type="text" className="form-control" value={userData?.preferredJobLocations} name="preferredJobLocations" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Preferred Job Category</label>
                                        <div className="col-sm-7">
                                            <Input type="text" className="form-control" value={userData?.preferredJobCategories} name="preferredJobCategories" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Expected Rate Per Hour </label>
                                        <div className="col-sm-7">
                                            <Input type="number" className="form-control" name="expectedRatePerHour" value={userData?.expectedRatePerHour} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row">
                                    <div className="col-md-9">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Show Profile <span className='text-danger'>*</span></label>
                                            <div className="col-sm-9">
                                                <select className=" form-select form-control" name='showProfile' value={userData?.showProfile} onChange={handleChange}>
                                                    <option>---Select---</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                                {errors?.showProfile && <div className="small text-danger"> {errors?.showProfile}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label">Visa Type <span className='text-danger'>*</span></label>
                                        <div className="col-sm-12">
                                            <select className="form-select form-control" name='visaType' value={userData?.visaType} onChange={handleChange}>
                                                <option value={""}>---Select---</option>
                                                <option>Working holiday visa</option>
                                                <option>Work visa</option>
                                                <option>Student visa</option>
                                                <option>Permanet Resident</option>
                                                <option>NZ citizen</option>
                                                <option>Others </option>
                                            </select>
                                            {errors?.visaType && <div className="small text-danger">{errors?.visaType}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label">Visa Expiry Date </label>
                                        <div className="col-sm-12">
                                            <Input className="form-control" type="date" name='visaExpiryDate' value={userData?.visaExpiryDate} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row">
                                        <label className="col-sm-5 col-form-label">Upload CV  <span className='text-danger'>*</span></label>
                                        <div className="col-sm-7">
                                            <Input type="file" id="cv" className="form-control" onChange={onFileChange} error={errors?.cv} />
                                            <div>{isCoverUploaded ? "Already Uploaded" : null}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-9">
                                    <div className="form-group row d-flex align-items-start">
                                        <label className="col-sm-5 col-form-label">Upload Cover Letter <span className='text-danger'>*</span></label>
                                        <div className="col-sm-7">
                                            <Input type="file" className="form-control" id="coverLetter" onChange={onFileChange} error={errors?.coverLetter} />
                                            <div>{isCoverUploaded ? "Already Uploaded" : null}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 d-flex justify-content-end">
                                <button type="button" onClick={SubmitData} className="btn btn-gradient-primary me-2">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    </>
}


export default UserProfile;
