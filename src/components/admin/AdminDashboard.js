import React, { useState, useEffect } from 'react';
import LockerCard from '././LockerCard';
import OrderCard from './OrderCard';
import SaleCard from './SaleCard';
import OrderDetails from './OrderDetails';
import './style/admin-style.css';

const AdminDashboard = () => {
    const [lockerCount, setLockerCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [orderDetails, setOrderDetails] = useState([]);


    useEffect(() => {
        fetchLockerCount();
        fetchOrderCount();
        fetchTotalSales();
        fetchOrderDetails();
    }, []);

    const fetchLockerCount = () => {
    };


    const fetchOrderCount = () => {
    };


    const fetchTotalSales = () => {
    };
    const fetchOrderDetails = () => {

    };


    return (

        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="admin-card-container">
                <LockerCard lockerCount={lockerCount} />
                <OrderCard orderCount={orderCount} />
                <SaleCard totalSales={totalSales} />


            </div>
            <div>
                <OrderDetails />
            </div>
        </div>
    );
};

export default AdminDashboard;
