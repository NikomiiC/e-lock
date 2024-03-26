import { useState, useEffect } from 'react';
import { Container, Button, Form, Table, Row, Col, Card, FloatingLabel, ButtonGroup, InputGroup } from 'react-bootstrap';

const PastFeedback = () => {
    const pastList =
        [
            {
                Cat: "Pricing",
                Msg: "Test 1"
            },
            {
                Cat: "Others",
                Msg: "Test 2"
            }
        ];
    const pastConvo = pastList.map((convo) =>
        <Col lg="6" md="12">
            <Card className='mb-3'>
                <Card.Body className='text-muted'>
                    <Card.Title>
                        {convo.Cat}
                    </Card.Title>
                    <Card.Text>
                        {convo.Msg}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <>
            <Container className='headerComponentSpace'>
                <h1 className="text-light text-center mb-5">Past feedback submissions</h1>
                <Row>
                    {pastConvo}
                </Row>
            </Container>
        </>
    )
}

export default PastFeedback;