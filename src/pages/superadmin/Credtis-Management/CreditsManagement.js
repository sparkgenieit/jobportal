import { useEffect, useState } from "react";
import MdxEditor from "../../../components/MdxEditor";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import http from "../../../helpers/http";
import { validateIsNotEmpty } from "../../../helpers/functions/textFunctions";
import ComboBox from "../../../components/ComboBox";

let limit = 100

export default function CreditsManagement() {
    const [msg, setMsg] = useState("")
    const [companies, setCompanies] = useState([])
    const [selectedCompany, setSelectedCompany] = useState({})
    const [credits, setCredits] = useState("")
    const [type, setType] = useState("Refund")
    const [companiesSuggestions, setCompaniesSuggestions] = useState([])
    const [name, setName] = useState("")
    const message = useShowMessage()

    const fetchCompanies = async () => {
        try {
            const res = await http.get(`/users/all?role=employer&limit=${limit}&skip=0`)
            setCompanies(res.data.users)
            if (res.data.total > limit) {
                limit = res.data.total
                fetchCompanies()
            }
        } catch (error) {
            message({ status: "error", error })
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const handleOnChange = (e) => {
        let value = e.target.value
        setName(value)
        if (!value.trim()) {
            setCompaniesSuggestions([])
            return
        }
        let companyNames = companies
            ?.filter(company => (company?.first_name + " " + company?.last_name).toLowerCase().includes(value.toLowerCase()))
            .map((company) => ({ ...company, fullname: company?.first_name + " " + company?.last_name }))

        setCompaniesSuggestions(companyNames)
    }

    const handleSuggestionOnEnter = (selectedCompany) => {
        const { fullname, ...company } = selectedCompany
        setName(fullname)
        setSelectedCompany(company)
        setCompaniesSuggestions([])
    }

    const handleCredits = async () => {
        if (!selectedCompany?._id) {
            message({ message: "Please select a company" })
            return
        }

        const Credits = Number(credits)

        if (isNaN(Credits)) {
            message({ message: `${credits} is not a valid number!` })
            return
        }

        if (Credits < 1) {
            message({ message: "Please provide valid credits!" })
            return
        }

        if (type === "Deduct" && Credits > selectedCompany?.credits) {
            message({ message: `Cant deduct ${Credits} from ${selectedCompany.credits} credits!` })
            return
        }

        if (!validateIsNotEmpty(msg)) {
            message({ message: "Please type the message" })
            return
        }

        const creditUpdate = {
            credits: type === "Refund" ? selectedCompany.credits + Credits : selectedCompany.credits - Credits
        }

        const orderCreationData = {
            companyId: selectedCompany._id,
            description: `Credits ${type}`,
            amount: 0,
            credits: creditUpdate.credits,
            creditsPurchased: type === "Refund" ? Credits : 0,
            creditsUsed: type === "Refund" ? 0 : Credits
        }

        const mailCreate = {
            subject: `Credits ${type}`,
            participants: [selectedCompany._id],
            chat: [
                {
                    date: new Date(),
                    from: "Super Admin",
                    message: msg,
                    by: "admin",
                }
            ],
            readBy: [],
            assignedTo: "Super Admin",
        }

        message({ message: "Processing please wait... " })

        try {
            await Promise.all([
                http.put(`/users/update/${selectedCompany._id}`, creditUpdate),
                http.post(`/orders/create`, orderCreationData),
                http.post(`/mails/employer/create`, mailCreate),
            ])
            message({ status: "Success", message: `Credits ${type}ed` })
            fetchCompanies()
            setSelectedCompany({})
            setName("")
            setCredits("")
            setMsg("")
        } catch (e) {
            message({ status: "error", error: e })
        }
    }

    return (
        <div className="container-fluid">
            <div className="content-wrapper bg-white">
                <h2 className="text-center fw-bold fs-4">Credits Management</h2>
                <div className="d-flex flex-column gap-4 mt-4">
                    <div className="d-flex gap-5 ">
                        <div className="d-flex flex-grow-1 flex-column">
                            <label className="form-label">Company Name</label>
                            <ComboBox
                                suggestions={companiesSuggestions}
                                setSuggestions={setCompaniesSuggestions}
                                label={"fullname"}
                                suggestionValue={"_id"}
                                placeholder='Type company name here'
                                className="form-control"
                                value={name}
                                onChange={handleOnChange}
                                onEnter={handleSuggestionOnEnter}
                            />
                        </div>

                        <div className="d-flex flex-column w-50">
                            <label className="form-label"> Company ID</label>
                            <input type="text" className="form-control" value={selectedCompany?._id || ""} disabled readOnly />
                        </div>
                    </div>

                    <div className="d-flex gap-5 ">
                        <div className="d-flex flex-grow-1 flex-column">
                            <label className="form-label"> Enter the no. of credits</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setCredits(e.target.value)}
                                value={credits}
                            />
                        </div>

                        <div className="d-flex flex-column w-50">
                            <label className="form-label">Type</label>
                            <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
                                <option value={"Refund"}>Refund</option>
                                <option value={"Deduct"}>Deduct</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex gap-5 ">
                        <div className="d-flex flex-grow-1 flex-column gap-3">
                            <div>Description</div>
                            <div>
                                <p className="form-control">{`Credits ${type}`}</p>
                            </div>

                        </div>
                        <div className="d-flex  flex-column gap-3 w-25">
                            <div>Current Credits</div>
                            <div>
                                <input type="number" className="form-control" value={selectedCompany?.credits || 0} disabled readOnly />
                            </div>

                        </div>
                    </div>


                    <div className="d-flex flex-column gap-3">
                        <div>Message</div>
                        <div>
                            <MdxEditor value={msg} setValue={setMsg} />
                        </div>

                    </div>

                    <div>
                        <button
                            type="button"
                            className="btn btn-info rounded-4"
                            onClick={handleCredits}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}