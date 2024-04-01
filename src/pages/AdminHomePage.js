import { Context as AuthContext } from "../context/AuthContext";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate, redirect } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';
import NavigationBar from "../components/NavigationBar";
import LoginGreeting from "../components/LoginGreeting";
import AdminMainComponents from "../components/admin/AdminMainComponents";
import AdminDashboard from "../components/admin/AdminDashboard";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

function AdminHomePage() {
    const { signout } = useContext(AuthContext);
    const timeout = 15 * 60 * 1000; //15mins
    const [remaining, setRemaining] = useState(timeout);
    const [elapsed, setElapsed] = useState(0);
    const [lastActive, setLastActive] = useState(+new Date());
    const [isIdle, setIsIdle] = useState(false);
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

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

    if (role === "admin" && isLoggedIn === "true") {
        return (
            <>
                <div className="AdminHomeHeader">
                    <NavigationBar />
                </div>
                <div style={{ backgroundColor: "#D9BC83", height: "100vh" }}>
                    <div className="MainContent">
                        <AdminDashboard />
                        <AdminMainComponents />
                    </div>
                </div>
            </>
        );
    }
}

export default AdminHomePage;