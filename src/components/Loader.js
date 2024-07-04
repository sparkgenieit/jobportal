import { useEffect, useState } from 'react';
import './Loader.css';
function Loader({ children, loading }) {


    return <div>
        {loading === true && <div className='loader'></div>}
        {children}
    </div>

}

export default Loader;

