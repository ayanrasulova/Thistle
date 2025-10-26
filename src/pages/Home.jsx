import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import LiquidEther from '../components/ui/liquid-ether';
import ChromaGrid from '../components/ui/chroma-grid';

const missionItems = [
  { image: "", title: "Text Placeholder 1", subtitle: "Subtitle", handle: "", borderColor: "rgba(187, 255, 246, 0.8)", gradient: "linear-gradient(145deg, rgba(143, 212, 203, 0.2), rgba(158, 255, 110, 0.2))", url: "#" },
  { image: "", title: "Image Placeholder 1", subtitle: "Subtitle", handle: "", borderColor: "rgba(187, 255, 246, 0.8)", gradient: "linear-gradient(145deg, rgba(143, 212, 203, 0.2), rgba(158, 255, 110, 0.2))", url: "#" },
  { image: "", title: "Text Placeholder 2", subtitle: "Subtitle", handle: "", borderColor: "rgba(187, 255, 246, 0.8)", gradient: "linear-gradient(145deg, rgba(143, 212, 203, 0.2), rgba(158, 255, 110, 0.2))", url: "#" },
  { image: "", title: "Image Placeholder 2", subtitle: "Subtitle", handle: "", borderColor: "rgba(187, 255, 246, 0.8)", gradient: "linear-gradient(145deg, rgba(143, 212, 203, 0.2), rgba(158, 255, 110, 0.2))", url: "#" },
  { image: "", title: "Text Placeholder 3", subtitle: "Subtitle", handle: "", borderColor: "rgba(187, 255, 246, 0.8)", gradient: "linear-gradient(145deg, rgba(143, 212, 203, 0.2), rgba(158, 255, 110, 0.2))", url: "#" },
  { image: "", title: "Image Placeholder 3", subtitle: "Subtitle", handle: "", borderColor: "rgba(187, 255, 246, 0.8)", gradient: "linear-gradient(145deg, rgba(143, 212, 203, 0.2), rgba(158, 255, 110, 0.2))", url: "#" },
];



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
                                            <Button as={NavLink} to='/launch-canvas' variant="outline-thistle" size="lg">
                                                Launch Canvas
                                            </Button>
                                            <Button as={NavLink} to='/about-us' variant="outline-thistle" size="lg">
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
                    <h2 className="welcome-heading">
                        <span className="white-text">Our </span>
                        <span className="gradient-text">Mission</span>
                        <span className="white-text">.</span>
                    </h2>

                    <div style={{ position: 'relative', minHeight: '600px', marginTop: '30px' }}>
                        <ChromaGrid
                        items={missionItems}
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        ease="power3.out"
                        />
                    </div>
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