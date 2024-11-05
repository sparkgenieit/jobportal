import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';

import Sidebar from '../../layouts/common/Sidebar';
import ViewProfileComponent from '../../components/ViewProfileComponent';

function ViewProfile() {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    document.title = "Profile"
  }, [])

  return <>
    <div class="container-fluid page-body-wrapper">
      <Sidebar />
      <div class="container-fluid">
        <div className="content-wrapper p-0 bg-white">

          <h3 className="fs-4 text-center flex-grow-1 fw-bold"> Profile </h3>
          <div className='d-flex end-0 align-items-center justify-content-end gap-4'>
            <button type="button" className="btn btn-gradient-primary"><Link to='/profile'>Edit</Link></button>
            <button onClick={handlePrint} className="btn btn-gradient-primary ">Print</button>
          </div>
          <ViewProfileComponent ref={componentRef} />
        </div>
      </div>
    </div>
  </>
}

export default ViewProfile;
