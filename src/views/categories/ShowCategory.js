import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Api from '../../config/Api';
import Spinner from '../../components/Spinner';
import Swal from 'sweetalert2';

class ShowCategory extends React.Component {

    state = {
        category: {},
        loading: true,
    }

    componentDidMount() {
        let { match } = this.props;

        Api.get(`/categories/${match.params.id}`)
        .then(response => {
            this.setState({
                category: response.data.category,
                loading: false,
            });
        })
        .catch(() => {
            this.setState({
                loading: false
            });
            Swal.fire('', 'There was a problem fetching!', 'error');
        });
    }

    render() {
        let { category, loading } = this.state;
        return (
            <div className="card">
                <Spinner loading={loading} />
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
                    <p>ID: { category.id }</p>
                    <p>Name: { category.name }</p>
                    <p>Created At: { category.created_at }</p>
                </div>
            </div>
        );
    }
}

export default withRouter(ShowCategory);