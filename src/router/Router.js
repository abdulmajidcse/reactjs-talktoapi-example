import { Switch, Route } from "react-router-dom";
import Home from '../views/Home';
import CategoryIndex from '../views/categories/CategoryIndex';
import CategoryCreate from '../views/categories/CategoryCreate';

function Router() {
    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/categories/create">
                    <CategoryCreate />
                </Route>
                <Route path="/categories">
                    <CategoryIndex />
                </Route>
            </Switch>
        </div>
    );
}

export default Router;