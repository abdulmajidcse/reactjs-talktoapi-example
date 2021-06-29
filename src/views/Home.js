import { useEffect } from "react";
import Swal from "sweetalert2";

function Home() {
  useEffect(() => {
    Swal.fire('', 'Welcome to home page', 'success');
  }, []);

    return (
        <div className="card">
          <div className="card-header">
            <h4>Welcome to React App.</h4>
          </div>
          <div className="card-body">
            Home page.
          </div>
        </div>
    );
}

export default Home;