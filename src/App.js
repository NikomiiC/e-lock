
import React, { useState, useEffect, useContext } from 'react';

import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";

import Home from "./components/Home";
import { Context as AuthContext } from "./context/AuthContext";
import CustomRouters from "./customRoutes/CustomRoutes";
import history from './customRoutes/history';
import Protected from "./customRoutes/Protected";
import Login from './components/Login'







const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
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