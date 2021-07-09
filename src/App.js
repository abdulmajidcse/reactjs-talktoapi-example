import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Router from "./router/Router";
import ContextStore from "./contexts/ContextStore";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  function toggleLoading(value = false) {
    setLoading(value);
  }

  return (
    <ContextStore.Provider value={{loading, toggleLoading }}>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Router />
        </div>
      </BrowserRouter>
    </ContextStore.Provider>
  );
}

export default App;
