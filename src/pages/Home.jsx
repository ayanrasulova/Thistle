import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Home() {
    return (
        <Container>
            <Stack gap={5}>
                <div>
                    <Stack direction="horizontal" gap={3}>
                        <div>
                            <p>This is where the figure will go.</p>
                        </div>
                        <div>
                            <Stack>
                                <div>
                                    <h1>Welcome to Thistle.</h1>
                                </div>
                                <div>
                                    <p>
                                        Thistle re-imagines digital art accessibility by turning your hand movements into 
                                        brushstrokes — no tablet, mouse, or stylus needed. 
                                    </p>
                                </div>
                                <div>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <Button variant="outline-primary">
                                                    Launch Canvas
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button variant="outline-primary">
                                                    About Us
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </div>
                <div>
                    <Stack>
                        <div>
                            <h1>Our Mission.</h1>
                        </div>
                        <div>
                        <p>
                            Generative AI has become more powerful over the last few years, and a lot of discourse 
                            within art communities involves the idea that artists with disabilities are not able to 
                            create art without the use of generating drawings through prompt engineering. As passionate 
                            artists and software developers, we wanted to challenge this notion, offering an accessible 
                            alternative for digital drawing beyond the constraints of a mouse, tablet, or physical device.
                        </p>
                        </div>
                    </Stack>
                </div>
                <div>
                    <Stack>
                        <div>
                            <h1>How it Works.</h1>
                        </div>
                        <div>
                            <p>
                                Generative AI has become more powerful over the last few years, and a lot of discourse 
                                within art communities involves the idea that artists with disabilities are not able to 
                                create art without the use of generating drawings through prompt engineering. As passionate 
                                artists and software developers, we wanted to challenge this notion, offering an accessible 
                                alternative for digital drawing beyond the constraints of a mouse, tablet, or physical device.
                            </p>
                        </div>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src="holder.js/100px180" />
                                            <Card.Body>
                                                <Card.Text>
                                                Some quick example text to build on the card title and make up the
                                                bulk of the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        
                    </Stack>
                </div>
            </Stack>
        </Container>
    );
  }
  
  export default Home;