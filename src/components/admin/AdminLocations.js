import React, { useContext, useEffect, useState } from "react";
import { Context as LocationContext } from "../../context/LocationContext";
import { Button, Modal, Form, Table } from "react-bootstrap";
import serverAPI from "../../api/serverAPI";
import AdminNavBar from "./AdminNavBar";

const AdminLocations = () => {
    const { state, getLocations } = useContext(LocationContext);
    const [showModal, setShowModal] = useState(false);
    const [updatedLocation, setUpdatedLocation] = useState({
        area: "",
        formatted_address: "",
        postcode: "",
        loc: { coordinates: [0, 0] } // Initialize loc with default coordinates
    });
    const [selectedLocationId, setSelectedLocationId] = useState(null);

    useEffect(() => {
        getLocations();
    }, []);

    useEffect(() => {
        if (!showModal) {
            setUpdatedLocation({
                area: "",
                formatted_address: "",
                postcode: "",
                loc: { coordinates: [0, 0] }
            });
            setSelectedLocationId(null);
        }
    }, [showModal]);


    const handleUpdate = async (locationId) => {
        setSelectedLocationId(locationId);
        try {
            const token = localStorage.getItem('token');
            const response = await serverAPI().post(`/update_location/${locationId}`, updatedLocation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.data.code === 0) {
                console.log('Location updated successfully:', response.data.payload);
            }
            getLocations();
            setShowModal(false);
        } catch (error) {
            console.error("Error updating location:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedLocation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOpenModal = (location) => {
        if (location) {
            setUpdatedLocation({
                location_id: location._id,
                area: location.area,
                formatted_address: location.formatted_address,
                postcode: location.postcode,
                loc: location.loc
            });
            setSelectedLocationId(location._id);
        } else {
            setUpdatedLocation({
                location_id: "",
                area: "",
                formatted_address: "",
                postcode: "",
                loc: { coordinates: [] }
            });
            setSelectedLocationId(null);
        }
        setShowModal(true);
    };


    const handleDelete = async (locationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await serverAPI().get(`/location/${locationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const locationData = response.data.payload;
            if (locationData.locker_list && locationData.locker_list.length > 0) {
                console.log('Cannot delete location with lockers, there are lockers associated with this location:', locationData.locker_list.length);
                alert('Cannot delete location with associated lockers.');
                return;
            }
            const confirmDelete = window.confirm('Are you sure you want to delete this location?');
            if (!confirmDelete) {
                return;
            }
            const deleteResponse = await serverAPI().delete(`/delete_location/${locationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (deleteResponse.data.code === 0) {
                console.log('Location deleted successfully:', deleteResponse.data.payload);
                getLocations();
            }
        } catch (error) {
            console.error("Error deleting location:", error.message);
        }
    };

    const handleAdd = async () => {
        try {
            setUpdatedLocation({
                area: "",
                formatted_address: "",
                postcode: "",
                loc: { coordinates: [0, 0] } // Reset loc to default coordinates
            });
            setSelectedLocationId(null);
            const token = localStorage.getItem('token');
            const response = await serverAPI().post("/create_location", updatedLocation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" // Specify content type
                }
            });
            if (response.data.code === 0) {
                console.log('Location added successfully:', response.data.payload);
                getLocations();
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error adding location:", error.message);
        }
    };
    const handleLatitudeChange = (e) => {
        const latitude = parseFloat(e.target.value);
        setUpdatedLocation(prevState => ({
            ...prevState,
            loc: { ...prevState.loc, coordinates: [latitude, updatedLocation.loc.coordinates[1]] }
        }));
    };

    const handleLongitudeChange = (e) => {
        const longitude = parseFloat(e.target.value);
        setUpdatedLocation(prevState => ({
            ...prevState,
            loc: { ...prevState.loc, coordinates: [updatedLocation.loc.coordinates[0], longitude] }
        }));
    };






    return (
        <div style={{ backgroundColor: "#D9BC83", minHeight: "100vh"}}>
            <div>
                <AdminNavBar/>
            </div>
            <div style={{ textAlign: "center" }}>
                <h3>Location Details</h3>
                <Button onClick={() => setShowModal(true)}>Add New Location</Button>
            </div>
            <Table className="admin-location-table">
                <thead>
                <tr>
                    <th>Location ID</th>
                    <th>Area</th>
                    <th>Address</th>
                    <th>Postcode</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {state.result &&
                    state.result.map(location => (
                        <tr key={location._id}>
                            <td>{location._id}</td>
                            <td>{location.area}</td>
                            <td>{location.formatted_address}</td>
                            <td>{location.postcode}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleOpenModal(location)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(location._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="area">
                            <Form.Label>Area</Form.Label>
                            <Form.Control
                                type="text"
                                name="area"
                                value={updatedLocation.area}
                                onChange={handleChange}
                                readOnly={!!selectedLocationId}
                            />
                        </Form.Group>
                        <Form.Group controlId="formatted_address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="formatted_address"
                                value={updatedLocation.formatted_address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="postcode">
                            <Form.Label>Postcode</Form.Label>
                            <Form.Control
                                type="text"
                                name="postcode"
                                value={updatedLocation.postcode}
                                onChange={handleChange}
                                readOnly={!!selectedLocationId}
                            />
                        </Form.Group>
                        <Form.Group controlId="coordinates">
                            <Form.Label>Coordinates</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                name="coordinates"
                                placeholder="Enter coordinates"
                                value={updatedLocation.loc.coordinates[0]}
                                onChange={(e) => handleLatitudeChange(e)}
                            />
                            ,
                            <Form.Control
                                type="number"
                                step="any"
                                name="coordinates"
                                placeholder="Enter coordinates"
                                value={updatedLocation.loc.coordinates[1]}
                                onChange={(e) => handleLongitudeChange(e)}
                            />
                        </Form.Group>


                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    {selectedLocationId ? (
                        <Button variant="primary" onClick={() => handleUpdate(selectedLocationId)}>
                            Update Location
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => handleAdd()}>
                            Add Location
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminLocations;
