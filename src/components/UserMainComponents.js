import { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const UserMainComponents = () => {
  const navigate = useNavigate();
  const [bookingCount, setBookingCount] = useState('');

  const moreTransactions = () => {

  }

  const toFeedback = () => {

  }

  const toRental = () => {
    navigate('/rent');
  }

  const topUp = () => {

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
                      <th>Timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>AMK Hub</td>
                      <td>10AM to 6PM</td>
                    </tr>
                    <tr>
                      <td>...</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col sm="8" className='pl-3 flex-column'>
            <Card className='col-items'>
              <Card.Body>
                <Card.Title className='mb-2 text-dark text-center'>Your Past Transactions:</Card.Title>
                <Table striped bordered hover className='mt-4'>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Booking at Block 525</td>
                      <td>$10.00</td>
                    </tr>
                    <tr>
                      <td>Top Up</td>
                      <td>$20.00</td>
                    </tr>
                    <tr>
                      <td>Top Up</td>
                      <td>$20.00</td>
                    </tr>
                    <tr>
                      <td>Top Up</td>
                      <td>$20.00</td>
                    </tr>
                  </tbody>
                </Table>
                <div style={{ display: "grid", placeItems: "center" }}>
                  <Button id='see-more-btn' onClick={moreTransactions}>See More</Button>
                </div>
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
                  $30.25
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
                    <Button className='userComponentBtn' onClick={topUp}>Top-up</Button>
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
    </>
  )
}

export default UserMainComponents;