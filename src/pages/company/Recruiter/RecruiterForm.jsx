import { useState } from "react"
import { validateEmailAddress, validateIsNotEmpty } from "../../../helpers/functions/textFunctions"

export default function RecruiterForm({ inputValues, submit, sending, mode }) {
    const [recruiterData, setRecruiterData] = useState(inputValues)
    const [errors, setErrors] = useState({})

    const handleRecruiterData = (e) => {
        setRecruiterData({ ...recruiterData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: e.target.value.trim() === "" ? `${e.target.name} is required` : "" })
    }

    const validatingInput = (e) => {
        e.preventDefault();
        let isValid = true
        const fieldsToBeValidated = ["name", "email", "password"]
        for (const input of fieldsToBeValidated) {
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
            submit(recruiterData)
        }
    }

    return (
        <div className="card-body  rounded-3">
            <div className="fw-bold fs-5 mb-4">{mode} Recruiter</div>
            <form onSubmit={e => validatingInput(e)} className="form-sample">
                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">User name</label>
                            <div className="col-sm-8">

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={recruiterData?.name}
                                    onChange={handleRecruiterData}
                                    required
                                    placeholder="User name"
                                    disabled={sending}
                                />

                                {<div className='text-danger'>{errors?.name}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={recruiterData?.email}
                                    onChange={handleRecruiterData}
                                    required
                                    placeholder="Email Address"
                                    disabled={mode === "Edit" ? true : sending}
                                />

                                {<div className='text-danger'>{errors?.email}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">{mode === "Edit" ? "New " : ""}Password</label>
                            <div className="col-sm-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={recruiterData?.password}
                                    onChange={handleRecruiterData}
                                    placeholder="Password"
                                    disabled={sending}
                                />

                                {<div className='text-danger'>{errors?.password}</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn btn-gradient-primary"
                        disabled={sending}
                    >
                        {sending ? "Saving Recruiter" : "Save"}
                    </button>
                </div>

            </form>
        </div>

    )
}