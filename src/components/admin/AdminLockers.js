import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { Context as LockerContext } from '../../context/LockerContext';
import {Container, Table, Button} from "react-bootstrap";

const AdminLockers = () => {
    const { state, getLockers, addLockers, deleteLockers } = useContext(LockerContext);

    useEffect(() => {
        getLockers();
    }, []);

    const handleDeleteLocker = async (lockerId) => {
        try {
            await axios.delete(`/api/locker/:id`);
            getLockers();
        } catch (error) {
            console.error('Error deleting locker:', error);
        }

    };



    return (
        <div className = "admin-locker">
        <Container>
            <div className="mb-3">
                <Button variant="primary" className="mr-2" >Add Small Locker</Button>
                {/*<Button variant="primary" className="mr-2" onClick={() => handleAddLocker('medium')}>Add Medium Locker</Button>*/}
                {/*<Button variant="primary" onClick={() => handleAddLocker('large')}>Add Large Locker</Button>*/}
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Size</th>
                    <th>Location</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {state.result && state.result.map(locker => (
                    <tr key={locker._id}>
                        <td>{locker._id}</td>
                        <td>{locker.status}</td>
                        <td>{locker.size}</td>
                        <td>{locker.location_id}</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteLocker(locker._id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
        </div>
    );
};

export default AdminLockers;
