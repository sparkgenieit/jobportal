import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../../../layouts/company/Footer";
import Header from "../../../layouts/company/Header";
import Sidebar from "../../../layouts/company/Sidebar";
import http from "../../../helpers/http"
import ViewProfileData from "../../../components/ViewProfileData"

export default function AppliedUserProfile() {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [jobTypes, setJobTypes] = useState(null)

    useEffect(() => {
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
    }, [])

    return <>
        <div className="container-scrollar">
            <Header />
            <div class="container-fluid page-body-wrapper">
                <Sidebar />
                <div class="container-fluid">
                    <div class="content-wrapper">
                        <div class="page-header">
                            <h3 class="page-title">User's Profile</h3>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">Employer</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">User's Profile</li>
                                </ol>
                            </nav>
                        </div>
                        <div class="row">
                            <div class="card-body  bg-white ">
                                <div className="p-2">
                                    {user && <ViewProfileData user={user} JobTypes={jobTypes} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
}