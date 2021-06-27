import CategoryList from "../../components/CategoryList";

function CategoryIndex() {
    return (
        <div className="card">
          <div className="card-header">
            <h4>Catgory List</h4>
          </div>
          <div className="card-body">
            <CategoryList />
          </div>
        </div>
    );
}

export default CategoryIndex;