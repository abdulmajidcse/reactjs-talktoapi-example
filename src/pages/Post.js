import { useEffect, useState } from "react";
import { Container, Card, Table, Modal, Form, Button } from "react-bootstrap";
import Loading from "../components/Loading";

const Post = () => {
    const [state, setState] = useState({
        posts: [],
        post: [],
        categories: [],
        loading: true,
        errors: {},
        modalShow: false,
    });

    useEffect(() => {
        setState(prevState => {
            return {
                ...prevState,
                loading: false
            };
        });

        return () => {
            setState({});
        };
    }, []);

    const modalOpen = () => {
        setState(prevState => {
            return {
                ...prevState,
                modalShow: true
            };
        });
    };

    const modalClose = () => {
        setState(prevState => {
            return {
                ...prevState,
                modalShow: false
            };
        });
    };

    const { loading, modalShow, post } = state;
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
                            <tbody>
                                
                            </tbody>
                        </Table>
                    </Card.Body>

                    {/* category modal */}
                    <Modal
                        show={modalShow}
                        onHide={modalClose}
                        backdrop="static"
                        keyboard={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>{ post['id'] ? 'Edit' : 'New' } Post</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text"  required />
                                    {/* {nameError && <Form.Text className="text-danger">{nameError}</Form.Text>} */}
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