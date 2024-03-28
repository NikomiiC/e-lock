import { useState, useEffect } from 'react';
import { Container, Button, Table, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import lockerImg from '../images/locker.png'

const LockerTable = () => {
    const [lockers, setLockers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/all_lockers')
            .then(lockers => setLockers(lockers.data))
            .catch(err => console.log(err));
    });

    return (
        <>
            <Container className='headerComponentSpace'>
                {
                    lockers.map(locker => {
                        return <Card>
                            <Card.Header>
                                {locker.location_id}
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Image src={lockerImg + '/151x160'} />
                                </Row>
                                <Row className='text-center'>
                                    <p>{locker.status}</p>
                                </Row>
                                <Row className='text-center'>
                                    <p>{locker.size}</p>
                                </Row>
                            </Card.Body>
                        </Card>
                    })
                }

            </Container>
        </>
    )
}

export default LockerTable;