import React, {useState, useContext, useEffect} from 'react';
import { Navbar, Container, Form, Button, Nav, Spinner, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import serverAPI from "../../api/serverAPI";
import { Context as LockerContext } from '../../context/LockerContext';

const AdminNavBar = () => {
    const { getLockers } = useContext(LockerContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            const response = await serverAPI().get(`/locker/${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            setSearchResult(Array.isArray(response.data.payload) ? response.data.payload : []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className="d-flex mx-auto" onSubmit={handleSearch}>
                        <Form.Control
                            type="text"
                            placeholder="Search locker by ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                    <Nav className="ms-auto">
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            <>
                                <Nav.Link href="#notifications">
                                    <FontAwesomeIcon icon={faBell} />
                                </Nav.Link>
                                <Nav.Link href="#profile">
                                    <FontAwesomeIcon icon={faUser} />
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container className="mt-3">
                <div>
                    {searchResult.map((locker) => (
                        <div key={locker._id}>
                            <p>Locker ID: {locker._id}</p>
                            <p>Status: {locker.status}</p>
                            <p>Size: {locker.size}</p>
                            <p>Location ID: {locker.location_id}</p>
                        </div>
                    ))}
                </div>
        </Container>


</Navbar>
    );
};

export default AdminNavBar;
