
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
import AdminLocations from "./components/admin/AdminLocations"
import AdminMainComponents from "./components/admin/AdminMainComponents";
import AdminNavBar from "./components/admin/AdminNavBar";
import LockerFormPage from './pages/LockerFormPage';
import ModifyAndStartPage from './pages/ModifyAndStartPage'

const App = () => {

  return (
    <>
      <Router>

        {/* <AdminMainComponents /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user-home" element={<UserHomePage />} />
          <Route exact path="/admin-home" element={<AdminHomePage />} />
          {/* <Route exact path="user-feedback" element={<FeedbackPage />} /> */}
          <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
          <Route exact path="/admin-locker" element={<AdminLockers />} />
          <Route exact path="/rent" element={<RentLockerPage />} />
          <Route exact path="/user-feedback" element={<FeedbackPage />} />
          <Route exact path="/locker-form" element={<LockerFormPage />} />
          <Route exact path="/user-modify" element={<ModifyAndStartPage/>}/>
          <Route exact path="/admin-location" element={<AdminLocations />} />

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