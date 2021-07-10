import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;