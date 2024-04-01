// AdminDashboard.js

import React, {useState} from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import LockerComponent from './AdminLockers';
import DashboardComponent from './AdminDashboard';
import {Container} from "react-bootstrap";
import Auth from "../Auth";
import UserHomePage from "../../pages/UserHomePage";
import { Link } from 'react-router-dom';



const AdminMainComponents = () => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <nav className="admin-sidebar">
                <Container>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink exact to="/admin-dashboard" className="nav-link">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin-locker" className="nav-link">Lockers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/transactions" className="nav-link">Transactions</NavLink>
                        </li>
                    </ul>
                </Container>
            </nav>
        </div>

    );
};

export default AdminMainComponents;