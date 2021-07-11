import { useEffect, useState } from 'react';
import Loading from "../components/Loading";
import { Container, Card } from 'react-bootstrap';
import Slider from '../components/Slider';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Home - Developer Blog';
    setLoading(false);
  }, []);

  return (
    <Container>
      <Loading show={loading} />
      <Card className="rounded-0">
        <Card.Header>
          <Card.Title>Welcome to Developer Blog</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Slider />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}