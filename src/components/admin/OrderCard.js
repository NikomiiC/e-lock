import React from 'react';

const OrderCard = ({ orderCount }) => {
    return (
        <div className="card">
            <h3>Orders</h3>
            <p>Total Orders: {orderCount}</p>
        </div>
    );
};

export default OrderCard;
