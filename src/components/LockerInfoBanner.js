import React, {useRef, useEffect, useState} from 'react';
import hdbjpg from '../images/void-deck.jpg'
import malljpg from '../images/malls.jpg'
import condojpg from '../images/condos.jpg'
import tpjpg from '../images/theme-parks.jpg'

function LockerInfoBanner(props) {
    
    return (

        <section id="LocSection" class="ftco-section bg-light">
            <div class="container-fluid px-md-0">
                <div class="row no-gutters justify-content-center pb-5 mb-3">
                    <div class="col-md-7 heading-section text-center">
                        <h2>Where can our Lockers be found?</h2>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="col-lg-6">
                        <div class="loc-wrap d-md-flex">
                            <a href="#" class="img locImg" style={{backgroundImage: "url(" + hdbjpg + ")"}}></a>
                            <div class="half left-arrow d-flex align-items-center">
                                <div class="text p-4 p-xl-5 text-center">
                                    <h3 class="mb-3"><a href="#">HDB Void Decks</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="loc-wrap d-md-flex">
                            <a href="#" class="img locImg" style={{backgroundImage: "url(" + malljpg + ")"}}></a>
                            <div class="half left-arrow d-flex align-items-center">
                                <div class="text p-4 p-xl-5 text-center">
                                    <h3 class="mb-3"><a href="#">Shopping Malls</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="loc-wrap d-md-flex">
                            <a href="#" class="img locImg order-md-last" style={{backgroundImage: "url(" + condojpg + ")"}}></a>
                            <div class="half right-arrow d-flex align-items-center">
                                <div class="text p-4 p-xl-5 text-center">
                                    <h3 class="mb-3"><a href="#">Private Residences</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="loc-wrap d-md-flex">
                            <a href="#" class="img locImg order-md-last" style={{backgroundImage: "url(" + tpjpg + ")"}}></a>
                            <div class="half right-arrow d-flex align-items-center">
                                <div class="text p-4 p-xl-5 text-center">
                                    <h3 class="mb-3"><a href="#">Theme Parks</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default LockerInfoBanner;