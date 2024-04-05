// import logo from './logo.svg';
import './ads.css';
import { useState } from 'react';

function Ads() {
  const [showAdvertisement, setShowAdvertisement] = useState(true);

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
            <h2>Special Offer!</h2>
            <p>Get 20% off on all products this weekend!</p>
            <button>Shop Now</button>
          </div>
        </div>
      )}

   </>
  );
}

export default Ads;
