import { useEffect, useState } from 'react'
import { tryCatch } from '../../../helpers/functions'
import { adService } from '../../../services/company/Ads.service'
import { IoIosFlag } from "react-icons/io";
import { MdOutlineLocationOn } from 'react-icons/md';
import { BASE_API_URL } from '../../../helpers/constants';

export const SpecificPageAd = ({ imageUrl,ad}) => {
console.log('adddd',ad);
  //  if (mode === "livead") ad = { ...ad, image: `${BASE_API_URL}/uploads/ads/${ad?.image}` }  // If the ad is live then it will have an image from server
  const imgSrc = (imageUrl && imageUrl.includes('blob')) ? imageUrl : `${BASE_API_URL}/uploads/ads/${ad.image}`;

    return (
        <div className='h-[280px] w-[250px] text-sm rounded-md flex flex-col gap-2 justify-between border border-slate-800 shadow-md p-2'>
            {imgSrc && (
                            <img
                                style={{ maxWidth: "300px", maxHeight: "200px" }}
                                className="rounded border border-secondary me-md-3 mb-3 mb-md-0"
                                src={imgSrc}
                                alt={ad.title}
                            />
                        )}
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
export default function CategorySpecifyAd({ page,category }) {
    const [ads, setAds] = useState(null)

    useEffect(() => {
        const fetchPageSpecificAds = async () => {
            const { data: pageData, error: pageError } = await tryCatch(() => adService.getPageSpecificAds(page));
            console.log("Page Data:", pageData);
    
            const today = new Date();
    
            // Filter ads where today falls within the start_date and end_date
            const validAds = pageData?.filter(ad => {
                const startDate = new Date(ad.start_date);
                const endDate = new Date(ad.end_date);
                return today >= startDate && today <= endDate;
            });
    
            if (validAds && validAds.length > 0) {
                setAds(validAds);  // ✅ Set only valid ads
            } else {
                const { data: categoryData, error: categoryError } = await tryCatch(() => adService.getCategorySpecificAds(category));
                if (categoryData) {
                    setAds(categoryData);
                }
            }
        };
    
        fetchPageSpecificAds();
    }, [page, category]); 
    

    return (

        <div className='grid grow grid-cols-3 gap-10 px-2'>
            {ads && ads.map(ad => <SpecificPageAd key={ad._id} ad={ad} />)}
        </div>

    )
}
