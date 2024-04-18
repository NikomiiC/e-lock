// AdminDashboard.js

import React, {useState} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import LockerComponent from './AdminLockers';
import DashboardComponent from './AdminDashboard';
import {Container} from "react-bootstrap";
import Auth from "../Auth";
import UserHomePage from "../../pages/UserHomePage";
import { Link } from 'react-router-dom';
import './style/admin-style.css';
import AdminLockers from "./AdminLockers";
import AdminNavBar from "./AdminNavBar";



const AdminMainComponents = () => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <nav className="admin-sidebar">
                <Container>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/admin-dashboard" className="nav-link">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin-locker" className="nav-link">Lockers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin-location" className="nav-link">Locations</NavLink>
                        </li>
                    </ul>
                </Container>
            </nav>

        </div>


    );
};

export default AdminMainComponents;
