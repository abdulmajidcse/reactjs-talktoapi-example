import { useEffect, useState } from 'react';
import Loading from "../../components/Loading";
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Api from '../../config/Api';
import Swal from 'sweetalert2';

export default function TodoCreate() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    title: '',
    note: '',
    comment: '',
  });

  useEffect(() => {
    document.title = `Todo Create - ${process.env.REACT_APP_NAME}`;
    setLoading(false);
  }, []);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setState({
      ...state,
      [inputName]: inputValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (loading) return true;

    setLoading(true);
    setErrors({});

    let data = new FormData();
    data.append('title', state.title);
    data.append('note', state.note);
    data.append('comment', state.comment);

    // request handle with javascrpt fetch
    fetch(`${process.env.REACT_APP_API_URL}/todos`, { method: 'post', body: data })
    .then(response => response.json())
    .then(response => {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        Swal.fire('', 'Todo Saved Successfully', 'success');
        setLoading(false);
        setState({
          title: '',
          note: '',
          comment: '',
        });
      }
      setLoading(false);
    })
    .catch(() => {
      Swal.fire('', 'Something went wrong!', 'error');
      setLoading(false);
    });

    // Api.post('/todos', data)
    // .then(() => {
    //   Swal.fire('', 'Todo Saved Successfully', 'success');
    //   setLoading(false);
    //   setState({
    //     title: '',
    //     note: '',
    //     comment: '',
    //   });
    // })
    // .catch(({ response }) => {
    //   if (response.data.errors) {
    //     setErrors(response.data.errors);
    //   } else {
    //     Swal.fire('', response.statusText, 'error');
    //   }
    //   setLoading(false);
    // });

  };

  return (
    <Container>
      <Loading show={loading} />
      <Card className="rounded-0 my-3">
        <Card.Header>
          <Card.Title>
            <span>New Todo</span>
            <Link to="/todos" className="btn btn-sm btn-primary ms-2">Todo List</Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={state.title} onChange={handleInput} />
            {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="note">
            <Form.Label>Note</Form.Label>
            <Form.Control as="textarea" rows={3} name="note" value={state.note} onChange={handleInput} />
            {errors.note && <Form.Text className="text-danger">{errors.note}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control type="text" name="comment" value={state.comment} onChange={handleInput} />
            {errors.comment && <Form.Text className="text-danger">{errors.comment}</Form.Text>}
          </Form.Group>

          <Button variant="primary" type="submit">Save</Button>
        </Form>
          
        </Card.Body>
      </Card>
    </Container>
  );
}