import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import http from "../../../helpers/http"
import ViewProfileData from "../../../components/ViewProfileData"

export default function AppliedUserProfile() {
    const params = useParams()
    const [searchParams] = useSearchParams()
    const jobId = searchParams.get("j")
    const [user, setUser] = useState(null)
    const [jobTypes, setJobTypes] = useState(null)
    const [isShorlisted, setIsShorlisted] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        fetchStatus();
    }, [])

    const fetchData = async () => {
        try {
            const res = await http.get(`/users/profile/${params.userId}`)
            setUser(res.data)
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
            setIsShorlisted(data.shortlisted)
        } catch (error) {
            setIsShorlisted(false)
        }
    }

    const handleShortListButton = async (value) => {
        const data = {
            userId: user.user_id,
            jobId,
            value
        }
        try {
            const res = await http.patch("/companies/shortlist-candidate", data)
            fetchStatus()
        }
        catch (err) {
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    return <>

        <div class="container-fluid">
            <div className="content-wrapper bg-white">
                <div class="page-header">
                    <a onClick={goBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </a>
                    <h3 class="page-title">

                        Resume
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Employer</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Resume</li>
                        </ol>
                    </nav>
                </div>
                <div class="row">
                    <div class="card-body  bg-white ">
                        <div className="p-2">
                            <div className="d-flex justify-content-end">

                                <button onClick={() => { handleShortListButton(isShorlisted ? false : true) }} className="btn btn-success rounded">
                                    {isShorlisted ? "Unshortlist" : "Shortlist Candidate"}
                                </button>

                            </div>
                            {user && <ViewProfileData user={user} JobTypes={jobTypes} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}