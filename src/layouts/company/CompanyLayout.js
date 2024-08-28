import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { getCredits } from '../../helpers/functions';

export default function CompanyLayout() {
    useEffect(() => {
        getCredits()
    }, [])
    return (
        <>
            <div className='container-scroller'>
                <Header />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}