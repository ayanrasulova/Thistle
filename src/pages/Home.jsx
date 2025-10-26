import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import '../App.css'
import img0 from "../assets/img_0.png";
import img1 from "../assets/img_1.png";
import img2 from "../assets/img_2.png";
import img3 from "../assets/img_3.png";
import img4 from "../assets/img_4.png";
import img5 from "../assets/img_5.png";
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
                    <div className="mission-section" style={{ marginTop: '50px', marginBottom: '350px' }}>
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
                    </Stack>
                </div>
                <div>
                    <Container>
                        <Row>
                            <Col className="d-flex align-items-stretch mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: 0.2 }}
                                    className="w-100 h-100"
                                >
                                    <Card className="gesture-card w-100 h-100">
                                        <Card.Img variant="top" src={img0} />
                                        <Card.Body>
                                            <Card.Text>
                                            Use your <span className="gradient-text">Index Finger</span> to navigate through the canvas
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                            <Col className="d-flex align-items-stretch mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: 0.4 }}
                                    className="w-100 h-100"
                                >
                                    <Card className="gesture-card w-100 h-100">
                                        <Card.Img variant="top" src={img1} />
                                        <Card.Body>
                                            <Card.Text>
                                            Use <span className="gradient-text">Index + Pinky Fingers</span> to switch between brush and eraser
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                            <Col className="d-flex align-items-stretch mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: 0.6 }}
                                    className="w-100 h-100"
                                >
                                    <Card className="gesture-card w-100 h-100">
                                        <Card.Img variant="top" src={img2} />
                                        <Card.Body>
                                            <Card.Text>
                                            Use your <span className="gradient-text">Index Finger with your Thumb Out</span> to draw or erase
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-stretch mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: 0.2 }}
                                    className="w-100 h-100"
                                >
                                    <Card className="gesture-card w-100 h-100">
                                        <Card.Img variant="top" src={img3} />
                                        <Card.Body>
                                            <Card.Text>
                                            Cross your <span className="gradient-text">Index + Thumb</span> to enter color selection mode
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                            <Col className="d-flex align-items-stretch mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: 0.4 }}
                                    className="w-100 h-100"
                                >
                                    <Card className="gesture-card w-100 h-100">
                                        <Card.Img variant="top" src={img4} />
                                        <Card.Body>
                                            <Card.Text>
                                            Swipe with your <span className="gradient-text">Hands</span> to clear the canvas
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                            <Col className="d-flex align-items-stretch mb-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: 0.6 }}
                                    className="w-100 h-100"
                                >
                                    <Card className="gesture-card w-100 h-100">
                                        <Card.Img variant="top" src={img5} />
                                        <Card.Body>
                                            <Card.Text>
                                            <span className="gradient-text">Thumbs Up</span> to save a screenshot of the canvas
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Stack>
        </Container>
    </div>    
    );
  }
  
  export default Home;