import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="bg-primary">
            <Container>
                <Navbar className="navbar-dark" bg="primary" expand="lg">
                <Link to="/"><Navbar.Brand className="font-weight-bold">DB</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className="nav-link active">Home</Link>
                            <Nav.Link href="#link">Todo</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}