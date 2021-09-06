import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import Slider from '../components/Slider';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `Home - ${process.env.REACT_APP_NAME}`;
        setLoading(false);
    }, []);

    return (
        <Container className="mt-3">
            <Loading show={loading} />
            <h4 className="p-2 border border-primary text-danger">
                Welcome to {process.env.REACT_APP_NAME}
            </h4>
            <Slider />
        </Container>
    );
}
