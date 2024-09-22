import { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import companyService from "../../services/common/company.service";
import http from "../../helpers/http";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../helpers/Hooks/useShowMessage";

export default function ContactUs() {
    const [contactForm, setContactForm] = useState({})
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const user = useCurrentUser()
    const message = useShowMessage()

    const fetchCompanyDetails = async () => {
        try {
            setLoading(true)
            const user_id = user.role === "recruiter" ? user.companyId._id : user._id
            const { data } = await companyService.get(user_id)
            const companyData = { ...contactForm }
            companyData.name = data.contact
            companyData.email = data.email
            companyData.organisation = data.name
            setContactForm(companyData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCompanyDetails()
    }, [])

    const handleContactForm = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value })
        e.target.value.trim() === "" ? setError({ ...error, [e.target.name]: `Please enter ${e.target.name}` }) : setError({ ...error, [e.target.name]: null })
    }

    const submitContactForm = async (e) => {
        e.preventDefault();
        let isValid = true;
        let errorObj = {}

        if (!contactForm.name || contactForm.name?.trim() === "") {
            isValid = false;
            errorObj = { ...errorObj, name: "Please enter valid name" }
        } else {
            errorObj = { ...errorObj, name: null }
        }

        if (!contactForm.email || contactForm.email?.trim() === "") {
            isValid = false;
            errorObj = { ...errorObj, email: "Please enter valid email" }
        } else {
            errorObj = { ...errorObj, email: null }
        }

        if (!contactForm.subject || contactForm.subject?.trim() === "") {
            isValid = false;
            errorObj = { ...errorObj, subject: "Please enter valid subject" }
        } else {
            errorObj = { ...errorObj, subject: null }
        }

        if (!contactForm.message || contactForm.message?.trim() === "") {
            isValid = false;
            errorObj = { ...errorObj, message: "Please enter valid message" }
        } else {
            errorObj = { ...errorObj, message: null }
        }

        setError(errorObj)

        if (isValid) {
            // const contactData = { ...contactForm }
            // contactData.enquirer = "Employer"
            // //contactData.companyId = user_id

            // const chat = {
            //     date: new Date(),
            //     from: contactForm.organisation,
            //     message: contactForm.message,
            //     by: "Enquirer"
            // }

            // contactData.chat = chat;

            // delete contactData.message;

            const name = user.role === "recruiter" ? `${user.name}(${user.companyId.first_name + " " + user.companyId.last_name})` : user.first_name + " " + user.last_name

            const mailData = {
                subject: contactForm.subject,
                participants: [user._id],
                chat: [{
                    date: new Date(),
                    from: name,
                    message: contactForm.message,
                    by: "employer"
                }],
                readBy: [user._id],
            }
            try {
                await http.post('/mails/employer/create', mailData)
                message({ status: "success", message: "Mail Sent", path: "/company/inbox" })
            } catch (error) {
                message({ status: "error", error })
            }
        }
    }
    return (
        <div className="mt-5 container-fluid">
            {loading && <Loader />}
            {
                !loading && <>
                    <h2 className=" text-center">
                        Contact us
                    </h2>
                    <form onSubmit={submitContactForm}>

                        <div className="container d-flex flex-column gap-4 py-3">
                            <div className="d-flex flex-column gap-2">
                                <div>
                                    Name:
                                </div>
                                <div>
                                    <input value={contactForm.name} name="name" onChange={handleContactForm} type="text" className="form-control" placeholder="Your Name" />
                                    {error.name && <span className="text-danger">{error.name}</span>}
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">

                                <div>
                                    Email:
                                </div>
                                <div>
                                    <input type="email" value={contactForm.email} name="email" onChange={handleContactForm} className="form-control" placeholder="Your Email" />
                                    {error.email && <span className=" text-danger">{error.email}</span>}
                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">

                                <div>
                                    Subject:
                                </div>
                                <div>
                                    <input type="text" value={contactForm.subject} name="subject" onChange={handleContactForm} className="form-control" placeholder="Subject of your message" />
                                    {error.subject && <span className=" text-danger">{error.subject}</span>}

                                </div>
                            </div>
                            <div className="d-flex flex-column gap-2">

                                <div>
                                    Message:
                                </div>
                                <div>
                                    <textarea className="form-control" rows={6} value={contactForm.message} name="message" onChange={handleContactForm} placeholder="Write your message here..." >

                                    </textarea>
                                    {error.message && <span className=" text-danger">{error.message}</span>}

                                </div>
                            </div>
                            <div className="text-center">
                                {contactForm.status === "Submitted" && <span className="text-success"><em>Thank you for contacting us</em></span>}
                                {contactForm.status === "Failed" && <span className="text-danger"><em>Failed to submit the form</em></span>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-success w-100 "
                                >
                                    Submit
                                </button>
                            </div>

                        </div>

                    </form>
                </>
            }
        </div>
    )

}

