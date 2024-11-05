// import logo from './logo.svg';
import axios from 'axios';
import './ads.css';
import { useEffect, useState } from 'react';
import http from '../../helpers/http';

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

        <div className="advertisement my-3 ">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          <div className=' d-flex flex-row flex-lg-column '>
            <img className='rounded-3  adv-image ' src="https://via.placeholder.com/150" alt="Advertisement" />
            <div className="d-flex small flex-column px-3 justify-content-between">
              <small>Ads</small>
              <div className='fw-bold'>{ad && ad.title}</div>
              <div>{ad && ad.description}</div>
              <button className='btn-xs btn btn-primary'>Shop Now</button>
            </div>
          </div>
        </div>

      )}

    </>
  );
}

export default Ads;
