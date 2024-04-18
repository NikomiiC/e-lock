import React, {useState, useContext, useEffect} from 'react';
import { Navbar, Container, Form, Button, Nav, Spinner, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import serverAPI from "../../api/serverAPI";
import { Context as LockerContext } from '../../context/LockerContext';
import {useNavigate} from "react-router-dom";
import {Context as AuthContext} from "../../context/AuthContext";
import Auth from "../Auth";

const AdminNavBar = () => {
//     const { getLockers } = useContext(LockerContext);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [searchResult, setSearchResult] = useState([]);
//
//     const handleSearch = async (e) => {
//         e.preventDefault();
//         try {
//             setLoading(true);
//             setError(null);
//             const token = localStorage.getItem('token');
//             const response = await serverAPI().get(`/locker/${searchTerm}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             console.log(response);
//             setSearchResult(Array.isArray(response.data.payload) ? response.data.payload : []);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//
//     }
//
//     return (
//         <Navbar bg="light" expand="lg">
//             <Container>
//                 <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Form className="d-flex mx-auto" onSubmit={handleSearch}>
//                         <Form.Control
//                             type="text"
//                             placeholder="Search locker by ID"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <Button variant="outline-success" type="submit">Search</Button>
//                     </Form>
//                     <Nav className="ms-auto">
//                         {loading ? (
//                             <Spinner animation="border" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                             </Spinner>
//                         ) : (
//                             <>
//                                 <Nav.Link href="#notifications">
//                                     <FontAwesomeIcon icon={faBell} />
//                                 </Nav.Link>
//                                 <Nav.Link href="#profile">
//                                     <FontAwesomeIcon icon={faUser} />
//                                 </Nav.Link>
//                             </>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//             <Container className="mt-3">
//                 <div>
//                     {searchResult.map((locker) => (
//                         <div key={locker._id}>
//                             <p>Locker ID: {locker._id}</p>
//                             <p>Status: {locker.status}</p>
//                             <p>Size: {locker.size}</p>
//                             <p>Location ID: {locker.location_id}</p>
//                         </div>
//                     ))}
//                 </div>
//         </Container>
//
//
// </Navbar>
//     );
// };
//
// export default AdminNavBar;
    const navigate = useNavigate();

    const { signout } = useContext(AuthContext);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log(typeof(isLoggedIn));
    const logout = async () => {
        await signout();
    }
    const [show, setShow] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShowModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-light ftco-navbar-light" id="ftco-navbar">
                <Container>
                    <a class="navbar-brand" href="index.js">eLockHub</a>
                    <button class="navbar-toggler" type="button" onClick={()=>setShow(!show)} data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="fa fa-bars"></span> Menu
                    </button>
                    <div style={show?{display:"block"}:{display:'none'}} className="collapse navbar-collapse" id="ftco-nav">
                        <ul class="navbar-nav ml-auto">

                            <li id="loginBtn" class="nav-item">
                                {isLoggedIn ?
                                    <button type="button" class="btn btn-danger text-light nav-login" onClick={logout}>
                                        Sign Out
                                    </button>
                                    : <button type="button" class="btn btn-warning text-light nav-login" onClick={handleShowModal}>
                                        Login/Sign-up
                                    </button>}
                            </li>
                        </ul>
                    </div>
                </Container>
            </nav>
            <Auth isOpen={isModalOpen} handleCloseModal={handleCloseModal} />
        </div>
    );
}



export default AdminNavBar;