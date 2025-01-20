import { useEffect, useState } from 'react'
import { tryCatch } from '../../../helpers/functions'
import { adService } from '../../../services/company/Ads.service'
import { IoIosFlag } from "react-icons/io";
import { MdOutlineLocationOn } from 'react-icons/md';
import { BASE_API_URL } from '../../../helpers/constants';

export const SpecificPageAd = ({ ad, mode = "livead" }) => {

    if (mode === "livead") ad = { ...ad, image: `${BASE_API_URL}/uploads/ads/${ad?.image}` }  // If the ad is live then it will have an image from server

    return (
        <div className='h-[280px] w-[250px] text-sm rounded-md flex flex-col gap-2 justify-between border border-slate-800 shadow-md p-2'>
            {ad.image && <img src={ad?.image} className='h-[100px] w-[250px] rounded-md' />}
            <h4 className='text-xl p-0 m-0 font-bold '>{ad?.title}</h4>
            <p className='text-slate-700 overflow-hidden p-0 m-0 grow text-ellipsis'>{ad?.description}</p>

            <div className='flex gap-1 items-center'><MdOutlineLocationOn /> {ad?.location}</div>

            <div className='flex items-center justify-between' >
                <a href={ad?.redirect_url} target='_blank' className='group relative'>
                    <div className="absolute group-hover:block hidden -top-40 overflow-hidden ">
                        <iframe
                            src={ad?.redirect_url}
                            title="Website Preview"
                            className="rounded-md overflow-y-hidden"
                        />
                    </div>
                    Go to the website
                </a>
                <IoIosFlag role='button' fill='red' color='red' />
            </div>
        </div>
    )
}
export default function CategorySpecifyAd({ page }) {
    const [ads, setAds] = useState(null)

    useEffect(() => {
        const fetchPageSpecificAds = async () => {
            const { data, error } = await tryCatch(() => adService.getPageSpecificAds(page))
            if (data) {
                setAds(data)
            }
        }

        fetchPageSpecificAds()
    }, [page])

    return (

        <div className='grid grow grid-cols-3 gap-10 px-2'>
            {ads && ads.map(ad => <SpecificPageAd key={ad._id} ad={ad} />)}
        </div>

    )
}
