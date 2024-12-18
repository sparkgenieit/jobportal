import { useEffect } from "react";

import http from "../../helpers/http";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import ContactUsForm from "../../components/company/ContactUsForm";
import { recruiterUrl } from "../../services/common/urls/recruiterUrls.service";

export default function RecruiterContactUs() {
    const user = useCurrentUser()

    const formData = {
        name: user.name,
        email: user.email,
        organisation: user.companyId.first_name + " " + user.companyId.last_name
    }

    const message = useShowMessage()

    useEffect(() => {
        document.title = "Employer | Contact-us"
    }, [])

    const onFormSubmit = async (contactForm) => {
        const name = `${user.name}(${user.companyId.first_name + " " + user.companyId.last_name})`

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
            message({ status: "success", message: "Mail Sent", path: recruiterUrl.home + recruiterUrl.inbox })
        } catch (error) {
            message({ status: "error", error })
        }
    }
    return (
        <div className="mt-5 container-fluid">
            <h2 className=" text-center">
                Contact us
            </h2>
            <ContactUsForm onSubmit={onFormSubmit} data={formData} />
        </div >
    )

}

