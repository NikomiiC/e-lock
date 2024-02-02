import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home";
import LoginPage from "./components/Login";

import { Context as AuthContext } from "./context/AuthContext";
import CustomRouters from "./customRoutes/CustomRoutes";
import history from './customRoutes/history';
import Protected from "./customRoutes/Protected";
import { Toast, ToastContainer } from 'react-bootstrap';


const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

function App() {

  const { signout } = useContext(AuthContext);
  const timeout = 15*60*1000; //15mins
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    async function makeRequest() {
      await delay(3000);
    }
    makeRequest();
  });

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => {
    setIsIdle(true);
    logout();
  }

  function ShowToast() {

    if (isIdle) {
      return (
          <div
              aria-live="polite"
              aria-atomic="true"
              className="bg-dark position-relative"
              style={{ minHeight: '240px' }}
          >
            <ToastContainer className="p-3" position="middle-center">
              <Toast>
                <Toast.Header closeButton={false}>
                  <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt=""
                  />
                  <strong className="me-auto">Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>No activities were detected. Redirect to Login</Toast.Body>
              </Toast>
            </ToastContainer>
          </div>
      );
    }

  }

  const logout = async () => {
    await delay(3000);
    setIsIdle(false);
    await signout();
  }

  const {
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  })


  useEffect(() => {
    setRemaining(getRemainingTime())
    setLastActive(getLastActiveTime())
    setElapsed(getElapsedTime())

    setInterval(() => {
      setRemaining(getRemainingTime())
      setLastActive(getLastActiveTime())
      setElapsed(getElapsedTime())
    }, 1000)
  }, [])

  return (
      <>
        <div className="App">
          <CustomRouters history={history}>
            <Routes>
              {/* <Route exact path="/" element={<ManageWorkoutPage/>}/> */}
              <Route exact path="/" element={<LoginPage />} />
              <Route
                  path="/home"
                  element={
                    <Protected isLoggedIn={isLoggedIn}>
                      <HomePage />
                    </Protected>
                  }
              />
            </Routes>
          </CustomRouters>
          <div>
            <ShowToast className="Auth-form-container"/>
          </div>
        </div>
      </>
  );
}

export default App;