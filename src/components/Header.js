import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import '../assets/css/style.css';

export default function Header() {
    return (
        <div className="bg-primary">
            <Container>
                <Navbar className="navbar-dark p-0" bg="primary" expand="lg">
                <Link to="/"><Navbar.Brand className="font-weight-bold">DB</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink exact to="/" className="nav-link">Home</NavLink>
                            <NavLink exact to="/todos" className="nav-link">Todo List</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}