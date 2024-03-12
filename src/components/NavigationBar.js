import React, { useContext, useState } from "react";
import { Container } from 'react-bootstrap';
import { Context as AuthContext } from "../context/AuthContext";
import { Routes, Route, BrowserRouter as Router, useNavigate } from "react-router-dom";



const NavigationBar = (props) => {
    const navigate = useNavigate();

    const { signout } = useContext(AuthContext);

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
                            <li style={{marginLeft: '1rem'}} class="nav-item">
                                <button type="button" class="btn btn-warning nav-login" onClick={() => navigate("/login")}>
                                    Login/Sign-up
                                </button>
                            </li>
                        </ul>
                    </div>
                </Container>
            </nav>
        </div>
    );
}



export default NavigationBar;
