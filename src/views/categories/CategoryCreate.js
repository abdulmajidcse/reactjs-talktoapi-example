import { Link } from 'react-router-dom';
import CreateCategory from '../../components/CreateCategory';

function CategoryCreate() {
    return (
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-6">
                <h4>New Catgory</h4>
              </div>
              <div className="col-md-6">
                <Link to="/categories" className="btn btn-sm btn-primary">Category List</Link>
              </div>
            </div>
          </div>
          <div className="card-body">
            <CreateCategory />
          </div>
        </div>
    );
}

export default CategoryCreate;