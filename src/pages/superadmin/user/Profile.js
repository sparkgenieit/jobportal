import Header from "../../../layouts/superadmin/Header";
import Sidebar from "../../../layouts/superadmin/Sidebar";
import Footer from "../../../layouts/superadmin/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../../helpers/http";
import ViewProfileData from "../../../components/ViewProfileData";
import EmployerProfile from "../../../components/EmployerProfile";

export default function Profile() {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [jobTypes, setJobTypes] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Profile"

        if (params.user == "User") {
            http.get(`/users/profile/${params.userId}`)
                .then((res) => {
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
                })
                .catch(err => {
                    setUser({})
                })
        }
        if (params.user == "Employer") {
            http.get(`/companies/profile/${params.userId}`)
                .then((res) => {
                    setUser(res.data)
                })
                .catch(err => {
                    setUser({})
                })
        }

    }, [])

    const goBack = () => {
        navigate(-1)
    }


    return (
        <>

            <div class="container-fluid">
                <div className="content-wrapper bg-white">
                    <div class="page-header">
                        <a onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg>
                        </a>
                        <h3 class="page-title">

                            {params.user} Profile
                        </h3>
                    </div>
                    <div class="row">
                        <div class="card-body  bg-white ">
                            <div className="p-2">
                                {params.user === "User" && user && <ViewProfileData user={user} JobTypes={jobTypes} />}
                                {params.user === "Employer" && user && <EmployerProfile user={user} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

