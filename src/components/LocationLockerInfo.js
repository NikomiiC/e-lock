import { useState, useEffect, useContext } from 'react';
import { Container, Button, Table, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context as LockerContext } from '../context/LockerContext';
import lockerIcon from '../images/locker.png';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";




const LocationLockerInfo = (locInfo) => {
    var locationInfo = JSON.parse(locInfo.locInfo);
    const [initialLoad, setInitialLoad] = useState(true);
    const [lockerArr, setLockerArr] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [selectedLocker, setSelectedLocker] = useState([]);
    const [selectedLockerDTSlots, setSelectedLockerDTSlots] = useState([]);
    const [locStatus, setLocStatus] = useState("");
    const [allSlotsAvail, setAllSlotsAvail] = useState(true);

    const convertToDateLocalString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        // const hours = date.getHours().toString().padStart(2, "0");
        // const minutes = date.getMinutes().toString().padStart(2, "0");

        // return `${year}-${month}-${day}T${hours}:${minutes}`;
        return `${year}-${month}-${day}`;
    }

    const [date, setDateTime] = useState(() => convertToDateLocalString(new Date()));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
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
    const [filteredStartTimes, setFilteredStartTimes] = useState(timeSlotObj);
    const [filteredEndTimes, setFilteredEndTimes] = useState(timeSlotObj);



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

    const toggleForm = (selectedLoc) => {
        setDisplayForm(true);
        setSelectedLocker(selectedLoc);
        setStartTime("");
        setEndTime("");
        let slots = [];
        if (selectedLoc.slots.length >= 1) {
            for (let i = 0; i < selectedLoc.slots.length; i++) {
                slots.push({
                    "Date": selectedLoc.slots[i].recordDate,
                    "Timeslots": selectedLoc.slots[i].slots
                });
            }
        } // if slots = empty means all times available, else we need to compute and display other updated time array
        setSelectedLockerDTSlots(slots);
    }

    const getTimeSlots = (userDateInputs, bookingsObj) => {
        setFilteredStartTimes(timeSlotObj);
        setFilteredEndTimes(timeSlotObj);
        if (bookingsObj.length < 1) {
            setAllSlotsAvail(true);
        } else {
            setAllSlotsAvail(false);
            const dateInputs = [convertToDateLocalString(new Date(userDateInputs[0])), convertToDateLocalString(new Date(userDateInputs[1]))];
            let toSpliceFromStart = []; // Looks smth like [1,2,3] -- Which shows that user booked from 1 am - 3 am telling me where I need to splice till
            let toSpliceFromEnd = [];
            for (let booking of bookingsObj) {
                console.log(convertToDateLocalString(new Date(booking.Date)), booking.Timeslots);
                // get remaining start times based on start date's slots
                if (convertToDateLocalString(new Date(booking.Date)) == dateInputs[0]) {
                    // get indexes of slots that are indicated 1
                    console.log(booking.Timeslots);
                    for (let i = 0; i < booking.Timeslots.length; i++) {
                        if (booking.Timeslots[i] == 1) {
                            toSpliceFromStart.push(i);
                        }
                    }
                }
                // get remaining end times based on end date's slots
                if (convertToDateLocalString(new Date(booking.Date)) == dateInputs[1]) {
                    // get indexes of slots that are indicated 1
                    for (let j = 0; j < booking.Timeslots.length; j++) {
                        if (booking.Timeslots[j] == 1) {
                            toSpliceFromEnd.push(j);
                        }
                    }
                }
            }
            if (toSpliceFromStart.length > 0) {
                let startObj = Object.fromEntries(Object.entries(filteredStartTimes).filter(([key]) => !toSpliceFromStart.includes(Number(key))));
                setFilteredStartTimes(startObj);
            }
            if (toSpliceFromEnd.length > 0) {
                let endObj = Object.fromEntries(Object.entries(filteredEndTimes).filter(([key]) => !toSpliceFromEnd.includes(Number(key))));
                setFilteredEndTimes(endObj);
            }
        }
    }

    useEffect(() => {
        if (initialLoad) {
            for (let locker of locationInfo.locker_list) {
                storeLockerInfo(locker);
            }
            setInitialLoad(false)
        }

        if (startDate != "" && endDate != "") {
            getTimeSlots([startDate, endDate], selectedLockerDTSlots);
        }
    }, [startDate, endDate, startTime, endTime])
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
                            lockerArr.map((loc, index) => (
                                <Col lg='4' md='6' sm='12'>
                                    <Card onClick={() => toggleForm(loc)} key={loc.locker._id} className="mt-3 text-center" style={{ cursor: "pointer" }}>
                                        <Card.Img className='mx-auto mt-3' variant="top" src={`${lockerIcon}`} style={{ width: "140px" }} />
                                        <Card.Body>
                                            <h4 className='mt-3'>Locker {index + 1}</h4>
                                            <h3 className='mt-3'>Size: {loc.locker.size}</h3>
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
                                        <Form.Label className='fw-bold'>Start Date:</Form.Label> <br />
                                        <Form.Control id="startDT" onChange={(e) => setStartDate(new Date(e.target.value))} min={date} type="date" />
                                    </Form.Group>
                                </Col>
                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>End Date:</Form.Label> <br />
                                        <Form.Control required id="endDT" onChange={(e) => setEndDate(new Date(e.target.value))} min={date} type="date" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Start Time:</Form.Label> <br />
                                        <Form.Select id="startTime" onChange={(e) => setStartTime(e.target.value)}>
                                            <option></option>
                                            {
                                                allSlotsAvail ? Object.entries(timeSlotObj).map(([i, time]) => (
                                                    <option value={i}>{time}</option>
                                                )) : Object.entries(filteredStartTimes).map(([j, time]) => (
                                                    <option value={j}>{time}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>End Time:</Form.Label> <br />
                                        <Form.Select required id="endTime" onChange={(e) => setEndTime(e.target.value)}>
                                            <option></option>
                                            {
                                                allSlotsAvail ? Object.entries(timeSlotObj).map(([i, time]) => (
                                                    <option value={i}>{time}</option>
                                                )) : Object.entries(filteredEndTimes).map(([j, time]) => (
                                                    <option value={j}>{time}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Locker Size:</Form.Label> <br />
                                        <Form.Control disabled="true" id="locSize" value={selectedLocker.locker.size} type="text" />
                                    </Form.Group>
                                </Col>

                                <Col lg="6" md="12">
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Set Passcode:</Form.Label> <br />
                                        <Form.Control required id="locPasscode" type="number" placeholder='e.g. 000000' />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className='mt-4' style={{ float: "right" }} variant='info'>Submit</Button>
                        </Form>
                    </Container>
                ) : (<></>)
            }
        </>
    )

}

export default LocationLockerInfo;