import { useState, useEffect } from 'react';
import { Container, Button, Table, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import lockerImg from '../images/locker.png';

const lockers = {
    "code": 0,
    "msg": "Successfully get all lockers",
    "payload": [
        {
            "_id": "65f940684a467c8af8802b67",
            "status": "Valid",
            "size": "Small",
            "__v": 0,
            "location_id": "65f2a247f04502db5d4eb44c"
        },
        {
            "_id": "65f940684a467c8af8802b68",
            "status": "Valid",
            "size": "Medium",
            "__v": 0,
            "location_id": "65f2c14a1dd7982c0c86518d"
        },
        {
            "_id": "65f996f38178789abcdcb7b5",
            "status": "Occupied",
            "size": "Large",
            "__v": 0,
            "location_id": "65f2c14a1dd7982c0c86518d"
        },
        {
            "_id": "65f996f38178789abcdcb7b3",
            "status": "Occupied",
            "size": "Small",
            "__v": 0,
            "location_id": "65f2c14a1dd7982c0c86518d"
        }
    ]
}

const LockerTable = () => {
    // const [lockers, setLockers] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost:8080/all_lockers')
        //     .then(lockers => setLockers(lockers.data))
        //     .catch(err => console.log(err));
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