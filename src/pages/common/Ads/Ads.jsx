import './ads.css';
import { useEffect, useState } from 'react';
import http from '../../../helpers/http';

function Ads({ type = "long" }) {
  const [ad, setAd] = useState(null)

  useEffect(() => {
    http.get(`/ads/show-ad?type=${type}`)
      .then((response) => setAd(response.data))
      .catch(() => setAd(null))
  }, [])

  if (!ad) {
    return null
  }

  return (
    <a href={ad?.redirect_url} target='blank' className={`bg-slate-100 rounded-3 p-2 flex ${type === "short" ? "flex-row " : "flex-col "} gap-3 ad-container no-underline`}>
      <img className={`rounded-md   ${type === "short" ? "short-ad" : " long-ad"}`} src={ad?.ad_image_url} alt="Advertisement" />
      <div className="flex text-sm flex-col px-3 gap-1">
        <div className='font-bold text-black '>{ad.title}</div>
        <div>{ad.description}</div>
      </div>
    </a >
  );
}

export default Ads;
