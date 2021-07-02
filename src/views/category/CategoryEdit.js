import { Link, useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Spinner from "../../components/Spinner";
import Api from '../../config/Api';
import Swal from "sweetalert2";

export default function CategoryEdit() {
    let [loading, setLoading] = useState(true);
    let [name, setName] = useState('');
    let [error, setError] = useState('');
    const params = useParams();
    const history = useHistory();

    const getCategory = useCallback(() => {
        Api.get(`categories/${params.id}`)
        .then(response => {
            setName(response.data.category.name);
            setLoading(false);
        })
        .catch(() => {
            Swal.fire('', 'Something went wrong!', 'error');
            setLoading(false);
        });
    }, [params.id]);

    useEffect(() => {
        document.title = 'Category View - React App';

        getCategory();

        return () => {
            setName('');
            setError('');
            setLoading(false);
        };
    }, [getCategory]);

    let handleChange = e => {
        setError('');
        setName(e.target.value);
    };

    let handleForm = e => {
        e.preventDefault();

        if (loading) return true;

        setLoading(true);
        setError('');

        let data = new FormData();
        data.append('name', name);
        data.append('_method', 'put');

        Api.post(`/categories/${params.id}`, data)
        .then((response) => {
            Swal.fire('', response.data.success, 'success');
            setLoading(false);
            history.push('/categories');
        })
        .catch(error => {
            if (error.response) {
                setError(error.response.data.name[0]);
            } else {
                Swal.fire('', 'Something went wrong!', 'error');
            }
            setLoading(false);
        });
    };

    return (
        <div className="card">
            <Spinner loading={loading} />
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h4>Category Edit</h4>
                    <Link className="btn btn-primary" to="/categories">Category List</Link>
                </div>
            </div>
            <div className="card-body">
                <form onSubmit={handleForm}>
                    <label htmlFor="name" className="mb-2">Name</label>
                    <input type="text" id="name" name="name" className={(error && 'is-invalid') + ' form-control'} value={name} onChange={handleChange} />
                    {error && <div className="text-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary mt-2">Save</button>
                </form>
            </div>
        </div>
    );
}