import { useEffect, useState } from "react"
import AdsTable from "./AdsTable"
import { adService } from "../../../services/company/Ads.service"
import useShowMessage from "../../../helpers/Hooks/useShowMessage"
import { tryCatch } from "../../../helpers/functions/index"

export default function AdsList() {
    const message = useShowMessage()
    const [ads, setAds] = useState(null)

    useEffect(() => {
        document.title = "Ads"
    }, [])


    useEffect(() => {
        const fetchAds = async () => {
            const { data, error } = await tryCatch(() => adService.getAds())

            if (data) {
                setAds(data)
                console.log(data)
            }

            if (error) {
                message({
                    status: "error",
                    error
                })
            }
        }

        fetchAds()
    }, [])


    return (
        <div className="container-fluid mt-4">
            <h3 className="fs-4 fw-bold text-center mt-3">Ads</h3>
            {ads && <AdsTable adsData={ads} />}
        </div>
    )
}