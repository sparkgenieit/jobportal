import { useEffect } from "react";
import BarGraph from "./DashBoard/BarGraph";

function Home() {

  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  return <>
    <div class="container-fluid responsive-font mt-4" >

      <h3 className="text-center fw-bold fs-4">Jobs Dashboard</h3>

      <div className="d-flex gap-3 mt-4 w-25">
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
      </div>


      <div className="d-flex flex-wrap gap-3 mt-3">
        <BarGraph name={"Job Posted"} />
        <BarGraph name={"Average Views Per Job"} />
        <BarGraph name={"Average Applications Per Job"} />
      </div>






    </div>
  </>
}

export default Home;
