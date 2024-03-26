import { useState, useEffect } from 'react';
import { Container, Button, Table, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TopupModal from './TopupModal';
import topUp from './topupWallet';

var walletValue = 0;
const UserMainComponents = () => {
  const navigate = useNavigate();
  const [bookingCount, setBookingCount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleTopUpModal = () => setIsModalOpen(true);
  const handleCloseTopUpModal = () => {
    setIsModalOpen(false);
  };

  // Currently it updates value, but does not store initial value user has in store
  const refreshWallet = async () => {

    try {
      let params = new URLSearchParams(window.location.search);
      var getTopUpVal = await topUp(params, walletValue);
      walletValue = getTopUpVal;
      params.delete('checkout_session_id');

    } catch (error) {
      const params = new URLSearchParams(window.location.search);
      params.append('error', 'true');
    }
  }

  useEffect(() => {
    refreshWallet();
  }, [])

  const moreTransactions = () => {

  }

  const toFeedback = () => {
    navigate('/user-feedback')
  }

  const toRental = () => {
    navigate('/rent');
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
                  SGD{walletValue.toFixed(2)}
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
                    <Button className='userComponentBtn' onClick={handleTopUpModal}>Top-up</Button>
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
      <TopupModal isOpen={isModalOpen} handleCloseModal={handleCloseTopUpModal} />
    </>
  )
}

export default UserMainComponents;