import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import brush from '../assets/brush.svg';
import person from '../assets/person.svg';
import '../App.css'; 

function NavBar() {
  return (
    <Navbar expand="lg" className="fixed-top custom-navbar">
        <Navbar.Brand href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            alt="Thistle Logo"
            src={logo}
            width="50"
            height="50"
          />
          <span>Thistle</span>
        </Navbar.Brand>

         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="launch-canvas">
              <img
                alt=""
                src={brush}
                width="20"
                height="20"
              />
              <span>Launch Canvas</span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about-us">
              <img
                alt=""
                src={person}
                width="20"
                height="20"
              />
              <span>About Us</span>
            </Nav.Link>
            </Nav>
         </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;