import { useEffect, useState } from "react"

import Table from "react-bootstrap/Table"
import Modal from "react-bootstrap/Modal"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import http from "../../../helpers/http"
import { getUserID } from "../../../helpers/functions"
import RecruiterForm from "./RecruiterForm";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";

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

    const fetchRecruiters = async () => {
        try {
            const response = await http.get(`/companies/recruiters/${getUserID()}`)
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
            companyId: getUserID()
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
        fetchRecruiters()
    }, [])

    return (
        <div className=" mt-4 container-fluid">
            <div className="d-flex">
                <h3 className="fw-bold text-center flex-grow-1">Recruiters</h3>
                <button
                    type="button"
                    className="btn btn-primary rounded-3"
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
                        <td>Name</td>
                        <td>Email</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>

                </thead>

                <tbody>
                    {recruiters?.length > 0 && recruiters.map(recruiter => (
                        <tr key={recruiter._id}>
                            <td>{recruiter.name}</td>
                            <td>{recruiter.email}</td>
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