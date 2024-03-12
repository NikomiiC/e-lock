import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Auth = ({ errorMessage, onSubmit }) => {

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
        onSubmit({ email, password });
    };

    const handleReg = async (event) => {
        event.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <Container className="p-5">
            <Form>
                <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <h1 className="PoseBuddyTitle">eLockHub</h1>
                            <h3 className="Auth-form-title">Sign In / Register</h3>
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

                            <div className="d-grid gap-2 mt-3">
                                {radioVal ? <button type="submit" className="btn btn-primary" onClick={handleSignin}> Login </button> : <button type="submit" className="btn btn-info" onClick={handleReg}> Register </button>}
                            </div>
                            {/* <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                        </div>
                    </form>
                </div>
            </Form>
        </Container>
    );
}
export default Auth;
