import React, { useContext } from "react";
import landingBg from '../images/landing-page-bg.jpg'
import { Context as AuthContext } from "../context/AuthContext";

function HeaderBanner() {

    const { signout } = useContext(AuthContext);

    async function handleLogout() {
        await signout();
    }
    return (
        <div class="hero-wrap" style={{ backgroundImage: "url(" + landingBg + ")" }} data-stellar-background-ratio="0.5">
            <div class="overlay"></div>
            <div class="container">
                <div class="row no-gutters align-items-center justify-content-start" data-scrollax-parent="true" style={{height: "100vh"}}>
                    <div class="col-md-7">
                        <h2 class="subheading">Welcome to eLockHub</h2>
                        <h1 class="mb-4">Rent a locker,</h1>
                        <h1 class="mb-4">for any occasion</h1>
                        <p><a href="#" class="btn btn-primary">Learn more</a> <a href="#" class="btn btn-white">Contact us</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderBanner;