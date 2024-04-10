import { useState, useEffect, useContext } from 'react';
import { Container, Button, Table, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context as LockerContext } from '../context/LockerContext';
import lockerIcon from '../images/locker.png';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";




const LocationLockerInfo = (locInfo) => {
    var locationInfo = JSON.parse(locInfo.locInfo);
    const [lockerArr, setLockerArr] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [selectedLocker, setSelectedLocker] = useState([]);

    const convertToDateTimeLocalString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const [datetime, setDateTime] = useState(() => convertToDateTimeLocalString(new Date()));
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const {
        state, getLockers, clearErrorMessageLocker, addLockers, deleteLockers, getLockerById
    } = useContext(LockerContext);

    async function storeLockerInfo(locId) {
        try {
            let response = await getLockerById(locId);
            lockerArr.push(response.payload)
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }

    const handleDTChange = () => {
        setStartDate(document.getElementById('startDT').value);
        setEndDate(document.getElementById('endDT').value);
    };

    const toggleForm = (selectedLoc) => {
        setDisplayForm(true);
        setSelectedLocker(selectedLoc);
        // console.log(selectedLoc)
    }

    useEffect(() => {
        for (let locker of locationInfo.locker_list) {
            storeLockerInfo(locker);
        }
    }, [])
    return (
        <>
            <Container className='headerComponentSpace'>
                <div className='text-center'>
                    <h2 className='mb-3'>Viewing lockers at: <span className='text-success'>{locationInfo.formatted_address}</span></h2>
                    {
                        displayForm ? (
                            <></>
                        ) : (<h4>To proceed with booking request, select a locker below</h4>)
                    }
                </div>
            </Container>

            <Container className='headerComponentSpace'>
                <Row>
                    {
                        lockerArr ? (
                            lockerArr.map(loc => (
                                <Col lg='4' md='6' sm='12'>
                                    <Card onClick={() => toggleForm(loc)} key={loc._id} className="mt-3 text-center" style={{ cursor: "pointer" }}>
                                        <Card.Img className='mx-auto mt-3' variant="top" src={`${lockerIcon}`} style={{ width: "140px" }} />
                                        <Card.Body>
                                            <h3 className='mt-3'>Size: {loc.size}</h3>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (<Alert variant='danger'>There are no lockers available </Alert>)
                    }
                </Row>
            </Container>

            {
                displayForm ? (
                    <Container className='headerComponentSpace'>
                        <h2 className='my-3 text-center'>Rental Form</h2>
                        <Form>
                            <Row className='my-3'>
                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Start Date/Time:</Form.Label> <br />
                                        <Form.Control id="startDT" onChange={() => handleDTChange()} defaultValue={datetime} min={datetime} type="datetime-local" />
                                    </Form.Group>
                                </Col>
                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label>End Date/Time:</Form.Label> <br />
                                        <Form.Control required id="endDT" onChange={() => handleDTChange()} min={datetime} type="datetime-local" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12">
                                    <Form.Group>
                                        <Form.Label>Locker Availability:</Form.Label>
                                        <Form.Control className={selectedLocker.status === "Valid" ? "text-success" : "text-danger"} disabled="true" type="text" value={selectedLocker.status} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className='mt-4' style={{float: "right"}} variant='info'>Submit</Button>
                        </Form>
                    </Container>
                ) : (<></>)
            }
        </>
    )

}

export default LocationLockerInfo;