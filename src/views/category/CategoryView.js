import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import useGetCategory from "../../hooks/useGetCategory";

export default function CategoryView() {
    const params = useParams();
    let [loading, setLoading] = useState(true);
    let category = useGetCategory(params.id);

    useEffect(() => {
        if (Object.keys(category).length > 0) {
            setLoading(false);
        }
    }, [category]);

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