import React, { useState, useEffect, useContext } from 'react';
import './style/admin-style.css';
import { Context as TransactionContext } from '../../context/TransactionContext';
import serverAPI from "../../api/serverAPI";
import { Context as LockerContext } from '../../context/LockerContext';

const AdminDashboard = () => {
    const { state, getTransaction } = useContext(TransactionContext);
    const { state: lockerState, getLockers } = useContext(LockerContext);
    const [locationDetails, setLocationDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        getTransaction();
        getLockers();
        fetchLocationDetails();
    }, []);

    useEffect(() => {
        if (lockerState.result) {
            fetchFormattedAddresses(lockerState.result);
        }
    }, [lockerState.result]);

    useEffect(() => {
        if (state.result) {
            calculateTotalSales(state.result);
        }
    }, [state.result]);

    const fetchLocationDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await serverAPI().get('/all_locations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const locations = response.data.payload;
            const details = {};
            locations.forEach(location => {
                details[location._id] = location.formatted_address;
            });
            setLocationDetails(details);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    };

    const fetchFormattedAddresses = async (lockers) => {
        const formattedAddresses = {};
        for (const locker of lockers) {
            try {
                const token = localStorage.getItem('token');
                const response = await serverAPI().get(`/location/${locker.location_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const location = response.data.payload;
                formattedAddresses[locker._id] = location.formatted_address;
            } catch (error) {
                console.error(`Error fetching formatted address for locker ${locker._id}:`, error);
                formattedAddresses[locker._id] = "N/A";
            }
        }
        setLocationDetails(formattedAddresses);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    };

    const calculateTotalSales = (transactions) => {
        const completeTransactions = transactions.filter(transaction => transaction.status === 'Completed');
        const total = completeTransactions.reduce((acc, curr) => acc + curr.cost, 0);
        setTotalSales(total);
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="card">
                <h3>Total Sales for Complete Transactions</h3>
                <p>{totalSales}</p>
            </div>
            <div>
                <h3>Transaction Details</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="admin-transaction-table">
                        <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>User ID</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.result && state.result.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction._id}</td>
                                <td>{transaction.user_id}</td>
                                <td>{locationDetails[transaction.locker_id] || "N/A"}</td>
                                <td>{transaction.status}</td>
                                <td>{transaction.cost}</td>
                                <td>{formatDate(transaction.start_date)}</td>
                                <td>{formatDate(transaction.end_date)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;