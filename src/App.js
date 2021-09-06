import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { UserContextProvider } from './contexts/userContext';
import Router from './router/Router';

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
