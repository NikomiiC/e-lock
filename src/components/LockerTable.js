import { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Container, Button, Table, Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {Context as LockerContext} from '../context/LockerContext';
import lockerImg from '../images/locker.png';


const LockerTable = () => {
    const {
        state,
        getLockers, clearErrorMessage, addLockers, deleteLockers, getLocker
    } = useContext(LockerContext);

    useEffect(() => {
        
    });

    return (
        <>
            <Container className='headerComponentSpace'>
                

            </Container>
        </>
    )
}

export default LockerTable;