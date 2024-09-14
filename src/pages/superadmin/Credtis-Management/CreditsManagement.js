import { useEffect, useState } from "react";
import MdxEditor from "../../../components/MdxEditor";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import http from "../../../helpers/http";

let limit = 100

export default function CredtisManagement() {
    const [msg, setMsg] = useState("")
    const [companies, setCompanies] = useState([])
    const [selectedCompany, setSelectedCompany] = useState({})
    const [credits, setCredits] = useState(0)
    const [type, setType] = useState("Refund")
    const message = useShowMessage()

    const fetchCompanies = async () => {
        const res = await http.get(`/users/all?role=employer&limit=${limit}&skip=0`)
        setCompanies(res.data.users)
        setSelectedCompany(res.data.users[0])
        if (res.data.total > limit) {
            limit = res.data.total
            fetchCompanies()
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    const handleSelectCompany = (e) => {
        const selected = companies.find(company => company._id === e.target.value)
        setSelectedCompany(selected)
    }

    const handleCredits = async () => {
        if (credits < 1 || credits === "") {
            message({ message: "Please provide the credits!" })
            return
        }

        if (type === "Deduct" && credits > selectedCompany.credits) {
            message({ message: `Cant deduct ${credits} from ${selectedCompany.credits} credits!` })
            return
        }

        const data = {
            credits: type === "Refund" ? selectedCompany.credits + parseInt(credits) : selectedCompany.credits - parseInt(credits)
        }

        try {
            const res = await http.put(`/users/update/${selectedCompany._id}`, data)
            message({ status: "Success", message: `Credits ${type}ed` })
        } catch (e) {

        }

    }

    return (
        <div className="container-fluid">
            <div className="content-wrapper bg-white">
                <h2 className="text-center fw-bold fs-4">Credits Management</h2>
                <div className="d-flex flex-column gap-4 mt-4">
                    <div className="d-flex gap-5 ">
                        <div className="d-flex flex-grow-1 flex-column">
                            <label className="form-label">Select a Company Name</label>
                            <select onChange={handleSelectCompany} value={selectedCompany._id} className="form-select">
                                {companies.length > 0 && companies.map(company => (
                                    <option key={company._id} value={company._id}>{company.first_name + " " + company.last_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="d-flex flex-column w-50">
                            <label className="form-label"> Company ID</label>
                            <input type="text" className="form-control" value={selectedCompany._id} disabled />
                        </div>
                    </div>

                    <div className="d-flex gap-5 ">
                        <div className="d-flex flex-grow-1 flex-column">
                            <label className="form-label"> Enter the no. of credits</label>
                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setCredits(e.target.value)}
                                value={credits}
                                onWheel={(e) => e.preventDefault()}
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
                                <input type="text" className="form-control" value={`Credits ${type}`} disabled />
                            </div>

                        </div>
                        <div className="d-flex  flex-column gap-3 w-25">
                            <div>Current Credits</div>
                            <div>
                                <input type="number" className="form-control" value={selectedCompany.credits} disabled />
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