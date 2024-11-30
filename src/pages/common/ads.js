import './ads.css';
import { useEffect, useState } from 'react';
import http from '../../helpers/http';

function Ads({ type = "long" }) {
  const [ad, setAd] = useState(null)

  useEffect(() => {
    http.get(`/ads/show-ad?type=${type}`)
      .then((response) => setAd(response.data))
      .catch(() => { })
  }, [])

  return (
    <a href={ad?.redirect_url} target='blank' className={`bg-light rounded-3 p-2  d-flex ${type === "short" ? "flex-row " : "flex-column "} gap-3 ad-container`}>
      <img className={`rounded-3   ${type === "short" ? "short-ad" : " long-ad"}`} src={ad?.ad_image_url ? ad?.ad_image_url : "/assets/demo-ad.jpg"} alt="Advertisement" />
      <div className="d-flex small flex-column px-3 gap-1">
        {ad && ad.title && <div className='fw-bold'>{ad.title}</div>}
        {ad && ad.description && <div>{ad.description}</div>}
      </div>
    </a >
  );
}

export default Ads;
