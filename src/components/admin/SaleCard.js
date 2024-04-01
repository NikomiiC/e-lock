import React from 'react';

const SaleCard = ({ totalSales }) => {
    return (
        <div className="card">
            <h3>Sales</h3>
            <p>Total Sales: ${totalSales}</p>
        </div>
    );
};

export default SaleCard;
