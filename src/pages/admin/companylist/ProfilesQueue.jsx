import { useEffect, useState } from "react"
import { tryCatch } from "../../../helpers/functions"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import http from "../../../helpers/http"
import { getDate } from "../../../helpers/functions/dateFunctions"

export default function ProfilesQueue() {
    const [profilesQueues, setProfilesQueue] = useState(null)

    const message = useShowMessage()

    const fetchUnassignedProfiles = async () => {

        const { data, error } = await tryCatch(() => http.get("/companies/profiles/queue"))

        if (error) {
            message({
                status: "Error",
                error
            })
        }

        if (data) {
            setProfilesQueue(data)
        }
    }

    useEffect(() => {
        fetchUnassignedProfiles()
        document.title = "Profiles Queue"
    }, [])



    const assignToMe = async (id) => {
        const { data, error } = await tryCatch(() => http.put(`/companies/profiles/assign/${id}`))
        if (error) {
            message({
                status: "Error",
                error
            })
        }
        if (data) {
            fetchUnassignedProfiles()
        }
    }


    return (
        <div className="container-fluid content-wrapper bg-white">
            <h1 className="text-center fw-bold fs-4 mb-3">Profiles Queue</h1>
            <div className="table-responsive">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Company Id</td>
                            <td>
                                Company Name
                            </td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {profilesQueues?.map((profile) => (
                            <tr>
                                <td>{getDate(profile.created_date)}</td>
                                <td>{profile.company_id}</td>
                                <td>
                                    {profile.old_profile.name}
                                </td>
                                <td>
                                    <button type="button" onClick={() => assignToMe(profile._id)} className="btn btn-info rounded-4 btn-xs">Assign to me</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}