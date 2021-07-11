import { Switch, Route } from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from '../pages/Home';

function Router() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            {/* not found route */}
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default Router;