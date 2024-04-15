import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import serverAPI from "../../api/serverAPI";

const LocationDropdown = ({ onChange }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await serverAPI().get('/all_locations');
                const data = response.data.payload;
                setLocations(data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };
        fetchLocations();
    }, []);

    const handleLocationChange = (event) => {

        const selectedLocationId = event.target.value;
        onChange(selectedLocationId);
    };

    return (
        <Form.Group controlId="locationSelect">
            <Form.Label>Select Location:</Form.Label>
            <Form.Control as="select" onChange={handleLocationChange}>
                <option value="">Select a location...</option>
                {locations.map(location => (
                    <option key={location.id} value={location.postcode}>{location.formatted_address}</option>

                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default LocationDropdown;
