import { useEffect, useState } from "react";
import BarGraph from "./DashBoard/BarGraph";
import http from "../../helpers/http";
import GuageMeter from "./DashBoard/GaugeMeter";
import { getApplicationCountPerMonth, getApplicationCountPerYear } from "./DashBoard/BarGraphData.service";


function Home() {
  const [graphsData, setGraphsData] = useState(null)

  const getCompanyCharts = async () => {
    try {
      const { data } = await http.get("/charts/company")
      setGraphsData(data)
    } catch (error) {


    }

  }

  useEffect(() => {
    document.title = "Dashboard"
    getCompanyCharts()
  }, [])

  return <>
    <div className="container-fluid responsive-font mt-4" >

      <h3 className="text-center fw-bold fs-4">Jobs Dashboard</h3>

      <div className="d-flex gap-3 my-4 w-25">
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
      </div>

      <div className="d-flex flex-wrap gap-5 py-4">
        <GuageMeter value={graphsData?.activeJobs || 0} name="Active Jobs" />
        <GuageMeter value={graphsData?.postedJobsByYear || 0} name="YTD Jobs Posted" />
        <GuageMeter value={getApplicationCountPerYear(graphsData?.avgJobsByYear, 2023) || 0} name="YTD Applications" />
        <GuageMeter value={graphsData?.postedJobsByMonth || 0} name="MTD Jobs Posted" />
        <GuageMeter value={getApplicationCountPerMonth(graphsData?.avgJobsByYear, 10, 2024) || 0} name="MTD Applications" />
      </div>

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
