
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "./components/Home";
import { Context } from "./context/AuthContext";
import CustomRouters from "./customRoutes/CustomRoutes";
import history from './customRoutes/history';
import Protected from "./customRoutes/Protected";
import RentLockerPage from './pages/RentLockerPage';
import UserHomePage from './pages/UserHomePage';



const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user-home" element={<UserHomePage />} />
          <Route exact path="rent" element={<RentLockerPage/>} />
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