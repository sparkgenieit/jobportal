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


    return (
        <div className="container-fluid content-wrapper bg-white">
            <h1 className="text-center fw-bold fs-4 mb-3">Assigned Profiles</h1>
            <div className="table-responsive">

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
                                    <span role="button" onClick={() => { message({ path: `/admin/profiles/profile/${profile._id}` }) }} className="">
                                        <HiEye fontSize={18} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}