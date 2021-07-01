import React from 'react';
import { Link } from 'react-router-dom';
import UpdateCategory from '../../components/UpdateCategory';

class EditCategory extends React.Component {
    render() {
        return (
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-6">
                    <h4>Edit Catgory</h4>
                  </div>
                  <div className="col-md-6">
                    <Link to="/categories" className="btn btn-sm btn-primary">Category List</Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <UpdateCategory />
              </div>
            </div>
        );
    }
}

export default EditCategory;