import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import serverAPI from "../../api/serverAPI";
import { Context as LockerContext } from '../../context/LockerContext';

const AdminLockers = () => {
    const { state, getLockers, addLockers } = useContext(LockerContext);
    const [totalLockers, setTotalLockers] = useState(null);

    useEffect(() => {
        getLockers();
        fetchTotalLockers();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete ${id}?`)) {
            // Perform deletion logic here
        }
    }

    const handleUpdate = (id) => {
        if (window.confirm(`Are you sure you want to delete ${id}?`)) {
            // Perform deletion logic here
        }
    }

    const fetchTotalLockers = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
            const response = await serverAPI().get('/total_lockers', {
                headers: {
                    Authorization: `Bearer ${token}` // Include JWT token in authorization header
                }
            });
            const data = response.data;
            setTotalLockers(data.totalLockers);
        } catch (error) {
            console.error('Error fetching total lockers:', error);
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
                                    <Card.Text>Location: {locker.location_id ? locker.location_id : "N/A"}</Card.Text>
                                    <Button variant="info" onClick={() => handleUpdate(locker._id)}>Update</Button>
                                    <Button variant="danger" onClick={() => handleDelete(locker._id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default AdminLockers;