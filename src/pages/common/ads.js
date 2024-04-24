// import logo from './logo.svg';
import axios from 'axios';
import './ads.css';
import { useEffect, useState } from 'react';

function Ads() {
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const [ad, setAd] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:8080/ads/all")
      .then((response) => {
        let allAds = response.data
        const randomAd = Math.floor(Math.random() * allAds.length)
        setAd(allAds[randomAd])
      }
      )
      .catch(err => console.log(err))

    setTimeout(() => {
      setShowAdvertisement(true)
    }, 2000)
  }, [])


  const handleClose = () => {
    setShowAdvertisement(false);
  };

  return (
    <>
      {showAdvertisement && (
        <div className="advertisement ">
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
          <img src="https://via.placeholder.com/150" alt="Advertisement" />
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
