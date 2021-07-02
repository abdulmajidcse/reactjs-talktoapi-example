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
        getCategories();
        
        // component unmount
        return () => {
            setLoading(false);
            setCategories([]);
        };
    }, []);

    const categoryList = categories.map((category, index) => 
        <tr key={category.id}>
            <td>{++index}</td>
            <td>{category.name}</td>
            <td>
                <Link className="btn btn-primary" to="/">View</Link>
            </td>
        </tr>
    );

    return (
        <div className="card">
            <Spinner loading={loading} />
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h4>Category List</h4>
                    <Link className="btn btn-primary" to="/">Home</Link>
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