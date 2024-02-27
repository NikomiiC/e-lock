import React from 'react';
import Accordion from 'react-bootstrap/Accordion';


function FAQ() {
    return (
        <section class="ftco-section bg-light">
            <div class="container">
                <div class="row justify-content-center pb-5 mb-3">
                    <div class="col-md-7 heading-section text-center">
                        <h2>FAQ</h2>
                    </div>
                </div>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What are the fees involved if I were to exceed my booking time?</Accordion.Header>
                        <Accordion.Body>
                            For the first hour after you exceed your booking time, you will be charged at <span style={{color: 'red', fontStyle: 'italic'}}>SGD2</span>. After which, you will be charged for <span style={{color: 'red', fontStyle: 'italic'}}>SGD1.50</span> for every subsequent <span style={{textDecoration: 'underline'}}>30 mins</span> of time exceeded.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Can I book more than 1 locker at a time?</Accordion.Header>
                        <Accordion.Body>
                            You absolutely can! <br/><br/>
                            All of our customers are able to hold up to two active bookings per day. Subject to availability of course.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>How can delivery persons know which locker to drop off my goods at?</Accordion.Header>
                        <Accordion.Body>
                            E-Commerce platforms are liased through their respective websites/applications at checkout! <br/><br/> 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Who do I call if the booking system is down?</Accordion.Header>
                        <Accordion.Body>
                            You can reach our friendly staff at 6585 1755, or email us at elockhub@gmail.com. We will try our best to get back to you within 3 working days.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                        <Accordion.Header>What can the small, medium, and extra large lockers fit?</Accordion.Header>
                        <Accordion.Body>
                            Please refer to this section of our <a style={{textDecoration: 'none'}} href='#RentSection' >page</a>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </section>
    )
}

export default FAQ;