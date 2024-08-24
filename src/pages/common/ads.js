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

        <div className="advertisement d-flex flex-column ">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          <img className='rounded-3 w-100 1h-50' src="https://via.placeholder.com/150" alt="Advertisement" />
          <div className="advertisement-content">
            <small>Ads</small>
            <h2>{ad && ad.title}</h2>
            <p>{ad && ad.description}</p>
            <button>Shop Now</button>
          </div>
        </div>

      )}

    </>
  );
}

export default Ads;
