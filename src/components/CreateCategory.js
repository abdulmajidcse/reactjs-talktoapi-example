import axios from 'axios';
import React from 'react';

export default class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    setName = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    storeCategory = (e) => {
        e.preventDefault();
        axios.post('https://talktoapi.abdulmajid.me/categories', {
            name: this.state.name
        })
        .then(response => {
            console.log(response);
            alert('Category Saved.');
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        let { name } = this.state;

        return (
            <div>
                <form onSubmit={this.storeCategory}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={this.setName} />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        );
    }
}