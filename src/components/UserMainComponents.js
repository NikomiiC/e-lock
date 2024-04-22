import { useState, useEffect, useContext } from 'react';
import { Container, Button, Table, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import serverAPI from "../api/serverAPI";
// import TopupModal from './TopupModal';
import topUp from './topupWallet';
import { Context as TransactionContext } from '../context/TransactionContext';



const UserMainComponents = () => {
  var walletValue = 0;
  // get wallet from db
  const retriveWalletVal = () => {
    if (localStorage.getItem === null) {
      walletValue = localStorage.getItem('Wallet');
    } else {
      walletValue = 0;
    }
  };

  const navigate = useNavigate();
  const { state, getTransactionsByUser } = useContext(TransactionContext);
  const [initialLoad, setInitialLoad] = useState(true);
  const [transArr, setTransArr] = useState([])
  const [bookingsArr, setBookingsArr] = useState([]);
  const [bookingArrCheck, setBookingArrBoolean] = useState(true);
  const [compTransArr, setCompTransArr] = useState([]);
  const [compTransCheck, setCompTransBoolean] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  const [locData, setLocData] = useState([]);
  const [locToLockerMapping, setLocToLockerMapping] = useState({});
  const [bookingsArrWithLoc, setBookingsArrWithLoc] = useState(bookingsArr);


  const convertToDateLocalString = (date) => {
    date = new Date(date).toISOString();
    let localDT = new Date(date)
    const year = localDT.getFullYear();
    const month = (localDT.getMonth() + 1).toString().padStart(2, "0");
    const day = localDT.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const loadLocationData = async () => {
    try {
      const response = await serverAPI().get('/all_locations');
      const data = response.data;
      if (data.payload.length > 0) {
        setLocData(data.payload);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const getUserBookings = async () => {
    try {
      const bookedResponse = await serverAPI().get('/user_all_transaction',
        {
          params: {
            status: "Booked",
            user_id: userId
          }
        }
      );
      const bookedData = bookedResponse.data;
      if (bookedData.payload.length > 0) {
        setBookingsArr(bookedData.payload);
        setBookingArrBoolean(false);
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const getCompletedTrans = async () => {
    try {
      const completedResponse = await serverAPI().get('/user_all_transaction',
        {
          params: {
            status: "Completed",
            user_id: userId
          }
        }
      );
      const compData = completedResponse.data;
      if (compData.payload.length > 0) {
        setCompTransArr(compData.payload);
        setCompTransBoolean(false);
      }
    } catch (error) {
      console.error('Error fetching completed transactions:', error);
    }
  };

  const mapLocToLockers = () => {
    let mappedObj = {}
    for (let location of locData) {
      mappedObj[location.formatted_address] = location.locker_list
    }
    setLocToLockerMapping(mappedObj)
  }

  useEffect(() => {
    retriveWalletVal();
    refreshWallet();
    if (initialLoad) {
      loadLocationData();
      getUserBookings();
      getCompletedTrans();
      setInitialLoad(false)
    }
    mapLocToLockers();
    addLocationNames();
  }, [bookingsArr])


  // Currently it updates value, but does not store initial value user has in store
  const refreshWallet = async () => {
    try {
      let params = new URLSearchParams(window.location.search);
      var getTopUpVal = await topUp(params, user.balance);
      // Set new value
      walletValue += getTopUpVal;

    } catch (error) {
      const params = new URLSearchParams(window.location.search);
      params.append('error', 'true');
    }
    // window.history.pushState({}, "Removed checkout session id", "/user-home");
  }

  const unlockOrModify = (transInfo) => {
    localStorage.setItem('transaction', JSON.stringify(transInfo))
    navigate("/user-modify");
  }

  const topUpPage = () => {
    window.location.href = "https://buy.stripe.com/test_dR66qN3KH3Be2WY9AA";
  }

  const toFeedback = () => {
    navigate('/user-feedback')
  }

  const toRental = () => {
    navigate('/rent');
  }

  const addLocationNames = () => {
    bookingsArr.forEach(booking => {
      const id = booking.locker_id;
      for (const [loc, lockerList] of Object.entries(locToLockerMapping)) {
        console.log(id)
        if (lockerList.includes(id)) {
          booking["locName"] = loc;
        }
      }
    });
  }


  return (
    <>
      <Container>
        <Row className="mt-5 flex-row">
          <Col sm="4" className='flex-column'>
            <Card className='col-items'>
              <Card.Body>
                <Card.Title className='mb-2 text-dark text-center'>Your Bookings:</Card.Title>
                <Table striped bordered hover className='mt-4'>
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody style={{ maxHeight: "100px", overflowY: "auto" }}>
                    {
                      !bookingArrCheck ? bookingsArr.map(booking => (
                        <tr onClick={() => unlockOrModify(booking)} style={{ cursor: "pointer" }}>
                          <td>{booking.locName}</td>
                          <td>{convertToDateLocalString(booking.start_date)} to {convertToDateLocalString(booking.end_date)} </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={2}>
                            <Alert variant='danger'>
                              <p>No upcoming rentals</p>
                            </Alert>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
                <div style={{ display: "grid", placeItems: "center", paddingTop: "40px" }}>
                  <p>Click on row above to unlock or modify booking</p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="8" className='pl-3 flex-column'>
            <Card className='col-items'>
              <Card.Body>
                <Card.Title className='mb-2 text-dark text-center'>Your Completed Transactions:</Card.Title>
                <Table striped bordered hover className='mt-4'>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !compTransCheck ? compTransArr.map(trans => (
                        <tr>
                          <td>Booking from {convertToDateLocalString(trans.start_date)} to {convertToDateLocalString(trans.end_date)}</td>
                          <td>${trans.cost}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={2}>
                            <Alert variant='danger'>
                              <p>No completed transactions yet</p>
                            </Alert>
                          </td>
                        </tr>
                      )
                    }

                  </tbody>
                </Table>
                {/* <div style={{ display: "grid", placeItems: "center" }}>
                  <Button id='see-more-btn' onClick={moreTransactions}>See More</Button>
                </div> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='mt-5 flex-row'>
          <Col sm="4" className='flex-column'>
            <Card className='col-items' style={{ position: "relative", minHeight: "200px" }}>
              <Card.Body>
                <Card.Title className='mb-2 text-dark text-center'>Current Balance:</Card.Title>
                <Card.Text className='text-center' style={{ fontSize: "2.5rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  ${user.balance.toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="8" className='pl-3 flex-column'>
            <Card className='col-items'>
              <Card.Body>
                <Row className='userComponentBtnRow mx-auto'>
                  <Col lg="4">
                    <Button className='userComponentBtn' onClick={toFeedback}>Send feedback</Button>
                  </Col>
                  <Col lg="4">
                    {/* <Button className='userComponentBtn' onClick={handleTopUpModal}>Top-up</Button> */}
                    <Button className='userComponentBtn' onClick={topUpPage}>Top-up</Button>
                  </Col>
                  <Col lg="4">
                    <Button className='userComponentBtn' onClick={toRental}>Rent Locker</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <TopupModal isOpen={isModalOpen} handleCloseModal={handleCloseTopUpModal} /> */}
    </>
  )
}

export default UserMainComponents;