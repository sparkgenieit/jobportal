import { useEffect, useState } from "react";
import BarGraph from "./DashBoard/BarGraph";
import GuageMeter from "./DashBoard/GaugeMeter";
import { getApplicationCountPerMonth, getApplicationCountPerYear, months } from "./DashBoard/BarGraphData.service";
import useShowMessage from "../../helpers/Hooks/useShowMessage";
import RecruitersService from "../../services/company/Recruiters.service";
import useCurrentUser from "../../helpers/Hooks/useCurrentUser";
import ChartsService from "../../services/company/Charts.service";

const today = new Date()
const currentYear = today.getFullYear()
const yearOptions = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear]

function Home() {
  const user = useCurrentUser()
  const [graphsData, setGraphsData] = useState(null)
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [recruiters, setRecruiters] = useState(null)
  const [selectedRecruiter, setSelectedRecruiter] = useState(user.role === "recruiter" ? user._id : "")
  const message = useShowMessage()

  const getCompanyCharts = async () => {
    try {
      const form = {
        month,
        year,
        recruiterId: selectedRecruiter
      }

      const { data } = await ChartsService.getCharts(form)
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
        const response = await RecruitersService.getRecruiters()
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
  }, [year, month, selectedRecruiter])

  return <>
    <div className="container-fluid responsive-font mt-4" >
      <h3 className="text-center fw-bold fs-4">Jobs Dashboard</h3>
      <div className="d-flex gap-3 my-4">
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

        {user.role !== "recruiter" &&
          <div className="d-flex gap-3 align-items-center">
            <label>Recruiter</label>
            <select className="form-select" value={selectedRecruiter} onChange={handleForm(setSelectedRecruiter)} name="recruiter">
              <option value={""}></option>
              {
                recruiters?.map(recruiter => (
                  <option value={recruiter._id}>{recruiter.name}</option>
                ))
              }
            </select>
          </div>
        }
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
