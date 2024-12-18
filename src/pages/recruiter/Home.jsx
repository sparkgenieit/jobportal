import { useEffect, useState } from "react";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import ChartsService from "../../services/company/Charts.service";
import GraphsAndMeters from "../../components/company/GraphsAndMeters";
import { months } from "../../services/company/BarGraphData.service";

const today = new Date()
const currentYear = today.getFullYear()
const yearOptions = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear]

function RecruiterHome() {
    const [graphsData, setGraphsData] = useState(null)
    const [month, setMonth] = useState(today.getMonth())
    const [year, setYear] = useState(today.getFullYear())
    const message = useShowMessage()

    const handleForm = setFn => {
        return (e) => setFn(e.target.value)
    }

    useEffect(() => {
        document.title = "Dashboard"
    }, [])

    useEffect(() => {
        const getCompanyCharts = async () => {
            try {
                const form = { month, year }
                const { data } = await ChartsService.getRecruiterGraphs(form)
                setGraphsData(data)
            } catch (error) {
                message({
                    status: "error",
                    error
                })
            }
        }
        getCompanyCharts()
    }, [year, month])

    return <>
        <div className="px-3 responsive-font mt-4" >
            <h3 className="text-center fw-bold fs-4">Jobs Dashboard</h3>
            <div className="d-flex flex-column flex-md-row gap-3 my-4">
                <div className="d-flex gap-3 align-items-center">
                    <label>Year</label>
                    <select className="form-select" value={year} onChange={handleForm(setYear)} name="year" >
                        <option value={""}></option>
                        {yearOptions.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="d-flex gap-3 align-items-center">
                    <label>Month</label>
                    <select className="form-select" value={month} onChange={handleForm(setMonth)} name="month">
                        <option value={""}></option>
                        {months.map((month, index) => (
                            <option key={month} value={index}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>

            <GraphsAndMeters graphsData={graphsData} month={month} year={year} />
        </div>
    </>
}

export default RecruiterHome;
