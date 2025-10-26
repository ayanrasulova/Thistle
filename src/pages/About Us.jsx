import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import em from "../assets/emilie.png";
import am from "../assets/amelia.png";
import ja from "../assets/jack.png";
import ay from "../assets/ayan.png";
import LiquidEther from '../components/ui/liquid-ether';
import { useRef } from "react";
import '../App.css'
import { FaGithub, FaLinkedin } from "react-icons/fa";

function MeetTheTeam() {
    const team = [
        { 
          img: ja, 
          name: "Jack Ellis",
          github: "https://github.com/jackawackadoo",
          linkedin: "https://www.linkedin.com/in/jack-ellis-70790a384/"
        },
        { 
          img: ay, 
          name: "Ayan Rasulova",
          github: "https://github.com/ayanrasulova",
          linkedin: "https://www.linkedin.com/in/ayanrasulova/"
        },
        { 
          img: am, 
          name: "Amelia Chen",
          github: "https://github.com/ameimeilia",
          linkedin: "https://www.linkedin.com/in/amelia-chen-0531022ab/"
        },
        { 
          img: em, 
          name: "Emilie Deadman",
          github: "https://github.com/echiino ",
          linkedin: "https://www.linkedin.com/in/emilie-deadman-93a4b938b/"
        }
    ];

    const cardRefs = useRef([]);

    const handleMouseMove = (e, index) => {
        const card = cardRefs.current[index];
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = (index) => {
        const card = cardRefs.current[index];
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <div
                className="liquid-ether-container"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 0,
                    pointerEvents: 'none',
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
                    style={{ width: '100%', height: '100%' }}
                />
            </div>

            <Container style={{ position: 'relative', zIndex: 1, paddingTop: '80px', marginBottom: '100px', textAlign: 'center' }}>
                <h1 className="welcome-heading text-center mb-5">
                  <span className="white-text">Meet The </span>
                  <span className="gradient-text">Team</span>
                  <span className="white-text">.</span>
                </h1>
                <Row className="justify-content-center">
                    {team.map((member, index) => (
                        <Col key={index} xs={6} sm={6} md={3} className="mb-4">
                            <div
                                ref={el => cardRefs.current[index] = el}
                                className="team-card p-3"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <img 
                                    src={member.img} 
                                    alt={member.name} 
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        marginBottom: '10px',
                                        borderRadius: '12px',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <h5 className="text-light mt-2">{member.name}</h5>
                                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: '1.2rem' }}>
                                        <FaGithub />
                                    </a>
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0A66C2', fontSize: '1.2rem' }}>
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default MeetTheTeam;
