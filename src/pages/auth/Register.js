import React from 'react';
import Loading from '../../components/Loading';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import Api from '../../config/Api';
import Swal from 'sweetalert2';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {
                name: '',
                email: '',
                password: '',
            }
        };

        this.submitButton = React.createRef();

        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        document.title = `Register - ${process.env.REACT_APP_NAME}`;
        this.setState({
            loading: false,
        });
    }

    componentWillUnmount() {
        this.setState({});
    }

    handleInput(event) {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value,
        });
    }

    registerAccount = (event) => {
        event.preventDefault();
        if (this.loading) return true;
        // loading start
        this.setState({
            loading: true,
        });

        let submitButton = this.submitButton.current;
        let { history } = this.props;

        // disabled submit button
        submitButton.setAttribute('disabled', true);
        // send registr request to server
        let { name, email, password, password_confirmation } = this.state;
        let data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', password_confirmation);
        Api.post('/register', data)
        .then(() => {
            Swal.fire('', 'Registered successfully! Please, login.', 'success');
            history.push("/login");
        })
        .catch(({ response }) => {
            let errors = response.data;
            this.setState({
                loading: false,
            });
            // enable submit button
            submitButton.removeAttribute('disabled');
            this.setState({
                errors: errors,
            });
        });
    }

    render() {
        const { loading, name, email, password, password_confirmation, errors } = this.state;

        return (
            <>
                <Container>
                    <Loading show={loading} />
                    <Card className="rounded-0 my-3">
                        <Card.Header>
                            <Card.Title>
                                <span>Register a new account</span>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.registerAccount}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" value={name} onChange={this.handleInput} />
                                    {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" rows={3} name="email" value={email} onChange={this.handleInput} />
                                    {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={password} onChange={this.handleInput} />
                                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password_confirmation">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="password_confirmation" value={password_confirmation} onChange={this.handleInput} />
                                </Form.Group>

                                <Button ref={this.submitButton} className="me-2" variant="primary" type="submit">Register</Button>
                                <Link className="btn btn-danger" to="/login">Login</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

export default withRouter(Register);