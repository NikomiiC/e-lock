import { useState, useEffect, useContext } from 'react';
import { Container, Button, Table, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { createSearchParams, useNavigate } from 'react-router-dom';
import serverAPI from '../api/serverAPI';

const ModOrStartForm = (transInfo) => {
    const transDetails = JSON.parse(transInfo.transInfo);
    const [initialLoad, setInitialLoad] = useState(true);
    const [location, setLocation] = useState("");
    const [formType, setFormType] = useState("start");
    const timeSlotObj = {
        0: '00:00',
        1: '01:00',
        2: '02:00',
        3: '03:00',
        4: '04:00',
        5: '05:00',
        6: '06:00',
        7: '07:00',
        8: '08:00',
        9: '09:00',
        10: '10:00',
        11: '11:00',
        12: '12:00',
        13: '13:00',
        14: '14:00',
        15: '15:00',
        16: '16:00',
        17: '17:00',
        18: '18:00',
        19: '19:00',
        20: '20:00',
        21: '21:00',
        22: '22:00',
        23: '23:00',
        24: '24:00'
    }

    const onOptionChange = e => {
        setFormType(e.target.value)
    }

    const getLocById = async () => {
        try {
            const response = await serverAPI().get('/location/' + transDetails._id);
            console.log(response);
            // const locData = response.data;
            // setLocation(locData.payload._id);
        } catch (err) {
            console.error("Error fetching location details: ", err)
        }
    }

    useEffect(() => {
        if (initialLoad) {
            getLocById();
            setInitialLoad(false);
        }
    }, [])

    return (
        <>
            <Container className='headerComponentSpace'>
                <h2 className='text-center'>Modify or Start Booking</h2>
                {/* {console.log(formType)} */}
                <Form className='headerComponentSpace'>
                    <Row className='text-center'>
                        <Form.Label className='fw-bold'>Form Type:</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Start"
                                value="start"
                                name='formtype'
                                checked={formType === "start"}
                                onChange={onOptionChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Update"
                                value="mod"
                                checked={formType === "mod"}
                                name='formtype'
                                onChange={onOptionChange}
                            />
                        </div>
                    </Row>

                    {
                        formType === "start" ? (
                            <Form.Group>
                                <Row>
                                    <Col lg="12">
                                        <Form.Label className='fw-bold'>Location</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col lg="6" sm="12">
                                        <Form.Label className='fw-bold'>Start Date & Time</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Col>

                                    <Col lg="6" sm="12">
                                        <Form.Label className='fw-bold'>End Date & Time</Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Col>
                                </Row>

                            </Form.Group>
                        ) : (
                            <Form.Group>
                                <Row>
                                    <Col lg="6" sm="12">
                                        <Form.Label></Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Col>

                                    <Col lg="6" sm="12">
                                        <Form.Label></Form.Label>
                                        <Form.Control type="text"></Form.Control>
                                    </Col>
                                </Row>

                            </Form.Group>
                        )
                    }
                    
                </Form>
            </Container>
        </>
    )


}

export default ModOrStartForm