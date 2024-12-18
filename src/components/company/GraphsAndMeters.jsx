import { getApplicationCountPerMonth, getApplicationCountPerYear } from "../../services/company/BarGraphData.service";
import BarGraph from "./BarGraph";
import GaugeMeter from "./GaugeMeter";

export default function GraphsAndMeters({ graphsData, month, year }) {
    return (
        <>
            {
                graphsData &&
                <div className="d-flex flex-wrap gap-5 py-4">
                    <GaugeMeter value={graphsData?.activeJobs || 0} name="Active Jobs" />
                    <GaugeMeter value={graphsData?.postedJobsByYear || 0} name="YTD Jobs Posted" />
                    <GaugeMeter value={getApplicationCountPerYear(graphsData?.avgJobsByYear, year) || 0} name="YTD Applications" />
                    <GaugeMeter value={graphsData?.postedJobsByMonth || 0} name="MTD Jobs Posted" />
                    <GaugeMeter value={getApplicationCountPerMonth(graphsData?.avgJobsByYear, month, year) || 0} name="MTD Applications" />
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
        </>
    )
}