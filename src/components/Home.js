import { Context as AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import NavigationBar from './NavigationBar'
import HeaderBanner from './HeaderBanner';
import RentalBanner from './RentalBanner';
import LockerInfoBanner from './LockerInfoBanner';
import CTA from './CallToAction';
import FAQ from './FAQ';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useIdleTimer } from 'react-idle-timer';


const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

function Home() {
    const { signout } = useContext(AuthContext);
    const timeout = 15 * 60 * 1000; //15mins
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



    return (
        <>
            <div className="App">
                <NavigationBar />
                <div className='content'>
                    <HeaderBanner />
                    <RentalBanner />
                    <LockerInfoBanner />
                    <CTA />
                    <FAQ />
                </div>
                {/* <CustomRouters history={history}>
            <Routes>
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
          </CustomRouters> */}
                <div>
                    <ShowToast className="Auth-form-container" />
                </div>
            </div>

        </>
    );
}

export default Home;