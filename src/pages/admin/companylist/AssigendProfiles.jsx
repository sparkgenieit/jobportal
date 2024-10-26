import { useEffect, useState } from "react"
import { tryCatch } from "../../../helpers/functions"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import { HiEye } from "react-icons/hi";
import http from "../../../helpers/http"
import { getDate } from "../../../helpers/functions/dateFunctions"

export default function AssignedProfiles() {
    const [profiles, setProfiles] = useState(null)

    const message = useShowMessage()

    const fetchassignedProfiles = async () => {

        const { data, error } = await tryCatch(() => http.get("/companies/profiles/assigned"))
        if (error) {
            message({
                status: "Error",
                error
            })
        }

        if (data) {
            setProfiles(data)
        }
    }

    useEffect(() => {
        fetchassignedProfiles()
        document.title = "Profiles"
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
            fetchassignedProfiles()
        }
    }


    return (
        <div className="container-fluid content-wrapper bg-white">
            <table className="table text-center">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Company Id</td>
                        <td>
                            Company Name
                        </td>
                        <td>View</td>
                    </tr>
                </thead>

                <tbody>
                    {profiles?.map((profile) => (
                        <tr>
                            <td>{getDate(profile.created_date)}</td>
                            <td>{profile.company_id}</td>
                            <td>
                                {profile.old_profile.name}
                            </td>
                            <td>
                                <span onClick={() => { }} className="btn btn-xs">
                                    <HiEye fontSize={18} />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}