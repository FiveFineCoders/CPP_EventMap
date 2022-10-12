import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/general.css'

export const Navigation = () => {

    return (
        
        
        <Navbar bg="light" expand="lg" id="navElement" className="border-bottom border-2">
            <Container >
                <LinkContainer to='/' >
                    <Navbar.Brand href="#home" className="brand-font-size">CPP Event Map</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-font-size">
                        <LinkContainer to='/eventslist'>
                            <Nav.Link>Event List</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/about'>
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="nav-font-size">

                        <LinkContainer to='/login'>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
        

    )

}