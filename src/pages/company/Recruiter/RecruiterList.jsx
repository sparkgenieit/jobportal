import { useEffect, useState } from "react"

import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import http from "../../../helpers/http"
import RecruiterForm from "./RecruiterForm";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import useCurrentUser from "../../../helpers/Hooks/useCurrentUser";

const initialValues = {
    name: "",
    email: "",
    password: ""
}

export default function RecruiterList() {
    const [recruiters, setRecruiters] = useState([])
    const [popup, setPopup] = useState({})
    const [errors, setErrors,] = useState({})
    const [sending, setSending] = useState(false)
    const message = useShowMessage()
    const user = useCurrentUser()

    const fetchRecruiters = async () => {
        try {
            const response = await http.get(`/companies/recruiters`)
            setRecruiters(response.data)
        } catch (error) {
            message({
                status: "error",
                error
            })
        }
    }

    const deleteRecruiter = async () => {
        try {
            setSending(true)
            await http.delete(`/companies/recruiter/${popup.recruiter._id}`)
            closePopup()
            fetchRecruiters()
        } catch (error) {
            message({
                status: "error",
                error
            })
        } finally {
            setSending(false)
        }
    }

    const AddRecruiter = async (recruiterData) => {
        const data = {
            name: recruiterData.name,
            email: recruiterData.email,
            password: recruiterData.password,
            companyId: user._id
        }
        try {
            setSending(true)
            await http.post("/companies/recruiter", data)
            closePopup()
            fetchRecruiters()
        } catch (error) {
            message({
                status: "error",
                error
            })
        } finally {
            setSending(false)
        }
    }

    const closePopup = () => {
        setPopup({
            show: false,
            mode: "",
            recruiter: {},
            functionToCallOnSubmit: () => { }
        })
    }

    const editRecruiter = async (recruiter) => {
        const data = {
            name: recruiter.name,
            email: recruiter.email,
            password: recruiter.password,
            companyId: recruiter.companyId
        }
        try {
            setSending(true)
            await http.put(`/companies/recruiter/${recruiter._id}`, data)
            closePopup()
            fetchRecruiters()
        } catch (error) {
            message({
                status: "error",
                error
            })
        } finally {
            setSending(false)
        }
    }

    useEffect(() => {
        document.title = "Recruiters"
        fetchRecruiters()
    }, [])

    return (
        <div className=" mt-4 container-fluid">
            <div className="position-relative d-flex my-2">
                <h3 className="fw-bold fs-4 text-center w-100">Recruiters</h3>
                <button
                    type="button"
                    className="btn btn-primary rounded-3 position-absolute end-0"
                    onClick={() => {
                        setPopup({
                            show: true,
                            mode: "Add",
                            recruiter: initialValues,
                            functionToCallOnSubmit: AddRecruiter
                        })
                    }}
                >
                    Add Recruiter</button>
            </div>

            <Table className="text-center">
                <thead>
                    <tr>
                        <td className="text-start">Name</td>
                        <td className="text-start">Email</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>

                </thead>

                <tbody>
                    {recruiters?.length > 0 && recruiters.map(recruiter => (
                        <tr key={recruiter._id}>
                            <td className="text-start" >{recruiter.name}</td>
                            <td className="text-start">{recruiter.email}</td>
                            <td>
                                <BsFillPencilFill
                                    role="button"
                                    onClick={() => {
                                        setPopup({
                                            show: true,
                                            mode: "Edit",
                                            recruiter: { ...recruiter, password: "" },
                                            functionToCallOnSubmit: editRecruiter
                                        })
                                    }}
                                    fontSize={18}
                                />
                            </td>
                            <td><BsFillTrashFill
                                role="button"
                                onClick={() => {
                                    setPopup({
                                        show: true,
                                        mode: "Delete",
                                        recruiter,
                                    })
                                }}
                                fontSize={18} /></td>
                        </tr>
                    ))}

                </tbody>

            </Table>

            <Modal show={popup.show} onHide={closePopup} centered>
                <Modal.Body className="bg-white">

                    {(popup.mode === "Edit" || popup.mode === "Add") &&
                        <>
                            <RecruiterForm inputValues={popup.recruiter} submit={popup.functionToCallOnSubmit} sending={sending} mode={popup.mode} />
                        </>
                    }

                    {popup.mode === "Delete" &&
                        <div className="d-flex gap-3 flex-column align-items-center">
                            <div>

                                Are you sure you want delete {popup.recruiter.name} ?
                            </div>
                            <div className="d-flex gap-3">
                                <button
                                    type="button"
                                    disabled={sending}
                                    className="btn rounded-4 btn-info"
                                    onClick={deleteRecruiter}
                                >
                                    Yes</button>
                                <button
                                    type="button"
                                    className="btn rounded-4 btn-danger"
                                    onClick={closePopup}
                                    disabled={sending}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    }

                </Modal.Body>
            </Modal>

        </div >
    )
}