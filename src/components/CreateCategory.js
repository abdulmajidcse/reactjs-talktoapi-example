import Api from '../config/Api';
import React from 'react';
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router';

class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            success: '',
            error: '',
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({
            loading: false,
        });
    }

    setName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    storeCategory = (e) => {
        e.preventDefault();

        if(this.state.loading) {
            return true;
        }

        this.setState({
            success: '',
            error: '',
            loading: true,
        });

        let data = new FormData();
        data.append('name', this.state.name);

        Api.post('/categories', data)
        .then(response => {
            this.setState({
                success: response.data.success,
                loading: false,
            });
            // success sweetalert2 message
            Swal.fire('', this.state.success, 'success');
            this.props.history.push('/categories');
        })
        .catch(error => {
            this.setState({
                error: error.response.data.name[0],
                loading: false,
            });
        })
    }

    render() {
        let { name, error, loading } = this.state;
        return (
            <div>
                <Spinner loading={loading} />
                <form onSubmit={this.storeCategory}>
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

export default withRouter(CreateCategory);