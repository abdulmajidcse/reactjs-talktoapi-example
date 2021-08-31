import { useEffect, useState } from 'react';
import Loading from "../components/Loading";
import { Container } from 'react-bootstrap';
import Slider from '../components/Slider';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Home - reactjs-talktoapi-example';
    setLoading(false);
  }, []);

  return (
    <Container className="mt-3">
      <Loading show={loading} />
      <Slider />
    </Container>
  );
}