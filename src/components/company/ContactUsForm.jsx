import { useState } from "react";
import { validateIsNotEmpty } from "../../helpers/functions/textFunctions";

export default function ContactUsForm({ data, onSubmit }) {
    const [contactForm, setContactForm] = useState(data)
    const [error, setError] = useState({})

    const handleContactForm = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value })
        e.target.value.trim() === "" ? setError({ ...error, [e.target.name]: "This field is required" }) : setError({ ...error, [e.target.name]: null })
    }

    const submitContactForm = async (e) => {
        e.preventDefault();
        let isValid = true;
        let errorObj = {}

        let fields = ["name", "email", "subject", "message"]

        for (const key of fields) {
            if (!validateIsNotEmpty(contactForm[key])) {
                isValid = false;
                errorObj = { ...errorObj, [key]: "This field is required" }
            }
        }

        setError(errorObj)

        if (isValid) onSubmit(contactForm)
    }

    return (
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
    )
}

