import { useEffect, useState } from "react";
import BarGraph from "./DashBoard/BarGraph";
import http from "../../helpers/http";

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

      <div className="d-flex gap-3 mt-4 w-25">
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
      </div>


      {
        graphsData &&

        <div className="d-flex flex-wrap gap-3 mt-3">
          <BarGraph name={"Job Posted"} data={graphsData?.posted_jobs} />
          {/* <BarGraph name={"Average Views Per Job"} data={graphsData?.views} />
          <BarGraph name={"Average Applications Per Job"} data={graphsData?.applications} /> */}
        </div>
      }





    </div>
  </>
}

export default Home;
