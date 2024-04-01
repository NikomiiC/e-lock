// CreateLockerForm.js
import React, { useState } from 'react';

const CreateLockerForm = ({ onCreate }) => {
    const [status, setStatus] = useState('');
    const [size, setSize] = useState('');
    const [locationId, setLocationId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call API to create locker with the provided data
        onCreate({ status, size, locationId });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
            <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
            <input type="text" placeholder="Location ID" value={locationId} onChange={(e) => setLocationId(e.target.value)} />
            <button type="submit">Create Locker</button>
        </form>
    );
};

export default CreateLockerForm;
