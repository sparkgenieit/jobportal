import Header from '../../layouts/common/Header';
import Footer from '../../layouts/common/Footer';
import Sidebar from '../../layouts/common/Sidebar';

import ViewProfileComponent from '../../components/ViewProfileComponent';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


function ViewProfile() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const buttonLink = '<button onClick={handlePrint}>Print article</button>'
  const myRefname = useRef < HTMLButtonElement > (null);
  return <>
    <div class="container-fluid page-body-wrapper">
      <Sidebar />
      <div class="container-fluid">
        <div className="content-wrapper bg-white">
          <div className="page-header">
            <h3 className="page-title"> Profile </h3>
            <button onClick={handlePrint} className="btn btn-gradient-primary">Print</button>
          </div>
          <ViewProfileComponent ref={componentRef} />
        </div>
      </div>
    </div>
  </>
}

export default ViewProfile;
