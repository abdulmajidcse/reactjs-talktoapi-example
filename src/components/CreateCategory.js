import Api from '../config/Api';
import React from 'react';

export default class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            success: '',
            error: '',
        };
    }

    setName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    storeCategory = (e) => {
        e.preventDefault();

        this.setState({
            success: '',
            error: '',
        });

        let data = new FormData();
        data.append('name', this.state.name);

        Api.post('/categories', data)
        .then(response => {
            this.setState({
                success: response.data.success,
            });
        })
        .catch(error => {
            this.setState({
                error: error.response.data.name[0],
            });
        })
    }

    render() {
        let { name, success, error } = this.state;
        return (
            <div>
                {success && <span className="text-success">{success}</span>}
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