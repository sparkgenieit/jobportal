import { useEffect, useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000)
  }, [])

  return <>
    <footer id="footer" className="footer">

      <div className="footer-content">
        <div className="container">
          <div className="row">

            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>Job Board</h3>
                <p>
                  A108 Adam Street <br />
                  NY 535022, USA<br /><br />
                  <strong>Phone:</strong> +1 5589 55488 55<br />
                  <strong>Email:</strong> info@example.com<br />
                </p>


              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul className='list-unstyled no-underline text-black'>
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/aboutus">About us</Link></li>
                <li> <Link to="/services">Services</Link></li>
                <li> <Link to="/termsofservice">Terms of service</Link></li>
                <li> <Link to="/privacypolicy">Privacy policy</Link></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul className='list-unstyled'>
                <li><Link to="/web-design">Web Design</Link></li>
                <li> <Link to="/web-development">Web Development</Link></li>
                <li> <Link to="/product-management">Product Management</Link></li>
                <li> <Link to="/marketing">Marketing</Link></li>
                <li> <Link to="/graphic-design">Graphic Design</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
              <form className='flex gap-2'>
                <input type="email" name="email" className='form-control' />
                <input type="button" value="Subscribe" className='btn' />
              </form>


            </div>

          </div>
        </div>
      </div>


      <div className="footer-legal text-center">
        <div
          className="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">

          <div className="d-flex flex-column align-items-center align-items-lg-start">
            <div className="copyright">
              &copy; Copyright <strong><span>Job Board</span></strong>. All Rights Reserved
            </div>
            <div className="credits">

              Designed by <Link to="https://sparkgenieit.com/">Spark Genie IT Solutions</Link>
            </div>
          </div>

          <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
            <Link to="#" className="twitter"><i className="bi bi-twitter"></i></Link>
            <Link to="#" className="facebook"><i className="bi bi-facebook"></i></Link>
            <Link to="#" className="instagram"><i className="bi bi-instagram"></i></Link>
            <Link to="#" className="google-plus"><i className="bi bi-skype"></i></Link>
            <Link to="#" className="linkedin"><i className="bi bi-linkedin"></i></Link>
          </div>

        </div>
      </div>

    </footer>


    <Link to="#" className="scroll-top d-flex align-items-center justify-content-center"><i
      className="bi bi-arrow-up-short"></i></Link>

    {loader && <div id="preloader"></div>}

  </>
}


export default Footer;
