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
    <footer id="footer" class="footer" style={{'padding':'0px'}}>

      <div class="footer-content">
        <div class="container">
          <div class="row">

            <div class="col-lg-3 col-md-6">
              <div class="footer-info">
                <h3>Job Board</h3>
                <p>
                  A108 Adam Street <br />
                  NY 535022, USA<br /><br />
                  <strong>Phone:</strong> +1 5589 55488 55<br />
                  <strong>Email:</strong> info@example.com<br />
                </p>

               
              </div>
            </div>

            <div class="col-lg-2 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><i class="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/Aboutus">About us</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/Services">Services</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/Termsofservice">Terms of service</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/Privacypolicy">Privacy policy</a></li>
                  </ul>
                </div>

                <div class="col-lg-3 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/WebDesign">Web Design</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/WebDevelopment">Web Development</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/ProductManagement">Product Management</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/Marketing">Marketing</a></li>
                    <li><i class="bi bi-chevron-right"></i> <a href="/common/GraphicDesign">Graphic Design</a></li>
                  </ul>
                </div>

                <div class="col-lg-4 col-md-6 footer-newsletter">
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

      
      <div class="footer-legal text-center">
              <div
                class="container d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">

                <div class="d-flex flex-column align-items-center align-items-lg-start">
                  <div class="copyright">
                    &copy; Copyright <strong><span>Job Board</span></strong>. All Rights Reserved
                  </div>
                  <div class="credits">

                    Designed by <a href="https://sparkgenieit.com/">Spark Genie IT Solutions</a>
                  </div>
                </div>

                <div class="social-links order-first order-lg-last mb-3 mb-lg-0">
                  <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                  <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                  <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                  <a href="#" class="google-plus"><i class="bi bi-skype"></i></a>
                  <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                </div>

              </div>
            </div>

    </footer>

    
  <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i
      class="bi bi-arrow-up-short"></i></a>

  {loader && <div id="preloader"></div>}

  </>
}


export default Footer;
