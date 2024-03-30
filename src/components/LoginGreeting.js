import React, { useContext, useState, useEffect } from "react";

const LoginGreeting = () => {
    const [isAdmin, setAdmin] = useState(false);
    var role = "";
    var userInfo = "";
    var name = "";
    const initializeDetails = () => {
        role = localStorage.getItem('role');
        if (role === "admin") {
            setAdmin(true);
        }
        userInfo = JSON.parse(localStorage.getItem('user'));
        name = typeof(userInfo.username);
        console.log(name)
    }

    useEffect(() => {
        initializeDetails();
    }, [])


    return (
        <div className="headerComponentSpace">
            {
                isAdmin ? <h1 className="text-light text-center">Hi, Admin</h1>
                    : <h1 className="text-light text-center">Hi, {name}</h1>
            }
        </div>
    )
}

export default LoginGreeting;