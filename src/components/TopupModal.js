import { Container, Button, Form, Table, Row, Col, Card, Image, Modal } from 'react-bootstrap';
import qrImg from '../images/stripe-payment.png';

const TopupModal = ({ isOpen, handleCloseModal }) => {
    const updatePage = () => {
        window.location.reload();
    }

    return (
        <>
            <Modal show={isOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Top-up to Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Scan or click on QR code to make payment</p>
                    <div className='my-4'>
                        <a href="https://buy.stripe.com/test_dR66qN3KH3Be2WY9AA">
                            {/* <Image src={qrImg} fluid /> */}
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='info' onClick={updatePage}>Completed</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TopupModal;