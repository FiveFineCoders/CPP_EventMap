import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LinkContainer } from 'react-router-bootstrap';

export const Navigation = () => {



    return (
        
        <Navbar bg="light" expand="lg">

            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand href="#home">CPP Event Map</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to='/eventslist'>
                        <Nav.Link>Events List</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/about'>
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>

                </Nav>
                </Navbar.Collapse>
            </Container>


        </Navbar>


    )

}