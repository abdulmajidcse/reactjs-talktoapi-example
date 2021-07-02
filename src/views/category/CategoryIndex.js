import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from '../../config/Api';
import Spinner from '../../components/Spinner';
import Swal from "sweetalert2";

export default function CategoryIndex() {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        Api.get('/categories')
        .then(response => {
            setCategories(response.data.categories);
            setLoading(false);
        })
        .catch(() => {
            Swal.fire('', 'Something went wrong!', 'error');
            setLoading(false);
        });
    };

    useEffect(() => {
        document.title = 'Category List - React App';
        getCategories();
        
        // component unmount
        return () => {
            setLoading(false);
            setCategories([]);
        };
    }, []);

    const deleteCategory = id => {
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
                Api.post(`/categories/${id}`, data)
                .then(response => {
                    let newCategories = categories.filter(category => category.id !== id);
                    setCategories(newCategories);
        
                    setLoading(false);
        
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

    const categoryList = categories.map((category, index) => 
        <tr key={category.id}>
            <td>{++index}</td>
            <td>{category.name}</td>
            <td>
                <Link className="btn btn-primary" to={`/categories/${category.id}`}>View</Link>
                <Link className="btn btn-success" to={`/categories/${category.id}/edit`}>Edit</Link>
                <button type="button" className="btn btn-danger" onClick={() => deleteCategory(category.id)}>Delete</button>
            </td>
        </tr>
    );

    return (
        <div className="card">
            <Spinner loading={loading} />
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h4>Category List</h4>
                    <Link className="btn btn-primary" to="/categories/create">New Category</Link>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered border-primary">
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
                </table>
            </div>
        </div>
    );
}