import { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import companyService from "../../services/common/company.service";
import http from "../../helpers/http";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import ContactUsForm from "../../components/company/ContactUsForm";

export default function ContactUs() {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const user = useCurrentUser()
    const message = useShowMessage()

    const fetchCompanyDetails = async () => {
        try {
            setLoading(true)
            const user_id = user._id
            const { data } = await companyService.get(user_id)
            const companyData = { ...formData }
            companyData.name = data.contact
            companyData.email = data.email
            companyData.organisation = data.name
            setFormData(companyData)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        document.title = "Employer | Contact-us"
        fetchCompanyDetails()
    }, [])

    const onFormSubmit = async (contactForm) => {
        //const name = user.role === "recruiter" ? `${user.name}(${user.companyId.first_name + " " + user.companyId.last_name})` : user.first_name + " " + user.last_name

        const name = user.first_name + " " + user.last_name

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
    return (
        <div className="mt-5 container-fluid">
            {loading && <Loader />}
            {
                !loading && <>
                    <h2 className=" text-center">
                        Contact us
                    </h2>

                    <ContactUsForm onSubmit={onFormSubmit} data={formData} />
                </>
            }
        </div>
    )

}

