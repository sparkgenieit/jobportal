import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useDispatch } from 'react-redux'

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { fetchEmployerUnreadCount } from '../../helpers/slices/mailCountSlice';



export default function CompanyLayout() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployerUnreadCount())
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