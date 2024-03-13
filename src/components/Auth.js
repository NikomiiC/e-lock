import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Button} from "react-bootstrap";

const Auth = ({ isOpen, handleCloseModal, errorMessage, onSubmit }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [radioVal, setRadioVal] = useState(true);
    const toggleType = () => setRadioVal(!radioVal);

    const handleEmail = event => {
        setEmail(event.target.value);
    };
    const handlePw = event => {
        setPassword(event.target.value);
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        if (onSubmit && typeof onSubmit === 'function') {
            onSubmit({ email, password });
        }
    };

    const handleReg = async (event) => {
        event.preventDefault();
        if (onSubmit && typeof onSubmit === 'function') {
            onSubmit({ email, password });
        }
    };

    return (
        <Modal show={isOpen} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>eLockHub</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="form-group mt-3">
                        <Form.Group as={Row} className="mb-3" controlId="myForm.Email">
                            <Form.Label column sm="2">Email address</Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" value={email} onChange={handleEmail} placeholder="name@example.com" />
                            </Col>
                        </Form.Group>
                    </div>

                    <div className="form-group mt-3">
                        <Form.Group as={Row} className="mb-3" controlId="myForm.Password">
                            <Form.Label column sm="2">Password</Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" value={password} onChange={handlePw} placeholder="Enter password" />
                            </Col>
                        </Form.Group>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Group as={Row} className="mb-3" controlId="myForm.SignInRadio">
                            <Col sm="4">
                                <Form.Check
                                    required
                                    onClick={toggleType}
                                    type="radio"
                                    name="typeRadio"
                                    label="Sign In"
                                    value={true}
                                />
                            </Col>
                            <Col sm="4">
                                <Form.Check
                                    onClick={toggleType}
                                    type="radio"
                                    name="typeRadio"
                                    label="Register"
                                    value={false}
                                />
                            </Col>
                        </Form.Group>
                    </div>
                    <div>
                        {errorMessage ? <p className="text-right mt-2" style={{ color: "#e74c3c" }}>{errorMessage}</p> : null}
                    </div>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                {radioVal ? <Button variant="primary" onClick={handleSignin}>Login</Button> : <Button variant="info" onClick={handleReg}>Register</Button>}
            </Modal.Footer>
        </Modal>
    );
}
export default Auth;
