import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export default function Header() {
    const { user, logout } = useUserContext();
    const history = useHistory();

    const userLogout = () => {
        logout();
        history.push("/login");
    };

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
                            {!user.authIs ? <NavLink exact to="/register" className="nav-link">Register</NavLink> : ''}
                            {!user.authIs ? <NavLink exact to="/login" className="nav-link">Login</NavLink> : ''}
                            {user.authIs ? <NavLink exact to="/categories" className="nav-link">Category</NavLink> : '' }
                            {user.authIs ? <NavLink exact to="/posts" className="nav-link">Post</NavLink> : '' }
                            {user.authIs ? <span className="nav-link" style={{cursor: 'pointer'}} onClick={userLogout}>Logout</span> : '' }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}