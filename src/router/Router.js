import { Switch, Route } from "react-router-dom";
import Home from '../views/Home';
import CategoryIndex from "../views/category/CategoryIndex";
import CategoryCreate from "../views/category/CategoryCreate";

function Router() {
    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/categories">
                    <CategoryIndex />
                </Route>
                <Route path="/categories/create">
                    <CategoryCreate />
                </Route>
            </Switch>
        </div>
    );
}

export default Router;