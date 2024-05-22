import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';

import ViewProfileComponent from '../../components/ViewProfileComponent';
import { useRef } from 'react';
import { useReactToPrint  } from 'react-to-print';


function ViewProfile() {
 
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current
});
const buttonLink = '<button onClick={handlePrint}>Print article</button>'
const myRefname= useRef<HTMLButtonElement>(null);
return <>
  <Header />
  {/* <main id="main"> */}

  {/* <section class="inner-page" data-aos="fade-up"> */}
  {/* <div class="container-fluid homeBg"> */}
  <div class="container-fluid page-body-wrapper">
    <Sidebar />
    <div class="main-panel bg-light">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Profile </h3>
             <button onClick={handlePrint} className="btn btn-gradient-primary">Print</button>
            </div>
      
    
      <ViewProfileComponent ref={componentRef}  />
      </div>
            {/* </div> */}
          </div>
          {/* </div> */}
      </div>
      {/* </div> */}
      {/* </section> */}
  
      {/* </main> */}
      <Footer />
      
      
      </>



}

export default ViewProfile;
