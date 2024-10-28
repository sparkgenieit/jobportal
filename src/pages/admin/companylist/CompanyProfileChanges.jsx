import { useEffect, useState } from "react"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import { tryCatch } from "../../../helpers/functions"
import http from "../../../helpers/http"
import { useParams } from "react-router-dom"
import { markdownToPlainText } from "../../../helpers/functions/textFunctions"
import { BASE_API_URL } from "../../../helpers/constants"
import { FaArrowRight } from "react-icons/fa";

export default function CompanyProfileChanges() {
    const [profile, setProfile] = useState(null)
    const [processing, setProcessing] = useState(false)
    const params = useParams()

    const message = useShowMessage()

    const approve = async () => {

        setProcessing(true)

        const { data, error } = await tryCatch(() => http.put(`/companies/profiles/approve/${profile.company_id}`))

        if (error) {
            message({ status: "error", error })
        }

        if (data) {
            message({ status: "success", message: "Changes Approved", path: "/admin/profiles/assigned" })
        }
        setProcessing(false)
    }

    const reject = async () => {
        setProcessing(true)

        const { data, error } = await tryCatch(() => http.put(`/companies/profiles/reject/${profile.company_id}`))

        if (error) {
            message({ status: "error", error })
        }

        if (data) {
            message({ status: "success", message: "Changes Rejected", path: "/admin/profiles/assigned" })
        }
        setProcessing(false)
    }

    const fetchassignedProfiles = async () => {

        const { data, error } = await tryCatch(() => http.get(`/companies/profiles/changed-profile/${params.id}`))
        if (error) {
            message({
                status: "Error",
                error,
                path: "/admin/profiles/assigned"
            })
        }

        if (data) {
            setProfile(data)
        }
    }


    const ProfileField = ({ field, label, photo }) => {

        if (photo) {
            return (
                <div className="row" >
                    <span className="col-3">{label} :</span>
                    {(profile?.old_profile[field] === profile?.new_profile[field] || !profile?.new_profile[field]) ?
                        <img style={{ height: "8rem", width: "8rem" }} src={`${BASE_API_URL}/uploads/${field}s/${profile?.old_profile[field]}`} className="col rounded-3" />
                        :
                        <div className="d-flex align-items-center col gap-5">
                            <img style={{ height: "8rem", width: "8rem" }} src={`${BASE_API_URL}/uploads/${field}s/${profile?.old_profile[field]}`} className=" rounded-3" />
                            <FaArrowRight fontSize={20} />
                            <img style={{ height: "8rem", width: "8rem" }} src={`${BASE_API_URL}/uploads/${field}s/${profile?.new_profile[field]}`} className=" rounded-3" />
                        </div>
                    }
                </div >
            )
        }


        switch (field) {
            case "email":
                return (
                    <div className="row" >
                        <span className="col-3">{label} :</span>
                        <span className="col"> {profile?.old_profile[field]}</span>
                    </div >
                )
            case "info":
                return (
                    <div className="row">
                        {profile?.new_profile[field] && <span className="col-3">{label} :</span>}
                        {profile?.old_profile[field] === profile?.new_profile[field] ?
                            <span className="col small"> {markdownToPlainText(profile?.old_profile[field])}</span>
                            :
                            <span className="col">
                                <div className="text-decoration-line-through text-danger small">{markdownToPlainText(profile?.old_profile[field])}</div>
                                <div className="text-success fw-bold small">{markdownToPlainText(profile?.new_profile[field])}</div>
                            </span>
                        }
                    </div>
                )
            default:
                return (
                    <div className="row" >
                        {profile?.new_profile[field] && <span className="col-3">{label} :</span>}
                        {profile?.old_profile[field] === profile?.new_profile[field] ?
                            <span className="col"> {profile?.new_profile[field]}</span>
                            :
                            <span className="d-flex gap-4  col">
                                <span className="text-decoration-line-through text-danger">{profile?.old_profile[field]}</span>
                                <span className="text-success fw-bold">{profile?.new_profile[field]}</span>
                            </span>
                        }
                    </div>
                )
        }
    }


    useEffect(() => {
        fetchassignedProfiles()
        document.title = "Profiles Changes"
    }, [])


    return (
        <div className="container-fluid content-wrapper mt-2 bg-white">

            <h1 className="text-center fw-bold fs-4 mb-2">{profile?.old_profile?.name} Profile Changes</h1>

            <div className="d-flex gap-3 justify-content-end mb-3">
                <button type="button" className="btn btn-success" disabled={processing} onClick={approve}>Approve</button>
                <button type="button" className="btn btn-danger" disabled={processing} onClick={reject}>Reject</button>
            </div>

            {profile &&
                <div className="d-flex flex-column gap-4">
                    <ProfileField field={"name"} label={"Name"} />
                    <ProfileField field={"address1"} label={"Address 1"} />
                    <ProfileField field={"address2"} label={"Address 2"} />
                    <ProfileField field={"address3"} label={"Address 3"} />
                    <ProfileField field={"city"} label={"City"} />
                    <ProfileField field={"postalCode"} label={"Postal code"} />
                    <ProfileField field={"email"} label={"Email"} />
                    <ProfileField field={"contact"} label={"Contact Person"} />
                    <ProfileField field={"website"} label={"Website"} />
                    <ProfileField field={"youtubeUrl"} label={"Youtube url"} />
                    <ProfileField field={"info"} label={"Info"} />
                    <ProfileField field={"logo"} label={"Logo"} photo />
                    <ProfileField field={"banner"} label={"Banner "} photo />
                </div>
            }
        </div>
    )
}