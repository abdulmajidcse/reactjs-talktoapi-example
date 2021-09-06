import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/userContext';

export default function Header() {
    const { user, logout } = useUserContext();
    const history = useHistory();

    const userLogout = () => {
        logout();
        history.push('/login');
    };

    return (
        <div className="bg-light">
            <Container>
                <Navbar bg="light" expand="lg">
                    <Link className="text-decoration-none" to="/" title="ReactJS TalktoAPI Example">
                        <Navbar.Brand>RTE</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink exact to="/" className="nav-link">
                                Home
                            </NavLink>
                            <Nav.Link href="https://talktoapi.abdulmajid.me/">TalktoAPI</Nav.Link>
                            <Nav.Link href="https://github.com/abdulmajidcse/reactjs-talktoapi-example">
                                Github
                            </Nav.Link>
                            <NavLink exact to="/todos" className="nav-link">
                                Todo List
                            </NavLink>
                            {!user.authIs ? (
                                <NavLink exact to="/register" className="nav-link">
                                    Register
                                </NavLink>
                            ) : (
                                ''
                            )}
                            {!user.authIs ? (
                                <NavLink exact to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            ) : (
                                ''
                            )}
                            {user.authIs ? (
                                <NavLink exact to="/categories" className="nav-link">
                                    Category
                                </NavLink>
                            ) : (
                                ''
                            )}
                            {user.authIs ? (
                                <NavLink exact to="/posts" className="nav-link">
                                    Post
                                </NavLink>
                            ) : (
                                ''
                            )}
                            {user.authIs && (
                                <NavDropdown title={user.name} id="profile-nav-dropdown">
                                    <NavDropdown.Item href="#" onClick={userLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
}
