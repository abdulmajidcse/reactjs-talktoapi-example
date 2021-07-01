import Api from '../config/Api';
import React from 'react';
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
        };
    }

    isSubscribed = true;

    componentDidMount() {
        Api.get('/categories')
        .then(response => {
            this.isSubscribed && this.setState({
                categories: response.data.categories,
                loading: false,
            });
        })
        .catch(() => {
            Swal.fire('', 'There was a problem fetching!', 'error');
        });
    }

    shouldComponentUpdate(nextSate, nextProps) {
        // a testing purpose not any right purpose
        console.log(nextSate);
        console.log(nextProps);
        return true;
    }

    componentWillUnmount() {
        this.isSubscribed = false;
    }

    deleteCategory(categoryId) {
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
                    loading: true
                });
        
                let data = new FormData();
                data.append('_method', 'delete');
                Api.post(`/categories/${categoryId}`, data)
                .then(response => {
                    let newCategories = this.state.categories.filter(category => category.id !== categoryId);
                    this.setState({
                        categories: newCategories
                    });
        
                    this.setState({
                        loading: false
                    });
        
                    Swal.fire('', response.data.success, 'success');
                })
                .catch(() => {
                    Swal.fire('', 'Something went wrong!', 'error');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('', 'Cancelled', 'error');
            }
        });
    
        
    }

    render() {
        let { categories, loading } = this.state;
        let categoryColumn = categories.map((category, index) =>
            <tr key={category.id}>
                <td>{++index}</td>
                <td>{category.name}</td>
                <td>
                    <Link className="btn btn-sm btn-success" to={`/categories/${category.id}`}>View</Link>
                    <Link className="btn btn-sm btn-primary" to={`/categories/${category.id}/edit`}>Edit</Link>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => this.deleteCategory(category.id)}>Delete</button>
                </td>
            </tr>
        );
        
        return (
            <div>
                <Spinner loading={loading} />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryColumn}
                    </tbody>
                    </table>
            </div>
        );
    }
}