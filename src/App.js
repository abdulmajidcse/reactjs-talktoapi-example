import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Router from "./router/Router";
import Footer from "./components/Footer";
import { UserContextProvider } from './contexts/userContext';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;