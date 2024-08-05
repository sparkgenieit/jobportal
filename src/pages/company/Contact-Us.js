import { useState } from "react"

export default function ContactUs() {
    const [contactForm, setContactForm] = useState({})
    const [error, setError] = useState({})

    const handleContactForm = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value })
        e.target.value.trim() === "" ? setError({ ...error, [e.target.name]: `Please enter ${e.target.name}` }) : setError({ ...error, [e.target.name]: null })
    }


    const submitContactForm = (e) => {
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

        }
    }

    return (

        <div className="mt-5 container-fluid">
            <h2 className="">
                Contact
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
        </div>
    )

}

