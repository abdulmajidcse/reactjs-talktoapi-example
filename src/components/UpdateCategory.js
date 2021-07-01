import Api from '../config/Api';
import React from 'react';
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router';

class UpdateCategory extends React.Component {

    state = {
        category: {},
        name: '',
        error: '',
        loading: true,
    }

    componentDidMount() {
        let { match } = this.props;

        Api.get(`/categories/${match.params.id}`)
        .then(response => {
            let category = response.data.category;
            this.setState({
                category: category,
                name: category.name,
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

    setName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    CategoryUpdate = (e) => {
        e.preventDefault();

        if(this.state.loading) {
            return true;
        }

        this.setState({
            error: '',
            loading: true,
        });

        let { category, name } = this.state;
        let data = new FormData();
        data.append('name', name);
        data.append('_method', 'put');

        Api.post(`/categories/${category.id}`, data)
        .then(response => {
            this.setState({
                error: '',
                loading: false,
            });
            // success sweetalert2 message
            Swal.fire('', response.data.success, 'success');
            this.props.history.push('/categories');
        })
        .catch(error => {
            if(error.response) {
                this.setState({
                    error: error.response.data.name[0],
                    loading: false,
                });
            } else {
                this.setState({
                    loading: false,
                });
                Swal.fire('', 'Server Error!', 'error');
            }
        })
    }

    render() {
        let { name, error, loading } = this.state;
        return (
            <div>
                <Spinner loading={loading} />
                <form onSubmit={this.CategoryUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={this.setName} />
                        {error && <span className="text-danger">{error}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}

export default withRouter(UpdateCategory);