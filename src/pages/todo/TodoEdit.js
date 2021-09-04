import { useEffect, useState, useCallback } from 'react';
import Loading from "../../components/Loading";
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
import Api from '../../config/Api';
import Swal from 'sweetalert2';

export default function TodoEdit() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    title: '',
    note: '',
    comment: '',
  });
  const params = useParams();
  const history = useHistory();

  const getTodo = useCallback(() => {
    Api.get(`todos/${params.id}`)
    .then(response => {
        setState({
          title: response.data.data.title,
          note: response.data.data.note,
          comment: response.data.data.comment ? response.data.data.comment : '',
        });
        setLoading(false);
    })
    .catch(() => {
      Swal.fire('', 'Something went wrong!', 'error');
      setLoading(false);
      history.push('/todos');
    });
  }, [history, params.id]);

  useEffect(() => {
    document.title = `Todo Edit - ${process.env.REACT_APP_NAME}`;
    getTodo();

    return () => {
      setState([]);
      setErrors({});
      setLoading(false);
    };
  }, [getTodo]);

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
    data.append('_method', 'put');

    // request handle with javascrpt fetch
    fetch(`${process.env.REACT_APP_API_URL}/todos/${params.id}`, { method: 'post', body: data })
    .then(response => response.json())
    .then(response => {
      if (response.errors) {
        setErrors(response.errors);
      } else {
        Swal.fire('', 'Todo Updated Successfully', 'success');
      }
      setLoading(false);
    })
    .catch(() => {
      Swal.fire('', 'Something went wrong!', 'error');
      setLoading(false);
    });

    // Api.post(`/todos/${params.id}`, data)
    // .then((response) => {
    //   Swal.fire('', 'Todo Updated Successfully', 'success');
    //   setLoading(false);
    // })
    // .catch(errors => {
    //   if (errors.response) {
    //     setErrors(errors.response.data.errors);
    //   } else {
    //     Swal.fire('', 'Something went wrong!', 'error');
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
            <span>Edit Todo</span>
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