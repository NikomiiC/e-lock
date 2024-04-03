
import React, { useState, useEffect, useContext } from 'react';
import {Routes, Route, BrowserRouter as Router, Navigate, NavLink} from "react-router-dom";
import Home from "./components/Home";
import { Context } from "./context/AuthContext";
import CustomRouters from "./customRoutes/CustomRoutes";
import history from './customRoutes/history';
import Protected from "./customRoutes/Protected";
import RentLockerPage from './pages/RentLockerPage';
import UserHomePage from './pages/UserHomePage';
import FeedbackPage from './pages/FeedbackPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLockers from "./components/admin/AdminLockers";
import AdminMainComponents from "./components/admin/AdminMainComponents";
import AdminTransactions from "./components/admin/AdminTransactions";
const App = () => {

  return (
    <>
      <Router>
        <AdminMainComponents />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user-home" element={<UserHomePage />} />
          <Route exact path="/admin-home" element={<AdminHomePage />} />
          <Route exact path="rent" element={<RentLockerPage />} />
          <Route exact path="user-feedback" element={<FeedbackPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-locker" element={<AdminLockers />} />
          <Route path="/admin-transactions" element={<AdminTransactions/>} />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>
      </Router>

    </>
  );
}

export default App;