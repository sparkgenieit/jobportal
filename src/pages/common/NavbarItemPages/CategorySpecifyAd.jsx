import { useEffect, useState } from 'react'
import { tryCatch } from '../../../helpers/functions'
import { adService } from '../../../services/company/Ads.service'
import { IoIosFlag } from "react-icons/io";
import { IoBookmark, IoHomeOutline } from 'react-icons/io5';

import { MdOutlineLocationOn } from 'react-icons/md';
import { BsFillBookmarkFill, BsFillForwardFill } from 'react-icons/bs'; // Bookmark and Forward icons

import { FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";

import { CiBookmark, CiViewList } from "react-icons/ci";
import { BASE_API_URL } from '../../../helpers/constants';

export const SpecificPageAd = ({ imageUrl, ad }) => {
    console.log('adddd Specific', ad);
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
            <h4 className='text-xl p-0 m-0 font-bold'>{ad?.title}</h4>
            <p className='text-slate-700 overflow-hidden p-0 m-0 grow text-ellipsis'>{ad?.description}</p>

            <div className='flex gap-1 items-center'>
                <MdOutlineLocationOn /> {ad?.location}
            </div>
            <div className='flex gap-1 items-center'>$ {ad?.price}</div>

            <div className='flex items-center justify-between relative'>
                <div className="relative group flex items-center gap-2">
                    {/* View Icon: Same size as website preview */}
                    <span className="absolute top-0 left-0 p-2 bg-white rounded-full shadow-md" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        👁️
                    </span>

                    {/* Website Link */}
                    <a href={ad?.website} target='_blank' className='relative'>
                        website
                    </a>

                    {/* Website Preview (Iframe): Initially hidden, shown on hover over website link */}
                    <div className="absolute top-0 left-0 hidden group-hover:block">
                        <iframe
                            src={ad?.website}
                            title="Website Preview"
                            className="rounded-md overflow-hidden"
                            style={{ width: '300px', height: '200px' }}
                        />
                    </div>
                </div>

                {/* Bookmark and Forward Icons */}
            
                  <FaShare fontSize={16} />
 <IoBookmark fontSize={16} />
                {/* Flag Icon */}
                <IoIosFlag role='button' fill='red' color='red' />
            </div>
        </div>
    )
}

export default function CategorySpecifyAd({ page, category }) {
    const [ads, setAds] = useState(null)

    useEffect(() => {
        const fetchPageSpecificAds = async () => {
            const { data: pageData, error: pageError } = await tryCatch(() => adService.getPageSpecificAds(page));
            console.log("Page Data:", pageData);

            const today = new Date();

            // Filter ads where today falls within the start_date and end_date

        //    console.log(new Date(JSON.parse(pageData[0].booked_dates[0])));
            const validAds = pageData?.filter(ad => {
                const startDate = new Date(ad.start_date);
                const endDate = new Date(ad.end_date);
                return today >= startDate && today <= endDate;
            });

            if (validAds && validAds.length > 0) {
                setAds(validAds);  // ✅ Set only valid ads
            }
            else{
                setAds(null); 
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
