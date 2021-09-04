import { useEffect, useState } from 'react';
import Loading from "../../components/Loading";
import { Container, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Api from '../../config/Api';
import Swal from 'sweetalert2';

export default function TodoIndex() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    // request handle with javascrpt fetch
    fetch(`${process.env.REACT_APP_API_URL}/todos`, { method: 'get' })
    .then(response => response.json())
    .then(response => {
      if (response.errors) {
        Swal.fire('', 'Something went wrong!', 'error');
      } else {
        setTodos(response.data);
      }
      setLoading(false);
    })
    .catch(() => {
      Swal.fire('', 'Something went wrong!', 'error');
      setLoading(false);
    });


    // Api.get('/todos')
    // .then(response => {
    //   setTodos(response.data.data);
    //   setLoading(false);
    // })
    // .catch(() => {
    //     Swal.fire('', 'Something went wrong!', 'error');
    //     setLoading(false);
    // });
  };

  useEffect(() => {
    document.title = `Todo List - ${process.env.REACT_APP_NAME}`;
    getTodos();
        
    // component unmount
    return () => {
        setLoading(false);
        setTodos([]);
    };
  }, []);

  const deleteTodo = id => {
    Swal.fire({
        title: '',
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!'
    })
    .then((result) => {
        if (result.isConfirmed) {
            setLoading(true);
    
            let data = new FormData();
            data.append('_method', 'delete');

            // request handle with javascrpt fetch
            fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, { method: 'post', body: data })
            .then(response => response.json())
            .then(response => {
              if (response.errors) {
                Swal.fire('', 'Something went wrong!', 'error');
              } else {
                let newTodos = todos.filter(todo => todo.id !== id);
                setTodos(newTodos);
                Swal.fire('', 'Todo Deleted Successfully!', 'success');
              }
              setLoading(false);
            })
            .catch(() => {
              Swal.fire('', 'Something went wrong!', 'error');
              setLoading(false);
            });
            
            // Api.post(`/todos/${id}`, data)
            // .then(response => {
            //     let newTodos = todos.filter(todo => todo.id !== id);
            //     setTodos(newTodos);
            //     setLoading(false);
    
            //     Swal.fire('', 'Todo Deleted Successfully!', 'success');
            // })
            // .catch(() => {
            //     Swal.fire('', 'Something went wrong!', 'error');
            //     setLoading(false);
            // });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('', 'Cancelled', 'error');
        }
    });
  };

  const todoList = todos.map((todo, index) => 
        <tr key={todo.id}>
            <td>{++index}</td>
            <td>{todo.title}</td>
            <td>{todo.note}</td>
            <td>{todo.comment}</td>
            <td>
                <Link className="btn btn-sm btn-primary"  to={`/todos/${todo.id}/edit`}>Edit</Link>
                <button type="button" className="btn btn-sm btn-danger"  onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    );

  return (
    <Container>
      <Loading show={loading} />
      <Card className="rounded-0 my-3">
        <Card.Header>
          <Card.Title>
            <span>Todo List</span>
            <Link to="/todos/create" className="btn btn-sm btn-primary ms-2">Add New</Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Note</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todoList}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}