import { useState } from 'react';
import './contactUs.css';
import http from '../../helpers/http';
import useShowMessage from '../../helpers/Hooks/useShowMessage';


function ContactUs() {
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const showMessage = useShowMessage()


  const [errors, setErrors] = useState({
    subject: {
      show: false,
      text: ""
    },
    name: {
      show: false,
      text: ""
    },

    phone: {
      show: false,
      text: ""
    },
    email: {
      show: false,
      text: ""
    },
    organisation: {
      show: false,
      text: ""
    },
    message: {
      show: false,
      text: ""
    },
    sentMessage: false,
    errorMessage: false
  })

  const handleInput = (name, e) => {
    if (name == "subject") {
      setSubject(e.target.value)
      if (e.target.value == "") {
        setErrors({ ...errors, subject: { show: true, text: "Please Provide the Subject" } })
      }
      else {
        setErrors({ ...errors, subject: { show: false, text: "" } })
      }
    }
    if (name == "email") {
      setEmail(e.target.value)
      if (e.target.value == "") {
        setErrors({ ...errors, email: { show: true, text: "Please Provide the Emails" } })
      }
      else {
        setErrors({ ...errors, email: { show: false, text: "" } })
      }
    }
    if (name == "name") {
      setName(e.target.value)
      if (e.target.value == "") {
        setErrors({ ...errors, name: { show: true, text: "Please Provide the Name" } })
      }
      else {
        setErrors({ ...errors, name: { show: false, text: "" } })
      }
    }
    if (name == "phone") {
      setPhone(e.target.value)
      if (e.target.value == "") {
        setErrors({ ...errors, phone: { show: true, text: "Please Provide the Phone" } })
      }
      else {
        setErrors({ ...errors, phone: { show: false, text: "" } })
      }
    }
    if (name == "organisation") {
      setOrganisation(e.target.value)
      if (e.target.value == "") {
        setErrors({ ...errors, organisation: { show: true, text: "Please Provide the Name of Organisation" } })
      }
      else {
        setErrors({ ...errors, organisation: { show: false, text: "" } })
      }
    }
    if (name == "message") {
      setMessage(e.target.value)
      if (e.target.value == "") {
        setErrors({ ...errors, message: { show: true, text: "Please Provide the Message" } })
      }
      else {
        setErrors({ ...errors, message: { show: false, text: "" } })
      }
    }
  }

  const handleSubmit = () => {
    let isValid = true;
    let obj = { ...errors }
    if (subject.trim() == "") {
      obj = { ...obj, subject: { text: "Please Provide the Subject", show: true } }
      isValid = false;
    }
    if (name.trim() == "") {
      obj = { ...obj, name: { text: "Please Provide the Name", show: true } }
      isValid = false
    }
    if (phone.trim() == "") {
      obj = { ...obj, phone: { text: "Please Provide the Phone No.", show: true } }
      isValid = false
    } else if (/^[0-9]{10}$/gi.test(phone) == false) {
      obj = { ...obj, phone: { text: "Not a Phone Number", show: true } }
      isValid = false;
    }
    if (email.trim() == "") {
      obj = { ...obj, email: { text: "Please Provide the Email", show: true } }
      isValid = false
    }
    else if (/^[a-z A-Z 0-9._-]+@[a-z A-Z 0-9.-]+\.[a-z A-Z]{2,4}$/.test(email) == false) {
      isValid = false;
      obj = { ...obj, email: { text: "Not an Email Address", show: true } }
    }
    if (organisation.trim() == "") {
      obj = { ...obj, organisation: { text: "Please Provide the Organisation Name", show: true } }
      isValid = false
    }
    if (message.trim() == "") {
      obj = { ...obj, message: { text: "Please Provide the Message", show: true } }
      isValid = false
    }
    setErrors(obj)
    if (isValid) {
      const data = {
        chat: [{
          date: new Date(),
          from: `${organisation}(${name}) `,
          message: message,
          by: email
        }],
        subject: subject,
        participants: ["Visitor"],
        readBy: []
      }
      http.post('/mails/contact-us', data)
        .then((res) => {
          setErrors({ ...errors, sentMessage: true, errorMessage: false })
          showMessage({ status: "success", message: "Form submitted", path: "/" })
        })
        .catch(err => {
          setErrors({ ...errors, errorMessage: true, sentMessage: false })
          showMessage({ status: "error", error: err })
        })
    }
  }
  return (
    <>


      <div class="container-fluid">
        <div className="container d-flex flex-column justify-content-center">
          <div className='display-6 text-center'>Contact Us</div>
          <div className="col-12 bg-white">
            {/* <div className="card"> */}
            <div className="card-body ">
              <form className="form-sample rounded border bg-light p-4 contact-page ">
                <div className="row">
                  <div className="form-group d-flex flex-column justify-content-center ">
                    <input type="text" value={subject} onChange={(e) => handleInput("subject", e)} className="form-control   w-100" placeholder='Subject *' />
                    {errors && errors.subject.show && <span className="text-danger">{errors.subject.text}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group d-flex flex-column justify-content-center ">
                    <input type="text" value={name} onChange={(e) => handleInput("name", e)} className="form-control   w-100" placeholder='Name *' />
                    {errors && errors.name.show && <span className="text-danger">{errors.name.text}</span>}
                  </div>

                </div>
                <div className="row">
                  <div className="form-group d-flex flex-column justify-content-center ">
                    <input type="text" value={email} onChange={(e) => handleInput("email", e)} className="form-control   w-100" placeholder='Email *' />
                    {errors && errors.email.show && <span className="text-danger">{errors.email.text}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group d-flex flex-column justify-content-center ">
                    <input type="text" value={phone} onChange={(e) => handleInput("phone", e)} className="form-control   w-100" placeholder='Phone No. *' />
                    {errors && errors.phone.show && <span className="text-danger">{errors.phone.text}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group d-flex flex-column justify-content-center ">
                    <input type="text" value={organisation} onChange={(e) => handleInput("organisation", e)} className="form-control   w-100" placeholder='Organisation *' />
                    {errors && errors.organisation.show && <span className="text-danger">{errors.organisation.text}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group d-flex flex-column justify-content-center ">
                    <textarea value={message} onChange={(e) => handleInput("message", e)} className="form-control  w-100" rows="5" placeholder='Message *'></textarea>
                    {errors && errors.message.show && <span className="text-danger">{errors.message.text}</span>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button type="button" onClick={() => { handleSubmit() }} className="btn btn-primary w-100">Send</button>
                  </div>
                </div>
              </form>
              {errors.sentMessage && <div className='text-success text-center'><i>Thank you for your message, we will contact you shortly</i></div>}
              {errors.errorMessage && <div className='text-danger text-center'><i>An error occured while submitting the form, please try again later</i></div>}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>


    </>
  );
}

export default ContactUs;
