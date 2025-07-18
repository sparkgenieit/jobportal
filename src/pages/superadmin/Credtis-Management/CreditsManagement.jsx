import { useEffect, useState } from "react";
import MdxEditor from "../../../components/MdxEditor";
import useShowMessage from "../../../helpers/Hooks/useShowMessage";
import http from "../../../helpers/http";
import { validateIsNotEmpty } from "../../../helpers/functions/textFunctions";
import ComboBox from "../../../components/ComboBox";

let limit = 100;

export default function CreditsManagement() {
    const [msg, setMsg] = useState("");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState({});
    const [credits, setCredits] = useState("");
    const [type, setType] = useState("Refund");
    const [companiesSuggestions, setCompaniesSuggestions] = useState([]);
    const [name, setName] = useState("");
    const [creditCategory, setCreditCategory] = useState("Advertisement"); // New state for credit category
    const message = useShowMessage();

    const fetchCompanies = async () => {
        try {
            const res = await http.get(`/users/all?role=employer&limit=${limit}&skip=0`);
            setCompanies(res.data.users);
            if (res.data.total > limit) {
                limit = res.data.total;
                fetchCompanies();
            }
        } catch (error) {
            message({ status: "error", error });
        }
    };

    useEffect(() => {
        document.title = "Credits Management";
        fetchCompanies();
    }, []);

    const handleOnChange = (e) => {
        let value = e.target.value;
        setName(value);
        if (!value.trim()) {
            setCompaniesSuggestions([]);
            return;
        }
        let companyNames = companies
            ?.filter(company => (company?.first_name + " " + company?.last_name).toLowerCase().includes(value.toLowerCase()))
            .map((company) => ({ ...company, fullname: company?.first_name + " " + company?.last_name }));

        setCompaniesSuggestions(companyNames);
    };

    const handleSuggestionOnEnter = (selectedCompany) => {
        const { fullname, ...company } = selectedCompany;
        setName(fullname);
        setSelectedCompany(company);
        setCompaniesSuggestions([]);
    };

    const handleCredits = async () => {
    if (!selectedCompany?._id) {
        message({ message: "Please select a company" });
        return;
    }

    const Credits = Number(credits);

    if (isNaN(Credits)) {
        message({ message: `${credits} is not a valid number!` });
        return;
    }

    if (Credits < 1) {
        message({ message: "Please provide valid credits!" });
        return;
    }

    // Check for credit deduction validation based on the selected category
    if (creditCategory === "Advertisement" && Credits > selectedCompany.ad_credits) {
        message({ message: `Can't deduct ${Credits} from ${selectedCompany.ad_credits} Advertisement credits!` });
        return;
    }

    if (creditCategory === "Job" && Credits > selectedCompany.job_credits) {
        message({ message: `Can't deduct ${Credits} from ${selectedCompany.job_credits} Job credits!` });
        return;
    }

    if (!validateIsNotEmpty(msg)) {
        message({ message: "Please type the message" });
        return;
    }

    // Updating credits based on the selected category
    const creditUpdate = {
        credits: creditCategory === "Advertisement" 
            ? (type === "Refund" ? selectedCompany.ad_credits + Credits : selectedCompany.ad_credits - Credits)
            : (creditCategory === "Job" 
                ? (type === "Refund" ? selectedCompany.job_credits + Credits : selectedCompany.job_credits - Credits)
                : selectedCompany.credits) // Default to the general credits if no category selected
    };

    // Include creditCategory and type in the description field
    const description = `Credits ${type} - Credit Category: ${creditCategory}. ${msg}`;

    const orderCreationData = {
        companyId: selectedCompany._id,
        description: description, // Use the custom description along with creditCategory
        amount: 0,
        // Conditionally set the correct field based on the selected creditCategory
        credits: creditUpdate.credits,
        
        creditsPurchased: type === "Refund" ? Credits : 0,
        creditsUsed: type === "Refund" ? 0 : Credits,
        creditType: creditCategory // Include creditCategory in the data
    };

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
    };

    message({ message: "Processing please wait... " });

    try {
        await Promise.all([
            http.put(`/users/update/${selectedCompany._id}`, creditUpdate),
            http.post(`/orders/create`, orderCreationData),
            http.post(`/mails/employer/create`, mailCreate),
        ]);
        message({ status: "Success", message: `Credits ${type}ed` });
        fetchCompanies();
        setSelectedCompany({});
        setName("");
        setCredits("");
        setMsg("");
    } catch (e) {
        message({ status: "error", error: e });
    }
};


    return (
        <div className="container-fluid pt-4">
            <div className="bg-white">
                <h2 className="text-center fw-bold fs-4">Credits Management</h2>
                <div className="d-flex flex-column gap-4 mt-4">
                    <div className="row g-3">
                        <div className="col-lg-6">
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

                        <div className="col-lg-6">
                            <label className="form-label">Company ID</label>
                            <input type="text" className="form-control" value={selectedCompany?._id || ""} disabled readOnly />
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-6">
                            <label className="form-label">Enter the no. of credits</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setCredits(e.target.value)}
                                value={credits}
                            />
                        </div>

                        <div className="col-lg-6">
                            <label className="form-label">Type</label>
                            <select value={type} onChange={(e) => setType(e.target.value)} className="form-select">
                                <option value={"Refund"}>Refund</option>
                                <option value={"Deduct"}>Deduct</option>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-6">
                            <label className="form-label">Credits Category</label>
                            <select
                                value={creditCategory}
                                onChange={(e) => setCreditCategory(e.target.value)}
                                className="form-select"
                            >
                                <option value="Advertisement">Advertisement</option>
                                <option value="Job">Job</option>
                            </select>
                        </div>

                        <div className="col-lg-6">
                            <div>Current Credits</div>
                            <div>
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={creditCategory === "Advertisement" ? selectedCompany?.ad_credits : selectedCompany?.job_credits || 0}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-lg-9">
                            <div>Description</div>
                            <div>
                                <p className="form-control">{`Credits ${type} - Credit Category: ${creditCategory}`}</p>
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
    );
}
