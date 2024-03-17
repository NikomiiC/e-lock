import { Context as AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate, redirect } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';
import NavigationBar from "../components/NavigationBar";
import AfterLoginMain from "../components/AfterLoginMain";
import UserMainComponents from "../components/UserMainComponents";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

function UserHomePage() {
    const { signout } = useContext(AuthContext);
    const timeout = 15 * 60 * 1000; //15mins
    const [remaining, setRemaining] = useState(timeout);
    const [elapsed, setElapsed] = useState(0);
    const [lastActive, setLastActive] = useState(+new Date());
    const [isIdle, setIsIdle] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userType = localStorage.getItem("userType");

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

    if (userType !== "USER") {
        // let isUser = window.confirm("You are not authorised to view this page!");
        // if (isUser) {
        //     return redirect("/");
        // }
    } else {
        return (
            <>

                <div className="UserHomeHeader">
                    <NavigationBar />
                </div>
                <div style={{backgroundColor: "#D9BC83", height: "100vh"}}>
                    <div className="MainContent">
                        <AfterLoginMain info={{ userType: userType }} />
                        <UserMainComponents/>
                    </div>
                </div>
            </>
        );
    }
}

export default UserHomePage;