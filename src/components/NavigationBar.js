import React,{useContext} from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import {Context as AuthContext} from "../context/AuthContext";


function NavigationBar() {

    const { signout } = useContext(AuthContext);

    async function handleLogout() {
        await signout();
    }


    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand sticky="top" href="/home">PoseBuddy</Navbar.Brand>
                <Nav className="me-auto">
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Hello Admin! <a href="/" onClick={handleLogout}> Logout </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}



export default NavigationBar;
