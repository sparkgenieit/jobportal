import { useEffect, useState } from 'react';
import './Footer.css';

function Footer() {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000)
  }, [])

  return <>
    <footer id="footer" className="footer" style={{ 'padding': '0px' }}>

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
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="/">Home</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/aboutus">About us</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/services">Services</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/termsofservice">Terms of service</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/privacypolicy">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="/web-design">Web Design</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/web-development">Web Development</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/product-management">Product Management</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/marketing">Marketing</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="/graphic-design">Graphic Design</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
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

              Designed by <a href="https://sparkgenieit.com/">Spark Genie IT Solutions</a>
            </div>
          </div>

          <div className="social-links order-first order-lg-last mb-3 mb-lg-0">
            <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
            <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
            <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
            <a href="#" className="google-plus"><i className="bi bi-skype"></i></a>
            <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          </div>

        </div>
      </div>

    </footer>


    <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i
      className="bi bi-arrow-up-short"></i></a>

    {loader && <div id="preloader"></div>}

  </>
}


export default Footer;
