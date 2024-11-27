import './ads.css';
import { useEffect, useState } from 'react';
import http from '../../helpers/http';

function Ads({ type = "long" }) {
  const [ad, setAd] = useState(null)

  useEffect(() => {
    http.get("/ads/all")
      .then((response) => {
        let allAds = response.data
        const randomAd = Math.floor(Math.random() * allAds.length)
        setAd(allAds[randomAd])
      }
      )
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className={`bg-light rounded-3 p-2  d-flex ${type === "short" ? "flex-row" : "flex-column"} gap-3 ad-container`}>
        <img className={`rounded-3 ${type === "short" ? "short-ad " : "long-ad"}`} src="/assets/demo-ad.jpg" alt="Advertisement" />
        <div className="d-flex small flex-column px-3 gap-3">
          <small>Ads</small>
          {ad && ad.title && <div className='fw-bold'>{ad.title}</div>}
          {ad && ad.description && <div>{ad.description}</div>}
        </div>
      </div >
    </>
  );
}

export default Ads;
