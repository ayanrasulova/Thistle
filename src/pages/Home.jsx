import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import placeholder from '../assets/placeholder.gif';
import LiquidEther from '../components/ui/liquid-ether';


function Home() {
  return (
<div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* LiquidEther background */}
      <div
        className="liquid-ether-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none', // allows clicks through
        }}
      >
        <LiquidEther
          colors={['#62daa2', '#9ef9ff', '#a3f0c0']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>

        <Container style={{ position: 'relative', zIndex: 1, paddingTop: '200px' }}>  
            <Stack gap={5}>
                <div style={{ paddingBottom: '350px'}}>
                    <Stack direction="horizontal" gap={3} className="align-items-start">
                        {/* <div class="placeholder">
                            <img 
                            src={placeholder} 
                            alt="Placeholder animation" 
                            style={{ width: '550px', borderRadius: '10px' }} 
                            />
                        </div> */}
                        <div className="home-container">
                            <Stack>
                                <div>
                                    <h1 className="welcome-heading">
                                    <span className="white-text">Welcome to </span>
                                    <span className="gradient-text">Thistle</span>
                                    <span className="white-text">.</span>
                                    </h1>
                                </div>
                                <div>
                                    <p className="welcome-subtitle">
                                        Thistle re-imagines digital art accessibility by turning your hand movements into 
                                        brushstrokes — no tablet, mouse, or stylus needed. 
                                    </p>
                                </div>
                                <div>
                                    <Container>
                                        <Row>
                                            <div className="d-flex justify-content-center gap-5 mt-3">
                                            <Button variant="outline-thistle" size="lg">
                                                Launch Canvas
                                            </Button>
                                            <Button variant="outline-thistle" size="lg">
                                                About Us
                                            </Button>
                                            </div>
                                        </Row>
                                    </Container>
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </div>
                <div className="mission-section" style={{ marginTop: '50px', marginBottom: '350px' }}>
                    {/* Heading outside the cards */}
                    <h2 className="welcome-heading">
                        <span className="white-text">Our </span>
                        <span className="gradient-text">Mission</span>
                        <span className="white-text">.</span>
                    </h2>

                    {/* Cards side by side */}
                    <Container>
                        <Row className="justify-content-center g-4" style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Card 1: Blurb */}
                        <Col xs={12} md={6}>
                            <Card className="mission-card" style={{ flex: 1 }}>
                            <Card.Body>
                                <p>
                                Generative AI has become more powerful over the last few years, and a lot of discourse 
                                within art communities involves the idea that artists with disabilities are not able to 
                                create art without the use of generating drawings through prompt engineering. As passionate 
                                artists and software developers, we wanted to challenge this notion, offering an accessible 
                                alternative for digital drawing beyond the constraints of a mouse, tablet, or physical device.
                                </p>
                            </Card.Body>
                            </Card>
                        </Col>

                        {/* Card 2: Image placeholder */}
                        <Col xs={12} md={6} style={{ display: 'flex' }}>
                            <Card className="mission-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Body>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Image Placeholder</p>
                            </Card.Body>
                            </Card>
                        </Col>
                        </Row>
                    </Container>
                    </div>
                    <div>
                    <Stack>
                        <div>
                            <h2>
                                <span className="white-text">How it </span>
                                <span className="gradient-text">Works</span>
                                <span className="gradient-text">.</span>
                            </h2>
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
    </div>    
    );
  }
  
  export default Home;