import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="card">
        <div className="card-header">
          <h4>Welcome to React App.</h4>
        </div>
        <div className="card-body">
          Home page.
        </div>
      </div>
    </div>
  );
}

export default App;
