// LockerCard.js
import React from 'react';

const LockerCard = ({ lockerCount }) => {
    return (
        <div className="locker-card">
            <h3></h3>
            <p>Total Lockers: {lockerCount}</p>
            {/* Add more locker details as needed */}
        </div>
    );
};

export default LockerCard;
