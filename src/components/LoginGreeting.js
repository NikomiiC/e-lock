import React, { useContext, useState, useEffect } from "react";

const LoginGreeting = () => {
    const [isAdmin, setAdmin] = useState(false);
    const [name, setName] = useState('')
    var role = "";
    var userInfo = "";
    const initializeDetails = () => {
        role = localStorage.getItem('role');
        if (role === "admin") {
            setAdmin(true);
        } else if (role === "u") {
            userInfo = JSON.parse(localStorage.getItem('user'));
            setName(userInfo.username);
        }
    }

    useEffect(() => {
        initializeDetails();
    }, [name])


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