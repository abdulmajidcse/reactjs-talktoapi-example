import { Switch, Route } from "react-router-dom";
import Home from '../views/Home';

function Router() {
    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default Router;