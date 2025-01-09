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
            <div className="container flex flex-col gap-4 py-3">
                <div className="flex flex-col gap-2">
                    <div>
                        Name:
                    </div>
                    <div>
                        <input value={contactForm.name} name="name" onChange={handleContactForm} type="text" className="px-3 py-2 w-full shadow-sm" placeholder="Your Name" />
                        {error.name && <span className="text-red-600">{error.name}</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-2">

                    <div>
                        Email:
                    </div>
                    <div>
                        <input type="email" value={contactForm.email} name="email" onChange={handleContactForm} className="px-3 py-2 w-full shadow-sm" placeholder="Your Email" />
                        {error.email && <span className=" text-red-600">{error.email}</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-2">

                    <div>
                        Subject:
                    </div>
                    <div>
                        <input type="text" value={contactForm.subject} name="subject" onChange={handleContactForm} className="px-3 py-2 w-full shadow-sm" placeholder="Subject of your message" />
                        {error.subject && <span className=" text-red-600">{error.subject}</span>}

                    </div>
                </div>
                <div className="flex flex-col gap-2">

                    <div>
                        Message:
                    </div>
                    <div>
                        <textarea className="px-3 py-2 w-full shadow-sm" rows={6} value={contactForm.message} name="message" onChange={handleContactForm} placeholder="Write your message here..." >

                        </textarea>
                        {error.message && <span className=" text-red-600">{error.message}</span>}

                    </div>
                </div>
                <div className="text-center">
                    {contactForm.status === "Submitted" && <span className="text-emerald-600"><em>Thank you for contacting us</em></span>}
                    {contactForm.status === "Failed" && <span className="text-red-600"><em>Failed to submit the form</em></span>}
                </div>

                <div>
                    <button
                        type="submit"
                        className=" bg-emerald-500 hover:bg-emerald-600 text-white rounded-md py-2 w-100 "
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

