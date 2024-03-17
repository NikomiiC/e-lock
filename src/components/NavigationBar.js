import React, { useContext, useState } from "react";
import { Container } from 'react-bootstrap';
import { Context as AuthContext } from "../context/AuthContext";
import { Routes, Route, BrowserRouter as Router, useNavigate } from "react-router-dom";
import Auth from "./Auth";


const NavigationBar = () => {
    const navigate = useNavigate();

    const { signout } = useContext(AuthContext);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // console.log(typeof(isLoggedIn));
    const logout = async () => {
        await signout();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleShowModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-light ftco-navbar-light" id="ftco-navbar">
                <Container>
                    <a class="navbar-brand" href="index.js">eLockHub</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="fa fa-bars"></span> Menu
                    </button>
                    <div class="collapse navbar-collapse" id="ftco-nav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
                            <li class="nav-item"><a href="#RentSection" class="nav-link">Rental</a></li>
                            <li class="nav-item"><a href="#LocSection" class="nav-link">Locations</a></li>
                            <li class="nav-item"><a href="#" class="nav-link">FAQ</a></li>
                            <li style={{ marginLeft: '1rem' }} class="nav-item">
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



export default NavigationBar;
