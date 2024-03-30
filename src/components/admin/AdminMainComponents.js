// AdminDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import {NavLink} from "react-bootstrap";


const AdminMainComponents = () => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li>
                    <NavLink exact to="/dashboard" activeClassName="active">
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/products" activeClassName="active">
                        Products
                    </NavLink>
                </li>
                <li><NavLink exact to="/transactions" activeClassName="active">
                    Transactions
                </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMainComponents;
