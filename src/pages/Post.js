/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Loading from '../components/Loading';
import Api from '../config/Api';
import { getToken } from '../utils/token';

const Post = () => {
    const [postState, setPostState] = useState({
        posts: [],
        categories: [],
        postId: '',
        categoryId: '',
        title: '',
        content: '',
        imageUrl: '',
        image: React.createRef(),
        loading: true,
        errors: {},
        modalShow: false,
    });

    const getCategories = () => {
        Api.get(`/categories?token=${getToken()}`)
            .then((response) => {
                setPostState((prevState) => ({
                    ...prevState,
                    categories: response.data.data,
                }));
            })
            .catch(() => {});
    };

    const getPosts = () => {
        Api.get(`/posts?token=${getToken()}`)
            .then((response) => {
                setPostState((prevState) => ({
                    ...prevState,
                    posts: response.data.data,
                    loading: false,
                }));
            })
            .catch(() => {
                Swal.fire('', 'Something went wrong!', 'error');
                setPostState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    };

    useEffect(() => {
        document.title = `Post - ${process.env.REACT_APP_NAME}`;
        getCategories();
        getPosts();
    }, []);

    const modalOpen = (
        event,
        postId = '',
        categoryId = '',
        title = '',
        content = '',
        imageUrl = ''
    ) => {
        setPostState((prevState) => ({
            ...prevState,
            modalShow: true,
            postId,
            categoryId,
            title,
            content,
            imageUrl,
        }));
    };

    const modalClose = () => {
        setPostState((prevState) => ({
            ...prevState,
            modalShow: false,
            postId: '',
            categoryId: '',
            title: '',
            content: '',
            imageUrl: '',
            errors: {},
        }));
    };

    const {
        posts,
        categories,
        loading,
        errors,
        modalShow,
        postId,
        categoryId,
        title,
        content,
        imageUrl,
        image,
    } = postState;

    const deletePost = (id) => {
        Swal.fire({
            title: '',
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
        }).then((result) => {
            if (result.isConfirmed) {
                setPostState((prevState) => ({
                    ...prevState,
                    loading: true,
                }));
                const data = new FormData();
                data.append('_method', 'delete');
                Api.post(`/posts/${id}?token=${getToken()}`, data)
                    .then(() => {
                        const newPosts = posts.filter((post) => post.id !== id);
                        setPostState((prevState) => ({
                            ...prevState,
                            loading: false,
                            posts: newPosts,
                        }));

                        Swal.fire('', 'Post Deleted Successfully!', 'success');
                    })
                    .catch(() => {
                        Swal.fire('', 'Something went wrong!', 'error');
                        setPostState((prevState) => ({
                            ...prevState,
                            loading: true,
                        }));
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('', 'Cancelled', 'error');
            }
        });
    };

    const postList = posts.map((post, index) => (
        <tr key={post.id}>
            <td>{++index}</td>
            <td>{post.title}</td>
            <td>{post.category.name}</td>
            <td>{post.content}</td>
            <td>{post.image && <img src={post.image} style={{ width: 100 }} alt="" />}</td>
            <td>
                <Button
                    className="btn-sm"
                    variant="primary"
                    onClick={(event) =>
                        modalOpen(
                            event,
                            post.id,
                            post.category.id,
                            post.title,
                            post.content,
                            post.image
                        )
                    }
                >
                    Edit
                </Button>
                <Button className="btn-sm" variant="danger" onClick={() => deletePost(post.id)}>
                    Delete
                </Button>
            </td>
        </tr>
    ));

    const categoryList = categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
    ));

    const handleInput = (event) => {
        const { target } = event;
        const { value } = target;
        const { name } = target;
        setPostState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const postSave = (event) => {
        event.preventDefault();

        setPostState((prevState) => ({
            ...prevState,
            loading: true,
            errors: {},
        }));

        // request url
        let requestUrl = `/posts?token=${getToken()}`;
        // set form data
        const data = new FormData();
        data.append('category_id', categoryId);
        data.append('title', title);
        data.append('content', content);
        if (image.current.files[0]) {
            data.append('image', image.current.files[0]);
        }
        // if post id exits, update the post
        if (postId) {
            data.append('_method', 'put');
            requestUrl = `/posts/${postId}?token=${getToken()}`;
        }

        Api.post(requestUrl, data)
            .then(() => {
                modalClose();
                setPostState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
                getPosts();
                Swal.fire('', 'Successfully Post Saved!', 'success');
            })
            .catch(({ response }) => {
                if (response.data.errors) {
                    setPostState((prevState) => ({
                        ...prevState,
                        errors: response.data.errors,
                    }));
                } else {
                    Swal.fire('', response.statusText, 'error');
                }
                setPostState((prevState) => ({
                    ...prevState,
                    loading: false,
                }));
            });
    };

    return (
        <>
            <Container className="mt-3">
                <Loading show={loading} />
                <Card className="rounded-0 my-3">
                    <Card.Header>
                        <Card.Title>
                            <span>Post List</span>
                            <Button variant="primary" className="ms-2" onClick={modalOpen}>
                                Add New
                            </Button>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Content</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{postList}</tbody>
                        </Table>
                    </Card.Body>

                    {/* category modal */}
                    <Modal show={modalShow} onHide={modalClose} backdrop="static" keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>{postId ? 'Edit' : 'New'} Post</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={postSave}>
                            <Modal.Body>
                                <Form.Group controlId="categoryId" className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        defaultValue={categoryId}
                                        name="categoryId"
                                        onChange={handleInput}
                                    >
                                        <option value="">Select a Category</option>
                                        {categoryList}
                                    </Form.Select>
                                    {errors.category_id && (
                                        <Form.Text className="text-danger">
                                            {errors.category_id}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <FloatingLabel controlId="title" label="Title" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={title}
                                        placeholder="Title"
                                        onChange={handleInput}
                                        required
                                    />
                                </FloatingLabel>
                                {errors.title && (
                                    <Form.Text className="text-danger">{errors.title}</Form.Text>
                                )}

                                <FloatingLabel controlId="content" label="Content" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        name="content"
                                        value={content}
                                        onChange={handleInput}
                                        placeholder="What's on your mind?"
                                        style={{ height: '100px' }}
                                        required
                                    />
                                </FloatingLabel>
                                {errors.content && (
                                    <Form.Text className="text-danger">{errors.content}</Form.Text>
                                )}

                                {imageUrl && <img src={imageUrl} style={{ width: 100 }} alt="" />}
                                <Form.Group controlId="image" className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" ref={image} />
                                    {errors.image && (
                                        <Form.Text className="text-danger">
                                            {errors.image}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={modalClose}>
                                    Close
                                </Button>
                                <Button type="submit" variant="primary">
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Card>
            </Container>
        </>
    );
};

export default Post;
