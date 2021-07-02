import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Spinner from "../../components/Spinner";
import Api from '../../config/Api';
import Swal from "sweetalert2";

export default function CategoryView() {
    let [loading, setLoading] = useState(true);
    let [category, setCategory] = useState({});
    const params = useParams();

    const getCategory = useCallback(() => {
        Api.get(`categories/${params.id}`)
        .then(response => {
            setCategory(response.data.category);
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
            setCategory({});
            setLoading(false);
        };
    }, [getCategory]);

    return (
        <div className="card">
            <Spinner loading={loading} />
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h4>Category View</h4>
                    <Link className="btn btn-primary" to="/categories">Category List</Link>
                </div>
            </div>
            <div className="card-body">
               <p>ID: {category.id}</p>
               <p>Name: {category.name}</p>
            </div>
        </div>
    );
}