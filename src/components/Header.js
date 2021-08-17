import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <div className="bg-light">
            <Container>
                <Navbar bg="light" expand="lg">
                <Link className="text-decoration-none" to="/"><Navbar.Brand>ReactJS Practise</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink exact to="/" className="nav-link">Home</NavLink>
                            <NavLink exact to="/todos" className="nav-link">Todo List</NavLink>
                            <NavLink exact to="/register" className="nav-link">Register</NavLink>
                            <NavLink exact to="/login" className="nav-link">Login</NavLink>
                            <NavLink exact to="/posts" className="nav-link">Post</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}