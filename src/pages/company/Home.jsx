import { useEffect, useState } from "react";
import BarGraph from "./DashBoard/BarGraph";
import http from "../../helpers/http";
import GuageMeter from "./DashBoard/GaugeMeter";
import { getApplicationCountPerMonth, getApplicationCountPerYear, months } from "./DashBoard/BarGraphData.service";
import useShowMessage from "../../helpers/Hooks/useShowMessage";

const today = new Date()
const currentYear = today.getFullYear()
const yearOptions = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear]

function Home() {
  const [graphsData, setGraphsData] = useState(null)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [recruiters, setRecruiters] = useState(null)
  const message = useShowMessage()

  const getCompanyCharts = async () => {
    try {
      const form = { month, year }
      const { data } = await http.post("/charts/company", form)
      setGraphsData(data)
    } catch (error) {
      message({
        status: "error",
        error
      })
    }
  }

  const handleForm = setFn => {
    return (e) => setFn(e.target.value)
  }

  useEffect(() => {
    document.title = "Dashboard"

    const fetchRecruiters = async () => {
      try {
        const response = await http.get(`/companies/recruiters`)
        setRecruiters(response.data)
      } catch (error) {
        message({
          status: "error",
          error
        })
      }
    }

    fetchRecruiters()
  }, [])

  useEffect(() => {
    getCompanyCharts()
  }, [year, month])

  return <>
    <div className="container-fluid responsive-font mt-4" >
      <h3 className="text-center fw-bold fs-4">Jobs Dashboard</h3>
      <div className="d-flex gap-3 my-4">
        <div className="d-flex gap-3 align-items-center">
          <label>Year</label>
          <select className="form-select" value={year} onChange={handleForm(setYear)} name="year" >
            <option value={""}></option>
            {yearOptions.map(year => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-3 align-items-center">
          <label>Month</label>
          <select className="form-select" value={month} onChange={handleForm(setMonth)} name="month">
            <option value={""}></option>
            {months.map((month, index) => (
              <option value={index}>{month}</option>
            ))}
          </select>
        </div>

        {/* <div className="d-flex gap-3 align-items-center">
          <label>Recruiter</label>
          <select className="form-select">
            <option value={""}></option>
            {
              recruiters?.map(recruiter => (
                <option value={recruiter.value}>{recruiter.name}</option>
              ))
            }
          </select>
        </div> */}
      </div>

      {
        graphsData &&
        <div className="d-flex flex-wrap gap-5 py-4">
          <GuageMeter value={graphsData?.activeJobs || 0} name="Active Jobs" />
          <GuageMeter value={graphsData?.postedJobsByYear || 0} name="YTD Jobs Posted" />
          <GuageMeter value={getApplicationCountPerYear(graphsData?.avgJobsByYear, year) || 0} name="YTD Applications" />
          <GuageMeter value={graphsData?.postedJobsByMonth || 0} name="MTD Jobs Posted" />
          <GuageMeter value={getApplicationCountPerMonth(graphsData?.avgJobsByYear, month, year) || 0} name="MTD Applications" />
        </div>
      }

      {
        graphsData &&
        <div className="d-flex flex-wrap gap-3 my-3">
          <BarGraph name={"Job Posted"} data={graphsData?.posted_jobs} />
          <BarGraph name={"Average Views Per Job"} data={graphsData?.avgViews} />
          <BarGraph name={"Average Applications Per Job"} data={graphsData?.avgJobsByYear} />
        </div>
      }
    </div>
  </>
}

export default Home;
