import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Loading from './Loading';

export default function NotFound() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = '404 | Not Found - ReactLumenBlog';
        setLoading(false);
    }, []);

    return (
        <Container>
            <Loading show={loading} />
            <div className="d-flex justify-content-center" style={{ height: '85vh' }}>
                <h4 className="align-self-center">404 | Not Found</h4>
            </div>
        </Container>
    );
}
