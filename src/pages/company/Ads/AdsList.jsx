import { useEffect } from "react"
import AdsTable from "./AdsTable"

export default function AdsList() {

    useEffect(() => {
        document.title = "Ads"
    }, [])


    return (
        <div className="container-fluid mt-4">
            <h3 className="fs-4 fw-bold text-center">Ads</h3>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary rounded-4 ">Post Ad</button>
            </div>
            <AdsTable />
        </div>
    )
}