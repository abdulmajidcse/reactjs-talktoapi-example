import { useEffect, useState } from 'react';
import Loading from "../../components/Loading";
import { Container, Card } from 'react-bootstrap';

export default function TodoIndex() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Todo List - ReactLumenBlog';
    setLoading(false);
  }, []);

  return (
    <Container>
      <Loading show={loading} />
      <Card className="rounded-0">
        <Card.Header>
          <Card.Title>Todo List</Card.Title>
        </Card.Header>
        <Card.Body>
          Todo List
        </Card.Body>
      </Card>
    </Container>
  );
}