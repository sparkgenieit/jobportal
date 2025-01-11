import React, { useEffect, useState } from 'react'
import { tryCatch } from '../../../helpers/functions'
import { adService } from '../../../services/company/Ads.service'

export default function CategorySpecifyAd({ page }) {
    const [ads, setAds] = useState(null)

    useEffect(() => {
        const fetchPageSpecificAds = async () => {
            const { data, error } = await tryCatch(() => adService.getPageSpecificAds(page))
            if (data) setAds(data)

            console.log(data)
        }

        fetchPageSpecificAds()
    }, [])


    return (
        <div>

            {ads?.map(ad => <div> {ad.title} </div>)}
        </div>
    )
}
