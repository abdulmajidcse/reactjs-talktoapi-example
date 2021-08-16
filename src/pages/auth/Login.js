import React from 'react';
import Loading from '../../components/Loading';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import Api from '../../config/Api';
import Swal from 'sweetalert2';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            email: '',
            password: '',
            errors: {
                email: '',
            }
        };

        this.submitButton = React.createRef();

        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
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

    LoginAccount = (event) => {
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
        let { email, password } = this.state;
        let data = new FormData();
        data.append('email', email);
        data.append('password', password);
        Api.post('/login', data)
        .then(({ data }) => {
            console.log(data.data.access_token);
            history.push("/");
            Swal.fire('', 'Logged in successfully!', 'success');
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
        const { loading, email, password, errors } = this.state;

        return (
            <>
                <Container>
                    <Loading show={loading} />
                    <Card className="rounded-0 my-3">
                        <Card.Header>
                            <Card.Title>
                                <span>Login</span>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.LoginAccount}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" rows={3} name="email" value={email} onChange={this.handleInput} />
                                    {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={password} onChange={this.handleInput} />
                                </Form.Group>

                                <Button ref={this.submitButton} className="me-2" variant="primary" type="submit">Login</Button>
                                <Link className="btn btn-danger" to="/register">Register</Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

export default withRouter(Login);