import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Table, Modal, Button, Form } from 'react-bootstrap';
import Loading from '../components/Loading';
import Api from '../config/Api';
import Swal from 'sweetalert2';
import { getToken } from '../utils/token';

class Category extends React.Component {
    state = {
        categories: [],
        name: '',
        loading: true,
        modalShow: false,
    };

    getCategories() {
        Api.get(`/categories?token=${getToken()}`)
        .then(response => {
          this.setState({
            categories: response.data.data,
            loading: false, 
          });
        })
        .catch(() => {
            Swal.fire('', 'Something went wrong!', 'error');
            this.setState({
                loading: false, 
              });
        });
    }

    componentDidMount() {
        this.getCategories();
    }

    modalOpen = () => {
        this.setState({
            modalShow: true,
        });
    }

    modalClose = () => {
        this.setState({
            modalShow: false,
        });
    }

    setName = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    categorySave = (event) => {
        event.preventDefault();
        
        alert(this.state.name);
    }

    deleteCategory(id) {
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
                this.setState({
                    loading: true,
                });
                let data = new FormData();
                data.append('_method', 'delete');
                Api.post(`/categories/${id}?token=${getToken()}`, data)
                .then(() => {
                    let newCategoires = this.state.categories.filter(category => category.id !== id);
                    this.setState({
                        categories: newCategoires,
                        loading: false,
                    });
        
                    Swal.fire('', 'Category Deleted Successfully!', 'success');
                })
                .catch(() => {
                    Swal.fire('', 'Something went wrong!', 'error');
                    this.setState({
                        loading: false,
                    });
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('', 'Cancelled', 'error');
            }
        });
    }

    render() {
        const { categories, modalShow } = this.state;

        const categoryList = categories.map((category, index) => 
            <tr key={category.id}>
                <td>{++index}</td>
                <td>{category.name}</td>
                <td>
                    <Link className="btn btn-sm btn-primary"  to="/">Edit</Link>
                    <Button variant="danger" onClick={() => this.deleteCategory(category.id)}>Delete</Button>
                </td>
            </tr>
        );

        const { loading } = this.state;
        return (
            <>
                <Container className="mt-3">
                    <Loading show={loading} />
                    <Card className="rounded-0 my-3">
                        <Card.Header>
                            <Card.Title>
                                <span>Category List</span>
                                <Button variant="primary" className="ms-2" onClick={this.modalOpen}>Add New</Button>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryList}
                                </tbody>
                            </Table>
                        </Card.Body>

                        {/* category modal */}
                        <Modal
                            show={modalShow}
                            onHide={this.modalClose}
                            backdrop="static"
                            keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Category</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={this.categorySave}>
                                <Modal.Body>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" required onChange={this.setName} />
                                        {/* <Form.Text className="text-danger">
                                            name error message
                                        </Form.Text> */}
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={this.modalClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" variant="primary">Save</Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    </Card>
                </Container>
            </>
        );
    }
}

export default Category;