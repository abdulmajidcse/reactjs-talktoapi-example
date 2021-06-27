import React from 'react';

export default class CategoryList extends React.Component {
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Laptop</td>
                            <td>
                                <a className="btn btn-sm btn-success" href="/">View</a>
                                <a className="btn btn-sm btn-primary" href="/">Edit</a>
                                <a className="btn btn-sm btn-danger" href="/">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        );
    }
}