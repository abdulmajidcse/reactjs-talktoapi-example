import { Switch, Route } from "react-router-dom";
import Home from '../pages/Home';

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    );
}

export default Router;