import { useEffect, useState } from "react";
import { months } from "../../services/company/BarGraphData.service";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import RecruitersService from "../../services/company/Recruiters.service";
import ChartsService from "../../services/company/Charts.service";
import GraphsAndMeters from "../../components/company/GraphsAndMeters";

const today = new Date()
const currentYear = today.getFullYear()
const yearOptions = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear]

function Home() {
  const [graphsData, setGraphsData] = useState(null)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [recruiters, setRecruiters] = useState(null)
  const [selectedRecruiter, setSelectedRecruiter] = useState("")
  const message = useShowMessage()

  const handleForm = setFn => {
    return (e) => setFn(e.target.value)
  }

  useEffect(() => {
    document.title = "Dashboard"

    const fetchRecruiters = async () => {
      try {
        const response = await RecruitersService.getRecruiters()
        setRecruiters(response.data)
      } catch (error) {
        message({
          status: "Error",
          error: { message: "Failed to get recruiters" }
        })
      }
    }
    fetchRecruiters()
  }, [])

  useEffect(() => {
    const getCompanyCharts = async () => {
      try {
        const form = {
          month,
          year,
          recruiterId: selectedRecruiter
        }
        const { data } = await ChartsService.getCompanyGraphs(form)
        setGraphsData(data)
      } catch (error) {
        message({
          status: "error",
          error
        })
      }
    }

    getCompanyCharts()
  }, [year, month, selectedRecruiter])

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

        <div className="d-flex gap-3 align-items-center">
          <label>Recruiter</label>
          <select className="form-select" value={selectedRecruiter} onChange={handleForm(setSelectedRecruiter)} name="recruiter">
            <option value={""}></option>
            {
              recruiters?.map(recruiter => (
                <option key={recruiter._id} value={recruiter._id}>{recruiter.name}</option>
              ))
            }
          </select>
        </div>

      </div>

      <GraphsAndMeters graphsData={graphsData} year={year} month={month} />
    </div>
  </>
}

export default Home;
