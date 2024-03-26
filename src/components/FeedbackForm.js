import { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Row, Col, Card, FloatingLabel, ButtonGroup, InputGroup } from 'react-bootstrap';

const FeedbackForm = () => {
    const optionList = ['Pricing', 'Application', 'Lockers', 'Others'];
    const options = optionList.map(opt => <option value={opt}>{opt}</option>);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>
            <Container className='headerComponentSpace'>
                <h1 className="text-light text-center">Feedback to us</h1>
                <Form validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className='my-4'>
                        <InputGroup hasValidation>
                            <FloatingLabel label="Feedback Category">
                                <Form.Select name='catSelect' required>
                                    <option value=''>Select Category</option>
                                    {options}
                                </Form.Select>
                            </FloatingLabel>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group style={{ marginTop: "2rem" }}>
                        <FloatingLabel label="Leave your feedback with us">
                            <Form.Control required as="textarea" rows={6} />
                        </FloatingLabel>
                    </Form.Group>
                    <ButtonGroup size='md' className='mt-3' style={{float: "right"}}>
                        <Button variant='info' type='submit'>Submit</Button>
                        <Button variant='danger' type='reset'>Clear Form</Button>
                    </ButtonGroup>
                </Form>
            </Container>
        </>
    )
}

export default FeedbackForm;