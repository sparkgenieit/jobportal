import { useEffect, useState } from 'react';
import './Loader.css';
function Loader({ children, loading }) {


    return <div className={loadingClass} >
        {loading === true && <div className='loader'></div>}
        {children}
    </div>

}

export default Loader;

