import Api from '../config/Api';
import React from 'react';
import Spinner from './Spinner';

export default class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
        };
    }

    componentDidMount() {
        Api.get('/categories')
        .then(response => {
            this.setState({
                categories: response.data.categories,
                loading: false,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        let { categories, loading } = this.state;
        let categoryColumn = categories.map((category, index) =>
            <tr key={category.id}>
                <td>{++index}</td>
                <td>{category.name}</td>
                <td>
                    <a className="btn btn-sm btn-success" href="/">View</a>
                    <a className="btn btn-sm btn-primary" href="/">Edit</a>
                    <a className="btn btn-sm btn-danger" href="/">Delete</a>
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