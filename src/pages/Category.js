import React from 'react';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';

class Category extends React.Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        this.setState({
            loading: false,
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <Container className="mt-3">
                <Loading show={loading} />
                <h1>Category Page</h1>
            </Container>
        );
    }
}

export default Category;