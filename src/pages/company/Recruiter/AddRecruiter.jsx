import { useState } from "react"

import RecruiterForm from "./RecruiterForm"
import { validateEmailAddress, validateIsNotEmpty } from "../../../helpers/functions/textFunctions"
import http from "../../../helpers/http"
import { getUserID } from "../../../helpers/functions"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"

const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
}

export default function AddRecruiter() {
    const [recruiterData, setRecruiterData] = useState(initialValues)
    const [errors, setErrors] = useState(initialValues)
    const [sending, setSending] = useState(false)
    const message = useShowMessage()

    const handleInput = (e) => {
        setRecruiterData({ ...recruiterData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: e.target.value.trim() === "" ? `${e.target.name} is required` : "" })
    }

    const AddRecruiter = async (e) => {
        e.preventDefault();
        setSending(true)
        let isValid = true
        for (const input in recruiterData) {
            if (!validateIsNotEmpty(recruiterData[input])) {
                setErrors({ ...errors, [input]: `${input} is required` })
                isValid = false
                break;
            }
        }
        if (!isValid) return

        if (!validateEmailAddress(recruiterData.email)) {
            isValid = false
            setErrors({ ...errors, email: "Invalid Email" })
            return
        }

        if (isValid) {
            const data = {
                name: recruiterData.firstname + " " + recruiterData.lastname,
                email: recruiterData.email,
                password: recruiterData.password,
                companyId: getUserID()
            }
            try {
                await http.post("/companies/add-recruiter", data)
                message({
                    status: "success",
                    message: "Recruiter Added",
                    path: "/company/recruiters"
                })
            } catch (error) {
                message({
                    status: "error",
                    error
                })
            } finally {
                setSending(false)
            }
        }
    }

    return (
        <div class="container-fluid">
            <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title"> Create Recruiter </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Employer</li>
                            <li className="breadcrumb-item active" aria-current="page">Create Recruiter</li>
                        </ol>
                    </nav>
                </div>


                <RecruiterForm recruiterData={recruiterData} errors={errors} handleRecruiterData={handleInput} submit={AddRecruiter} sending={sending} />

            </div>
        </div>

    )
}