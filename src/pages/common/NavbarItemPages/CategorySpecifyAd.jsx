import { useEffect, useState } from 'react'
import { tryCatch } from '../../../helpers/functions'
import { adService } from '../../../services/company/Ads.service'
import Ads from '../Ads/Ads'
import { IoIosFlag } from "react-icons/io";
import { MdOutlineLocationOn } from 'react-icons/md';

const AdCard = ({ ad }) => (
    <div className='h-64 text-sm rounded-md border border-slate-800 shadow-md p-2'>
        <img src={ad.ad_image_url} className='h-28 w-full' />
        <h4 className='text-xl font-bold '>{ad.title}</h4>

        <p className='text-slate-700 text-ellipsis'>{ad.description}</p>

        <div className='flex gap-1 items-center'><MdOutlineLocationOn /> {ad.location}</div>

        <div className='flex items-center justify-between' >
            <a href={ad.redirect_url} target='_blank'>Go to website</a>
            <IoIosFlag role='button' fill='red' color='red' />
        </div>
    </div>
)

export default function CategorySpecifyAd({ page }) {
    const [ads, setAds] = useState(null)

    useEffect(() => {
        const fetchPageSpecificAds = async () => {
            const { data, error } = await tryCatch(() => adService.getPageSpecificAds(page))
            if (data) setAds(data)
        }

        fetchPageSpecificAds()
    }, [page])

    return (

        <div className='grid grow grid-cols-3 gap-10 px-2'>
            {ads && ads.map(ad => <AdCard ad={ad} />)}
        </div>

    )
}
