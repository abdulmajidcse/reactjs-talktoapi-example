import { useEffect, useState } from "react";
import { Container, Card, Table, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import Loading from "../components/Loading";
import Api from '../config/Api';
import { getToken } from "../utils/token";
import Swal from "sweetalert2";

const Post = () => {
    const [postState, setPostState] = useState({
        posts: [],
        post: {},
        categories: [],
        loading: true,
        errors: {},
        modalShow: false,
    });

    const getCategories = () => {
        Api.get(`/categories?token=${getToken()}`)
        .then(response => {
          setPostState(prevState => {
            return {
                ...prevState,
                categories: response.data.data,
            };
          });
        });
    };

    const getPosts = () => {
        Api.get(`/posts?token=${getToken()}`)
        .then(response => {
          setPostState(prevState => {
            return {
                ...prevState,
                posts: response.data.data,
                loading: false, 
            };
          });
        })
        .catch(() => {
            Swal.fire('', 'Something went wrong!', 'error');
            setPostState(prevState => {
                return {
                    ...prevState,
                    loading: false,
                };
              });
        });
    };

    useEffect(() => {
        getCategories();
        getPosts();
    }, []);

    const modalOpen = (e, post = {}) => {
        setPostState(prevState => {
            return {
                ...prevState,
                modalShow: true,
                post,
            };
        });
    };

    const modalClose = () => {
        setPostState(prevState => {
            return {
                ...prevState,
                modalShow: false
            };
        });
    };

    const { posts, loading, modalShow, post, categories, errors } = postState;

    const postList = posts.map((post, index) => 
        <tr key={post.id}>
            <td>{++index}</td>
            <td>{post.title}</td>
            <td>{post.category.name}</td>
            <td>
                {post.image && <img src={post.image} className="w-100 img" alt='thumbnail' />}
            </td>
            <td>
                <Button className="btn-sm" variant="primary" onClick={modalOpen}>Edit</Button>
                <Button className="btn-sm" variant="danger">Delete</Button>
            </td>
        </tr>
    );

    const categoryList = categories.map((category, index) => 
        <option key={category.id} value={category.id}>{category.name}</option>
    );

    return (
        <>
            <Container className="mt-3">
                <Loading show={loading} />
                <Card className="rounded-0 my-3">
                    <Card.Header>
                        <Card.Title>
                            <span>Post List</span>
                            <Button variant="primary" className="ms-2" onClick={modalOpen}>Add New</Button>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{postList}</tbody>
                        </Table>
                    </Card.Body>

                    {/* category modal */}
                    <Modal
                        show={modalShow}
                        onHide={modalClose}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>{post.id ? 'Edit' : 'New'} Post</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Modal.Body>
                                <Form.Group controlId="categoryId" className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select aria-label="Category">
                                        {categoryList}
                                    </Form.Select>
                                    {errors.categoryId && <Form.Text className="text-danger">{errors.categoryId}</Form.Text>}
                                </Form.Group>
                                
                                <FloatingLabel controlId="title" label="Title" className="mb-3">
                                    <Form.Control type="text" placeholder="Title" required />
                                </FloatingLabel>
                                {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}

                                <FloatingLabel controlId="content" label="Content" className="mb-3">
                                    <Form.Control as="textarea" placeholder="What's on your mind?" style={{ height: '100px' }} required />
                                </FloatingLabel>
                                {errors.content && <Form.Text className="text-danger">{errors.content}</Form.Text>}

                                <Form.Group controlId="image" className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" />
                                    {errors.image && <Form.Text className="text-danger">{errors.image}</Form.Text>}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={modalClose}>
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

export default Post;