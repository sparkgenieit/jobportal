// import logo from './logo.svg';
import './ads.css';
import { useEffect, useState } from 'react';
import http from '../../helpers/http';
import { RxCross1 } from 'react-icons/rx'

function Ads() {
  const [showAdvertisement, setShowAdvertisement] = useState(true);
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


  const handleClose = () => {
    setShowAdvertisement(false);
  };

  return (
    <>
      {showAdvertisement && (
        <div className="bg-light rounded-3 p-2  d-flex flex-column gap-3">
          <div className='d-flex justify-content-end'>
            <RxCross1 role='button' onClick={handleClose} />
          </div>
          <img className='rounded-3  adv-image ' src="/assets/demo-ad.jpg" alt="Advertisement" />
          <div className="d-flex small flex-column px-3 gap-3">
            <small>Ads</small>
            {ad && ad.title && <div className='fw-bold'>{ad.title}</div>}
            {ad && ad.description && <div>{ad.description}</div>}
          </div>
        </div >
      )
      }

    </>
  );
}

export default Ads;
