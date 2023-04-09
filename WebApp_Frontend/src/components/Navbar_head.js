import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../logo.jpg';
import '../Navbar.css';
import Login from './Login';


function Navbar_head() {

  const navigate = useNavigate()
  // const handleLogout=()=>{
  //     sessionStorage.clear();
      
  // }
  return (

    

    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" style={{ fontWeight: 'bold' }}>Home</Nav.Link>
            
            <NavDropdown title="Services" id="navbarScrollingDropdown" style={{ fontWeight: 'bold' }}>
              <NavDropdown.Item href="#action3" >Book an Appointment</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Lab Test
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Consultation
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action1" style={{ fontWeight: 'bold' }}>Contact</Nav.Link>
            <Nav.Link href="#action1" style={{ fontWeight: 'bold' }}>About</Nav.Link>
          </Nav>
          <Nav.Link href="#action1"><Button variant='danger' onClick={()=>navigate('/')} >LOGOUT  </Button></Nav.Link>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar_head;