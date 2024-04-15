import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import serverAPI from "../../api/serverAPI";
import { Context as LockerContext } from '../../context/LockerContext';
import { Context as LocationContext } from '../../context/LocationContext';
import LocationDropdown from '../admin/LocationDropdown';

const AdminLockers = () => {
    const { state, getLockers } = useContext(LockerContext);
    const { locationState, getLocationById } = useContext(LocationContext);
    const [totalLockers, setTotalLockers] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLockerId, setSelectedLockerId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [locationDetails, setLocationDetails] = useState({});
    const [newSize, setNewSize] = useState('');
    const [newLocation, setNewLocation] = useState('');

    useEffect(() => {
        getLockers();
        fetchTotalLockers();
        fetchLocationDetails();
    }, []);

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
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    };

    const fetchTotalLockers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await serverAPI().get('/total_lockers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data;
            setTotalLockers(data.totalLockers);
        } catch (error) {
            console.error('Error fetching total lockers:', error);
        }
    };

    const handleDelete = async (lockerList, locationId) => {
        if (window.confirm(`Are you sure you want to delete these lockers?`)) {
            setLoading(true);
            await deleteLockers(lockerList, locationId);
            setLoading(false);
        }
    };

    const deleteLockers = async (lockerList, locationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await serverAPI().post('/delete_locker', {
                locker_list: lockerList,
                location_id: locationId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Delete lockers response:', response.data);

            getLockers();
        } catch (error) {
            console.error('Error deleting lockers:', error);

        }
    };

    const handleUpdate = (id) => {
        setSelectedLockerId(id);
        setShowModal(true);
    };

    const updateStatus = async () => {
        try {
            setLoading(true);
            console.log('Selected Locker ID:', selectedLockerId);
            const token = localStorage.getItem('token');
            const response = await serverAPI().post(`/locker/update_status/${selectedLockerId}`, {
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Update status response:', response.data);
            setShowModal(false);
            getLockers();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateLocation = async () => {
        try {
            setLoading(true);
            console.log('Updating location...');
            const token = localStorage.getItem('token');
            console.log('Selected Locker ID:', selectedLockerId);
            console.log('New Address:', newLocation);
            const locationResponse = await serverAPI().get(`/location/addressName/${newLocation}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Location response:', locationResponse.data);

            const newLocationId = locationResponse.data.payload[0]._id;
            console.log('New Location ID:', newLocationId);
            await serverAPI().post(`locker/update_location/${selectedLockerId}`, {
                location_id: newLocationId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setShowModal(false);
        } catch (error) {
            console.error('Error updating location:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="admin-locker">
            <Container>
                <div className="mb-3">
                    <h2>Total Lockers</h2>
                    {totalLockers !== null ? (
                        <p>{totalLockers}</p>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <Button variant="primary" className="mr-2">Add Small Locker</Button>
                </div>
                <Row xs={1} md={3} className="g-4">
                    {state.result && state.result.map(locker => (
                        <Col key={locker._id}>
                            <Card className="locker-card">
                                <Card.Body>
                                    <Card.Title>Locker ID: {locker._id}</Card.Title>
                                    <Card.Text>Status: {locker.status}</Card.Text>
                                    <Card.Text>Size: {locker.size}</Card.Text>
                                    <Card.Text>
                                        Location: {locationDetails[locker.location_id] ? locationDetails[locker.location_id] : "N/A"}
                                    </Card.Text>
                                    <Button variant="info" onClick={() => handleUpdate(locker._id)}>Update</Button>
                                    <Button variant="danger" onClick={() => handleDelete([locker._id], locker.location_id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Locker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="statusSelect">
                        <Form.Label>Status:</Form.Label>
                        <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                            <option value="Valid">Valid</option>
                            <option value="Occupied">Occupied</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="locationSelect">
                        <Form.Label>Location:</Form.Label>
                        <LocationDropdown onChange={(handleLocationChange) => setNewLocation(handleLocationChange)} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={updateStatus} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Status'}
                    </Button>
                    <Button variant="primary" onClick={updateLocation} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Location'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};

export default AdminLockers;
