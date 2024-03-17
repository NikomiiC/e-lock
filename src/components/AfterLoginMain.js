import React, { useContext, useState } from "react";
import { Container } from 'react-bootstrap';
import { Context as AuthContext } from "../context/AuthContext";
import { Routes, Route, BrowserRouter as Router, useNavigate } from "react-router-dom";

const AfterLoginMain = ({info}) => {
    const navigate = useNavigate();
    const userType = info.userType;
    let userName = ""
    if (userType != "ADMIN") {
        userName = localStorage.getItem("userName")
    }

    return(
        <>
        <div>
            {
                userType === "USER" ? (
                    <h1 class="text-center text-light" style={{paddingTop: "5rem"}}>Hi, {userName}</h1>
                ) : (
                    <h1 class="text-center text-light" style={{paddingTop: "5rem"}}>Hi Admin</h1>
                )
            }
        </div>
        </>
    )
}

export default AfterLoginMain;