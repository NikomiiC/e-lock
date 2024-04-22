import { useState, useEffect, useContext } from 'react';
import { Container, Button, Table, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Context as LockerContext } from '../context/LockerContext';
import { Context as TransactionContext } from '../context/TransactionContext';
import { Context as PricingContext } from '../context/PricingContext';
import lockerIcon from '../images/locker.png';
import serverAPI from '../api/serverAPI';




const LocationLockerInfo = (locInfo) => {
    var locationInfo = JSON.parse(locInfo.locInfo);
    const [initialLoad, setInitialLoad] = useState(true);
    const [lockerArr, setLockerArr] = useState([]);
    const [displayForm, setDisplayForm] = useState(false);
    const [selectedLocker, setSelectedLocker] = useState([]);
    const [selectedLockerDTSlots, setSelectedLockerDTSlots] = useState([]);
    const [allSlotsAvail, setAllSlotsAvail] = useState(true);
    const [priceArr, setPriceArr] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [errArr, setErrArr] = useState([]);
    const [errExists, setErrExists] = useState(false);
    const [toSpliceFromStart, setToSpliceFromStart] = useState([]);
    const [toSpliceFromEnd, setToSpliceFromEnd] = useState([]);
    const userId = user._id;

    const convertToDateLocalString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const convertToDateWithZeros = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}T00:00:00`;
    }

    const convertFullDateTimeString = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const secs = date.getSeconds().toString().padStart(2, "0")

        return `${year}-${month}-${day}T${hours}:${minutes}:${secs}`;
    }

    const [date, setDateTime] = useState(() => convertToDateLocalString(new Date()));
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [transaction, setTransaction] = useState({
        user_id: "",
        locker_id: "",
        pricing_id: 0,
        cost: 0,
        create_datetime: "",
        latest_update_datetime: "",
        start_index: 0,
        end_index: 0,
        start_date: "",
        end_date: ""
    })
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
        getLockers, clearErrorMessageLocker, addLockers, deleteLockers, getLockerById
    } = useContext(LockerContext);

    // const {
    //     getAllTransactions, getTransactionsByUser, clearErrorMessageTrans, addTransaction, updateTransactionById
    // } = useContext(TransactionContext)

    const {
        getAllPricing, getPricingById, clearErrorMessagePrice, addPricing, updatePricingById
    } = useContext(PricingContext)

    async function storeLockerInfo(locId) {
        try {
            let response = await getLockerById(locId);
            lockerArr.push(response.payload)
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    }

    // const updateBalance = async (cost) => {
    //     try {
    //         const response = await serverAPI().post("/updateBalance", parseInt(cost)
    //         );
    //         if (response.data.code === 0) {
    //             window.alert("Balance updated successfully")
    //         } else {
    //             console.error("Failed to update wallet balance:", response.data.msg)
    //         }
    //     } catch (err) {
    //         console.error('Failed to add new transaction:', err);
    //         if (err.response) {
    //             window.alert(err.response.data.msg);
    //         } else if (err.request) {
    //             console.error('Request:', err.request);
    //         } else {
    //             console.error('Error:', err.message);
    //         }
    //     }
    // }

    const addTransaction = async () => {
        try {
            const response = await serverAPI().post("/create_transaction", transaction);
            if (response.data.code === 0) {
                return "Success";
            } else {
                console.error("Failed to add new transaction:", response.data.msg)
            }
        } catch (err) {
            console.error('Failed to add new transaction:', err);
            if (err.response) {
                window.alert(err.response.data.msg);
            } else if (err.request) {
                console.error('Request:', err.request);
            } else {
                console.error('Error:', err.message);
            }
        }
    }

    async function getLockerPrices() {
        try {
            let priceRes = await getAllPricing();
            setPriceArr(priceRes.prices);
        } catch (err) {
            console.error(`Error: ${err}`)
        }
    }

    const getLocPriceId = (locSize) => {
        for (let priceObj of priceArr) {
            if (locSize == priceObj.name) {
                return [priceObj._id, priceObj.first_hour, priceObj.follow_up];
            }
        }
    }

    const calculateDays = (start, end) => {
        const startDt = new Date(start);
        const endingDt = new Date(end);
        const timeDiff = endingDt.getTime() - startDt.getTime();
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return Math.round(daysDiff);
    }

    const calculateFees = (hours, startingFee, subSeqFee) => {
        let final = 0;
        for (let h = 1; h <= hours; h++) {
            if (h == 1) {
                final += startingFee;
            } else {
                final += subSeqFee;
            }
        }
        return final;
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
        setToSpliceFromStart([]);
        setToSpliceFromEnd([]);
        if (bookingsObj.length < 1) {
            setAllSlotsAvail(true);
        } else {
            setAllSlotsAvail(false);
            const dateInputs = [convertToDateLocalString(new Date(userDateInputs[0])), convertToDateLocalString(new Date(userDateInputs[1]))];
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

    async function handleSubmit(event) {
        event.preventDefault();
        setErrArr([]);
        let err = []
        let startD = convertToDateWithZeros(new Date(document.getElementById('startDT').value));
        let endD = convertToDateWithZeros(new Date(document.getElementById('endDT').value));
        if (new Date(endD) < new Date(startD)) {
            err.push("End date cannot be earlier than start date.")
        }

        let startTime = parseInt(document.getElementById('startTime').value);
        let endTime = parseInt(document.getElementById('endTime').value);

        // Implement checker for timing to ensure it does not pass timings that are part of existing booked timeslots
        if (new Date(endD) == new Date(startD) && endTime < startTime) {
            err.push("End time cannot be earlier than start time for the same day.");
        }
        let priceDetails = getLocPriceId(selectedLocker.locker.size);
        let numOfBookedDays = calculateDays(startD, endD);
        let numOfHoursToCharge = 0;
        if (numOfBookedDays == 1) {
            numOfHoursToCharge = endTime + (24 - startTime);
        } else if (numOfBookedDays > 1) {
            numOfHoursToCharge = endTime + (24 - startTime) + (24 * (numOfBookedDays - 1));
        } else {
            numOfHoursToCharge = endTime - startTime;
        }
        let finalFees = calculateFees(numOfHoursToCharge, priceDetails[1], priceDetails[2]);

        if (parseInt(user.balance) < parseInt(finalFees)) {
            err.push(`Booking failed because current booking fees are ${parseFloat(finalFees).toFixed(2)} while you only have ${parseFloat(user.balance).toFixed(2)} in your account's wallet.`)
        }

        let userConfirm = window.confirm(`Booking fee amounts to $${parseInt(finalFees).toFixed(2)}, and you currently have $${parseInt(user.balance).toFixed(2)} in your wallet. Proceed with booking?`)

        transaction.user_id = userId;
        transaction.locker_id = selectedLocker.locker._id;
        transaction.pricing_id = priceDetails[0];
        transaction.cost = finalFees;
        transaction.create_datetime = convertFullDateTimeString(new Date());
        transaction.latest_update_datetime = convertFullDateTimeString(new Date());
        transaction.start_index = startTime;
        transaction.end_index = endTime;
        transaction.start_date = startD;
        transaction.end_date = endD;

        if (err.length > 0) {
            setErrExists(true);
            setErrArr(err);
        } else if (err.length < 1 && userConfirm) {
            setErrExists(false);
            let res = await addTransaction();
            if (res == "Success") {
                window.alert("Locker has been booked successfully!");
                window.location.replace('/user-home');
            }
        }

    }

    useEffect(() => {
        if (initialLoad) {
            getLockerPrices();
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
                errExists ? (
                    <Container className='headerComponentSpace'>
                        <Alert variant='danger'>
                            <ul>
                                {
                                    errArr.map(err => (
                                        <li className='fw-bold'>{err}</li>
                                    ))
                                }
                            </ul>
                        </Alert>
                    </Container>
                ) : (<></>)
            }
            {
                displayForm ? (
                    <Container className='headerComponentSpace'>
                        <h2 className='text-center'>Rental Form</h2>
                        <Form id='lockerForm' onSubmit={handleSubmit}>
                            <Row className='my-3'>
                                <Col lg="6" md="12">
                                    <Form.Group>
                                        <Form.Label className='fw-bold'>Start Date:</Form.Label> <br />
                                        <Form.Control required id="startDT" onChange={(e) => setStartDate(new Date(e.target.value))} min={date} type="date" />
                                    </Form.Group>
                                </Col>
                                <Col lg="6" md="12">
                                    <Form.Group>
                                        <Form.Label className='fw-bold'>End Date:</Form.Label> <br />
                                        <Form.Control required id="endDT" onChange={(e) => setEndDate(new Date(e.target.value))} min={date} type="date" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='my-3'>
                                <Col lg="6" md="12">
                                    <Form.Group>
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
                                    <Form.Group>
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
                                <Col lg="12">
                                    <Form.Group>
                                        <Form.Label className='fw-bold'>Locker Size:</Form.Label> <br />
                                        <Form.Control disabled="true" id="locSize" value={selectedLocker.locker.size} type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12">
                                    <Button style={{ float: "right" }} variant='info' type='submit'>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                ) : (<></>)
            }
        </>
    )

}

export default LocationLockerInfo;