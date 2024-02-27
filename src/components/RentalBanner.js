import React, { useContext } from "react";
import { Container } from 'react-bootstrap';
import { Context as AuthContext } from "../context/AuthContext";
import SLocker from '../images/small-lockers.png';
import MLocker from '../images/medium-lockers.png';
import XLLocker from '../images/xl-lockers.png';

function RentalBanner() {

    const { signout } = useContext(AuthContext);

    async function handleLogout() {
        await signout();
    }

    return (
        <section id="RentSection" class="ftco-section ftco-services">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 d-flex services align-self-stretch px-4">
                        <div class="d-block services-wrap text-center">
                            <div class="img" style={{ backgroundImage: "url(" + SLocker + ")" }}></div>
                            <div class="media-body py-4 px-3">
                                <h3 class="heading">Small</h3>
                                <p>Suitable for your small packages and or groceries from your favorite e-commerce websites.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex services align-self-stretch px-4">
                        <div class="d-block services-wrap text-center">
                            <div class="img" style={{ backgroundImage: "url(" + MLocker + ")" }}></div>
                            <div class="media-body py-4 px-3">
                                <h3 class="heading">Accomodation Services</h3>
                                <p>Suitable for your laptop bags or just larger quantities of your favorite supermarket goods.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 d-flex services align-self-stretch px-4">
                        <div class="d-block services-wrap text-center">
                            <div class="img" style={{ backgroundImage: "url(" + XLLocker + ")" }}></div>
                            <div class="media-body py-4 px-3">
                                <h3 class="heading">Great Experience</h3>
                                <p>Suitable for luggage, or if you just need an obscene amount of storage space on the go.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default RentalBanner;