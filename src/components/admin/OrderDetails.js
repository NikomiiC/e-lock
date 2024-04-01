import React from 'react';

const OrderDetails = () => {
    const orders = [
        { orderNo: '001', location: 'Location A', dateTime: '2024-03-20 10:00 AM', amount: '$100', status: 'Pending' },
        { orderNo: '002', location: 'Location B', dateTime: '2024-03-21 11:00 AM', amount: '$150', status: 'Completed' },
    ];

    return (
        <div className="admin-order-details">
            <h3>Order Details</h3>
            <table className="admin-order-details-table">
                <thead>
                <tr>
                    <th>Order No</th>
                    <th>Location</th>
                    <th>Date-Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.orderNo}</td>
                        <td>{order.location}</td>
                        <td>{order.dateTime}</td>
                        <td>{order.amount}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetails;
