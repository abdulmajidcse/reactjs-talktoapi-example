import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />

        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
