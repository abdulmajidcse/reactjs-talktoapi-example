import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class ShowCategory extends React.Component {
    render() {
        let { match } = this.props;
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                    <div className="col-md-6">
                        <h4>Catgory View</h4>
                    </div>
                    <div className="col-md-6">
                        <Link to="/categories" className="btn btn-sm btn-primary">Category List</Link>
                    </div>
                    </div>
                </div>
                <div className="card-body">
                    category ID: { match.params.id }
                </div>
            </div>
        );
    }
}

export default withRouter(ShowCategory);