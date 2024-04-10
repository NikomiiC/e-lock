
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "./components/Home";
import CustomRouters from "./customRoutes/CustomRoutes";
import history from './customRoutes/history';
import Protected from "./customRoutes/Protected";
import RentLockerPage from './pages/RentLockerPage';
import UserHomePage from './pages/UserHomePage';
import FeedbackPage from './pages/FeedbackPage';
import LockerFormPage from './pages/LockerFormPage';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user-home" element={<UserHomePage />} />
          <Route exact path="/rent" element={<RentLockerPage />} />
          <Route exact path="/user-feedback" element={<FeedbackPage />} />
          <Route exact path="/locker-form" element={<LockerFormPage />} />
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