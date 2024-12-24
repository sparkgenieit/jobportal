import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import http from "../../../helpers/http"
import { getDate } from "../../../helpers/functions/dateFunctions"
import { BASE_API_URL } from "../../../helpers/constants"
import { getFileName } from "../../../helpers/functions/textFunctions"

export default function AppliedUserProfile() {
    const params = useParams()
    const [searchParams] = useSearchParams()
    const jobId = searchParams.get("j")
    const [user, setUser] = useState(null)
    const [jobTypes, setJobTypes] = useState(null)
    const [userJobStatus, setUserJobStatus] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchStatus();
    }, [])

    const fetchData = async () => {
        try {
            const res = await http.get(`/users/profile/${params.userId}`)
            setUser(res.data)
            document.title = res.data.first_name + " " + res.data.last_name
            let jobtype = res.data.preferredJobTypes[0]
            let jobs = []
            for (const key in jobtype) {
                const element = jobtype[key];
                if (element === true) {
                    jobs.push(key)
                }
            }
            setJobTypes(jobs)

        }

        catch (err) {
            setUser({})
        }
    }

    const fetchStatus = async () => {
        try {
            const { data } = await http.get(`/jobs/user-job-status/${params.userId}?jobId=${jobId}`)
            setUserJobStatus(data)
        } catch (error) {
            setUserJobStatus(null)
        }
    }

    const handleShortListButton = async (value) => {
        const data = {
            userId: user.user_id,
            jobId,
            value
        }
        try {
            await http.patch("/companies/shortlist-candidate", data)
            fetchStatus()
        }
        catch (err) {
        }
    }


    const handleDownload = (filename, foldername) => {
        return (e) => {
            e.preventDefault();
            fetch(`${BASE_API_URL}/uploads/${foldername}/${filename}`, {
                responseType: "blob",
            })
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = getFileName(filename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch((error) => {
                    console.error("Error fetching the file:", error);
                });
        }
    }

    const goBack = () => navigate(-1)

    return (
        <div className="my-4 responsive-font  container-md">
            <div className="d-flex position-relative">
                <a onClick={goBack} className="position-absolute start-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                </a>
                <h3 className="text-center fs-4 fw-bold flex-grow-1 mb-3">Resume</h3>
            </div>

            <div className="d-flex justify-content-end">
                <button onClick={() => { handleShortListButton(userJobStatus?.shortlisted ? false : true) }} className="btn btn-success rounded">
                    {userJobStatus?.shortlisted ? "Unshortlist" : "Shortlist Candidate"}
                </button>
            </div>


            {user &&
                <>
                    <div className="row gap-4 row-cols-1 row-cols-md-2 py-3 ">

                        <div className=" row">
                            <label className="fw-bold col-6">First Name</label>
                            <div className="col-6">{user.first_name}</div>
                        </div>

                        <div className=" row ">
                            <label className="fw-bold col-6">Last Name</label>
                            <div className="col-6">{user.last_name}</div>
                        </div>

                        <div className=" row">
                            <label className="fw-bold col-6">Email Address</label>
                            <div className="col-6">{user.email}</div>
                        </div>

                        <div className=" row">
                            <label className="fw-bold col-6">Mobile</label>
                            <div className="col-6">{user.phone}</div>
                        </div>

                        <div className=" row">
                            <label className="fw-bold col-6">Notice Period</label>
                            <div className="col-6">{user.noticePeriod}</div>
                        </div>

                        <div className=" row">
                            <label className="fw-bold col-6">Expected rate per hour</label>
                            <div className="col-6">{user.expectedRatePerHour}</div>
                        </div>

                        <div className=" row">
                            <label className="fw-bold col-6">Visa Type</label>
                            <div className="col-6">{user.visaType}</div>
                        </div>

                        <div className=" row">
                            <label className="fw-bold col-6">Visa Expiry Date</label>
                            <div className="col-6">{getDate(user.visaExpiryDate)}</div>
                        </div>
                        <div className="row">
                            <label className="fw-bold col-6">Availability</label>
                            <div className="col-6">{user.availability === "true" ? "Yes" : "No"}</div>
                        </div>
                    </div>

                    <div className="d-flex flex-column gap-3">

                        <div className="row ">
                            <div className="row col-md-6">
                                <label className="fw-bold col-6">Skills</label>
                                <div className="col-6">{user.skills}</div>
                            </div>
                        </div>

                        <div className="row ">
                            <label className="fw-bold col-3">Uploaded CV</label>
                            {userJobStatus?.cv &&
                                <a className="col" type="button" onClick={handleDownload(userJobStatus?.cv?.filename, "cvs")}>
                                    {userJobStatus?.cv?.originalname}
                                </a>
                            }
                        </div>

                        <div className="row">
                            <label className="fw-bold col-3">Uploaded Cover Letter</label>
                            {userJobStatus?.coverLetter &&
                                <a className="col" type="button" onClick={handleDownload(userJobStatus?.coverLetter?.filename, "coverletters")}>
                                    {userJobStatus?.coverLetter?.originalname}
                                </a>
                            }
                        </div>

                        <div className="d-flex flex-column">
                            <label className="fw-bold">Profile Summary</label>
                            <p>{user.profile_summary}</p>
                        </div>


                        <div className="col-md-6">
                            <label className="fw-bold py-2">Work History</label>

                            {user.work_history?.map((work, index) => (
                                <div className="py-2" key={index}>
                                    <div className="row">
                                        <label className="fw-bold col-3">Job Title</label>
                                        <div className="col-6">{work.jobTitle}</div>
                                    </div>

                                    <div className="row">
                                        <label className="fw-bold col-3">Employer</label>
                                        <div className="col-6">{work.employer}</div>
                                    </div>

                                    <div className="row">
                                        <label className="fw-bold col-3">Location</label>
                                        <div className="col-6">{work.location}</div>
                                    </div>

                                    <div className="row">
                                        <label className="fw-bold col-3">From</label>
                                        <div className="col-6">{getDate(work.fromDate)}</div>
                                    </div>
                                    <div className="row">
                                        <label className="fw-bold col-3">To</label>
                                        <div className="col-6">{getDate(work.toDate)}</div>
                                    </div>
                                    <label className="fw-bold">Description</label>
                                    <p>{work.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="mt-3 fw-bold"><strong>Education :</strong></p>
                    <div className="row">
                        <div className=" small  table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='border-bottom'>
                                        <th>Education Provider</th>
                                        <th>Qualification</th>
                                        <th>Year Completed</th>
                                        <th>Valid in NZ?</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.education && user.education.length > 0 && user.education.map((x, index) => (
                                        <tr className='border-bottom' key={index}>
                                            <td>{x.educationProvider}</td>
                                            <td>{x.qualification}</td>
                                            <td>{x.yearCompleted}</td>
                                            <td>{x.validInNZ}</td>
                                            <td>{x.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p className="mt-3 fw-bold"><strong>Licences :</strong></p>

                    <div className="small table-responsive">
                        <table className="table">
                            <thead>
                                <tr className='border-bottom'>
                                    <th>Licence Name</th>
                                    <th>Issuing Authority</th>
                                    <th>Issue Date</th>
                                    <th>Expiry Date</th>
                                    <th>Valid in NZ?</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.licences && user.licences.length > 0 && user.licences.map((x, index) => (
                                    <tr className='border-bottom' key={index}>
                                        <td>{x.licenseName}</td>
                                        <td>{x.issuingAuthority}</td>
                                        <td>{x.issueDate && new Date(x.issueDate).toLocaleDateString('en-GB')}</td>
                                        <td>{x.expiryDate && new Date(x.expiryDate).toLocaleDateString('en-GB')}</td>
                                        <td>{x.validInNZ}</td>
                                        <td>{x.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="mt-3 fw-bold"><strong>Certifications :</strong></p>
                    <div className="small table-responsive">
                        <table className="table">
                            <thead>
                                <tr className='border-bottom'>
                                    <th>Certificate Name</th>
                                    <th>Issuing Authority</th>
                                    <th>Issue Date</th>
                                    <th>Expiry Date</th>
                                    <th>Valid in NZ?</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.certification && user.certification.length > 0 && user.certification.map((x, index) => (
                                    <tr className='border-bottom' key={index}>
                                        <td>{x.certificateName}</td>
                                        <td>{x.issuingAuthority}</td>
                                        <td>{getDate(x.issueDate)}</td>
                                        <td>{getDate(x.expiryDate)}</td>
                                        <td>{x.validInNZ}</td>
                                        <td>{x.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div >
    )
}